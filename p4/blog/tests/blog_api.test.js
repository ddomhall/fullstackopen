const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
let token
const jwt = require('jsonwebtoken')

const api = supertest(app)

const BlogToBeAdded = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
    user: '65d06f1b0cf2bca5316378a6'
}

const BlogWithoutLikes = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    user: '65d06f1b0cf2bca5316378a6'
}

const BlogWithoutTitle = {
    author: "Edsger W. Dijkstra",
    likes: 12,
    user: '65d06f1b0cf2bca5316378a6'
}

beforeEach(async () => {
    await User.deleteMany({})
    const user = await new User({
        name: 'dom',
        username: 'dom',
        password: 'dom'
    }).save()

    await Blog.deleteMany({})
    await Blog.insertMany([
        {
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7,
            user: user,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
            user: user,
        }
    ])

    const userForToken = {
        username: user.username,
        id: user._id,
    }
    token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET)
})

afterAll(async () => {
    await mongoose.connection.close()
})

test('correct number of blogs returned', async () => {
    const response = await api.get('/api/blogs').set('Authorization', token)
    expect(response.body.length).toBe(2)
})

test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', token)
    expect(response.body[0].id).toBeDefined()
})

test('post successfully', async () => {
    await api.post('/api/blogs').set('Authorization', token).send(BlogToBeAdded)
    const response = await api.get('/api/blogs').set('Authorization', token)

    expect(response.body.length).toBe(3)
    expect(response.body[response.body.length - 1].title).toEqual("Canonical string reduction")
})

test('fills missing likes with 0', async () => {
    await api.post('/api/blogs').set('Authorization', token).send(BlogWithoutLikes)
    const response = await api.get('/api/blogs').set('Authorization', token)

    expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('missing title returns 400', async () => {
    await api.post('/api/blogs').set('Authorization', token).send(BlogWithoutTitle).expect(400)
})

test('deletes blog post', async () => {
    const blog = await Blog.findOne()
    await api.delete(`/api/blogs/${blog._id}`).set('Authorization', token).expect(204)
    const response = await api.get('/api/blogs').set('Authorization', token)

    expect(response.body.length).toBe(1)
})

test('updates blog post', async () => {
    const blog = await Blog.findOne()
    await api.put(`/api/blogs/${blog._id}`).set('Authorization', token).send({likes: 0}).expect(204)
    const response = await api.get('/api/blogs').set('Authorization', token)

    expect(response.body[0].likes).toBe(0)
})

test('401 unauthorized', async() => {
    await api.get('/api/blogs').expect(401)
})
