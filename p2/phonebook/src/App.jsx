import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [newName, setNewName] = useState('')

    function handleChange(e) {
        setNewName(e.target.value)
    }

    function addName(e) {
        e.preventDefault()
        if (persons.filter(p => p.name == newName).length) {
            alert(newName + ' already added')
        } else {
            setPersons(persons.concat({name: newName}))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((p, i) => <p key={i}>{p.name}</p>)}
        </div>
    )
}

export default App
