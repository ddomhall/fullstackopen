import { useState } from 'react'

export default function App() {
    const [anecdotes, setAnecdotes] = useState([
        {anecdote: 'If it hurts, do it more often.', votes: 0},
        {anecdote: 'Adding manpower to a late software project makes it later!', votes: 0},
        {anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
        {anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
        {anecdote: 'Premature optimization is the root of all evil.', votes: 0},
        {anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
        {anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
        {anecdote: 'The only way to go fast, is to go well.', votes: 0},
    ])

    const [selected, setSelected] = useState(0)

    return (
        <>
            <h1>anecdote of the day</h1>
            <p>anecdote: {anecdotes[selected].anecdote}</p>
            <p>votes: {anecdotes[selected].votes}</p>
            <button onClick={() => setSelected(Math.trunc(Math.random() * 8))}>next anecdote</button>
            <button onClick={() => setAnecdotes(anecdotes.map((a, i) => i == selected ? {...a, votes: a.votes + 1} : a))}>vote</button>
            <h1>top anecdote</h1>
            <p>
                {anecdotes.reduce((prev, cur) => cur.votes > prev.votes ? cur : prev, anecdotes[0]).anecdote}
            </p>
        </>
    )
}
