const server = require('./server');
const app = require('./app');
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
});
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
