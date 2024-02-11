const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())

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
    res.send(`phonebook has data for${persons.length} people<br/>${Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(p => p.id == Number(req.params.id))
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        res.status(400).json({error: 'missing info'})
    } else if (persons.find(p => p.name == req.body.name)) {
        res.status(409).json({error: 'name must be unique'})
    } else {
        const newPerson = {
            id: Math.trunc(Math.random() * 1000),
            name: req.body.name,
            number: req.body.number,
        }
        persons = persons.concat(newPerson)
        res.status(201).json(newPerson)
    }
})

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(p => p.id != Number(req.params.id))
    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(3001, console.log('listening on :3001'))
