import { fetch } from '../../api/http'

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
        commit('SET_TOKEN', response.data.response[0].token)
        resolve(response)
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