import Vue from 'vue'
import Router from 'vue-router'

/* login */
import login from '../component/login/login.vue'
/* error */
import Error404 from '../component/error/404.vue'

/* iview */
import dashboard from '../component/dashboard/index.vue'
/*element*/
import element from '../component/element/index.vue'
/*native*/
import native from '../component/native/index.vue'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/element',
    name: 'element',
    component: element
  },
  {
    path: '/native',
    name: 'native',
    component: native
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: Error404,
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})