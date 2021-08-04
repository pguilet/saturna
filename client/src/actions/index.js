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

export const createUser = (form,username) => async (dispatch) => {
     var res = await axios.post('/api/newUser', form.focusForm.values);
     if (!res.data.message) {
          res = await axios.get('/api/allUsers');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_USERS, payload: res.data });
     } else {
          dispatch({ type: FLASH, payload: res.data });
     }
};

export const createHomeAd = (form,username) => async (dispatch) => {
     var res = await axios.post('/api/createHomeAd', form.focusForm.values);
          res = await axios.get('/api/homeAds');
          dispatch({ type: FLASH, payload: { message: false } });
          dispatch({ type: FETCH_HOME_ADS, payload: res.data });
};

export const deleteHomeAd = (form,identifiant) => async (dispatch) => {
     
     var res = await axios.post('/api/deleteHomeAd', { identifiant: identifiant });
     res = await axios.get('/api/homeAds');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_HOME_ADS, payload: res.data });
};
export const editHomeAd = (form,identifiant) => async (dispatch) => {
     var res = await axios.post('/api/editHomeAd', {form:form.focusForm.values,identifiant:identifiant});
     res = await axios.get('/api/homeAds');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_HOME_ADS, payload: res.data });
};

export const editUser = (form,username) => async (dispatch) => {
     var res = await axios.post('/api/editUser', {form:form.focusForm.values,username:username});
     res = await axios.get('/api/allUsers');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_USERS, payload: res.data });
};

export const deleteUser = (form,username) => async (dispatch) => {
     var res = await axios.post('/api/deleteUser', { username: username });
     res = await axios.get('/api/allUsers');
     dispatch({ type: FLASH, payload: { message: false } });
     dispatch({ type: FETCH_USERS, payload: res.data });
};
