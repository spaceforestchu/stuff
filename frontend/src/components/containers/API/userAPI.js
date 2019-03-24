import Axios from '../../Axios/Axios';
import setAuthJWT from '../../Axios/setAuthJWT'
import jwt_decode from 'jwt-decode';

export const handleJWTExpirationApiAndLogin = () => {
  return new Promise((resolve, reject) => {
    var token = localStorage.getItem('jwtToken');
    if (token) {
      const currentTime = Date.now() / 1000;
      const decoded = jwt_decode(token);
  
      if (decoded.exp < currentTime) {
        localStorage.removeItem('jwtToken');
        setAuthJWT(null);
        reject(null)
      } else {
        setAuthJWT(token);
        resolve(decoded);
      }
    } else {
      setAuthJWT(null);
    }
  });
}

export const handleSignupServerAPI = (data) => {
  return new Promise((resolve, reject) => {
    Axios.post('/users/signup', data)
    .then(result => {
      console.log(result)
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

export const handleSigninServerAPI = (data) => {
  return new Promise((resolve, reject) => {
    Axios.post('/users/signin', data)
    .then(result => {
      
      const { token } = result.data;
      setAuthJWT(token)
      localStorage.setItem('jwtToken', token);
      const decoded = jwt_decode(token);
      resolve(decoded)
    })
    .catch(err => {
      reject(err)
    })
  });
}

