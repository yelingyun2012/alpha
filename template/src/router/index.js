import Vue from 'vue'
import Router from 'vue-router'
// _import 引入包依赖模块
const _import = require(`./_import-${process.env.NODE_ENV}`)
// 实例化router对象
Vue.use(Router)
// 导出路由对象
export const constantRouterMap = [
  {
    path: '',
    name: 'layout',
    component: _import('layout/index')
  }
]
export default new Router({
  mode: 'history',
  routes: constantRouterMap
})