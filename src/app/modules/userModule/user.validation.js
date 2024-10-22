const z = require('zod')

const createUserZodSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full name is required!'
    }),
    userName: z.string({
      required_error: 'Username is required!'
    }),
    email: z.string({
      required_error: 'Email  is required!'
    }),
    phone: z.string({
      required_error: 'Phone number is required!'
    }),
    password: z.string({
      required_error: 'Password is required!'
    })
  })
})

const UserValidationZodSchema = {
  createUserZodSchema,
}

module.exports = UserValidationZodSchema
