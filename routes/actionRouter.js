const express = require("express")
const router = express.Router()
const actionController = require("../controllers/actionController")

router.get('/', actionController.getActionAnime)
router.get('/:id',  actionController.renderRecAnime)

module.exports = router;