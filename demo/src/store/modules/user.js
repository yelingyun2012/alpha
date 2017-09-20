const state = {
  token: 1
}
const mutations = {
  SET_TOKEN: (state, token) => state.token = token
}

const actions = {
  Login ({commit}, token) {
    commit('SET_TOKEN', token)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
