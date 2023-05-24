const express = require('express')
const router = express.Router()

const {createUser,login} = require('../controller/userControllers')

router.post('/createUser',createUser)
router.post('/login',login)
module.exports = router
