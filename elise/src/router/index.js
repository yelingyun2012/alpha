import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 依赖组件引入模块
const _import = require(`./_import-${process.env.NODE_ENV}`)

// 路由常量
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: _import('login/Login')
  },
  {
    path: '/',
    name: 'error_404',
    component: _import('error/404')
  },
  {
    path: '/401',
    name: 'error_401',
    component: _import('error/401')
  },
  {
    path: '/500',
    name: 'error_500',
    component: _import('error/500')
  },
  // {
  //   path: '*',
  //   name: 'error_404',
  //   component: _import('error/404')
  // }
]

export default new Router({
  mode: 'hash',
  routes: constantRouterMap
})