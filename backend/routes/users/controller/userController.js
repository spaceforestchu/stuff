const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {

    signup: function (param) {

        return new Promise(function (resolve, reject) {

            User
                .findOne({email: param.email})
                .then(user => {

                    if (user) {
                        let errors = {}
                        errors.errorMessage = 'Email already exists';
                        errors.status = 400;
            
                        reject(errors);
                    } else {
    
                        const newUser = new User({email: param.email, password: param.password, zipCode: param.zipCode });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) 
                                    throw err;
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => resolve(user))
                                    .catch(err => reject(err));
                            });
                        });
                    }
                });
        })

    },
    signin: function (params) {
        
        const email = params.email;
        const password = params.password;

        return new Promise(function (resolve, reject) {
           
            User
                .findOne({email})
                .then(user => {
                    if (!user) {
                        let errors = {}
                        errors.message = 'User not found';
                        errors.status = 400;
                        reject(errors);
                    }

                    bcrypt
                        .compare(password, user.password)
                        .then(isMatch => {
                          
                            if (isMatch) {
        
                                const payload = {
                                    id: user._id,
                                    email: user.email,
                                    username: user.username
                                };

                                jwt.sign(payload, process.env.SECRET_KEY, {
                                    expiresIn: 3600
                                }, (err, token) => {

                                    if (err) {
                                        console.log(err)
                                        reject(err);
                                    }
                                    let success = {};
                                    success.confirmation = true; 
                                    success.token = 'Bearer ' + token; 
                                    resolve(success);

                                });
                            } else {
                                let errors = {}
                                errors.message = 'Check your password or email';
                                errors.status = 400;
                                reject(errors);
                            }
                        });
                })
                .catch(error => {
                    let errors = {}
                    errors.message = 'User does not exist. Please sign up.';
                    errors.status = 400;
                    reject(errors);
                })
        });
    }
}
