import { appRouter, otherRouter } from '../../router/index'

const state = {
  routers: [...appRouter, ...otherRouter], // 路由表
  menuList: [], // 导航列表
  openedSubmenuArr: [], // 默认打开路径
  currentPath: [] // 打开路径
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
  },
  setCurrentPath (state, pathArr) {
    state.currentPath = pathArr
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
