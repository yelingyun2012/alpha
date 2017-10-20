import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 依赖组件引入模块
// import _import from './_import-development'
const _import = require(`./_import-${process.env.NODE_ENV}`)

// 路由常量
export const constantRouterMap = [

]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})