const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')

router.post('/register/:role', register)
router.post('/login/:role', login)

module.exports = router