const z = require('zod')

const createBlogZodSchema = z.object({
  body: z.object({
    name_en: z.string({
      required_error: 'Blog english name is required!'
    }),
    name_cn: z.string({
      required_error: 'Blog chinese name is required!'
    }),
    description_en: z.string({
      required_error: 'Blog english description is required!'
    }),
    description_cn: z.string({
      required_error: 'Blog chinese description is required!'
    }),
    author: z
      .object({
        adminId: z.string().optional(),
        name_en: z.string().optional(),
        name_cn: z.string().optional(),
        email: z.string().optional()
      })
      .optional()
  })
})

const specificBlogZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is missing in request params!'
    })
  })
})

const BlogValidationZodSchema = {
    createBlogZodSchema,
    specificBlogZodSchema
}

module.exports = BlogValidationZodSchema
