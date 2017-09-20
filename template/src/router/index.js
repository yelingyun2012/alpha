/**
 * 导入依赖包
 */
import Vue from 'vue'
import Router from 'vue-router'
/**
 * 导入依赖组件
 */
import login from '../component/login/login.vue'
import dashboard from '../component/dashboard/index.vue'

Vue.use(Router)

/**
 * 构建路由对象
 * @type {{Object}} constantRouterMap 路由常量
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '',
    name: 'dashboard',
    component: dashboard
  }
]
/**
 * 实例化路由
 */
export default new Router({
  mode: 'history',
  routes: constantRouterMap
})