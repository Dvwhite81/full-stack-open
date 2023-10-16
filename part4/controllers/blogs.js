const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  blog
    .save()
    .then(savedBlog => {
      res.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
