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
    }, [])

    useEffect(() => {
        setFilteredCountries(countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())))
    }, [filter])

    return (
        <>
            find countries <input value={filter} onChange={((e) => setFilter(e.target.value))} />
            <Countries countries={filteredCountries} setFilter={setFilter}/>
        </>
    )
}

function Countries({countries, setFilter}) {
    const [weather, setWeather] = useState()

    useEffect(() => {
        if (countries.length == 1) {
            fetch(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_SOME_KEY}&q=${countries[0].capital[0]}&aqi=no`).then(res => res.json()).then(res => console.log(res))
        }
    }, [countries])

    if (countries.length == 1) {
        const c = countries[0]
        return (
            <>
                <h1>{c.name.common}</h1>
                <p>capital: {c.capital[0]}</p>
                <p>area: {c.area}</p>
                <h2>languages</h2>
                <ul>
                    {Object.values(c.languages).map((l, i) => <li key={i}>{l}</li>)}
                </ul>
                {weather && !weather.error ? <p>{weather.current.temp_c} C</p> : ''}
            </>
        )
    } else if (countries.length <= 10) {
        return (
            <>
                {countries.map((c, i) => 
                    <div key={i}>
                        <p>{c.name.common}</p>
                        <button onClick={() => setFilter(c.name.common)}>show</button>
                    </div>
                )}
            </>
        )
    } else {
        return countries.length
    }
}

export default App
