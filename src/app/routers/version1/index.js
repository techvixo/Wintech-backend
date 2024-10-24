const express = require('express')
const userRouters = require('../../modules/userModule/user.routes')
const authRoute = require('../../modules/authModule/auth.routes')
const categoryRouter = require('../../modules/categoryModule/category.routes')
const productRouter = require('../../modules/productModule/product.routes')
const portfolioRouter = require('../../modules/portfolioModule/portfolio.routes')

const router = express.Router()

router.use('/user', userRouters)
router.use('/auth', authRoute)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/portfolio', portfolioRouter)

module.exports = router
