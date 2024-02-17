const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    res.json(await Blog.find().populate('user'))
})

router.post('/', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!req.body.title) {
        res.status(400).end()
    } else {
        const newBlog = await new Blog({
            title: req.body.title,
            author: req.body.author,
            likes: req.body.likes,
            user: user
        }).save()
        user.blogs = user.blogs.concat(newBlog)
        await user.save()
        res.status(201).end()
    }
})

router.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('user')
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (decodedToken.id == blog.user._id) {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } else {
        res.status(401).end()
    }
})

router.put('/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).end()
})

module.exports = router
