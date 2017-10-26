import axios from './http'
import Qs from 'qs'

export function login (loginForm) {
  let params = Qs.stringify({
    Name: loginForm.account.trim(),
    PassWord: loginForm.password,
    method: 'Login'
  })
  return axios.post('User.ashx',params)
}