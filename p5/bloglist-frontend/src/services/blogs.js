import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (data, user) => {
    const request = axios.post(baseUrl, data, {
        headers: {
            'authorization': 'bearer ' + user.token
        }
    })
    return request.then(response => response.data)
}

const update = (id, data, user) => {
    const request = axios.put(baseUrl + '/' + id, data, {
        headers: {
            'authorization': 'bearer ' + user.token
        }
    })
    return request.then(response => response.data)
}

const remove = (id, user) => {
    const request = axios.delete(baseUrl + '/' + id, {
        headers: {
            'authorization': 'bearer ' + user.token
        }
    })
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }
