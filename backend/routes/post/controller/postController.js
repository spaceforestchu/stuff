const Post = require("../model/Post");
const User = require('../../users/model/User');
const ZipCode = require('../../zipcode/model/ZipCode');

module.exports = {

  createPost: (params) => {
    return new Promise((resolve, reject) => {

      User.findById(params.id)
        .then(user => {

          let newPost = new Post({
            post: params.post,
            user_id: params.id, 
            zipCode: params.zipCode,
            image: params.image 
          });

          newPost
            .save()
            .then(post => {

              user.posts.push(post);

              ZipCode.findOne({zipCode: params.zipCode})
                     .then(foundZipCode => {
                      if (foundZipCode) {

                        foundZipCode.post_id.push(post._id)

                        foundZipCode.save()
                             .then(result => {
                              resolve(result)
                             })
                             .catch(error => {
                              reject(error)
                             })

                      } else {
     
                        let newZipCode = new ZipCode({
                          zipCode:  params.zipCode,
                          post_id: post._id
                        })
          
                        newZipCode.save()
                                  .then(createdZipCodeData => {
                                    
                                    post.zipCode_id = createdZipCodeData._id;
          
                                    post.save()
                                      .then(savedZipCodeID => {
                                        resolve(createdZipCodeData)
                                      })
                                      .catch(error => {
                                        reject(error)
                                      })
          
          
                                  })
                                  .catch(error => {
                                    reject(error)
                                  })
                      }

                     })
                     .catch(error => {
                      reject(error)
                     });


                  user.save()
                      .then(user => {
                        resolve(post);
                      })
                      .catch(error => {
                        reject(error);
                      });


            })
            .catch(error => {

              reject(error)
            });

        })
        .catch(error => {

          reject(error)
        })

    });

  },
  getPostByZipCode: (params) => {
    return new Promise((resolve, reject) => {

      ZipCode.find({zipCode: params}, '-__v -timestamp -_id -zipCode')
        .populate({
          path: 'post_id',
          select: '-user_id -__v',
        })
        .exec()
        .then(result => {
          resolve(result)
          return
        })
        .catch(error => {
          reject(error)
          return
        })

      // ZipCode.find({zipCode: params})
      //        .populate([{path: 'post_id', populate: {path: 'user_id'}}])
      //        .exec()
      //        .then(result => {
      //          console.log(JSON.stringify(result))
      //         resolve(result)
      //         return
      //        })
      //        .catch(error => {
      //          reject(error)
      //          return
      //        })

    });

  }

}


/*


const Post = require("../model/Post");
const User = require('../../users/model/User');
const ZipCode = require('../../zipcode/model/ZipCode');

module.exports = {

  createPost: (params) => {
    return new Promise((resolve, reject) => {

      User.findById(params.id)
        .then(user => {

          let newPost = new Post({
            post: params.post,
            user_id: params.id, 
            zipCode: params.zipCode,
            image: params.image 
          });

          newPost
            .save()
            .then(post => {

              user.posts.push(post);

              ZipCode.findById(params.zipCode)
                     .then(foundZipCode => {
                      console.log(foundZipCode)
                      if (foundZipCode) {

                        found.post_id.push(post._id)

                        found.save()
                             .then(result => {
                              console.log(result);
                              resolve(result)
                             })
                             .catch(error => {
                              console.log(error)
                              reject(error)
                             })

                      } else {
                        let newZipCode = new ZipCode({
                          zipCode:  params.zipCode,
                          post_id: post._id
                        })
          
                        newZipCode.save()
                                  .then(createdZipCodeData => {
                                    
                                    post.zipCode_id = createdZipCodeData._id;
          
                                    post.save()
                                      .then(savedZipCodeID => {
                                        resolve(createdZipCodeData)
                                      })
                                      .catch(error => {
                                        console.log(59)
                                        console.log(error)
                                        reject(error)
                                      })
          
          
                                  })
                                  .catch(error => {
                                    console.log(67)
                                    console.log(error)
                                    reject(error)
                                  })
                      }

                     })
                     .catch(error => {
                      console.log(75)
                      console.log(error)
                      reject(error)
                     });


              user.save()
                  .then(user => {
                    resolve(post);
                  })
                  .catch(error => {
                    console.log(error)
                    reject(error);
                  });


            })
            .catch(error => {
              console.log(error)
              reject(error)
            });

        })
        .catch(error => {
          console.log(error)
          reject(error)
        })

    });

  }

}

*/