import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(res => setPersons(res.data))
    },[])

    function changeName(e) {
        setNewName(e.target.value)
    }

    function changeNumber(e) {
        setNewNumber(e.target.value)
    }

    function addName(e) {
        e.preventDefault()
        if (persons.filter(p => p.name == newName).length) {
            alert(newName + ' already added')
        } else {
            setPersons(persons.concat({name: newName, number: newNumber}))
        }
    }

    function filterList(e) {
        setFilter(e.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <h2>add person</h2>
            <Filter addName={addName} newName={newName} changeName={changeName} newNumber={newNumber} changeNumber={changeNumber} />
            <h2>Numbers</h2>
            <Filter filter={filter} filterList={filterList} />
            {persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())).map(p => <Person key={p.id} person={p} />)}
        </div>
    )
}

const Filter = ({filter, filterList}) => {
    return <input value={filter} onChange={filterList} />
}

const PersonForm = ({addName, newName, changeName, newNumber, changeNumber}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={changeName}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={changeNumber} type='number'/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({person}) => {
    return (
        <p>{person.name}: {person.number}</p>
    )
}

export default App
