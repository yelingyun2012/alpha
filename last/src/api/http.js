import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://192.168.10.93:8282/'
//
// axios.interceptors.request.use(config => {
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data)
//   }
//   console.log(config)
//   return config
//
// })
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})
export default axios
