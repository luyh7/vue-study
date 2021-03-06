import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/api',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

export default service
