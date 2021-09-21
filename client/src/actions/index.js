import axios from 'axios';
import {
     FETCH_USER,
     FETCH_USERS,
     FETCH_HOME_ADS,
     FETCH_SURVEYS,
     FETCH_PAGE,
     FETCH_CLIENTS,
     FETCH_CLIENT,
     FOCUS_FORM_CONFIGURATION,
     FLASH,
     FETCH_NOTARIES,
     FETCH_SYNDICS,
     FETCH_CASES,
     FETCH_CASE,
     FETCH_RENTING_CASES,
     FETCH_RENTING_CASE,
} from './types';
import bcrypt from 'bcryptjs';

export const fetchUser = () => async (dispatch) => {
     const res = await axios.get('/api/current_user');
     dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchClient = (clientId) => async (dispatch) => {
     const res = await axios.post('/api/client', { clientId });
     dispatch({ type: FETCH_CLIENT, payload: res.data });
};

export const fetchCase = (clientId, caseId) => async (dispatch) => {
     const res = await axios.post('/api/propertyCase', { caseId });
     dispatch({ type: FETCH_CASE, payload: res.data });
};

export const fetchRentingCase = (clientId, caseId) => async (dispatch) => {
     const res = await axios.post('/api/rentingCase', { caseId });
     dispatch({ type: FETCH_RENTING_CASE, payload: res.data });
};

export const openClient = (history, clientId) => async (dispatch) => {
     const res = await axios.post('/api/client', clientId);
     dispatch({ type: FETCH_CLIENT, payload: res.data });
     history.push('/client/' + clientId + '/profile');
};

export const openCase =
     (history, client, propertyCase, isClosedCase) => async (dispatch) => {
          const res = await axios.post('/api/propertyCase', {
               caseId: propertyCase._id,
          });
          await dispatch({ type: FETCH_CASE, payload: res.data });
          if (isClosedCase) {
               history.push(
                    '/client/' + client._id + '/closedCases/' + propertyCase._id
               );
          } else {
               history.push(
                    '/client/' + client._id + '/openCases/' + propertyCase._id
               );
          }
     };

export const openRentingCase =
     (history, client, propertyCase, isClosedCase) => async (dispatch) => {
          const res = await axios.post('/api/rentingCase', {
               caseId: propertyCase._id,
          });
          await dispatch({ type: FETCH_RENTING_CASE, payload: res.data });
          if (isClosedCase) {
               history.push(
                    '/client/' +
                         client._id +
                         '/closedRentingCases/' +
                         propertyCase._id
               );
          } else {
               history.push(
                    '/client/' +
                         client._id +
                         '/openedRentingCases/' +
                         propertyCase._id
               );
          }
     };

export const fetchUsers = () => async (dispatch) => {
     const res = await axios.get('/api/allUsers');
     dispatch({ type: FETCH_USERS, payload: res.data });
};

export const fetchClients = () => async (dispatch) => {
     const res = await axios.get('/api/allClients');
     dispatch({ type: FETCH_CLIENTS, payload: res.data });
};
export const fetchOpenCases = (clientId) => async (dispatch) => {
     const res = await axios.post('/api/allOpenCases', { clientId: clientId });
     await dispatch({ type: FETCH_CASES, payload: res.data });
};
export const fetchOpenedRentingCases = (clientId) => async (dispatch) => {
     const res = await axios.post('/api/allOpenedRentingCases', {
          clientId: clientId,
     });
     await dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
};
export const fetchClosedRentingCases = (clientId) => async (dispatch) => {
     const res = await axios.post('/api/allClosedRentingCases', {
          clientId: clientId,
     });
     await dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
};
export const fetchClosedCases = (clientId) => async (dispatch) => {
     const res = await axios.post('/api/allClosedCases', {
          clientId: clientId,
     });
     await dispatch({ type: FETCH_CASES, payload: res.data });
};
export const fetchNotaries = () => async (dispatch) => {
     const res = await axios.get('/api/allNotaries');
     dispatch({ type: FETCH_NOTARIES, payload: res.data });
};

export const fetchSyndics = () => async (dispatch) => {
     const res = await axios.get('/api/allSyndics');
     dispatch({ type: FETCH_SYNDICS, payload: res.data });
};

export const fetchHomeAds = () => async (dispatch) => {
     const res = await axios.get('/api/homeAds');
     dispatch({ type: FETCH_HOME_ADS, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
     const res = await axios.post('/api/stripe', token);
     dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
     const res = await axios.post('/api/surveys', values);
     history.push('/surveys');
     dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
     const res = await axios.get('/api/surveys');
     dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchPage = (pageName) => async (dispatch) => {
     dispatch({ type: FETCH_PAGE, payload: pageName });
};

export const login = (history, username, password) => async (dispatch) => {
     const res = await axios.get('/api/loginUser', {
          params: { username, password },
     });
     if (!res.data.message) {
          history.push('/agentsHome');
          dispatch({ type: FETCH_USER, payload: res.data });
     } else {
          dispatch({ type: FLASH, payload: res.data });
     }
};

export const createUser =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/newUser', {
               stateTriggeredValues,
               identifiants,
          });
          if (!res.data.message) {
               res = await axios.get('/api/allUsers');
               dispatch({ type: FLASH, payload: { message: false } });
               dispatch({
                    type: FOCUS_FORM_CONFIGURATION,
                    payload: null,
               });
               dispatch({ type: FETCH_USERS, payload: res.data });
          } else {
               dispatch({ type: FLASH, payload: res.data });
          }
     };

export const createClient =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/newClient');
          if (!res.data.message) {
               dispatch({ type: FETCH_CLIENT, payload: res.data });
               history.push('/client/' + res.data._id + '/profile');
               dispatch({ type: FLASH, payload: '' });
          } else {
               dispatch({ type: FLASH, payload: res.data });
          }
     };
