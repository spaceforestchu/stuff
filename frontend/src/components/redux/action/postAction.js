import jwt_decode from 'jwt-decode';
import { CREATE_POST } from '../constants/createPost';
import { GET_ERRORS } from '../constants/errors';
import Axios from '../../Axios/Axios';

export const handlePostApiSubmit = (data) => dispatch => {


    var token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    let dataObj = {
      id: decoded.id,
      email: decoded.email,
      post: data.post,
      zipCode: data.zipCode,
      image: data.image
    }

    Axios.post(`/post/createpost`, dataObj)
      .then(result => {
        dispatch({
          type: CREATE_POST,
          payload: result
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error
        });
      })

}