const express = require("express")
const router = express.Router()
const animeSchema = require("../models/animeModel")

exports.postData = function (req, res, next) {
    const anime = new animeSchema(
        {
            name: req.body.name,
            genre: req.body.genres,
            sinopsis: req.body.sinopsis, 
            year: req.body.year,
            episodes: req.body.episodes,
            imageLink: req.body.imageLink
        }
        );
        // we save the document on the database
    anime.save(function (err, data) {
        if (err) console.log(err)
        console.log(data)
        
        console.log('anime saved')
        res.redirect('/')
    })
    
}
