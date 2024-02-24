import {createSlice} from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addVote(state, action) {
            const anecdote = state.find(a => a.id === action.payload)
            const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
            return state.map(a => a.id === anecdote.id ? changedAnecdote : a)
        },
        addAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const {addVote, addAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer

