const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
    res.json(await Blog.find())
})

router.post('/', (req, res) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

module.exports = router
