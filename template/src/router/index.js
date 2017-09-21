/**
 * 导入依赖包
 * _import 引入包依赖模块
 */
import Vue from 'vue'
import Router from 'vue-router'

const _import = require(`./_import-${process.env.NODE_ENV}`)

/**
 * 导入依赖组件
 */
Vue.use(Router)

/**
 * 构建路由对象
 * @type {{Object}} constantRouterMap 路由常量
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: _import('login/login')
  },
  {
    path: '',
    name: 'dashboard',
    meta: {
      requireAuth: true
    },
    component: _import('dashboard/index')
  }
]
/**
 * 实例化路由
 */
export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})