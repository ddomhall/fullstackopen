import {useState, useEffect } from 'react'

function App() {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [format, setFormat] = useState()

    useEffect(() => {
        async function getCountries() {
            fetch('https://studies.cs.helsinki.fi/restcountries/api/all').then(res => res.json()).then(res => setCountries(res))
        }
        getCountries()
        console.log(countries)
    }, [])

    useEffect(() => {
        setFilteredCountries(countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())))
    }, [filter])

    return (
        <>
            find countries <input value={filter} onChange={((e) => setFilter(e.target.value))} />
            <Countries countries={filteredCountries}/>
        </>
    )
}

function Countries({countries}) {
    if (countries.length == 1) {
        const c = countries[0]
        return (
            <>
                <h1>{c.name.common}</h1>
                <p>capital: {c.capital[0]}</p>
                <p>area: {c.area}</p>
                <h2>languages</h2>
                <ul>
                    {Object.values(c.languages).map(l => <li>{l}</li>)}
                </ul>
            </>
        )
    } else if (countries.length <= 10) {
        return (
        <>
                {countries.map(c => <p>{c.name.common}</p>)}
        </>
        )
    } else {
        return countries.length
    }
}

export default App
