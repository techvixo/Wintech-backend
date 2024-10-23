const jwtHelpers = require('../../../helpers/helper.jwt')
const CustomError = require('../../errors')
const authServices = require('./auth.services')
const config = require('../../../config')
const sendResponse = require('../../../shared/sendResponse')
const { StatusCodes } = require('http-status-codes')
const { createLoginHistory } = require('../loginHistoryModule/loginHistory.services')

// controller for user login
const userLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await authServices.getUserByEmail(email)

  if (!user) throw new CustomError.BadRequestError('Invalid email or password!')

  // check the password is correct
  const isPasswordMatch = await user.comparePassword(password)

  if (!isPasswordMatch)
    throw new CustomError.BadRequestError('Invalid email or password')

  // generate token
  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role
  }
  const accessToken = jwtHelpers.createToken(
    payload,
    config.jwt_access_token_secret,
    config.jwt_access_token_expiresin
  )

  const refreshToken = jwtHelpers.createToken(
    payload,
    config.jwt_refresh_token_secret,
    config.jwt_refresh_token_expiresin
  )

  const userInfo = {
    userId: user.userId,
    email: user.email,
    phone: user.phone,
    _id: user._id,
    accessToken
  }

  // create a login history
  await createLoginHistory({
    userId: user.userId,
    ipAddress: req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent']
  })

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true
  }
  res.cookie('refresh_token', refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Login successfull',
    data: userInfo
  })
}


module.exports = {
    userLogin,
}