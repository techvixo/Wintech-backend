const express = require('express')
const userRouters = require('../../modules/userModule/user.routes')
const authRoute = require('../../modules/authModule/auth.routes')
const categoryRouter = require('../../modules/categoryModule/category.routes')

const router = express.Router()

router.use('/user', userRouters)
router.use('/auth', authRoute)
router.use('/category', categoryRouter)

module.exports = router
