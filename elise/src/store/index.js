import Vue from 'vue'
import Vuex from 'vuex'
/**
 * 导入状态文件
 */
import user from './modules/user'
import permission from './modules/permission'
import pageModel from './modules/pageModel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission,
    pageModel
  }
})