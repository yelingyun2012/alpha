import Vue from 'vue'
import router from '../../router'
import store from '../../store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from '../../component/App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(iView)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})