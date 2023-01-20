const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middlewares/verifyJWT')

/**
 * @desc Ruta /users
 */


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .delete(verifyJWT,usersController.deleteUser)
router
    .route("/singleUser")
    .get(usersController.getSingleUser)
module.exports = router
