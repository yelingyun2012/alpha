/**
 * 引入依赖项
 */
import Vue from 'vue'
import Vuex from 'vuex'
/**
 * 导入依赖文件
 */
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    permission
  }
})

export default store

