const express = require('express');
const portfolioControllers = require('./portfolio.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const PortfolioValidationZodSchema = require('./portfolio.validation');

const portfolioRouter = express.Router();

portfolioRouter.post(
    '/create',
    requestValidator(PortfolioValidationZodSchema.createPortfolioZodSchema),
    portfolioControllers.createPortfolio
  )
  portfolioRouter.get('/all', portfolioControllers.getAllPortfolios)
  portfolioRouter.get(
    '/:id',
    requestValidator(PortfolioValidationZodSchema.specificPortfolioZodSchema),
    portfolioControllers.getSpecificPortfolio
  )
  portfolioRouter.patch(
    '/update/:id',
    requestValidator(PortfolioValidationZodSchema.specificPortfolioZodSchema),
    portfolioControllers.updateSpecificPortfolio
  )
  portfolioRouter.delete(
    '/delete/:id',
    requestValidator(PortfolioValidationZodSchema.specificPortfolioZodSchema),
    portfolioControllers.deleteSpecificPortfolio
  )

module.exports = portfolioRouter