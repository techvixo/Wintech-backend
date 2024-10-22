const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      unique: [true, 'Username already exist!'],
      required: [true, 'Username is required!'],
      match: /^[a-zA-Z0-9]+$/,
      minlength: [1, 'Username must be at least 1 character.'],
      maxlength: [20, 'Username is too long!'],
      validate: {
        validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message:
          'Username must only contain letters and numbers, without symbols or spaces!'
      }
    },
    email: {
      type: String,
      unique: [true, 'This email is already used!'],
      required: [true, 'Email is required!'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value)
        },
        message: (props) => `${props.value} is not a valid email!`
      }
    },
    phone: {
      type: String,
      unique: [true, 'This number is already used'],
      required: [true, 'Contact number is required!'],
      trim: true
    },
    password: {
      type: String,
      trim: true,
      minLength: [8, 'Password must be at least 8 character'],
      required: [true, 'Password is required!']
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin'
    },
    status: {
      type: String,
      enum: ['active', 'blocked', 'disabled'],
      default: 'active'
    },
    image: String
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  const bcryptHashRegex = /^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/
  if (!bcryptHashRegex.test(this.password)) {
    const saltRounds = 10
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }

  next()
})

userSchema.methods.comparePassword = function (userPlanePassword) {
  const isMatch = bcrypt.compareSync(userPlanePassword, this.password)
  return isMatch
}

const User = mongoose.model('user', userSchema)

module.exports = User
