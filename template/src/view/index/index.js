/**
 * 导入依赖包
 */
import * as fundebug from 'fundebug-javascript'
import Vue from 'vue'
import router from '../../router'
import store from '../../store'
import 'nprogress/nprogress.css'
import 'iview/dist/styles/iview.css'
/**
 * 导入依赖组件
 */
import App from '../../component/App.vue'
/**
 * 导入框架按需加载组件
 * @type {string}
 */
import Form from 'iview/src/components/form'
import Input from 'iview/src/components/input'
import Button from 'iview/src/components/button'

const components = {
  Form,
  FormItem: Form.Item,
  Input,
  Button
}

const install = function (Vue) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
install(Vue)

fundebug.apikey = '193c68f5a0b0cb42703a7fa4224574d06bac33dd803da781289df5dffb2894cd'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// Vue 配置
Vue.config.devtools = true
Vue.config.productionTip = false
