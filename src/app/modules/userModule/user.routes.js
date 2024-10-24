const express = require('express')
const requestValidator = require('../../middlewares/requestValidator')
const UserValidationZodSchema = require('./user.validation')
const userControllers = require('./user.controllers')

const userRouter = express.Router()

// create user
userRouter.post(
  '/create',
  requestValidator(UserValidationZodSchema.createUserZodSchema),
  userControllers.createUser
)

// get specific user
userRouter.get('/:id', requestValidator(UserValidationZodSchema.getSpecificUserZodSchema), userControllers.getSpecificUser)

// delete specific user
userRouter.delete('/delete/:id', requestValidator(UserValidationZodSchema.getSpecificUserZodSchema), userControllers.deleteSpecificUser)

// update specific user
userRouter.patch('/update/:id', userControllers.updateSpecificUser)

// change profile image of specific user
userRouter.patch('/update/profile-picture/:id', userControllers.changeUserProfileImage)

module.exports = userRouter
