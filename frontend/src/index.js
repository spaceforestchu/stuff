import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './components/redux/stores';

import { setLoggedInUser, logoutUser } from './components/redux/action/authUserAction';

import setAuthJWT from './components/Axios/setAuthJWT';
import jwt_decode from 'jwt-decode';

import { BrowserRouter as Router } from 'react-router-dom';

if (localStorage.jwtToken) {
  setAuthJWT(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setLoggedInUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(setLoggedInUser());
    window.location.href = '/login';
  }
}

const Application =  () => (
  <Provider store={store}>  
    <Router>
     <App />
    </Router>
  </Provider>
)

ReactDOM.render( <Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
