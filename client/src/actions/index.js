import axios from 'axios';
import {
     FETCH_USER,
     FETCH_USERS,
     FETCH_HOME_ADS,
     FETCH_SURVEYS,
     FETCH_PAGE,
     FLASH,
} from './types';

export const fetchUser = () => async (dispatch) => {
     const res = await axios.get('/api/current_user');
     dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUsers = () => async (dispatch) => {
     const res = await axios.get('/api/allUsers');
     dispatch({ type: FETCH_USERS, payload: res.data });
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

export const login =
     (history, { username, password }) =>
     async (dispatch) => {
          const res = await axios.get('/api/loginUser', {
               params: { username, password },
          });
          if (!res.data.message) {
               dispatch({ type: FETCH_USER, payload: res.data });
               history.push('/agentsHome');
          } else {
               dispatch({ type: FLASH, payload: res.data });
          }
     };

export const createUser = (form, username) => async (dispatch) => {
     var res = await axios.post('/api/newUser', form.focusForm.values);
     if (!res.data.message) {
          res = await axios.get('/api/allUsers');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_USERS, payload: res.data });
     } else {
          dispatch({ type: FLASH, payload: res.data });
     }
};

export const createHomeAd = (form, identifiant,stateTriggeredValues) => async (dispatch) => {
     let data = new FormData();
     if (form.focusForm.values.file) {
          for (var x = 0; x < form.focusForm.values.file.length; x++) {
               data.append('file', form.focusForm.values.file[x]);
          }
     }
     data.append('title', form.focusForm.values.title);
     data.append('description', form.focusForm.values.description);
     data.append('stateTriggeredValues', stateTriggeredValues);

     var res = await axios.post('/api/createHomeAd', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
     });
     res = await axios.get('/api/homeAds');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_HOME_ADS, payload: res.data });
};

export const deleteHomeAd = (form, identifiant) => async (dispatch) => {
     var res = await axios.post('/api/deleteHomeAd', {
          identifiant: identifiant,
     });
     res = await axios.get('/api/homeAds');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_HOME_ADS, payload: res.data });
};
export const editHomeAd = (form, identifiant,stateTriggeredValues) => async (dispatch) => {
     var res = await axios.post('/api/editHomeAd', {
          form: form.focusForm.values,
          identifiant: identifiant,
          stateTriggeredValues:stateTriggeredValues,
     });
     res = await axios.get('/api/homeAds');
     dispatch({ type: FLASH, payload: { message: false } });
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

export const editUser = (form, username) => async (dispatch) => {
     var res = await axios.post('/api/editUser', {
          form: form.focusForm.values,
          username: username,
     });
     res = await axios.get('/api/allUsers');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_USERS, payload: res.data });
};

export const deleteUser = (form, username) => async (dispatch) => {
     var res = await axios.post('/api/deleteUser', { username: username });
     res = await axios.get('/api/allUsers');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_USERS, payload: res.data });
};
