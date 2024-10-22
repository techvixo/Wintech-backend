const express = require('express')
const userRouters = require('../../modules/userModule/user.routes')

const router = express.Router()

router.use('/user', userRouters)

module.exports = router
