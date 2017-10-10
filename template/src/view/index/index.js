import Vue from 'vue'
import router from '../../router'
import store from '../../store'
import App from '../../component/App.vue'

// 引入按需加载组件
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

/**
 * 实例化Vue对象
 */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// Vue 配置
Vue.config.devtools = true
Vue.config.productionTip = false


