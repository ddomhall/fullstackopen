import { useSelector, useDispatch } from 'react-redux'
import { addVote, voteForAnecdote } from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = [...useSelector(state => state.anecdotes)].sort((a, b) => b.votes - a.votes).filter(a => a.content.includes(filter))
    const dispatch = useDispatch()

    function handleClick(id, content) {
        dispatch(voteForAnecdote(id))
        dispatch(setNotification(`you liked: ${content}`))
        setTimeout(() => dispatch(removeNotification()), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleClick(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList

