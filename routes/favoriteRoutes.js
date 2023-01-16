const express = require("express")
const router = express.Router()
const favoriteController = require("../controllers/favoriteController")
const verifyJWT = require("../middlewares/verifyJWT")

router.use(verifyJWT)
router.route("/")
    .post(favoriteController.createFavorite)
    .delete(favoriteController.deleteFavorite)
router.route("/:UserId")
    .get(favoriteController.getFavoritesByUserId)

module.exports = router