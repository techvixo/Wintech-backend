const jwtHelpers = require('../../../helpers/helper.jwt')
const CustomError = require('../../errors')
const authServices = require('./auth.services')
const config = require('../../../config')
const sendResponse = require('../../../shared/sendResponse')
const { StatusCodes } = require('http-status-codes')
const {
  createLoginHistory
} = require('../loginHistoryModule/loginHistory.services')
const userServices = require('../userModule/user.services')
const User = require('../userModule/user.model')
const Verification = require('../varificationModule/varification.model')

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

// controller for verify email
const userEmailVerify = async (req, res) => {
  const { userCode } = req.query
  const userId = req.params.id
  const user = await userServices.getSpecificUser(userId)
const verification = await Verification.compareCode(userCode)
  if (!verification) {
    throw new CustomError.BadRequestError('Invalid code!')
  }

  if (!user) throw new CustomError.BadRequestError('User not found!')

  const now = new Date()
  if (verification.expireDate && verification.expireDate < now) {
    verification.status = 'lose'
    await verification.save()
    throw new CustomError.BadRequestError(
      'Sorry, Email verification Code using date expired!'
    )
  }

  // update the email verification status of user
  await User.findByIdAndUpdate(user._id, { isEmailVerified: true })
  verification.status = 'done'
  await verification.save()

  res.status(StatusCodes.OK).send(`<html>
    <head>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f9fafb; /* Soft background */
                color: #333;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            .message {
                background-color: white;
                color: #333;
                padding: 30px 40px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                text-align: center;
                border: 1px solid #e0e0e0;
            }

            .message h1 {
                font-size: 24px;
                color: #4CAF50;
                margin-bottom: 20px;
            }

            .message p {
                font-size: 16px;
                color: #666;
                margin-bottom: 30px;
            }

            button {
                padding: 12px 25px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 18px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s ease, box-shadow 0.3s ease;
            }

            button:hover {
                background-color: #45a049;
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            }

            button:active {
                background-color: #3e8e41;
            }

        </style>
    </head>
    <body>
        <div class="message">
            <h1>Email Verified!</h1>
            <p>Your email has been successfully verified. You can now continue to the dashboard.</p>
            <button onclick="continueToDashboard()">Continue to Dashboard</button>
        </div>

        <script>
            function continueToDashboard() {
                window.location.href = '${config.admin_dashboard_url}';
            }
        </script>
    </body>
</html>
`)
}

module.exports = {
  userLogin,
  userEmailVerify
}
