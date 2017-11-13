import { appRouter } from '../../router/index'

const state = {
  menuList: [],
  openedSubmenuArr: []
}
const mutations = {
  updateMenuList (state) {
    state.menuList = appRouter
  },
  addOpenSubmenu (state, name) {
    let [hasThisName, isEmpty] = [false, false]
    if (name.length === 0) isEmpty = true
    if (state.openedSubmenuArr.includes(name)) hasThisName = true
    if (!hasThisName && !isEmpty) state.openedSubmenuArr.push(name)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}