export const generateRentingReceipt =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          let res = await axios.post('/api/generateRentingReceipt', {
               identifiants,
               stateTriggeredValues,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_RENTING_CASE, payload: res.data });
     };

export const sendRentReceipt = (identifiants) => async (dispatch) => {
     let res = await axios.post('/api/sendRentReceipt', identifiants);
     dispatch({ type: FLASH, payload: { message: 'Quittance envoyée' } });
     dispatch({ type: FETCH_RENTING_CASE, payload: res.data });
};

export const deleteRentingReceipt =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          let res = await axios.post('/api/deletRentingReceipt', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_RENTING_CASE, payload: res.data });
     };

export const createPropertyCase =
     (history, form, identifiants, stateTriggeredValues, isOpenCase) =>
     async (dispatch) => {
          var res = await axios.post('/api/newOpenCase', {
               stateTriggeredValues: { _user: identifiants._user },
          });
          if (!res.data.message) {
               dispatch({ type: FETCH_CASE, payload: res.data });
               history.push(
                    '/client/' +
                         identifiants._user +
                         '/openCases/' +
                         res.data._id
               );
               dispatch({ type: FLASH, payload: '' });
          } else {
               dispatch({ type: FLASH, payload: res.data });
          }
     };

export const createRentingCase =
     (history, form, identifiants, stateTriggeredValues, isOpenCase) =>
     async (dispatch) => {
          var res = await axios.post('/api/newOpenedRentingCase', {
               stateTriggeredValues: { _user: identifiants._user },
          });
          if (!res.data.message) {
               dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
               history.push(
                    '/client/' +
                         identifiants._user +
                         '/openedRentingCases/' +
                         res.data._id
               );
               dispatch({ type: FLASH, payload: '' });
          } else {
               dispatch({ type: FLASH, payload: res.data });
          }
     };

