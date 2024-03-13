import {FAVORITE_BOOKS} from '../queries.js'
import { useQuery } from '@apollo/client'

const Recommended = (props) => {
  const result = useQuery(FAVORITE_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks.filter(b => b.genres.includes(result.data.me.favoriteGenre))

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>))}
        </tbody>
      </table>
    </>
  )
}

export default Recommended

