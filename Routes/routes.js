const express = require('express');
const authController = require('../controllers/User');
const { verifyToken } = require('../utils/jwt');
const router = express.Router()

router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.get('/getUser',verifyToken,authController.getUser)


module.exports = router;