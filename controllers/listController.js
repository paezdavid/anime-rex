const express = require("express")
const router = express.Router()
const animeSchema = require('../models/animeModel')

exports.getListOfAnimes = function(req, res, next) {
    animeSchema.find({}, (err, foundAnimes) => {
        if (err) console.log(err)

        console.log(foundAnimes.length)
        res.render('listOfAnimes', {foundAnimes: foundAnimes})
    })
}