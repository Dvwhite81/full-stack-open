const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initial blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('when adding a blog', () => {
  test('a valid POST request creates a new blog post', async () => {
    const testBlog = {
      title: 'This is a test blog',
      author: 'Test Author',
      url: 'https://www.testing.com/testBlog1',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'This is a test blog'
    )
  })

  test('a blog will have default value of zero likes if no value is given', async () => {
    const noLikesBlog = {
      title: 'Blog with no likes property',
      author: 'Author of this blog',
      url: 'http://www.no-likes.com/missing-likes'
    }

    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlogAdded = blogsAtEnd[2]

    expect(lastBlogAdded.likes).toBe(0)
  })

  test('posting a blog with no title or url will cause a 400 status code response', async () => {
    const noTitleBlog = {
      author: 'Test Author',
      url: 'https://www.testing.com/testBlog1',
      likes: 2
    }

    const noUrlBlog = {
      title: 'This is a test blog',
      author: 'Test Author',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('when deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('when updating a blog', () => {
  test('blog likes are changed successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    console.log('blogToUpdate:::::;', blogToUpdate)
    console.log('blogToUpdate ID:::::::::::', blogToUpdate.id)

    const updatedBlog = {
      ...blogToUpdate,
      likes: 15
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogAfterUpdate = blogsAtEnd.find(b => b.title === blogToUpdate.title)
    expect(blogAfterUpdate.likes).toBe(15)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
