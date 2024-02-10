import { useState } from 'react'

export default function App() {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <h1>give feedback</h1>
            <Button text='good' onClick={() => setGood(good + 1)} />
            <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
            <Button text='bad' onClick={() => setBad(bad + 1)} />
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </>
    )
}

function Button({text, onClick}) {
    return <button onClick={onClick}>{text}</button>
}

function Statistics({good, neutral, bad}) {
    return (
        <>
            <h1>Statistics</h1>
            {good == 0 && neutral == 0 && bad == 0 ? <p>no feedback given</p> :
                <table>
                    <tbody>
                    <StatisticLine text='good' value={good} />
                    <StatisticLine text='neutral' value={neutral} />
                    <StatisticLine text='bad' value={bad} />
                    <StatisticLine text='total' value={good + neutral + bad} />
                    <StatisticLine text='average' value={(good + neutral + bad) / 3} />
                    <StatisticLine text='positive' value={good / (good + neutral + bad)} />
                    </tbody>
                </table>
            }
        </>
    )
}

function StatisticLine({text, value}) {
    return (
        <tr>
            <th>{text}</th>
            <td>{value}</td>
        </tr>
    )
}
