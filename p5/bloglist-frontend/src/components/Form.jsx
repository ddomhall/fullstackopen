import { useState } from 'react'

const Form = ({ errorMessage, formAction, fields, title }) => {
    const [showForm, setShowForm] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        let data = {}
        fields.forEach(f => data[f] = e.target[f].value)
        formAction(data)
        e.target.reset()
    }

    return (
        <>
            {showForm ?
                <>
                    <button onClick={() => setShowForm(false)}>hide</button>
                    <div>{errorMessage}</div>
                    <form onSubmit={handleSubmit}>
                        {fields.map(f => <input name={f} placeholder={f} key={f} type={f === 'password' ? 'password' : undefined} />)}
                        <input type='submit' value={title}/>
                    </form>
                </>
                : <button onClick={() => setShowForm(true)}>show</button>}
        </>
    )
}

export default Form
