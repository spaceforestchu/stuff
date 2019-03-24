import Axios from '../../Axios/Axios';
import jwt_decode from 'jwt-decode';

export const handlePostApiSubmit = (data) => {
  return new Promise((resolve, reject) => {

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
        resolve(result);
      })
      .catch(error => {
        reject(error)
      })
  })
}


