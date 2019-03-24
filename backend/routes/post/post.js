var express = require('express');
var router = express.Router();
var postController = require('./controller/postController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createpost', function(req, res) {

  postController.createPost(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    })

});


router.get('/getallposts', function(req, res) {

  const zipCode = req.query.zipcode;

  postController.getPostByZipCode(zipCode)
                .then(result => {
                  res.json(result);
                })
                .catch(error => {
                  res.status(400).json(error);
                })

})

module.exports = router;