const constructFormData = (identifiants, stateTriggeredValues) => {
     let data = new FormData();
     if (stateTriggeredValues) {
          Object.entries(stateTriggeredValues).forEach(
               ([keyName, keyIndex]) => {
                    if (keyName === 'files') {
                         stateTriggeredValues[keyName].forEach((value) =>
                              data.append('files', value)
                         );
                    } else {
                         if (Array.isArray(stateTriggeredValues[keyName])) {
                              if (stateTriggeredValues[keyName].length > 0) {
                                   Object.entries(
                                        stateTriggeredValues[keyName]
                                   ).forEach(([arrayKey, keyIndex]) => {
                                        data.append(
                                             'stateTriggeredValues[' +
                                                  keyName +
                                                  '][]',
                                             stateTriggeredValues[keyName][
                                                  arrayKey
                                             ]
                                        );
                                   });
                              } else {
                                   data.append(
                                        'stateTriggeredValues[' +
                                             keyName +
                                             '][]',
                                        []
                                   );
                              }
                         } else {
                              data.append(
                                   'stateTriggeredValues[' + keyName + ']',
                                   stateTriggeredValues[keyName]
                              );
                         }
                    }
               }
          );
     }
     if (identifiants) {
          Object.entries(identifiants).forEach(([keyName, keyIndex]) => {
               data.append(
                    'identifiants[' + keyName + ']',
                    identifiants[keyName]
               );
          });
     }
     return data;
};
export const createHomeAd =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          let data = constructFormData(identifiants, stateTriggeredValues);
          let res = await axios.post('/api/createHomeAd', data, {
               headers: { 'Content-Type': 'multipart/form-data' },
          });
          res = await axios.get('/api/homeAds');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_HOME_ADS, payload: res.data });
     };
export const createNotary =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/createNotary', {
               identifiants,
               stateTriggeredValues,
          });
          res = await axios.get('/api/allNotaries');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_NOTARIES, payload: res.data });
     };
export const createSyndic =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/createSyndic', {
               identifiants,
               stateTriggeredValues,
          });
          res = await axios.get('/api/allSyndics');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_SYNDICS, payload: res.data });
     };
export const deleteHomeAd =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteHomeAd', {
               identifiants,
          });
          res = await axios.get('/api/homeAds');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_HOME_ADS, payload: res.data });
     };
export const editHomeAd =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/editHomeAd', {
               identifiants,
               stateTriggeredValues,
          });
          res = await axios.get('/api/homeAds');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_HOME_ADS, payload: res.data });
     };
export const updateImagesOfHomeAd = async (files, identifiant) => {
     let data = new FormData();
     if (files) {
          for (var x = 0; x < files.length; x++) {
               data.append('file', files[x]);
          }
     }
     data.append('identifiant', identifiant);

     var res = await axios.post('/api/updateHomeAdImages', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
     });
     return res;
};

export const editUser =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          if (stateTriggeredValues.password) {
               const password = stateTriggeredValues.password.trim();
               if (password && password.length > 0) {
                    var salt = await bcrypt.genSalt(12);
                    var hashedPassword = bcrypt.hashSync(password, salt);
               }
               stateTriggeredValues.password = hashedPassword;
          }
          var res = await axios.post('/api/editUser', {
               stateTriggeredValues,
               identifiants,
          });

          res = await axios.get('/api/allUsers');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_USERS, payload: res.data });
     };

export const deleteUser =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteUser', {
               identifiants,
          });
          res = await axios.get('/api/allUsers');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_USERS, payload: res.data });
     };

export const deleteClient =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteClient', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          await history.push('/clients');
          res = await axios.get('/api/allClients');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_CLIENTS, payload: res.data });
     };

export const deleteOpenedPropertyCase =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deletePropertyCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allOpenCases', {
               clientId: identifiants.clientId,
          });
          await history.push(
               '/client/' + identifiants.clientId + '/openCases/'
          );

          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_CASES, payload: res.data });
     };

export const deleteOpenedRentingCase =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteRentingCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allOpenedRentingCases', {
               clientId: identifiants.clientId,
          });
          await history.push(
               '/client/' + identifiants.clientId + '/openedRentingCases/'
          );

          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
     };

