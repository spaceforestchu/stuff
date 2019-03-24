import Axios from '../../Axios/Axios';


export const HandleGetZipCodeAPI = () => {
  return new Promise((resolve, reject) => {
    Axios.get('/zipcode/getallzipcodes')
    .then(result => {
     
    resolve(result.data);

    })
    .catch(error => {
     reject(error);
    })
  })
}

export const handleQueryByZipCodeAPI = (zipCode) => {

  return new Promise((resolve, reject) => {

    Axios.get(`/post/getallposts?zipcode=${zipCode}`)
         .then( result => {
          const post = result.data[0].post_id
          resolve(post);
         })
         .catch(error => {
           reject(error)
         })

  });

}