var express = require('express');
var router = express.Router();
const formController = require('../controllers/formController')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form');
});

router.post('/', formController.postData)

module.exports = router;