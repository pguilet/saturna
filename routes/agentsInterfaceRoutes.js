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
const multer = require('multer');
const { uploadFile } = require('../services/s3');

const handleError = (err, res) => {
     res.status(500)
          .contentType('text/plain')
          .end('An error occurred while sending image');
};

const uploader = multer({
     dest: './upload/',
     // you might also want to set some limits: https://github.com/expressjs/multer#limits
});



module.exports = (app) => {
     app.get('/api/allUsers', requireLogin, async (req, res) => {
          const users = await Users.find().sort({ username: 1 });
          res.send(users);
     });

     app.get('/api/homeAds', requireLogin, async (req, res) => {
          const homeAds = await HomeAds.find().sort({ title: 1 });
          res.send(homeAds);
     });

     app.post('/api/createHomeAd', requireLogin, async (req, res) => {
               const homeAd = await new HomeAds({
                    title: req.body.title,
                    description: req.body.description,
                    isLocation: !req.body.type||req.body.type==="location"?true:false
               }).save();
               res.send(homeAd);
         
     });

     app.post('/api/deleteHomeAd', requireLogin, async (req, res) => {

               const homeAdAlreadyExisting = await HomeAds.findOneAndDelete({
                    _id: req.body.identifiant,
               });

               res.send(homeAdAlreadyExisting);
          
     });

     app.post(
          '/api/uploadImage',
          requireLogin,uploader.single('file'), /* name attribute of <file> element in your form */
          async (req, res) => {
               console.log(req.file);
              const uploadedImage= await uploadFile(req.file);
              console.log(uploadedImage);
               res.status(200)
                              .contentType('text/plain')
                              .end('File uploaded!');
          }
);

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
               if (req.body.form.role) {
                    user.role = req.body.form.role;
               }
               if (req.body.password) {
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
};
