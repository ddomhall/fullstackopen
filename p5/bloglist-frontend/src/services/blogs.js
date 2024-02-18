import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (data, user) => {
    axios.post(baseUrl, data, {
        headers: {
            'authorization': 'bearer ' + user
        },
    })
}

export default { getAll, create }
