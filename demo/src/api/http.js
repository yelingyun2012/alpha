import axios from 'axios'
import router from '../router'
import { removeToken } from '../utils/token'
import store from '../store'

// axios.defaults.timeout = 15000
axios.defaults.baseURL = 'http://121.9.245.185:1188/Ajax'

axios.interceptors.response.use(response => {
  let data = response.data
  if (data.TokenStatus) {
    return response
  } else {
    router.push('/login')
    removeToken('admin-Token')
    removeToken('Token')
    store.commit('user/SET_TOKEN', '')
    return Promise.reject(data.Msg)
  }
})
export default axios