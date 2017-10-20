import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import router from '../../router'
import store from '../../store'
import App from '../../component/App.vue'
import 'nprogress/nprogress.css'
import { getToken } from '../../utils/token'

Vue.use(iView)

Vue.config.devtools = true
Vue.config.productionTip = false

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (getToken('Token')) {
  //   if(true){
    if(to.path==='/login'){
      next('/')
    }else{
      store.dispatch('permission/GenerateRoutes')
      next()
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
  template: '<App/>',
  components: {App}
})