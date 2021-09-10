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
} from './types';

export const fetchUser = () => async (dispatch) => {
     const res = await axios.get('/api/current_user');
     dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchClient = (clientId) => async (dispatch) => {
     const res = await axios.post('/api/client', { clientId });
     dispatch({ type: FETCH_CLIENT, payload: res.data });
};

export const openClient = (history, clientId) => async (dispatch) => {
     const res = await axios.post('/api/client', clientId);
     dispatch({ type: FETCH_CLIENT, payload: res.data });
     history.push('/client/' + clientId + '/profile');
};

export const fetchUsers = () => async (dispatch) => {
     const res = await axios.get('/api/allUsers');
     dispatch({ type: FETCH_USERS, payload: res.data });
};

export const fetchClients = () => async (dispatch) => {
     const res = await axios.get('/api/allClients');
     dispatch({ type: FETCH_CLIENTS, payload: res.data });
};
export const fetchNotaries = () => async (dispatch) => {
     const res = await axios.get('/api/allNotaries');
     dispatch({ type: FETCH_NOTARIES, payload: res.data });
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

export const createUser = (history, form, username) => async (dispatch) => {
     var res = await axios.post('/api/newUser', form.focusForm.values);
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

export const createClient = (history) => async (dispatch) => {
     var res = await axios.post('/api/newClient');
     if (!res.data.message) {
          dispatch({ type: FETCH_CLIENT, payload: res.data });
          history.push('/client/' + res.data._id + '/profile');
          dispatch({ type: FLASH, payload: '' });
     } else {
          dispatch({ type: FLASH, payload: res.data });
     }
};

export const createHomeAd =
     (history, form, identifiant, stateTriggeredValues) => async (dispatch) => {
          let data = new FormData();
          if (form && form.focusForm && form.focusForm.values) {
               if (form.focusForm.values.title) {
                    data.append('title', form.focusForm.values.title);
               }
               if (form.focusForm.values.description) {
                    data.append(
                         'description',
                         form.focusForm.values.description
                    );
               }
          }

          data.append('stateTriggeredValues', stateTriggeredValues);

          var res = await axios.post('/api/createHomeAd', data, {
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
     (history, form, identifiant) => async (dispatch) => {
          var res = await axios.post('/api/createNotary', form);
          res = await axios.get('/api/allNotaries');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_NOTARIES, payload: res.data });
     };

export const deleteHomeAd =
     (history, form, identifiant) => async (dispatch) => {
          var res = await axios.post('/api/deleteHomeAd', {
               identifiant: identifiant,
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
     (history, form, identifiant, stateTriggeredValues) => async (dispatch) => {
          var res = await axios.post('/api/editHomeAd', {
               form: form.focusForm.values,
               identifiant: identifiant,
               stateTriggeredValues: stateTriggeredValues,
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

export const editUser = (history, form, identifiant) => async (dispatch) => {
     var res = await axios.post('/api/editUser', {
          form: form.focusForm.values,
          identifiant: identifiant,
     });
     res = await axios.get('/api/allUsers');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({
          type: FOCUS_FORM_CONFIGURATION,
          payload: null,
     });
     dispatch({ type: FETCH_USERS, payload: res.data });
};

export const deleteUser = (history, form, identifiants) => async (dispatch) => {
     var res = await axios.post('/api/deleteUser', {
          identifiants: identifiants,
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
     (history, form, identifiant) => async (dispatch) => {
          var res = await axios.post('/api/deleteClient', {
               identifiant: identifiant,
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

export const deleteNotary =
     (history, form, identifiant) => async (dispatch) => {
          var res = await axios.post('/api/deleteNotary', {
               identifiant: identifiant,
          });
          res = await axios.get('/api/allNotaries');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({
               type: FOCUS_FORM_CONFIGURATION,
               payload: null,
          });
          dispatch({ type: FETCH_NOTARIES, payload: res.data });
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
export const editClientProfile = (form, clientId) => async (dispatch) => {
     await axios.post('/api/editClientProfile', {
          form: form.clientForm.values,
          clientId,
     });
     dispatch({ type: FLASH, payload: { message: 'Changements sauvegardés' } });
};

export const editNotary = (history, form, notaryId) => async (dispatch) => {
     await axios.post('/api/editNotary', {
          form: form.focusForm.values,
          notaryId,
     });
     var res = await axios.get('/api/allNotaries');
     dispatch({ type: FETCH_NOTARIES, payload: res.data });
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
