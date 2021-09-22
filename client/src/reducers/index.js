//we have two index.js file but its convention. Importing reducers folder by default look at all index.js files in the folder.
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import pageSelectedReducer from './pageSelectedReducer';
import flashReducer from './flashReducer';
import allUsers from './agentsInterfaceReducers';
import homeAdsReducer from './homeAdsReducers';
import clientsReducer from './clientsReducer';
import clientReducer from './clientReducer';
import focusFormReducer from './focusFormReducer';
import notariesReducer from './notariesReducer';
import syndicsReducer from './syndicsReducer';
import openCasesReducer from './casesReducer';
import openCaseReducer from './caseReducer';
import rentingCaseReducer from './rentingCaseReducer';
import rentingCasesReducer from './rentingCasesReducer';

export default combineReducers({
     auth: authReducer,
     form: reduxForm,
     pageSelected: pageSelectedReducer,
     flash: flashReducer,
     users: allUsers,
     homeAds: homeAdsReducer,
     clients: clientsReducer,
     notaries: notariesReducer,
     syndics: syndicsReducer,
     client: clientReducer,
     propertyCases: openCasesReducer,
     propertyCase: openCaseReducer,
     focusFormConfiguration: focusFormReducer,
     rentingCase: rentingCaseReducer,
     rentingCases: rentingCasesReducer,
});
