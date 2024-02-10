export default function App() {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }

    return (
        <>
            <Header course={course}/>
            <Content course={course}/>
            <Footer course={course}/>
        </>
    )
}

function Header({course}) {
    return <h1>{course.name}</h1>
}

function Content({course}) {
    return (
        <>
            {course.parts.map(p => <Part part={p}/>)}
        </>
    )
}

function Part({part}) {
    return <p>{part.name}: {part.exercises}</p>
}

function Footer({course}) {
    return <footer>Number of exercises: {course.parts.reduce((prev, cur) => prev + cur.exercises, 0)}</footer>
}

