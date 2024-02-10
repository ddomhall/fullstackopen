const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => 
    <>
        {parts.map(p => <Part key={p.id} part={p} />)}
    </>

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total sum={course.parts.reduce((prev, cur) => prev + cur.exercises ,0)} />
        </div>
    )
}

export default App
