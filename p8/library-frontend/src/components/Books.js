import {useState} from 'react'
import { ALL_BOOKS } from '../queries.js'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [filter, setFilter] = useState()
  const result = useQuery(ALL_BOOKS, {
    variables: {genre: filter}
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks
  const filters = [...new Set(books.flatMap(b => b.genres))]

  return (
    <div>
      <h2>books</h2>
      {filter ? 
        <button onClick={() => setFilter()}>clear</button>
        : filters.map(f => <button key={f} onClick={() => {
          setFilter(f)
          result.refetch()
        }}>{f}</button>)}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
