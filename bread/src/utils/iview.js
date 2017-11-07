import Vue from 'vue'
import 'iview/dist/styles/iview.css'
import 'core-js/fn/array/find'
import 'core-js/fn/array/find-index'
// 引入依赖组件
import Button from 'iview/src/components/button'
import Card from 'iview/src/components/card'
import Form from 'iview/src/components/form'
import Icon from 'iview/src/components/icon'
import Input from 'iview/src/components/input'
import LoadingBar from 'iview/src/components/loading-bar'
import Message from 'iview/src/components/message'
import Menu from 'iview/src/components/menu'
import { Col, Row } from 'iview/src/components/grid'
import { Option, OptionGroup, Select } from 'iview/src/components/select'
import Table from 'iview/src/components/table'
import Page from 'iview/src/components/page'
import Tabs from 'iview/src/components/tabs'
import Checkbox from 'iview/src/components/checkbox'
import DatePicker from 'iview/src/components/date-picker'
import Modal from 'iview/src/components/modal'
import Poptip from 'iview/src/components/poptip'
import Radio from 'iview/src/components/radio'
// 组件组
const components = {
  Button,
  Form,
  FormItem: Form.Item,
  Message,
  Icon,
  Input,
  Card,
  LoadingBar,
  Menu,
  iMenu: Menu,
  MenuGroup: Menu.Group,
  MenuItem: Menu.Item,
  Submenu: Menu.Sub,
  Col,
  iCol: Col,
  Row,
  Select,
  iSelect: Select,
  Option: Option,
  iOption: Option,
  OptionGroup,
  iTable: Table,
  Table,
  Page,
  Tabs: Tabs,
  TabPane: Tabs.Pane,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
  DatePicker,
  Modal,
  Poptip,
  Radio,
  RadioGroup: Radio.Group
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