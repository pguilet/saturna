const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdminRole = require('../middlewares/requireAdminRole');
const Users = mongoose.model('users'); //for testing purpose with node and mongoose we should not get info from Survey.js
const HomeAds = mongoose.model('homeAds');
const Clients = mongoose.model('clients');
const Notaries = mongoose.model('notaries');
const Syndics = mongoose.model('syndics');
const PropertyCases = mongoose.model('propertyCases');
const RentingCases = mongoose.model('rentingCases');
const multer = require('multer');
const {
     uploadFile,
     getFileStream,
     removeFile,
     getDownloadSignedLink,
} = require('../services/s3');
const fs = require('fs-extra');
const Roles = require('../types/types');
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;

const uploader = multer({
     // dest: './upload/',
     // you might also want to set some limits: https://github.com/expressjs/multer#limits
     storage: multer.diskStorage({
          destination: (req, file, callback) => {
               let path = `./upload/${req.user.username}`;
               fs.mkdirsSync(path);
               callback(null, path);
          },
          filename: (req, file, callback) => {
               callback(null, file.originalname);
          },
     }),
});

module.exports = (app) => {
     app.get('/api/stats', requireLogin, async (req, res) => {
          let tempStats = {};
          let contactNumber = 0;
          let estimationNumber = 0;
          let simpleMandateNumber = 0;
          let exclusiveMandateNumber = 0;
          let sellingNumber = 0;

          const allPropertyCases = await PropertyCases.find();
          for (const propertyCase of allPropertyCases) {
               if (propertyCase.estimation && propertyCase.estimationUser) {
                    estimationNumber++;
                    if (
                         !(
                              req.user.role === Roles.AGENT &&
                              req.user.username !==
                                   propertyCase.estimationUser.username
                         )
                    ) {
                         if (!tempStats[propertyCase.estimationUser.username]) {
                              tempStats[propertyCase.estimationUser.username] =
                                   {};
                         }
                         if (
                              !tempStats[propertyCase.estimationUser.username]
                                   .estimationNumber
                         ) {
                              tempStats[
                                   propertyCase.estimationUser.username
                              ].estimationNumber = 0;
                         }

                         tempStats[
                              propertyCase.estimationUser.username
                         ].estimationNumber =
                              tempStats[propertyCase.estimationUser.username]
                                   .estimationNumber + 1;
                    }
               }
               if (propertyCase.contactUser) {
                    contactNumber++;
                    if (
                         !(
                              req.user.role === Roles.AGENT &&
                              req.user.username !==
                                   propertyCase.contactUser.username
                         )
                    ) {
                         if (!tempStats[propertyCase.contactUser.username]) {
                              tempStats[propertyCase.contactUser.username] = {};
                         }
                         if (
                              !tempStats[propertyCase.contactUser.username]
                                   .contactNumber
                         ) {
                              tempStats[
                                   propertyCase.contactUser.username
                              ].contactNumber = 0;
                         }
                         tempStats[
                              propertyCase.contactUser.username
                         ].contactNumber =
                              tempStats[propertyCase.contactUser.username]
                                   .contactNumber + 1;
                    }
               }
               if (
                    propertyCase.mandateKind &&
                    propertyCase.mandateKind === 'simple' &&
                    propertyCase.mandateUser
               ) {
                    simpleMandateNumber++;
                    if (
                         !(
                              req.user.role === Roles.AGENT &&
                              req.user.username !==
                                   propertyCase.mandateUser.username
                         )
                    ) {
                         if (!tempStats[propertyCase.mandateUser.username]) {
                              tempStats[propertyCase.mandateUser.username] = {};
                         }
                         if (
                              !tempStats[propertyCase.mandateUser.username]
                                   .simpleMandateNumber
                         ) {
                              tempStats[
                                   propertyCase.mandateUser.username
                              ].simpleMandateNumber = 0;
                         }
                         tempStats[
                              propertyCase.mandateUser.username
                         ].simpleMandateNumber =
                              tempStats[propertyCase.mandateUser.username]
                                   .simpleMandateNumber + 1;
                    }
               }
               if (
                    propertyCase.mandateKind &&
                    propertyCase.mandateKind === 'exclusif' &&
                    propertyCase.mandateUser
               ) {
                    exclusiveMandateNumber++;
                    if (
                         !(
                              req.user.role === Roles.AGENT &&
                              req.user.username !==
                                   propertyCase.mandateUser.username
                         )
                    ) {
                         if (!tempStats[propertyCase.mandateUser.username]) {
                              tempStats[propertyCase.mandateUser.username] = {};
                         }
                         if (
                              !tempStats[propertyCase.mandateUser.username]
                                   .exclusiveMandateNumber
                         ) {
                              tempStats[
                                   propertyCase.mandateUser.username
                              ].exclusiveMandateNumber = 0;
                         }
                         tempStats[
                              propertyCase.mandateUser.username
                         ].exclusiveMandateNumber =
                              tempStats[propertyCase.mandateUser.username]
                                   .exclusiveMandateNumber + 1;
                    }
               }
               if (propertyCase.caseClosed && propertyCase.sellingUser) {
                    sellingNumber++;
                    if (
                         !(
                              req.user.role === Roles.AGENT &&
                              req.user.username !==
                                   propertyCase.sellingUser.username
                         )
                    ) {
                         if (!tempStats[propertyCase.sellingUser.username]) {
                              tempStats[propertyCase.sellingUser.username] = {};
                         }
                         if (
                              !tempStats[propertyCase.sellingUser.username]
                                   .sellingNumber
                         ) {
                              tempStats[
                                   propertyCase.sellingUser.username
                              ].sellingNumber = 0;
                         }
                         tempStats[
                              propertyCase.sellingUser.username
                         ].sellingNumber =
                              tempStats[propertyCase.sellingUser.username]
                                   .sellingNumber + 1;
                    }
               }
          }
          if (req.user.role === Roles.ADMIN)
               tempStats.all = {
                    contactNumber,
                    estimationNumber,
                    simpleMandateNumber,
                    exclusiveMandateNumber,
                    sellingNumber,
               };
          res.send(tempStats);
     });

     app.get('/api/allUsers', requireLogin, async (req, res) => {
          const users = await Users.find().sort({ username: 1 });
          res.send(users);
     });

     app.get('/api/allClients', requireLogin, async (req, res) => {
          const clients = await Clients.find().sort({ surname: 1 });
          res.send(clients);
     });

     app.post('/api/allOpenCases', requireLogin, async (req, res) => {
          const allOpenCases = await PropertyCases.find({
               caseClosed: false,
               _user: req.body.clientId,
          }).sort({ city: 1 });
          res.send(allOpenCases);
     });

     app.post('/api/allOpenedRentingCases', requireLogin, async (req, res) => {
          const allRentingCases = await RentingCases.find({
               caseClosed: false,
               _user: req.body.clientId,
          }).sort({ city: 1 });
          res.send(allRentingCases);
     });

     app.post('/api/allClosedRentingCases', requireLogin, async (req, res) => {
          const allClosedRentingCases = await RentingCases.find({
               caseClosed: true,
               _user: req.body.clientId,
          }).sort({ city: 1 });
          res.send(allClosedRentingCases);
     });

     app.post('/api/allClosedCases', requireLogin, async (req, res) => {
          const allClosedCases = await PropertyCases.find({
               caseClosed: true,
               _user: req.body.clientId,
          }).sort({ city: 1 });
          res.send(allClosedCases);
     });

     app.get('/api/allNotaries', requireLogin, async (req, res) => {
          const notaries = await Notaries.find().sort({ surname: 1 });
          res.send(notaries);
     });
     app.get('/api/allSyndics', requireLogin, async (req, res) => {
          const syndics = await Syndics.find().sort({ name: 1 });
          res.send(syndics);
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

     app.post('/api/notary', requireLogin, async (req, res) => {
          if (req.body.notaryId) {
               const notary = await Notaries.findById(req.body.notaryId);
               res.send(notary);
          } else {
               res.send(null);
          }
     });

     app.post('/api/syndic', requireLogin, async (req, res) => {
          if (req.body.syndicId) {
               const syndic = await Syndics.findById(req.body.syndicId);
               res.send(syndic);
          } else {
               res.send(null);
          }
     });

     app.post('/api/propertyCase', requireLogin, async (req, res) => {
          const openCase = await PropertyCases.findById(req.body.caseId);
          res.send(openCase);
     });

     app.post('/api/rentingCase', requireLogin, async (req, res) => {
          const rentingCase = await RentingCases.findById(req.body.caseId);
          res.send(rentingCase);
     });

     app.get('/api/homeAds', requireLogin, async (req, res) => {
          const homeAds = await HomeAds.find().sort({ title: 1 });
          res.send(homeAds);
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

     app.get('/api/images/:modelId/:key', async (req, res) => {
          try {
               const key = req.params.key;
               const modelId = req.params.modelId;
               if (key !== 'undefined') {
                    const readStream = getFileStream(modelId + '/' + key);
                    readStream.pipe(res);
               }
          } catch (error) {
               console.log(error);
               res.send();
          }
     });

     app.post(
          '/api/downloadSignedLinkForFile',
          requireLogin,
          async (req, res) => {
               try {
                    const key = req.body.path;
                    if (key !== 'undefined') {
                         const url = getDownloadSignedLink(key);
                         res.send(url);
                    }
               } catch (error) {
                    console.log(error);
                    res.send();
               }
          }
     );

     app.post(
          '/api/uploadFileLocally',
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

               res.send(filePaths);
          }
     );

     app.post(
          '/api/uploadImageFileLocally',
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
                    req.body.identifiants &&
                    !req.body.identifiant === 'undefined'
               ) {
                    const homeAd = await HomeAds.findOne({
                         _id: req.body.identifiants,
                    });

                    res.send(filePaths.concat(homeAd.images));
               } else {
                    res.send(filePaths);
               }
          }
     );

     const clearUploadDirectory = (username) => {
          if (fs.pathExistsSync('./upload/' + username)) {
               fs.rmdirSync('./upload/' + username, {
                    recursive: true,
                    force: true,
               });
          }
     };

     const updateModel = async (
          req,
          res,
          pdfFields,
          imagesFields,
          modelInstance,
          fields,
          identifiants
     ) => {
          if (modelInstance && fields) {
               for (const [key, value] of Object.entries(fields)) {
                    if (key !== 'identifiants')
                         if (pdfFields.includes(key)) {
                              if (value) {
                                   await uploadFile({
                                        pathOrigin:
                                             'upload/' +
                                             req.user.username +
                                             '/' +
                                             value,
                                        pathDestination:
                                             modelInstance._id + '/' + value,
                                   });
                                   modelInstance[key] =
                                        modelInstance._id + '/' + value;
                              } else {
                                   await removeFile(
                                        modelInstance._id + '/' + value
                                   );
                                   modelInstance[key] = value;
                              }
                         } else if (imagesFields.includes(key)) {
                              if (modelInstance[key]) {
                                   for (const imageKey of modelInstance[key]) {
                                        if (!fields[key].includes(imageKey)) {
                                             await removeFile(imageKey);
                                             modelInstance[key] = modelInstance[
                                                  key
                                             ].filter(
                                                  (item) => item !== imageKey
                                             );
                                        }
                                   }
                              }
                              var filesNameOnS3Bucket = [];
                              var x = 0;
                              for (const imagePath of fields[key]) {
                                   if (imagePath.includes('upload')) {
                                        const uploadedImage = await uploadFile({
                                             pathOrigin:
                                                  'upload/' +
                                                  req.user.username +
                                                  '/' +
                                                  imagePath
                                                       .split('\\')
                                                       .pop()
                                                       .split('/')
                                                       .pop(),
                                             pathDestination:
                                                  modelInstance._id +
                                                  '/' +
                                                  imagePath
                                                       .split('\\')
                                                       .pop()
                                                       .split('/')
                                                       .pop(),
                                        });
                                        filesNameOnS3Bucket[x] =
                                             uploadedImage.key;
                                        x++;
                                   }
                              }
                              modelInstance[key] =
                                   modelInstance[key].concat(
                                        filesNameOnS3Bucket
                                   );
                         } else {
                              if (key.includes('_')) {
                                   //ref to other schema
                                   modelInstance[key] = new ObjectId(value);
                              } else {
                                   modelInstance[key] = value;
                              }
                         }
               }
          }
          clearUploadDirectory(req.user.username);
          const savedModelInstance = await modelInstance.save();
          return savedModelInstance;
     };

     const updateModelAndReturnResponse = async (
          req,
          res,
          pdfFields,
          imagesFields,
          modelInstance,
          fields,
          identifiants
     ) => {
          res.send(
               await updateModel(
                    req,
                    res,
                    pdfFields,
                    imagesFields,
                    modelInstance,
                    fields,
                    identifiants
               )
          );
     };

     app.post(
          '/api/createHomeAd',
          requireLogin,
          uploader.array('files'),
          async (req, res) => {
               updateModelAndReturnResponse(
                    req,
                    res,
                    [],
                    ['images'],
                    await new HomeAds(),
                    req.body.stateTriggeredValues,
                    req.body.identifiants
               );
          }
     );

     app.post('/api/editClientProfile', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await Clients.findById(req.body.identifiants.modelInstanceId),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });

     app.post(
          '/api/editCase',
          uploader.array('files'),
          requireLogin,
          async (req, res) => {
               let model = await updateModel(
                    req,
                    res,
                    [
                         'carrezLawPdf',
                         'compromisPdf',
                         'diagnosticPdf',
                         'preEtatDatePdf',
                         'etatDatePdf',
                         'appelDeFondPdf',
                         'propertyTaxPdf',
                         'mortGageContractPdf',
                    ],
                    ['estimationImages', 'propertyImages'],
                    await PropertyCases.findById(
                         req.body.identifiants.modelInstanceId
                    ),
                    req.body.stateTriggeredValues,
                    req.body.identifiants
               );

               //we copy to be able to retrieve the data even if its removed from its base model database.
               if (model.notaryVendor) {
                    let notaryVendor = await Notaries.findById(
                         model.notaryVendor
                    );
                    let newNotaryVendor = new Notaries(notaryVendor);
                    model.notaryVendor = newNotaryVendor;
               }

               if (model.notaryBuyer) {
                    let notaryBuyer = await Notaries.findById(
                         model.notaryBuyer
                    );
                    let newNotaryBuyer = new Notaries(notaryBuyer);
                    model.notaryBuyer = newNotaryBuyer;
               }

               if (model.syndic) {
                    let syndic = await Syndics.findById(model.syndic);
                    let newSyndic = new Syndics(syndic);
                    model.syndic = newSyndic;
               }

               if (model.contactUser) {
                    let contactUser = await Users.findById(model.contactUser);
                    let newContactUser = new Users();
                    newContactUser._id = contactUser._id;
                    newContactUser.username = contactUser.username;
                    model.contactUser = newContactUser;
               }

               if (model.estimationUser) {
                    let estimationUser = await Users.findById(
                         model.estimationUser
                    );
                    let newEstimationUser = new Users();
                    newEstimationUser._id = estimationUser._id;
                    newEstimationUser.username = estimationUser.username;
                    model.estimationUser = newEstimationUser;
               }

               if (model.mandateUser) {
                    let mandateUser = await Users.findById(model.mandateUser);
                    let newMandateUser = new Users();
                    newMandateUser._id = mandateUser._id;
                    newMandateUser.username = mandateUser.username;
                    model.mandateUser = newMandateUser;
               }

               if (model.sellingUser) {
                    let sellingUser = await Users.findById(model.sellingUser);
                    let newSellingUser = new Users();
                    newSellingUser._id = sellingUser._id;
                    newSellingUser.username = sellingUser.username;
                    model.sellingUser = newSellingUser;
               }

               model.save();
               res.send(model);
          }
     );

     app.post(
          '/api/editRentingCase',
          uploader.array('files'),
          requireLogin,
          async (req, res) => {
               let model = await updateModelAndReturnResponse(
                    req,
                    res,
                    [
                         'bail',
                         'rentReceipts',
                         'entryForm',
                         'exitForm',
                         'ownerInsurrance',
                         'renterInsurrance',
                         'rib',
                    ],
                    ['lastEntryFormImages'],
                    await RentingCases.findById(
                         req.body.identifiants.modelInstanceId
                    ),
                    req.body.stateTriggeredValues,
                    req.body.identifiants
               );
          }
     );

     app.post('/api/editNotary', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await Notaries.findById(req.body.identifiants.modelInstanceId),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });

     app.post('/api/editSyndic', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await Syndics.findById(req.body.identifiants.modelInstanceId),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });

     app.post('/api/editHomeAd', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               ['images'],
               await HomeAds.findById(req.body.identifiants.modelInstanceId),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
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
          const homeAdAlreadyExisting = await HomeAds.findById(
               req.body.identifiants.modelInstanceId
          );

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
               username: req.body.stateTriggeredValues.username,
          });
          if (!userAlreadyExisting.length) {
               updateModelAndReturnResponse(
                    req,
                    res,
                    [],
                    [],
                    await new Users(),
                    req.body.stateTriggeredValues,
                    req.body.identifiants
               );
          } else {
               res.send({
                    message: "Un agent avec ce nom d'utilisateur existe déjà",
               });
          }
     });
     app.post('/api/editUser', requireAdminRole, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await Users.findById(req.body.identifiants.modelInstanceId),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });
     app.post('/api/deleteUser', requireAdminRole, async (req, res) => {
          if (req.body.identifiants.username !== 'nsalem') {
               const userAlreadyExisting = await Users.findByIdAndDelete(
                    req.body.identifiants.modelInstanceId
               );

               res.send(userAlreadyExisting);
          } else {
               res.send(null);
          }
     });

     app.post('/api/deleteNotary', requireAdminRole, async (req, res) => {
          const notaryAlreadyExisting = await Notaries.findByIdAndDelete(
               req.body.identifiants.modelInstanceId
          );

          res.send(notaryAlreadyExisting);
     });
     app.post(
          '/api/deletRentingReceipt',
          requireAdminRole,
          async (req, res) => {
               const rentingCase = await RentingCases.findById(
                    req.body.identifiants.modelInstanceId
               );
               rentingCase.rentReceipts = _.filter(
                    rentingCase.rentReceipts,
                    (receipt) =>
                         receipt._id != req.body.identifiants.receiptIdToDelete
               );
               res.send(await rentingCase.save());
          }
     );

     app.post('/api/deleteSyndic', requireAdminRole, async (req, res) => {
          const syndicAlreadyExisting = await Syndics.findByIdAndDelete(
               req.body.identifiants.modelInstanceId
          );

          res.send(syndicAlreadyExisting);
     });

     app.post('/api/deleteClient', requireAdminRole, async (req, res) => {
          const clientAlreadyExisting = await Clients.findByIdAndDelete(
               req.body.identifiants.modelInstanceId
          );
          res.send(clientAlreadyExisting);
     });

     app.post('/api/deletePropertyCase', requireAdminRole, async (req, res) => {
          const propertyCaseAlreadyExisting =
               await PropertyCases.findByIdAndDelete(
                    req.body.identifiants.modelInstanceId
               );
          res.send(propertyCaseAlreadyExisting);
     });

     app.post('/api/deleteRentingCase', requireAdminRole, async (req, res) => {
          const rentingCaseAlreadyExisting =
               await RentingCases.findByIdAndDelete(
                    req.body.identifiants.modelInstanceId
               );
          res.send(rentingCaseAlreadyExisting);
     });

     app.post('/api/newClient', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await new Clients(),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });

     app.post('/api/newOpenCase', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await new PropertyCases(),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });

     app.post('/api/newOpenedRentingCase', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await new RentingCases(),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });

     app.post('/api/createNotary', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await new Notaries(),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });

     app.post('/api/createSyndic', requireLogin, async (req, res) => {
          updateModelAndReturnResponse(
               req,
               res,
               [],
               [],
               await new Syndics(),
               req.body.stateTriggeredValues,
               req.body.identifiants
          );
     });
};
