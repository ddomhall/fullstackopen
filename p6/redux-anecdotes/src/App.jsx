import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {setAnecdotes} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService.getAll().then(notes => dispatch(setAnecdotes(notes)))
    }, [])

    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
