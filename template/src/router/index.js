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
    path: '/register',
    name: 'register',
    component: _import('register/index')
  },
  {
    path: '',
    name: 'home',
    redirect: '/dashboard',
    meta: {requireAuth: true},
    hidden: true,
    component: _import('layout/index'),
    children: [{path: 'dashboard', component: _import('dashboard/index')}]
  },
  {
    path: '/error',
    name: 'error',
    component: _import('error/index')
  },
  {
    path: '*',
    redirect: '/error',
    hide: true
  }
]
/**
 * 实例化路由
 */
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})