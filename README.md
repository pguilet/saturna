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
