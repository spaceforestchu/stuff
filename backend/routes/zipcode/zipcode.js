var express = require('express');
var router = express.Router();
var zipCodeController = require('./controller/zipCodeController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getallzipcodes', function(req, res, next) {
  zipCodeController
    .getAllZipCodes({})
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(400).json(error)
    })

});

module.exports = router;
