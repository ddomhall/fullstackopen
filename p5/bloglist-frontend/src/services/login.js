import axios from 'axios'
const baseUrl = '/api/login'

const login = (data) => {
    const request = axios.post(baseUrl, data)
    return request.then(response => response.data)
}

export default { login }
