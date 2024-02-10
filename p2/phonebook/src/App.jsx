import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

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
            <input value={filter} onChange={filterList} />
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
            <h2>Numbers</h2>
            {persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())).map((p, i) => <p key={i}>{p.name}: {p.number}</p>)}
        </div>
    )
}

export default App
