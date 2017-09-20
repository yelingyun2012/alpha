import axios from 'axios'
import qs from 'qs'

/**
 * axios 默认配置
 * @type {string} baseURL 默认请求地址
 */
axios.defaults.baseURL = `http://o2o.beyebe.com:8089/o2o_beyebe/api`
axios.defaults.timeout = 30000
/**
 * 请求拦截
 */
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截
 */
axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error)
)

/**
 * 处理响应状态,需根据文档进行对应的修改
 * @param response
 * @returns {*}
 */
function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: '404',
      message: response.statusText,
      data: response.statusText
    }
  }
}

/**
 * 处理接口返回 code 码
 * @param response
 * @returns {*}
 */
function checkCode (response) {
  if (response.data.code !== '0') {
    alert(response.data.response)
  }
  return response
}

export default {
  post (url, params) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(params)
    }).then(checkStatus).then(checkCode)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params
    }).then(checkStatus).then(checkCode)
  }
}
