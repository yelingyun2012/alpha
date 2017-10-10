const state = {
  token: 1
}
const getters = {
  countToken: state => state.token * 10
}
const mutations = {
  SET_TOKEN: (state, token) => state.token = token
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}