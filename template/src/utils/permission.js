/**
 * router 路由
 * store 应用状态
 * NProgress 进度条组件
 */
import router from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'
import { getToken } from './token'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (getToken('Token')) {
      if (to.path === '/login') {
        next('/')
      } else {
        store.dispatch('permission/GenerateRoutes')
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        NProgress.done()
      }
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})