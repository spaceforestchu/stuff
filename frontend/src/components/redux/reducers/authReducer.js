import { SIGN_UP, SET_LOGGED_IN_USER, SET_NO_USER } from '../constants/authUser';

var initialState = {
  user: null,
  message: null
}

export default (state = initialState, action) => {

    let updated = Object.assign({}, state);
    
    switch(action.type) {

        case SIGN_UP:
          console.log('FROM AUTH REDUCER', 3)
          console.log('-----------------')
          updated.message = action.message;
          
          return updated;
        
        case SET_LOGGED_IN_USER:

          updated.user = action.payload;
          
          return updated;
        case SET_NO_USER:

          updated.user = null;
          
          return updated;
        default: 
            return state;
    }
}
