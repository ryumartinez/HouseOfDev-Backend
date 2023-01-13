const express = require("express")
const router = express.Router()
const favoriteController = require("../controllers/favoriteController")

router.route("/")
    .post(favoriteController.createFavorite)
router.route("/:UserId")
    .get(favoriteController.getFavoritesByUserId)

module.exports = router