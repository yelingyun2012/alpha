import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../store'
import { removeCookie } from '../utils/cookie'

// axios 配置参数
const baseURL = `http://o2o.beyebe.com:8089/o2o_beyebe/api/`
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 30000

/**
 * 请求拦截器
 * @param {Object} config 接口请求配置
 * @param {Object} error 接口请求错误处理
 */
axios.interceptors.request.use(
  config => {
    const RequestMethods = ['post', 'put', 'delete']
    if (RequestMethods.includes(config.method)) {
      config.data = qs.stringify(config.data)
    }
    // 请求头中加入token值
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => Promise.reject(error.data.error.message)
)
/**
 * 响应拦截器
 * @param {Object} response 返回响应对象
 * @param {Object} error 接口响应错误处理
 */
axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response)
)

/**
 * 处理接口返回状态
 * @param {Number} response 接口返回对象
 */
function checkStatus(response) {
  const Status = [200, 304]
  if (Status.includes(response.status)) {
    return response
  }
  return {
    data: {
      code: '404',
      message: response.statusText,
      data: ''
    }
  }
}

/**
 * 处理接口返回参数
 * @param {Object} response 接口返回对象
 */
function checkCode(response) {
  // code码存在时,对相应的Code码进行处理
  if (response.data.code) {
    switch (response.data.code) {
      case '0':
        return response
        break
      case '3001':
        router.push('/login')
        removeCookie('token')
        store.commit('user/SET_TOKEN', '')
        return Promise.reject(response.data.message)
        break
      case '404':
        router.push('/error')
        removeCookie('token')
        store.commit('user/SET_TOKEN', payload)
        break
    }
  } else {
    router.push('/login')
  }
}

/**
 * 封装请求函数
 * @export fetch/fetch
 * @param {String} url 请求接口地址
 * @param {String} options 请求具体参数
 * @returns {Object} 接口请求返回对象
 */
export function fetch(url, options) {
  let opt = options || {}
  return axios({
    url,
    method: opt.method || 'get',
    params: opt.params || undefined,
    data: opt.data || undefined,
    responseType: opt.responseType || 'json'
  }).then(checkStatus).then(checkCode)
}