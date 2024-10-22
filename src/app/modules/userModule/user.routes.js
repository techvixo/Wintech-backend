const express = require('express')
const requestValidator = require('../../middlewares/requestValidator')
const UserValidationZodSchema = require('./user.validation')
const userControllers = require('./user.controllers')

const userRouter = express.Router()

userRouter.post(
  '/create',
  requestValidator(UserValidationZodSchema.createUserZodSchema),
  userControllers.createUser
)

module.exports = userRouter
