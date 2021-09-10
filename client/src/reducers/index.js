//we have two index.js file but its convention. Importing reducers folder by default look at all index.js files in the folder.
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';
import pageSelectedReducer from './pageSelectedReducer';
import flashReducer from './flashReducer';
import allUsers from './agentsInterfaceReducers';
import homeAdsReducer from './homeAdsReducers';
import clientsReducer from './clientsReducer';
import clientReducer from './clientReducer';
import focusFormReducer from './focusFormReducer';
import notariesReducer from './notariesReducer';

export default combineReducers({
     auth: authReducer,
     form: reduxForm,
     surveys: surveysReducer,
     pageSelected: pageSelectedReducer,
     flash: flashReducer,
     users: allUsers,
     homeAds: homeAdsReducer,
     clients: clientsReducer,
     notaries: notariesReducer,
     client: clientReducer,
     focusFormConfiguration: focusFormReducer,
});
