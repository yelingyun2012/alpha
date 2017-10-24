import Vue from 'vue'
import 'iview/dist/styles/iview.css'

// 引入依赖组件
import Button from 'iview/src/components/button'
import Card from 'iview/src/components/card'
import Form from 'iview/src/components/form'
import Icon from 'iview/src/components/icon'
import Input from 'iview/src/components/input'
import LoadingBar from 'iview/src/components/loading-bar'
import Message from 'iview/src/components/message'
// 组件组
const components = {
  Button,
  Form,
  FormItem: Form.Item,
  Message,
  Icon,
  Input,
  Card,
  LoadingBar
}
// 实例化组件组
const install = function (Vue) {
  Object.keys(components).forEach(key => Vue.component(key, components[key]))
  Vue.prototype.$Message = Message
  Vue.prototype.$Loading = LoadingBar
}

Vue.use(install)

// // 组件组注入顶级Dom树对象
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }
// // 合并并导出调用对象
// module.exports = Object.assign(components, { install })