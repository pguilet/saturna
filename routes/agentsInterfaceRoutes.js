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

     app.get('/api/homeAds', requireLogin, async (req, res) => {
          const homeAds = await HomeAds.find().sort({ title: 1 });
          res.send(homeAds);
     });

     app.get('/api/images/:key', async (req, res) => {
          const key = req.params.key;
          if (key !== 'undefined') {
               const readStream = getFileStream(key);
               readStream.pipe(res);
          }
     });
     app.get('/api/images/:folder/:user/:key', async (req, res) => {
          const key = req.params.key;
          const folder = req.params.folder;
          const user = req.params.user;
          if (key !== 'undefined' && folder !== 'undefined') {
               const fileStream = fs.createReadStream(
                    folder + '/' + user + '/' + key
               );
               fileStream.pipe(res);
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
               const homeAd = await new HomeAds({
                    title: req.body.title,
                    description: req.body.description,
                    images: filesNameOnS3Bucket,
                    isLocation:
                         !req.body.type || req.body.type === 'location'
                              ? true
                              : false,
               }).save();
               if (req.body.stateTriggeredValues) {
                    var filesNameOnS3Bucket = [];
                    var x = 0;
                    for (const imagePath of req.body.stateTriggeredValues.split(',')) {
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
                    });
               }
               homeAd.save();
               res.send(homeAd);
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

     app.post('/api/editHomeAd', requireLogin, async (req, res) => {
          let homeAd = await HomeAds.findOne({ _id: req.body.identifiant });
          if (
               homeAd &&
               (req.body.form || req.body.stateTriggeredValues)
          ) {
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
               await removeFile(imageKey);
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
          let user = await Users.findOne({ username: req.body.username });

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
          if (req.body.username !== 'nsalem') {
               const userAlreadyExisting = await Users.findOneAndDelete({
                    username: req.body.username,
               });

               res.send(userAlreadyExisting);
          } else {
               res.send(null);
          }
     });

     app.post('/api/deleteClient', requireAdminRole, async (req, res) => {
               const clientAlreadyExisting = await Clients.findOneAndDelete({
                    surname: req.body.identifiant.surname,
                    name: req.body.identifiant.name,
                    birthday: req.body.identifiant.birthday
               });

               res.send(clientAlreadyExisting);

     });


     app.post('/api/newClient', requireLogin, async (req, res) => {
          const clientAlreadyExisting = await Clients.find({
               name: req.body.name,
               surname:req.body.surname,
               birthday:req.body.birthday
          });
          if (!clientAlreadyExisting.length) {
               if(!req.body.name||!(req.body.surname)||!(req.body.birthday)){
                    res.send({
                         message: "Veuillez renseigner tous les champs.",
                    });
               }else{
               const client = await new Clients({
                    surname: req.body.surname,
                    name: req.body.name,
                    birthday: req.body.birthday,
               }).save();

               res.send(client);}
          } else {
               res.send({
                    message: "Le client existe déjà.",
               });
          }
     });
};
