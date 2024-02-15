const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const BlogToBeAdded = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}

const BlogWithoutLikes = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    __v: 0
}

const BlogWithoutTitle = {
    _id: "5a422b3a1b54a676234d17f9",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}

const listWithTwoBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listWithTwoBlogs)
})

afterAll(async () => {
    await mongoose.connection.close()
})

test('correct number of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(2)
})

test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('post successfully', async () => {
    await api.post('/api/blogs').send(BlogToBeAdded)
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(3)
    expect(response.body[response.body.length - 1].title).toEqual("Canonical string reduction")
})

test('fills missing likes with 0', async () => {
    await api.post('/api/blogs').send(BlogWithoutLikes)
    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('missing title returns 400', async () => {
    await api.post('/api/blogs').send(BlogWithoutTitle).expect(400)
})
