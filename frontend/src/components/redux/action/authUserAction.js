import jwt_decode from 'jwt-decode';

import { SIGN_UP, SET_LOGGED_IN_USER, SET_NO_USER } from '../constants/authUser';

import { GET_ERRORS } from '../constants/errors';

import { clearErrors } from './errorAction';

import Axios from '../../Axios/Axios';

import setAuthJWT from '../../Axios/setAuthJWT';

export const signup = (userInfo) => dispatch => {

      console.log('-------', 2)
      console.log('FROM authUSERACTION', userInfo)

      Axios.post('/users/signup', userInfo)
      .then(result => {
      
        dispatch(clearErrors());

        dispatch({
          type: SIGN_UP,
          message: 'Successfully signed up'
        })
        
      })
      .catch(err => {

        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
}

export const setLoggedInUser = decoded => {
  return {
    type: SET_LOGGED_IN_USER,
    payload: decoded
  };
};

export const setNoUser = () => {
  return {
    type: SET_NO_USER
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthJWT(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setNoUser());
};


export const handleJWTExpirationApiAndLogin = (history) => dispatch => {

    var token = localStorage.getItem('jwtToken');
    if (token) {
      const currentTime = Date.now() / 1000;
      const decoded = jwt_decode(token);
  
      if (decoded.exp < currentTime) {
        localStorage.removeItem('jwtToken');
        setAuthJWT(null);
        setNoUser();

        history.push('/signin')
      } else {
        setAuthJWT(token);
        setLoggedInUser(decoded);
      }
    } else {
      setAuthJWT(null);
    }

}

export const handleSigninServerAPI = (data, history) => dispatch => {

    Axios.post('/users/signin', data)
    .then(result => {
      
      const { token } = result.data;
      setAuthJWT(token)
      localStorage.setItem('jwtToken', token);
      const decoded = jwt_decode(token);
      //history.push('/')
      window.location.href = '/';
      setLoggedInUser(decoded)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        errorMessage: err.response.data
      })
    })

}





