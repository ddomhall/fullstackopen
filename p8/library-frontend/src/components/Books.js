import {useState} from 'react'
import { ALL_BOOKS } from '../queries.js'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [filter, setFilter] = useState()
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks
  const filters = [...new Set(books.flatMap(b => b.genres))]

  if (filter) books = books.filter(b => b.genres.includes(filter))

  return (
    <div>
      <h2>books</h2>
      <button onClick={() => setFilter()}>clear</button>
      {filters.map(f => <button key={f} onClick={() => setFilter(f)}>{f}</button>)}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