export const deleteClosedPropertyCase =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deletePropertyCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allClosedCases', {
               clientId: identifiants.clientId,
          });
          await history.push(
               '/client/' + identifiants.clientId + '/closedCases/'
          );

          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_CASES, payload: res.data });
     };

export const deleteClosedRentingCase =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteRentingCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allClosedRentingCases', {
               clientId: identifiants.clientId,
          });
          await history.push(
               '/client/' + identifiants.clientId + '/closedRentingCases/'
          );

          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
     };
export const deleteOpenedPropertyCaseFromList =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deletePropertyCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allOpenCases', {
               clientId: identifiants.clientId,
          });
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_CASES, payload: res.data });
     };

export const deleteOpenedRentingCaseFromList =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteRentingCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allOpenedRentingCases', {
               clientId: identifiants.clientId,
          });
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
     };

export const deleteClosedPropertyCaseFromList =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deletePropertyCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allClosedCases', {
               clientId: identifiants.clientId,
          });
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_CASES, payload: res.data });
     };

export const deleteClosedRentingCaseFromList =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteRentingCase', {
               identifiants,
          });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          res = await axios.post('/api/allClosedRentingCases', {
               clientId: identifiants.clientId,
          });
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
     };
export const deleteNotary =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteNotary', {
               identifiants,
          });
          res = await axios.get('/api/allNotaries');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_NOTARIES, payload: res.data });
     };
export const deleteSyndic =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          var res = await axios.post('/api/deleteSyndic', {
               identifiants,
          });
          res = await axios.get('/api/allSyndics');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_SYNDICS, payload: res.data });
     };
export const search = (searchValue, history) => async (dispatch) => {
     const res = await axios.get('/api/search', {
          params: { searchValue },
     });
     if (!res.data.message) {
          await history.push('/search');
          dispatch({ type: FETCH_CLIENTS, payload: res.data });
     } else {
          dispatch({ type: FLASH, payload: res.data });
     }
};
export const editClientProfile =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          const res = await axios.post('/api/editClientProfile', {
               identifiants,
               stateTriggeredValues,
          });
          dispatch({ type: FETCH_CLIENT, payload: res.data });
          dispatch({
               type: FLASH,
               payload: { message: 'Changements sauvegardés' },
          });
     };

export const editCase =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          let data = constructFormData(identifiants, stateTriggeredValues);
          const res = await axios.post('/api/editCase', data, {
               headers: { 'Content-Type': 'multipart/form-data' },
          });
          dispatch({ type: FETCH_CASE, payload: res.data });
          dispatch({
               type: FLASH,
               payload: { message: 'Changements sauvegardés' },
          });
     };

export const editRentingCase =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          let data = constructFormData(identifiants, stateTriggeredValues);
          const res = await axios.post('/api/editRentingCase', data, {
               headers: { 'Content-Type': 'multipart/form-data' },
          });
          dispatch({ type: FETCH_RENTING_CASES, payload: res.data });
          dispatch({
               type: FLASH,
               payload: { message: 'Changements sauvegardés' },
          });
     };

export const editNotary =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          await axios.post('/api/editNotary', {
               identifiants,
               stateTriggeredValues,
          });
          var res = await axios.get('/api/allNotaries');
          dispatch({ type: FETCH_NOTARIES, payload: res.data });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
     };

export const editSyndic =
     (history, form, identifiants, stateTriggeredValues) =>
     async (dispatch) => {
          await axios.post('/api/editSyndic', {
               identifiants,
               stateTriggeredValues,
          });
          var res = await axios.get('/api/allSyndics');
          dispatch({ type: FETCH_SYNDICS, payload: res.data });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
     };

export const configureFocusForm = (configuration) => async (dispatch) => {
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({
          type: FOCUS_FORM_CONFIGURATION,
          payload: { configuration },
     });
};

export const clearFlashMessage = () => async (dispatch) => {
     dispatch({ type: FLASH, payload: { message: false } });
};
