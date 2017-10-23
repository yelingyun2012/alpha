import { getCookie, removeCookie, setCookie } from '../../utils/cookie'
import { Login, LoginOut } from '../../config/getData'

const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, token) => state.token = token
}

const actions = {
  // 登陆函数
  handleLogin({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      Login(loginForm).then(response => {
        setCookie('token', response.data.response[0].token)
        commit('SET_TOKEN', response.data.response[0].token)
      })
      resolve()
    }).catch(err => {
      reject(err)
    })
  },
  // 退出函数
  handleLoginOut({ commit }) {
    LoginOut(getCookie('token')).then(response => {
      removeCookie('token')
      commit('SET_TOKEN', '')
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}