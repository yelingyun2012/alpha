// 引入依赖组件
import Form from 'iview/src/components/form'
import Input from 'iview/src/components/input'
import Message from 'iview/src/components/message'
// 注册组件组
const components = {
  Form,
  FormItem: Form.Item,
  Message,
  Input
}
// 实例化组件组
const install = function (Vue) {
  Object.keys(components).forEach(key => {
    Vue.components(key, components[key])
  })
  Vue.prototype.$Message = Message
}
// 将组件组注册进顶级Dom树对象
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 合并并导出调用对象
module.exports = Object.assign(iview, {install})