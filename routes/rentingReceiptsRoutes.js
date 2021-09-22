const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const rentingReceiptTemplate = require('../services/emailTemplates/rentingReceiptTemplate');
const Clients = mongoose.model('clients');
const RentingCases = mongoose.model('rentingCases');
const Receipts = mongoose.model('receipt');
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
};
