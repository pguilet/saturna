# pierreNantaise

Mongo db, heroku, AWS s3 bucket, Bootstrap css

# sentry

import \* as Sentry from "@sentry/react";

// If taking advantage of automatic instrumentation (highly recommended)
import { Integrations as TracingIntegrations } from "@sentry/tracing";
// Or, if only manually tracing
// import \* as \_ from "@sentry/tracing"
// Note: You MUST import the package in some way for tracing to work

Sentry.init({
dsn: "

https://examplePublicKey@o0.ingest.sentry.io/0",

// This enables automatic instrumentation (highly recommended), but is not
// necessary for purely manual usage
integrations: [new TracingIntegrations.BrowserTracing()],

// To set a uniform sample rate
tracesSampleRate: 0.2

// Alternatively, to control sampling dynamically
tracesSampler: samplingContext => { ... }
});

import \* as Sentry from "@sentry/react";

export default Sentry.withProfiler(App);

# add attribute with an if condition

{...(this.state.valueToSet && { checked: true })}

# redux dev tool

-    install redux dev tool extension
-    instals redux dev tool npm install --save @redux-devtools/cli
-    Add code :
     import { composeWithDevTools } from 'remote-redux-devtools';
     const composeEnhancers = composeWithDevTools({
     realtime: true,
     name: 'Your Instance Name',
     hostname: 'localhost',
     port: 1024, // the port your remotedev server is running at
     });

const store = createStore(
reducers,
{},
composeEnhancers(applyMiddleware(reduxThunk))
);

-    Launch the redux dev tool server redux-devtools --hostname=localhost --port=1024
-    Launch the application with npm run dev
-    CTRL+SHIFT+P open remote devtools and connect to dev tool server at 1024

Use the website.
