const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    res.json(await User.find())
})

router.post('/', async (req, res) => {
    console.log(req.body)
    res.json(await new User({
        name: req.body.name,
        username: req.body.username,
        passwordHash: await bcrypt.hash(req.body.password, 10)
    }).save())
})

router.delete('/:id', async (req, res) => {
    res.json(0)
})

router.put('/:id', async (req, res) => {
    res.json(0)
})

module.exports = router

