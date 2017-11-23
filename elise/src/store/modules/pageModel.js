const state = {
  toggleId: '',
  httpCon: []
}
const getters = {
  getToggleId: (state) => {
    return state.toggleId
  },
  getHttpCon: (state) => {
    return state.httpCon
  }
}
const mutations = {
  setId (state, id) {
    if (id) {
      state.toggleId = id
    }
  },
  setCon (state, con) {
    if (con) {
      state.httpCon = con
    }
  }
}

const actions = {
  setToggleId ({commit}, id) {
    commit(setId, id)
  },
  setHttpCon ({commit}, con) {
    commit(setCon, con)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
