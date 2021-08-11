//Data Layer control (Redux content)
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
// import axios from 'axios';
// window.axios =axios;//used to be able to use axios in browser console to do post requests.
Sentry.init({
     dsn: 'https://4cccafeae1a94173baac17a290b94581@o948788.ingest.sentry.io/5897761',
     integrations: [new Integrations.BrowserTracing()],
     // We recommend adjusting this value in production, or using tracesSampler
     // for finer control
     tracesSampleRate: 1.0,
});
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
     <Provider store={store}>
          <App />
     </Provider>,
     document.querySelector('#root')
);
