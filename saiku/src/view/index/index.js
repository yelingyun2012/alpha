/**
 * Vue vue.js框架库
 * router 引入路由
 * store 引入状态管理器
 * App 视图依赖组件
 * nprogress 引入数据加载进度条
 */
import Vue from 'vue'
import router from '../../router'
import store from '../../store'
import App from '../../component/App.vue'
/**
 * 1.引入在线bug检测
 * 2.引入iview组件按需加载
 */
// import '../../utils/fundebug'
import '../../utils/iview'
import '../../utils/permission'

/**
 * 实例化 Vue 对象
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
