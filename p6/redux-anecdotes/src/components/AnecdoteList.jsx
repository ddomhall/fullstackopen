import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = [...useSelector(state => state.anecdotes)].sort((a, b) => b.votes - a.votes).filter(a => a.content.includes(filter))
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList

