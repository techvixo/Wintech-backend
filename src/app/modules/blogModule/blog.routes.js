const express = require('express');
const blogControllers = require('./blog.controllers');
const requestValidator = require('../../middlewares/requestValidator');
const BlogValidationZodSchema = require('./blog.validation');

const blogRouter = express.Router();

blogRouter.post(
    '/create',
    requestValidator(BlogValidationZodSchema.createBlogZodSchema),
    blogControllers.createBlog
  )
  blogRouter.get('/all', blogControllers.getAllBlogs)
  blogRouter.get(
    '/:id',
    requestValidator(BlogValidationZodSchema.specificBlogZodSchema),
    blogControllers.getSpecificBlog
  )
  blogRouter.patch(
    '/update/:id',
    requestValidator(BlogValidationZodSchema.specificBlogZodSchema),
    blogControllers.updateSpecificBlog
  )
  blogRouter.delete(
    '/delete/:id',
    requestValidator(BlogValidationZodSchema.specificBlogZodSchema),
    blogControllers.deleteSpecificBlog
  )

module.exports = blogRouter