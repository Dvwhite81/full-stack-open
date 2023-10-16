const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

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

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(titles).toHaveLength(3)
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

  const response = await api.get('/api/blogs')
  const lastBlogAdded = response.body[2]

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
})

afterAll(async () => {
  await mongoose.connection.close()
})
