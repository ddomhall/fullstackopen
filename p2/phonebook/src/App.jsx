import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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

    return (
        <div>
            <h2>Phonebook</h2>
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
            {persons.map((p, i) => <p key={i}>{p.name}: {p.number}</p>)}
        </div>
    )
}

export default App
