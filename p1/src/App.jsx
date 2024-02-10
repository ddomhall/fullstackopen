export default function App() {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts} />
            <Footer parts={parts}/>
        </div>
    )
}

function Header({course}) {
    return <h1>{course}</h1>
}

function Content({parts}) {
    return (
        <div>
            {parts.map(p => <p>{p.name}: {p.exercises}</p>)}
        </div>
    )
}

function Footer({parts}) {
    return <footer>Number of exercises: {parts.reduce((prev, cur) => prev + cur.exercises, 0)}</footer>
}

