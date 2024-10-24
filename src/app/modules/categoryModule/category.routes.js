const express = require('express')
const categoryControllers = require('./category.controllers')
const requestValidator = require('../../middlewares/requestValidator')
const CategoryValidationZodSchema = require('./category.validation')

const categoryRouter = express.Router()

categoryRouter.post(
  '/create',
  requestValidator(CategoryValidationZodSchema.createCategoryZodSchema),
  categoryControllers.createCategory
)
categoryRouter.get('/all', categoryControllers.getAllCategories)
categoryRouter.get(
  '/:id',
  requestValidator(CategoryValidationZodSchema.specificCategoryZodSchema),
  categoryControllers.getSpecificCategory
)
categoryRouter.patch(
  '/update/:id',
  requestValidator(CategoryValidationZodSchema.specificCategoryZodSchema),
  categoryControllers.updateSpecificCategory
)
categoryRouter.delete(
  '/delete/:id',
  requestValidator(CategoryValidationZodSchema.specificCategoryZodSchema),
  categoryControllers.deleteSpecificCategory
)

module.exports = categoryRouter
