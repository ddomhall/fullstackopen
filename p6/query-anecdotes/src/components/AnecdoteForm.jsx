import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    })

    const onCreate = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        const object = {content, id: (10000 * Math.random()).toFixed(0), votes: 0}
        newAnecdoteMutation.mutate(object)
        e.target.reset()
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
