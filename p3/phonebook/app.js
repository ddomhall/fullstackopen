const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/mongo.js')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    Person.find().then(result => res.send(`phonebook has data for ${result.length} people<br/>${Date()}`))
})

app.get('/api/persons', (req, res) => {
    Person.find().then(result => res.json(result))
})

app.get('/api/persons/:id', (req, res) => {
    Person.findOne({_id: req.params.id})
        .then(result => result ? res.json(result) : res.status(404).end())
        .catch(err => {
            console.log(err)
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.post('/api/persons', async (req, res) => {
    if (!req.body.name || !req.body.number) {
        res.status(400).json({error: 'missing info'})
    } else if (await Person.findOne({name: req.body.name})) {
        res.status(409).json({error: 'name must be unique'})
    } else {
        const newPerson = new Person({
            name: req.body.name,
            number: req.body.number,
        })
        newPerson.save().then(res.status(201).json(newPerson))
    }
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findOneAndDelete(req.params.id).then(result => res.status(204).end())
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(process.env.PORT || 3001, console.log(`listening on :${process.env.PORT || 3001}`))
