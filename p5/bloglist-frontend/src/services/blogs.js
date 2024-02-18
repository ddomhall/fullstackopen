import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (data, user) => {
    const request = axios.post(baseUrl, data, {
        headers: {
            'authorization': 'bearer ' + user
        },
    })
    return request.then(response => response.data)
}

export default { getAll, create }
