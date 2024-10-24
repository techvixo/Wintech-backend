const express = require('express');
const productControllers = require('./product.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const ProductValidationZodSchema = require('./product.validation');

const productRouter = express.Router();

productRouter.post(
    '/create',
    requestValidator(ProductValidationZodSchema.createProductZodSchema),
    productControllers.createProduct
  )
  productRouter.get('/all', productControllers.getAllProducts)
  productRouter.get(
    '/:id',
    requestValidator(ProductValidationZodSchema.specificProductZodSchema),
    productControllers.getSpecificProduct
  )
  productRouter.patch(
    '/update/:id',
    requestValidator(ProductValidationZodSchema.specificProductZodSchema),
    productControllers.updateSpecificProduct
  )
  productRouter.delete(
    '/delete/:id',
    requestValidator(ProductValidationZodSchema.specificProductZodSchema),
    productControllers.deleteSpecificProduct
  )

module.exports = productRouter