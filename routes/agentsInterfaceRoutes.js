const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const bcrypt = require('bcrypt');
const requireAdminRole = require('../middlewares/requireAdminRole');
const Users = mongoose.model('users'); //for testing purpose with node and mongoose we should not get info from Survey.js
const HomeAds = mongoose.model('homeAds');
const Clients = mongoose.model('clients');
const multer = require('multer');
const { uploadFile, getFileStream, removeFile } = require('../services/s3');
const fs = require('fs-extra');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;

const handleError = (err, res) => {
     res.status(500)
          .contentType('text/plain')
          .end('An error occurred while sending image');
};

const uploader = multer({
     // dest: './upload/',
     // you might also want to set some limits: https://github.com/expressjs/multer#limits
     storage: multer.diskStorage({
          destination: (req, file, callback) => {
               let path = `./upload/${req.user.username}`;
               fs.mkdirsSync(path);
               callback(null, path);
          },
     }),
});

module.exports = (app) => {
     app.get('/api/allUsers', requireLogin, async (req, res) => {
          const users = await Users.find().sort({ username: 1 });
          res.send(users);
     });

     app.get('/api/allClients', requireLogin, async (req, res) => {
          const clients = await Clients.find().sort({ surname: 1 });
          res.send(clients);
     });

     app.get('/api/search', requireLogin, async (req, res) => {
          const searchValue = req.query.searchValue;
          var clients = await Clients.find({
               $or: [
                    { name: new RegExp(searchValue, 'i') },
                    { surname: new RegExp(searchValue, 'i') },
               ],
          }); //i for case insensitive
          try {
               var date = moment(searchValue, 'YYYYMMDD');
               var datePlusOne = moment(searchValue, 'YYYYMMDD')
                    .add(1, 'day')
                    .toDate();
               var temp = await Clients.find({
                    birthday: {
                         $gte: date,
                         $lt: datePlusOne,
                    },
               });
               clients = clients.concat(temp);
               date = moment(searchValue, 'DDMMYYYY');
               datePlusOne = moment(searchValue, 'DDMMYYYY')
                    .add(1, 'day')
                    .toDate();
               temp = await Clients.find({
                    birthday: {
                         $gte: date,
                         $lt: datePlusOne,
                    },
               });
               clients = clients.concat(temp);
          } catch (e) {}

          if (Array.isArray(clients)) {
               res.send(clients);
          } else {
               res.send([clients]);
          }
     });

     app.post('/api/client', requireLogin, async (req, res) => {
          const client = await Clients.findById(req.body.clientId);
          res.send(client);
     });

     app.get('/api/homeAds', requireLogin, async (req, res) => {
          const homeAds = await HomeAds.find().sort({ title: 1 });
          res.send(homeAds);
     });

     app.get('/api/images/:key', async (req, res) => {
          try {
               const key = req.params.key;
               if (key !== 'undefined') {
                    const readStream = getFileStream(key);
                    readStream.pipe(res);
               }
          } catch (error) {
               console.log(error);
               res.send();
          }
     });

     app.get('/api/images/:folder/:user/:key', async (req, res) => {
          try {
               const key = req.params.key;
               const folder = req.params.folder;

               const user = req.params.user;
               if (key !== 'undefined' && folder !== 'undefined') {
                    const fileStream = fs.createReadStream(
                         folder + '/' + user + '/' + key
                    );
                    fileStream.pipe(res);
               }
          } catch (error) {
               console.log(error);
               res.send();
          }
     });

     app.post(
          '/api/uploadHomeAdImageLocally',
          requireLogin,
          uploader.array('file'),
          async (req, res) => {
               var files = req.files;
               var filePaths = [];
               var x = 0;
               if (files) {
                    for (const file of files) {
                         filePaths[x] = file.path
                              .replace('\\', '/')
                              .replace('\\', '/');
                         x++;
                    }
               }
               if (
                    req.body.identifiant &&
                    !req.body.identifiant === 'undefined'
               ) {
                    const homeAd = await HomeAds.findOne({
                         _id: req.body.identifiant,
                    });

                    res.send(filePaths.concat(homeAd.images));
               } else {
                    res.send(filePaths);
               }
          }
     );
     app.post(
          '/api/createHomeAd',
          requireLogin,
          uploader.array('file'),
          async (req, res) => {
               var filesNameOnS3Bucket = [];
               const homeAd = await new HomeAds({
                    title: req.body.title,
                    description: req.body.description,
                    images: filesNameOnS3Bucket,
                    isLocation:
                         !req.body.type || req.body.type === 'location'
                              ? true
                              : false,
               });
               if (req.body.stateTriggeredValues) {
                    var x = 0;
                    for (const imagePath of req.body.stateTriggeredValues.split(
                         ','
                    )) {
                         if (imagePath.includes('upload')) {
                              const uploadedImage = await uploadFile({
                                   path: imagePath,
                                   filename: imagePath.replace(
                                        'upload/' + req.user.username + '/',
                                        ''
                                   ),
                              });
                              filesNameOnS3Bucket[x] = uploadedImage.key;
                              x++;
                         }
                    }
                    homeAd.images = homeAd.images.concat(filesNameOnS3Bucket);
               }

               if (fs.pathExistsSync('./upload/' + req.user.username)) {
                    fs.rmdirSync('./upload/' + req.user.username, {
                         recursive: true,
                         force: true,
                    });
               }
               res.send(homeAd.save());
          }
     );
     app.post(
          '/api/uploadImage',
          requireLogin,
          uploader.single(
               'file'
          ) /* name attribute of <file> element in your form */,
          async (req, res) => {
               const uploadedImage = await uploadFile(req.file);
               res.status(200).contentType('text/plain').end('File uploaded!');
          }
     );
     app.post('/api/editClientProfile', requireLogin, async (req, res) => {
          let client = await Clients.findOne({
               _id: req.body.clientId,
          });
          let form = req.body.form;
          if (client && form) {
               if (form.civility) {
                    client.civility = form.civility;
               }
               if (form.name) {
                    client.name = form.name;
               }
               if (form.name2) {
                    client.name2 = form.name2;
               }
               if (form.name3) {
                    client.name3 = form.name3;
               }
               if (form.surname) {
                    client.surname = form.surname;
               }
               if (form.womenSurname) {
                    client.womenSurname = form.womenSurname;
               }
               if (form.birthday) {
                    client.birthday = form.birthday;
               }
               if (form.street) {
                    client.street = form.street;
               }
               if (form.postalCode) {
                    client.postalCode = form.postalCode;
               }
               if (form.city) {
                    client.city = form.city;
               }
               if (form.familySituation) {
                    client.familySituation = form.familySituation;
               }
               if (form.childNumber) {
                    client.childNumber = form.childNumber;
               }
               if (form.job) {
                    client.job = form.job;
               }
               if (form.salary) {
                    client.salary = form.salary;
               }
               if (form.phoneNumber) {
                    client.phoneNumber = form.phoneNumber;
               }
               if (form.email) {
                    client.email = form.email;
               }
               if (form.newsletterSuscribing) {
                    client.newsletterSuscribing = form.newsletterSuscribing;
               }
               if (form.profilInvest) {
                    client.profilInvest = form.profilInvest;
               }
               if (form.profilRent) {
                    client.profilRent = form.profilRent;
               }
               if (form.profilOwner) {
                    client.profilOwner = form.profilOwner;
               }
               if (form.comment) {
                    client.comment = form.comment;
               }
          }
          client.save();
          res.send(client);
     });

     app.post('/api/editHomeAd', requireLogin, async (req, res) => {
          let homeAd = await HomeAds.findOne({ _id: req.body.identifiant });
          if (homeAd && (req.body.form || req.body.stateTriggeredValues)) {
               if (req.body.form) {
                    if (req.body.form.type) {
                         homeAd.isLocation =
                              req.body.form.type === 'location' ? true : false;
                    }
                    if (req.body.form.title) {
                         homeAd.title = req.body.form.title;
                    }
                    if (req.body.form.description) {
                         homeAd.description = req.body.form.description;
                    }
               }
               if (req.body.stateTriggeredValues && homeAd.images) {
                    for (const imageKey of homeAd.images) {
                         if (
                              !req.body.stateTriggeredValues.includes(imageKey)
                         ) {
                              await removeFile(imageKey);
                              homeAd.images = homeAd.images.filter(
                                   (item) => item !== imageKey
                              );
                         }
                    }
               }

               if (req.body.stateTriggeredValues) {
                    var filesNameOnS3Bucket = [];
                    var x = 0;
                    for (const imagePath of req.body.stateTriggeredValues) {
                         if (imagePath.includes('upload')) {
                              const uploadedImage = await uploadFile({
                                   path: imagePath,
                                   filename: imagePath.replace(
                                        'upload/' + req.user.username + '/',
                                        ''
                                   ),
                              });
                              filesNameOnS3Bucket[x] = uploadedImage.key;
                              x++;
                         }
                    }
                    homeAd.images = homeAd.images.concat(filesNameOnS3Bucket);
               }
               if (fs.pathExistsSync('./upload/' + req.user.username)) {
                    fs.rmdirSync('./upload/' + req.user.username, {
                         recursive: true,
                         force: true,
                    });
               }
          }
          homeAd.save();
          res.send(homeAd);
     });

     app.post(
          '/api/deleteTemporaryUploadDirectory',
          requireLogin,
          async (req, res) => {
               if (fs.pathExistsSync('./upload/' + req.user.username)) {
                    fs.rmdirSync('./upload/' + req.user.username, {
                         recursive: true,
                         force: true,
                    });
               }
               res.send(req.user);
          }
     );

     app.post('/api/deleteHomeAd', requireLogin, async (req, res) => {
          const homeAdAlreadyExisting = await HomeAds.findOne({
               _id: req.body.identifiant,
          });

          for (const imageKey of homeAdAlreadyExisting.images) {
               try {
                    await removeFile(imageKey);
               } catch (error) {
                    console.log(error);
               }
          }
          homeAdAlreadyExisting.deleteOne();
          res.send(homeAdAlreadyExisting);
     });

     app.post('/api/newUser', requireAdminRole, async (req, res) => {
          const userAlreadyExisting = await Users.find({
               username: req.body.username,
          });
          if (!userAlreadyExisting.length) {
               var salt = await bcrypt.genSalt(12);
               var hashedPassword = bcrypt.hashSync(
                    req.body.password.trim(),
                    salt
               );
               const user = await new Users({
                    username: req.body.username,
                    password: hashedPassword,
                    role: req.body.role,
               }).save();

               res.send(user);
          } else {
               res.send({
                    message: "Un agent avec ce nom d'utilisateur existe déjà",
               });
          }
     });
     app.post('/api/editUser', requireAdminRole, async (req, res) => {
          let user = await Users.findOne({ _id: req.body.identifiant });

          if (user) {
               if (req.body.form && req.body.form.role) {
                    user.role = req.body.form.role;
               }
               if (req.body.form && req.body.form.password) {
                    const password = req.body.form.password.trim();
                    if (password && password.length > 0) {
                         var salt = await bcrypt.genSalt(12);
                         var hashedPassword = bcrypt.hashSync(password, salt);
                         user.password = hashedPassword;
                    }
               }
          }
          user.save();
          res.send(user);
     });
     app.post('/api/deleteUser', requireAdminRole, async (req, res) => {
          if (req.body.identifiants.username !== 'nsalem') {
               const userAlreadyExisting = await Users.findOneAndDelete({
                    _id: new ObjectId(req.body.identifiants._id),
               });

               res.send(userAlreadyExisting);
          } else {
               res.send(null);
          }
     });

     app.post('/api/deleteClient', requireAdminRole, async (req, res) => {
          const clientAlreadyExisting = await Clients.findOneAndDelete({
               _id: req.body.identifiant._id,
          });

          res.send(clientAlreadyExisting);
     });

     app.post('/api/newClient', requireLogin, async (req, res) => {
          let clientAlreadyExisting = false;
          let name = undefined;
          let surname = undefined;
          let birthday = undefined;
          if (req.body) {
               name = req.body.name;
               surname = req.body.surname;
               birthday = req.body.birthday;
               if (name || surname || birthday) {
                    clientAlreadyExisting = await Clients.find({
                         name: name,
                         surname: surname,
                         birthday: birthday,
                    });
               }
          }
          if (!clientAlreadyExisting.length) {
               const client = await new Clients({
                    surname: surname,
                    name: name,
                    birthday: birthday,
               }).save();

               res.send(client);
          } else {
               res.send({
                    message: 'Le client existe déjà.',
               });
          }
     });
};
