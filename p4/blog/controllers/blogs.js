const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

router.get('/', async (req, res) => {
    res.json(await Blog.find().populate('user'))
})

router.post('/', middleware.userExtractor, async (req, res) => {
    const user = req.user
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

router.delete('/:id', middleware.userExtractor, async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('user')
    const user = req.user
    if (String(user._id) == String(blog.user._id)) {
        await Blog.findByIdAndDelete(req.params.id)
        user.blogs = user.blogs.filter(b => String(b._id) != req.params.id)
        await user.save()
        res.status(204).end()
    } else {
        res.status(401).end()
    }
})

router.put('/:id', middleware.userExtractor, async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('user')
    const user = req.user
    if (String(user._id) == String(blog.user._id)) {
        await Blog.findByIdAndUpdate(req.params.id, req.body)
        res.status(204).end()
    } else {
        res.status(401).end()
    }
})

module.exports = router
