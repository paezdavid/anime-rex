const express = require("express")
const router = express.Router()
const adventureController = require("../controllers/adventureController")

router.get('/', adventureController.getAdventureAnime)
router.get('/:id',  adventureController.renderRecAnime)

module.exports = router;