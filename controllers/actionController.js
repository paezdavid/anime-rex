const express = require("express")
const router = express.Router()
const animeSchema = require('../models/animeModel')

exports.getActionAnime = function(req, res, next) {
    animeSchema.countDocuments({ genre: "Acción" }).exec(function (err, count) {
      const random = Math.floor(Math.random() * count)
      let query = animeSchema.where({genre: "Acción"})
      // get a random document
      query.findOne().skip(random).exec(
        function (err, result) {
            // save the found document in res.locals
            res.locals.savedResults = result;
            // the document has an id. I create a new route with that id in it
            res.redirect(`actionAnime/${res.locals.savedResults._id}`)  
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

/* 
    1. With the click of a button, I make a get request where I look for a random document
    2. I need a page with a URL like this: example.com/anime/:id. 
        The document has an id and I manage to put that id on the URL
        by res.redirecting to a page with the URL I want
    3. I call next() and move on to the next callback
    4. I use the id on the URL to find the same document again and to have its data
        (I do this because on the new page I dont have the data from the document, I only have the id on the URL)
    5. Finally I get the document and its data and I res.render an HTML template
        where I can display the data.
    6. Everything works as I want but I get this error: 
        Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

    What did I do? Well I made my research and it looks like res.redirect finishes the process by sending everything to the client,
    so I can't call res.render afterwards. The website works but I don't know of a different approach to send the data from my document into the new route. 

    I was thinking that if the error is "innofensive" I might just leave it there since the page works but I don't know :( 
*/