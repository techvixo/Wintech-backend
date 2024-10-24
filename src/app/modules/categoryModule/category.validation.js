const z = require('zod')

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!'
    }),
    description: z.string({
      required_error: 'Description is required!'
    }),
  })
})

const specificCategoryZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is missing in request params!"
    })
  })
})

const CategoryValidationZodSchema = {
    createCategoryZodSchema,
    specificCategoryZodSchema
}

module.exports = CategoryValidationZodSchema
