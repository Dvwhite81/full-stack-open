const _ = require('lodash')

// These aren't pretty - need to figure out lodash

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostLikes, blog) => {
    return blog.likes > mostLikes
      ? blog.likes
      : mostLikes
  }

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer, blogs[0].likes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const author = _.head(_(blogs)
    .countBy('author')
    .entries()
    .maxBy(_.last))
  return author
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const list = {}
  blogs.forEach(blog => {
    if (!list[blog.author]) {
      list[blog.author] = {
        author: blog.author,
        likes: blog.likes
      }
    }
    else {
      list[blog.author] = {
        author: blog.author,
        likes: list[blog.author].likes + blog.likes
      }
    }
  })

  let most = {}
  for (let each of Object.values(list)) {
    if (!most['likes']) {
      most = each
      continue
    }
    if (each['likes'] > most['likes']) {
      most = each
    }
  }

  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
