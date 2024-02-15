const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
    res.json(await Blog.find())
})

router.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(400).end()
    } else {
        res.json(await new Blog(req.body).save())
    }
})

module.exports = router
