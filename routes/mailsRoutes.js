const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const rentingReceiptTemplate = require('../services/emailTemplates/rentingReceiptTemplate');
const Clients = mongoose.model('clients');
const RentingCases = mongoose.model('rentingCases');
const Receipts = mongoose.model('receipt');
const NewsletterMails = mongoose.model('newsletterMail');
const keys = require('../config/keys');
const moment = require('moment');

module.exports = (app) => {
     app.post('/api/generateRentingReceipt', requireLogin, async (req, res) => {
          try {
               let client = await Clients.findById(
                    req.body.identifiants.clientId
               );
               let rentingCase = await RentingCases.findById(
                    req.body.identifiants.modelInstanceId
               );
               let data = req.body.stateTriggeredValues;
               let date = null;
               if (data.startProrata || data.endProrata || data.month) {
                    let config = {};
                    let completeRent =
                         rentingCase.rentingPrice + rentingCase.rentingCharges;
                    if (data.startProrata) {
                         date = data.startProrata;
                         config.prorata = true;
                         config.rentStartDate = moment(
                              data.startProrata
                         ).format('DD-MM-YYYY');
                         config.rentEndDate = moment(data.startProrata)
                              .endOf('month')
                              .format('DD-MM-YYYY');
                         let lastDayOfTheMonth = moment(data.startProrata)
                              .endOf('month')
                              .format('D');
                         let entryDay = moment(data.startProrata).format('D');
                         config.paidRent =
                              (completeRent / lastDayOfTheMonth) *
                              (lastDayOfTheMonth - entryDay + 1);
                         config.paidRent = config.paidRent.toFixed(2);
                    } else if (data.endProrata) {
                         date = data.endProrata;
                         config.prorata = true;
                         config.rentEndDate = moment(data.endProrata).format(
                              'DD-MM-YYYY'
                         );
                         config.rentStartDate = moment(data.endProrata)
                              .startOf('month')
                              .format('DD-MM-YYYY');
                         let lastDayOfTheMonth = moment(data.endProrata)
                              .endOf('month')
                              .format('D');
                         let exitDay = moment(data.endProrata).format('D');
                         config.paidRent =
                              (completeRent / lastDayOfTheMonth) * exitDay;
                         config.paidRent = config.paidRent.toFixed(2);
                    } else if (data.month) {
                         date = data.month;
                         config.rentStartDate = moment(data.month)
                              .startOf('month')
                              .format('DD-MM-YYYY');
                         config.rentEndDate = moment(data.month)
                              .endOf('month')
                              .format('DD-MM-YYYY');
                         config.paidRent = completeRent;
                    }
                    config.sendingDate = moment(new Date()).format(
                         'DD-MM-YYYY'
                    );
                    config.mandataireName = keys.mandataireName;
                    config.mandataireAddress = keys.mandataireAddress;
                    config.renterNames = client.surname + ' ' + client.name;
                    config.propertyAddress =
                         rentingCase.street +
                         ' ' +
                         rentingCase.postalCode +
                         ' ' +
                         rentingCase.city;
                    config.rentPrice = rentingCase.rentingPrice;
                    config.rentCharges = rentingCase.rentingCharges;
                    let templateFilled = rentingReceiptTemplate(config);

                    let receipt = new Receipts();
                    receipt.date = moment(date).toDate();
                    receipt.receipt = templateFilled;
                    rentingCase.rentReceipts =
                         rentingCase.rentReceipts.concat(receipt);
                    let savedRentingCase = await rentingCase.save();
                    res.send(savedRentingCase);
               } else {
                    res.send(null);
               }
          } catch (err) {
               res.status(422).send(err);
          }
     });

     app.post('/api/sendRentReceipt', requireLogin, async (req, res) => {
          let rentingCase = await RentingCases.findById(
               req.body.identifiants.modelInstanceId
          );
          let client = await Clients.findById(req.body.identifiants.clientId);
          let receiptToSend = _.filter(rentingCase.rentReceipts, (receipt) => {
               return (
                    receipt._id.toString() ===
                    req.body.identifiants.receiptIdToSend
               );
          })[0];
          let config = {
               to: client.email,
               from: keys.emailToSend,
               subject: 'Envoi de quittance de loyer',
          };
          const mailer = new Mailer(config, receiptToSend.receipt);
          try {
               const sendGridResponse = await mailer.send();
               if (sendGridResponse[0].statusCode === 202) {
                    receiptToSend.sent = true;
                    await RentingCases.updateOne(
                         {
                              _id: rentingCase._id,
                              'rentReceipts._id': receiptToSend._id,
                         },
                         { 'rentReceipts.$': receiptToSend }
                    );
                    res.send(rentingCase);
               } else {
                    res.status(422).send(sendGridResponse[0].statusCode);
               }
          } catch (err) {
               res.status(422).send(err);
          }
     });
     app.post('/api/sendMailToOwner', requireLogin, async (req, res) => {
          const firstName = req.body.firstName;
          const lastName = req.body.lastName;
          const email = req.body.email;
          const phone = req.body.phone;
          const message = req.body.message;
          let config = {
               to: keys.emailToSend,
               from: keys.emailToSend,
               subject: "Mail d'un client du site",
          };
          const mailer = new Mailer(
               config,
               'Prénom: ' +
                    firstName +
                    '<br/>' +
                    'Nom: ' +
                    lastName +
                    '<br/>' +
                    'Email: ' +
                    email +
                    '<br/>' +
                    'Téléphone: ' +
                    phone +
                    '<br/>' +
                    'Message: ' +
                    message
          );
          try {
               const sendGridResponse = await mailer.send();
               if (sendGridResponse[0].statusCode === 202) {
                    // receiptToSend.sent = true;
                    // await RentingCases.updateOne(
                    //      {
                    //           _id: rentingCase._id,
                    //           'rentReceipts._id': receiptToSend._id,
                    //      },
                    //      { 'rentReceipts.$': receiptToSend }
                    // );
                    // res.send(rentingCase);
                    res.send({ sent: true });
               } else {
                    res.status(422).send(sendGridResponse[0].statusCode);
               }
          } catch (err) {
               res.status(422).send(err);
          }
     });
     app.post('/api/sendMail', requireLogin, async (req, res) => {
          let mail = await NewsletterMails.findById(
               req.body.identifiants.modelInstanceId
          );
          let query = [];
          let clientToSend = 0;
          if (mail.object) {
               if (mail.newsletterSuscribing) {
                    query.push({ newsletterSuscribing: true });
               }
               if (mail.profilInvest) {
                    query.push({ profilInvest: true });
               }
               if (mail.profilRent) {
                    query.push({ profilRent: true });
               }
               if (mail.profilOwner) {
                    query.push({ profilOwner: true });
               }
               if (query.length > 0) {
                    let clients = await Clients.find({
                         $or: query,
                    });

                    const emails = _.map(clients, (client) => {
                         if (client.email) {
                              clientToSend++;
                              return client.email;
                         }
                    }).join(',');
                    if (emails) {
                         let config = {
                              to: emails,
                              from: keys.emailToSend,
                              subject: mail.object ? mail.object : '',
                         };
                         const mailer = new Mailer(config, mail.mailContent);
                         try {
                              const sendGridResponse = await mailer.send();
                              if (sendGridResponse[0].statusCode === 202) {
                                   mail.lastSendingDate = new Date();
                                   mail.lastClientsBatch = clientToSend;
                                   res.send(await mail.save());
                              } else {
                                   res.status(422).send(
                                        sendGridResponse[0].statusCode
                                   );
                              }
                         } catch (err) {
                              res.status(422).send(err);
                         }
                    } else {
                         mail.lastSendingDate = new Date();
                         mail.lastClientsBatch = clientToSend;
                         res.send(await mail.save());
                    }
               } else {
                    mail.lastSendingDate = new Date();
                    mail.lastClientsBatch = clientToSend;
                    res.send(await mail.save());
               }
          } else {
               res.send({
                    message: "Veuillez renseigner un objet pour pouvoir procéder à l'envoi",
               });
          }
     });
};
