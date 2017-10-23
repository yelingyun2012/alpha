import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
 * 导入状态文件
 */
import user from './modules/user'

export default new Vuex.Store({
  modules: {
    user
  }
})