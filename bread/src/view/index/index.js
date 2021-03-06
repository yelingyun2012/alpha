import Vue from 'vue'
import router from '../../router'
import store from '../../store'
import App from '../../component/App.vue'
// 引入按需加载组件
import '../../utils/iview'

import { getCookie } from '../../utils/cookie'

router.beforeEach((to, from, next) => {
  if (!getCookie('token') && to.name !== 'Login') {
    next('/login')
  } else if (getCookie('token') && to.name === 'Login') {
    next('/basic')
  } else {
    next()
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})


/**
 * 实例化Vue对象
 */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted () {
    this.$store.commit('permission/updateMenuList')
  }
})

/**
 * vue 开发环境配置
 * @param {Boolean} devtools 开启开发插件
 * @param {Boolean} productionTip 生产环境提示
 */
Vue.config.devtools = true
Vue.config.productionTip = false

// 引入在线bug监控
// import '../../utils/fundebug'
