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


const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total sum={course.parts.reduce((prev, cur) => prev + cur.exercises ,0)} />
        </div>
    )
}

export default Course
