const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); //no need to specify .js extension of the file.
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('users');

const BCRYPT_SALT_ROUNDS = 12;


passport.serializeUser((user, done) => {//let's put it in a cookie
  //user is what is retrieved from callback after done is called.
  done(null, user.id); //we use record id and not profile id for when we will have many identification modes.
});
passport.deserializeUser(async (userId,done) => {//lets get user from cookie and set it into req.user in route controller entry.
  
    var user= await User.findById(userId)
    if(user){
      done(null,user);
    }
    
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

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
     async (username, password, done) =>  {
      try {

       var user= await User.findOne({ username: username });
          if (user === null) {
            
     
            //   var salt =  await bcrypt.genSalt(12);
            // var hash = bcrypt.hashSync("1234", salt);
            // console.log(hash);
  
          
            return done(null, false, { message: 'Username or password is incorrect.' });
          } else {
           
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                return done(null, false, { message: 'Username or password is incorrect.' });
              }
              // note the return needed with passport local - remove this return for passport JWT
              
              return done(null, user);
            });
          }
      } catch (err) {
        done(err);
      }
    },
  ),
);
