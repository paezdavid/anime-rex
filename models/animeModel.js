const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AnimeSchema = new Schema(
    {
        name: {type: String, required: true},
        genre: {type: String, required: true},
        year: Number,
        sinopsis: {type: String, required: true},
        episodes: Number,
        imageLink: {type: String, required: true}
    }
)

AnimeSchema
.virtual('url')
.get(function () {
    return "/anime/" + this._id;
})


module.exports = mongoose.model("Anime", AnimeSchema)