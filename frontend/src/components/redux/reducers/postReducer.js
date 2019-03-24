import { CREATE_POST } from '../constants/createPost';

const initialState = {
  posts: null
};

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);

  switch (action.type) {
    case CREATE_POST:
    
      console.log(action.payload)

      return action.payload;

    default:
      return state;
  }
}
