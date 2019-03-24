import Axios from '../../Axios/Axios';
import { GET_ALL_ZIP_CODE, GET_ZIP_CODE_BY_QUERY } from '../constants/zipCode';
import { GET_ERRORS } from '../constants/errors';

export const HandleGetZipCodeAPI = () => dispatch => {

    Axios.get('/zipcode/getallzipcodes')
    .then(result => {

      dispatch({
        type: GET_ALL_ZIP_CODE,
        payload: result.data
      })

    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      })
    })

}

export const handleQueryByZipCodeAPI = (zipCode) => dispatch => {

    Axios.get(`/post/getallposts?zipcode=${zipCode}`)
         .then( result => {
          const post = result.data[0].post_id
          dispatch({
            type: GET_ZIP_CODE_BY_QUERY,
            payload: post
          })
         })
         .catch(error => {
          dispatch({
            type: GET_ERRORS,
            payload: error
          })
         })



}