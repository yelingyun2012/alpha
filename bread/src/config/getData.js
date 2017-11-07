import { fetch } from './fetch'

/**
 * 用户登陆
 */
export const Login = (loginForm) => fetch('elise/login', {
  method: 'post',
  data: {
    loginName: loginForm.account,
    pwd: loginForm.password
  }
})

/**
 * 用户退出
 */
export const LoginOut = (token) => fetch('account/logout', {
  method: 'post',
  data: {token}
})

/**
 * 统计站点
 */
export const siteNum = (token) => fetch('site/sitenum', {
  method: 'post',
  data: token
})

/**
 * 模型列表
 */
export const pageModelList = (params) => fetch('pagemodel/list', {
  method: 'post',
  data: {params}
})