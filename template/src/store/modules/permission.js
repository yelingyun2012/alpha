import { constantRouterMap } from '../../router/index'

const state = {
  routes: constantRouterMap,
  addRouters: []
}
const getters = {
  permission_routes: state => state.routes
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRouterMap.concat(routes)
  }
}

const actions = {
  GenerateRoutes ({commit}) {
    return new Promise(resolve => {
      commit('SET_ROUTES', constantRouterMap)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}