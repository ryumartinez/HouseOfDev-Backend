const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

/**
 * @desc Ruta /users
 */


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .delete(usersController.deleteUser)
router
    .route("/singleUser")
    .get(usersController.getSingleUser)
module.exports = router
