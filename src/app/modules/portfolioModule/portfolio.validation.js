const z = require('zod')

const createPortfolioZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Portfolio name is required!'
    }),
    description: z.string({
      required_error: 'Portfolio description title is required!'
    }),
    url: z.string({
      required_error: 'Portfolio url title is required!'
    }),
    addedBy: z
      .object({
        adminId: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional()
      })
      .optional()
  })
})

const specificPortfolioZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is missing in request params!'
    })
  })
})

const PortfolioValidationZodSchema = {
  createPortfolioZodSchema,
  specificPortfolioZodSchema
}

module.exports = PortfolioValidationZodSchema
