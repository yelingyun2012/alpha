import { fetch } from '../../api/http'
import { setToken } from '../../utils/token'

const state = {
  token: ''
}
const mutations = {
  SET_TOKEN: (state, token) => state.token = token
}
const actions = {
  LoginByUserName ({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      fetch('/user/login', {
        params: {
          username: userInfo.username.trim(),
          password: userInfo.password
        }
      }).then(response => {
        if (response) {
          setToken('Token', response.data.response[0].token)
          commit('SET_TOKEN', response.data.response[0].token)
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}