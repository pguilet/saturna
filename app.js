const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./models/Notary');
require('./models/Syndic');
require('./models/PropertyCase');
require('./models/Client');
require('./models/HomeAds');
require('./models/Receipt');
require('./models/RentingCase');
require('./models/NewsletterMail');
require('./services/passport'); // no need of a variable because the file does not export anything
var flash = require('connect-flash');

const app = express();

//Set middlewares used before incoming requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
     cookieSession({
          maxAge: 30 * 24 * 60 * 60 * 1000, //30 days before expire
          keys: [keys.cookieKey], //an array to add many keys that will be chosen randomly when creating the cookie instead of just one.
     })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/agentsInterfaceRoutes')(app);
require('./routes/mailsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
     // express will serve up production assets like our mains.js file built from npm run build or main.css file.
     app.use(express.static('client/build'));
     // Express will serve up the index.html file if it doesnt recognize the route.
     const path = require('path');
     app.get('*', (req, res) => {
          res.sendFile(
               path.resolve(__dirname, 'client', 'build', 'index.html')
          );
     });
}
module.exports = app;
