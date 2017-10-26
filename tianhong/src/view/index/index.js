import Vue from 'vue'
import router from '../../router'
import store from '../../store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from '../../component/App.vue'
import { getToken } from '../../utils/token'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(iView)

const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken('Token')) { // 判断是否有token
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (store.state.user.roles.length === 0) {
        store.dispatch('user/GetUserInfo').then(res => {
          const roles = [res.Data[0].USER_NAME]
          store.dispatch('permission/GenerateRoutes', {roles}).then(() => {
            router.addRoutes(store.state.permission.addRouters)
            next({...to})
          })
        }).catch(() => {
          store.dispatch('user/FedLogOut').then(() => {
            next({path: '/login'})
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})