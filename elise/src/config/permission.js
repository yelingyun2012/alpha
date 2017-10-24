import Vue from 'vue'
import router from '../router'
import { getCookie } from '../utils/cookie'

Vue.prototype.$Loading.config({
  color: '#5cb85c'
})

// router.beforeEach((to, from, next) => {
//   Vue.prototype.$Loading.start()
//   if (!getCookie('token') && to.name !== '/login') {
//     next({name: '/login'})
//   } else if (getCookie('token') && to.name === '/login') {
//     next({name: '/'})
//   }else{
//
//   }
// })

router.afterEach(() => {
  Vue.prototype.$Loading.finish()
})

