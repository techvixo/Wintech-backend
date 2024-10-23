const express = require('express')
const userRouters = require('../../modules/userModule/user.routes')
const authRoute = require('../../modules/authModule/auth.routes')

const router = express.Router()

router.use('/user', userRouters)
router.use('/auth', authRoute)

module.exports = router
