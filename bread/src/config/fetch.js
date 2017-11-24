import axios from 'axios'
import qs from 'qs'
import router from '../router'
// axios 配置参数
// const baseURL = `http://192.168.10.93:8282/`
// const baseURL = `http://192.168.10.93:8282/`  // 测试端口
const baseURL = `http://192.168.10.92:8181/` // 开发端口
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 60000
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
function checkStatus (response) {
  const [Status, abnormalStatus] = [[200, 304], [404, 500]]
  if (Status.includes(response.status)) {
    return response
  }
  if (abnormalStatus.includes(response.status)) {
    return {
      data: {
        respCode: response.status,
        message: response.statusText,
        data: ''
      }
    }
  }
}
/**
 * 处理接口返回参数
 * @param {Object} response 接口返回对象
 */
function checkCode (response) {
  // code码存在时,对相应的Code码进行处理
  if (response.data.respCode) {
    let CodeArr = ['201', '202', '203', '204', '205', '206', '101',"E2001","E1000","E1001","E1002","E4000","E4001","E4002","E4003","E4004","E4005","E4006"]
    // if (CodeArr.includes(response.data.respCode)) {
    //   return response
    // }
    /**
     * code 测试
     */
    if (response.data.respCode === '0' || response.data.respCode === '100') {
      return response
    }
    if (CodeArr.includes(response.data.respCode)) {
      return Promise.reject(response.data.respMsg)
    }
    if (response.data.respCode === '404') {
      router.push('/404')
      return Promise.reject(response.data.respMsg)
    }
    if (response.data.respCode === '500') {
      router.push('/500')
      return Promise.reject(response.data.respMsg)
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
export function fetch (url, options) {
  let opt = options || {}
  return axios({
    url,
    method: opt.method || 'get',
    params: opt.params || undefined, //get
    data: opt.data || undefined, //post
    responseType: opt.responseType || 'json'
  }).then(checkStatus).then(checkCode)
}
