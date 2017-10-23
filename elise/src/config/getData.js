import { fetch } from './fetch'
import md5 from 'js-md5'

/**
 * 用户登陆
 */
export const Login = (loginForm) => fetch('user/login', {
  method: 'post',
  data: {
    username: loginForm.account,
    password: loginForm.password
  }
})
/**
 * 用户退出
 */
export const LoginOut = (token) => fetch('user/logout', {
  method:'post',
  data:{
    token
  }
})