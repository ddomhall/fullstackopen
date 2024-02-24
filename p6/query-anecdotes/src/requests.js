import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>{
    console.log(0, newAnecdote)
    axios.post(baseUrl, newAnecdote).then(res => res.data)
}
