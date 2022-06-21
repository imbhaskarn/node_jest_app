const express = require('express')
const router = express.Router()
const {signUp, signIn} = require('../controllers/userController')
const isLoggedIn = require('../middlewares/Auth')

router.post('/signup',signUp)
router.post('/signin',signIn)



module.exports = router