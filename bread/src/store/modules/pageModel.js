const state = {
  toggleId: '',
  httpCon: []
}
const getters = {
  getToggleId (state) {
    return state.toggleId
  },
  getHttpCon (state) {
    return state.httpCon
  }
}
const mutations = {
  SET_ID (state, id) {
    if (id) {
      state.toggleId = id
    }
  },
  SET_CON (state, con) {
    if (con) {
      state.httpCon = con
    }
  }
}

const actions = {
  setToggleId ({commit}, id) {
    commit('SET_ID', id)
  },
  setHttpCon ({commit}, con) {
    commit('SET_CON', con)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
