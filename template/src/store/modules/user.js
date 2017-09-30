const state = {
  token: 1
}
const getters = {
  countToken: state => state.token * 10
}

export default {
  namespaced: true,
  state,
  getters
}