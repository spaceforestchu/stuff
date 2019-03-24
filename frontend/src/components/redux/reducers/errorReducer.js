import { GET_ERRORS, CLEAR_ERRORS } from '../constants/errors';

const initialState = {
  message: ''
};

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);

  switch (action.type) {
    case GET_ERRORS:

      updated.message = action.errorMessage;

      return updated;
    case CLEAR_ERRORS:
      return {};
    default:
      return updated;
  }
}
