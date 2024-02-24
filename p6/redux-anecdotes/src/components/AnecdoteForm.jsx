import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(addAnecdote(content))
        dispatch(setNotification(`you posted: ${content}`))
        setTimeout(() => dispatch(removeNotification()), 5000)
        e.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
