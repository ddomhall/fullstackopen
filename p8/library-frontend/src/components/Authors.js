import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries.js'
import { useQuery, useMutation } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  function handleSubmit(e) {
    e.preventDefault()
    editAuthor({variables: {author: e.target.author.value, born: parseInt(e.target.born.value)}})
    e.target.reset()
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birth year</h3>
      <form onSubmit={handleSubmit}>
        <select name='author'>
          {result.data.allAuthors.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        <input name='born' placeholder='born' type='number'/>
        <input type='submit' />
      </form>
    </div>
  )
}

export default Authors
