const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./models/Notary');
require('./models/Syndic');
require('./models/PropertyCase');
require('./models/Client');
require('./models/HomeAds');
require('./models/RentingCase');
require('./services/passport'); // no need of a variable because the file does not export anything
var flash = require('connect-flash');
// const Sentry = require('@sentry/node');
// require('@sentry/tracing');
// const http = require('http');
// const { Integrations } = require('@sentry/tracing');

// Sentry.init({
//      dsn: 'https://4cccafeae1a94173baac17a290b94581@o948788.ingest.sentry.io/5897761',

//      // We recommend adjusting this value in production, or using tracesSampler
//      // for finer control
//      tracesSampleRate: 1.0,
//      integrations: [
//           // enable HTTP calls tracing
//           new Sentry.Integrations.Http({ tracing: true }),
//           new Integrations.BrowserTracing(),
//      ],
// });

// const transaction = Sentry.startTransaction({
//      op: 'test',
//      name: 'My First Test Transaction',
// });

// Sentry.configureScope(function (scope) {
//      scope.addEventProcessor(function (event, hint) {
//           // Add anything to the event here
//           // returning null will drop the event
//           return event;
//      });
// });

// setTimeout(() => {
//      try {
//           foo();
//      } catch (e) {
//           Sentry.captureException(e);
//      } finally {
//           transaction.finish();
//      }
// }, 99);

mongoose.connect(keys.mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
});
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
require('./routes/surveyRoutes')(app);
require('./routes/agentsInterfaceRoutes')(app);

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

const PORT = process.env.PORT || 5000; //set the port to the one the host system environment has set. Useful on online web app host like heroku o aws that set dynamically the port with this variable.
app.listen(PORT);
