const express = require('express')
const authControllers = require('./auth.controllers')
const requestValidator = require('../../middlewares/requestValidator')
const AuthValidation = require('./auth.validation')

const authRoute = express.Router()

// route for login
authRoute.post(
  '/login',
  requestValidator(AuthValidation.loginValidationZodSchema),
  authControllers.userLogin
)

// route for user email verify
authRoute.get(
    '/verify-email/:id',
    authControllers.userEmailVerify
)

// route for send password reset otp
authRoute.post('/forget-password/send-otp/:id', authControllers.sendOTP)

// route for resend email verification link
authRoute.post('/email-verification/resend-code', authControllers.resendEmailVerificationLink)

module.exports = authRoute
