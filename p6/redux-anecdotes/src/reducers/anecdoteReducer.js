import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addVote(state, action) {
            return state.map(a => a.id === action.payload.id ? action.payload : a)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const {addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteForAnecdote = (id) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.putVote(id)
        dispatch(addVote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer

