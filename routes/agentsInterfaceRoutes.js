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

module.exports = (app) => {
     app.get('/api/allUsers', requireLogin, async (req, res) => {
          const users = await Users.find().sort({ username: 1 });
          res.send(users);
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
