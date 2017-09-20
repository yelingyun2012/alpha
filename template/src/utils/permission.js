/**
 * router 路由
 * store 应用状态
 * NProgress 进度条组件
 */
import router from '../router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList=['/login']
router.beforeEach((to,from,next)=> {
  NProgress.start()
})
