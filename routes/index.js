var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')
const AnimeSchema = require('../models/animeModel')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index")
})





module.exports = router;
