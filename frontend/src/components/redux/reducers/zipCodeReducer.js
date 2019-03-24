import { GET_ALL_ZIP_CODE, GET_ZIP_CODE_BY_QUERY } from '../constants/zipCode';

const initialState = {
  zipCodes: [],
  posts: []
};

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);

  switch (action.type) {

    case GET_ALL_ZIP_CODE:
      console.log(action.payload)
      updated.zipCodes = action.payload;

      return updated;
    case GET_ZIP_CODE_BY_QUERY:
      
      updated.posts = action.payload
      return updated;
    default:
      return state;
  }
}
