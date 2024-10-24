const z = require('zod')

const createProductZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Product title is required!'
    }),
    subTitle: z.string({
      required_error: 'Product sub title is required!'
    }),
    category: z.object({
        categoryId: z.string().optional(),
        title: z.string().optional()
      }).optional(),
      createdBy: z.object({
        adminId: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional()
      }).optional(),
    description: z.string({
      required_error: 'Product description is required!'
    }),
  })
})

const specificProductZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is missing in request params!"
    })
  })
})

const ProductValidationZodSchema = {
    createProductZodSchema,
    specificProductZodSchema
}

module.exports = ProductValidationZodSchema
