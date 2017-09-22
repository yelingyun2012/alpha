import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { removeToken } from '../utils/token'
import store from '../store'

/**
 * axios 默认参数配置
 */
axios.defaults.baseURL = `http://o2o.beyebe.com:8089/o2o_beyebe/api567`
axios.defaults.timeout = 30000

/**
 * axios 请求拦截
 * 当请求方式为'post','put','delete'时,进行参数序列化
 * 当 token 存在时,请求header中添加 token
 */
axios.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.data = qs.stringify(config.data)
    }
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error.data.error.message)
  }
)
/**
 * axios 响应拦截
 */
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

/**
 * 处理返回状态
 * 当返回状态为 200 或 304 时,直接返回响应数据
 * 其他状态则统一返回构造数据
 * @param {any} response
 * @returns
 */
function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: '404',
      message: response.statusText
    }
  }
}

/**
 * 处理返回code
 * 具体项目具体配置
 * @param {any} response
 * @returns
 */
function checkCode (response) {
  if (response.data.code) {
    switch (response.data.code) {
      case '0':
        return response
        break
      case '3001':
        router.push('/login')
        removeToken('Token')
        store.commit('user/SET_TOKEN', '')
        return Promise.reject(response.data.message)
        break
      case '404':
        console.log('123')
        router.push('/404')
        removeToken('Token')
        store.commit('user/SET_TOKEN', '')
        return Promise.reject('')
        break
    }
  } else {
    router.push('/login')
  }
}

/**
 * 请求函数封装
 * method 请求方式
 * params 请求方式为 get 时, 需定义的参数
 * data 请求方式为 post 时, 需定义的参数
 * responseType 服务器返回响应类型
 * @param url
 * @param options
 * @returns {Promise.<TResult>}
 */
export function fetch (url, options) {
  let opt = options || {}
  return axios({
    method: opt.method || 'get',
    url,
    params: opt.params || undefined,
    data: opt.data || undefined,
    responseType: opt.responseType || 'json',
  }).then(checkStatus).then(checkCode)
}

/**
 * 代替方案
 */
// export default {
//   get (url, params) {
//     return axios({
//       method: 'get',
//       url,
//       params
//     }).then(checkStatus).then(checkCode)
//   },
//   post (url, data) {
//     return axios({
//       method: 'post',
//       url,
//       data
//     }).then(checkStatus).then(checkCode)
//   }
// }