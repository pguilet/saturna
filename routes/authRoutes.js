const passport = require('passport');
const express = require('express');

module.exports = (app) => {
     app.get(
          '/auth/google',
          passport.authenticate('google', {
               scope: ['profile', 'email'],
          })
     ); // that is what we want from authentication. Start authentication process.

     app.get(
          '/auth/google/callback',
          passport.authenticate('google'),
          (req, res) => {
               res.redirect('/surveys');
          }
     ); //passport do the code verification and call the callback service that log profile infos in the defined google strategy.
     app.get('/api/logout', (req, res) => {
          req.logout();
          res.redirect('/');
     });
     app.get('/api/current_user', (req, res) => {
          res.send(req.user);
     });

     // app.get('/api/loginUser', passport.authenticate('login'));

     app.get('/api/loginUser', (req, res, next) => {
          passport.authenticate('login', res.query, (err, user, info) => {
               if (info) {
                    res.send(info);
               } else {
                    req.logIn(user, function (err) {
                         // <-- Log user in
                    });
                    res.send(user);
               }
          })(req, res, next);
     });
};
