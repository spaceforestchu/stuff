var express = require('express');
var router = express.Router();
var userController = require('./controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {

  userController.signup(req.body)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(err.status).json(err)
    })

});

router.post('/signin', function(req, res, next) {

  userController.signin(req.body)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(err.status).json(err.message)
    })

});

module.exports = router;
