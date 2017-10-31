import { fetch } from './fetch'
import md5 from 'js-md5'

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
  method:'post',
  data:{
    token
  }
})