import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type:  actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    //Logouts after user token expires
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};



export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAq7ZQdTTtpAPaAIquOHKQO7Ee7LEEMFAc';
    if(!isSignup){
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAq7ZQdTTtpAPaAIquOHKQO7Ee7LEEMFAc';
    }
    axios.post(url, authData)
    .then( response => {
      dispatch(authSuccess(response.data.idToken, response.data.userId));
      dispatch(checkAuthTimeout(response.data.expiresIn)); 
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    })
  };
}