const express = require('express')
const userRouters = require('../../modules/userModule/user.routes')
const authRoute = require('../../modules/authModule/auth.routes')
const categoryRouter = require('../../modules/categoryModule/category.routes')
const productRouter = require('../../modules/productModule/product.routes')
const portfolioRouter = require('../../modules/portfolioModule/portfolio.routes')
const ourTeamRouter = require('../../modules/ourTeamModule/ourTeam.routes')
const certificateRouter = require('../../modules/certificateModule/certificate.routes')
const partnerRouter = require('../../modules/partnerModule/partner.routes')
const blogRouter = require('../../modules/blogModule/blog.routes')

const router = express.Router()

router.use('/user', userRouters)
router.use('/auth', authRoute)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/portfolio', portfolioRouter)
router.use('/our-team', ourTeamRouter)
router.use('/certificate', certificateRouter)
router.use('/partner', partnerRouter)
router.use('/blog', blogRouter)

module.exports = router
