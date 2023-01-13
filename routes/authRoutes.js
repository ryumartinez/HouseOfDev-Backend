const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// ruta /auth
router.route('/')
    .post(authController.login)
    .get(authController.getSession)
    
module.exports = router
