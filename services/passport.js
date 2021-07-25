const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); //no need to specify .js extension of the file.

const User = mongoose.model('users');

passport.serializeUser((user, done) => {//let's put it in a cookie
  //user is what is retrieved from callback after done is called.
  done(null, user.id); //we use record id and not profile id for when we will have many identification modes.
});
passport.deserializeUser((userId,done) => {//lets get user from cookie and set it into req.user in route controller entry.
    User.findById(userId).then(user=>{
        done(null,user);
    });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy:true //we trust heroku proxy so keep htttps. We could also set the callback URL with full qualified domain maybe computed with ENV variable. 
      
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          //we already have a record with given id
          return done(null, existingUser);
        } 
        //we don't have a record with given id.
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
    }
  )
);
