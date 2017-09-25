import Vue from 'vue'
import 'iview/dist/styles/iview.css'
/**
 * 导入框架按需加载组件
 * @type {string}
 * Form 表单组件
 * Input 输入框组件
 * Button 按钮组件
 */
import Form from 'iview/src/components/form'
import Input from 'iview/src/components/input'
import Button from 'iview/src/components/button'
import Message from 'iview/src/components/message'
import Dropdown from 'iview/src/components/dropdown'
import Icon from 'iview/src/components/icon'

/**
 * 导入 iview 组件,并注入实例
 */
const components = {
  Message,
  Form,
  FormItem: Form.Item,
  Input,
  Button,
  Dropdown,
  DropdownItem: Dropdown.Item,
  DropdownMenu: Dropdown.Menu,
  Icon
}

const install = function (Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  Vue.prototype.$Message = Message
}
install(Vue)
