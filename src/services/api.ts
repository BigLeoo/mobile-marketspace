import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.91.1:3333',
  timeout: 4000,
})

export { api }
