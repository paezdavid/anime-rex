const express = require("express")
const router = express.Router()
const animeSchema = require('../models/animeModel')

exports.getAdventureAnime = function(req, res, next) {
    animeSchema.countDocuments({ genre: "Aventuras"}).exec(function (err, count) {
        const random = Math.floor(Math.random() * count)
      // get a random document
        let query = animeSchema.where({genre: 'Aventuras'})

      query.findOne().skip(random).exec(
        function (err, result) {
            // save the found document in res.locals
            res.locals.savedResults = result;
            // the document has an id. I create a new route with that id in it
            res.redirect(`adventureAnime/${res.locals.savedResults._id}`)
        })
    })
}

exports.renderRecAnime = function (req, res, next) {
    // the id of the document found is in the URL.
    // I store that id in a variable
    let recommendedAnimeId = req.params.id
    // I look for that specific document again
    // so I can render it with its data
    animeSchema.findById(recommendedAnimeId, function (err, animeData) {
        res.render('animeRecommended', { randomAnime: animeData })
    })
}