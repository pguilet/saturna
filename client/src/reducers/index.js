//we have two index.js file but its convention. Importing reducers folder by default look at all index.js files in the folder.
import {combineReducers} from 'redux';
import authReducer from './authReducer';    
import {reducer as reduxForm} from 'redux-form';
import surveysReducer from './surveysReducer';

export default combineReducers({
    auth: authReducer,
    form:reduxForm,
    surveys: surveysReducer
});