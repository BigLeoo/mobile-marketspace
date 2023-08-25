import axios from 'axios'

import { AppError } from '../utils/AppErros'

const api = axios.create({
  baseURL: 'http://192.168.91.1:3333',
  timeout: 8000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  },
)

export { api }
