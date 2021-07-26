//Data Layer control (Redux content)
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';//we have to precise extension when not importing js files
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// import axios from 'axios';
// window.axios =axios;//used to be able to use axios in browser console to do post requests.

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
    <Provider store={store}><App/></Provider>,
    document.querySelector('#root')
);
