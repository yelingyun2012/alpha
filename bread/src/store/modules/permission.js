import { appRouter } from '../../router/index'

const state = {
  menuList: []
}
const mutations = {
  updateMenuList (state) {
    state.menuList = appRouter
  }
}

export default {
  namespaced: true,
  state,
  mutations
}