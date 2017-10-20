import Vue from 'vue'
import Router from 'vue-router'
/**
 * 导入组件
 * @type {Array}
 */
import login from '../component/login/login.vue'
import layout from '../component/layout/index.vue'
import log from '../component/logQuery/index.vue'
import pageModel1 from '../component/baseConfig/pageModel.vue'
import siteManagement from '../component/baseConfig/siteManagement.vue'
import pageModel2 from '../component/baseConfig/pageModel2.vue'
import pageModel3 from '../component/baseConfig/pageModel3.vue'
import addPage from '../component/baseConfig/add.vue'
import newtask from '../component/baseConfig/newtask.vue'

import dashboard from '../component/baseConfig/demoss/index.vue'

import test from '../component/test/index.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    hidden: true
  },
  {
    path: '/',
    name: 'home',
    redirect: '/base',
    component: layout,
    hidden: true
  },
  {
    path: '/base',
    name: '基本配置',
    redirect: '/base/siteManagement',
    component: layout,
    icon: 'gear-a',
    children: [
      {path: 'siteManagement', component: siteManagement, name: '任务管理', icon: 'leaf'},
      {path: 'addPage', component: addPage, name: '新增', icon: 'ios-briefcase', hidden: true},
      {path: 'newtask', component: newtask, name: '新增a', icon: 'ios-briefcase', hidden: true},
      {path: 'pageModel1', component: pageModel1, name: '页面模型', icon: 'cube'},
      {path: 'pageModel2', component: pageModel2, name: '站点管理', icon: 'planet'},
      {path: 'pageModel3', component: pageModel3, name: '代理管理', icon: 'earth'}
    ]
  },
  {
    path: '/log',
    name: 'log',
    redirect: '/log/index',
    icon: 'document-text',
    component: layout,
    noDropdown: true,
    // hidden: true,
    children: [
      {
        path: 'index',
        name: '日志查询',
        component: log,
        style: 'padding-left:15px'
      }
    ]
  },
  {
    path: '/test',
    component: test,
    hidden: true
  }
]

export default new Router({
  routes: constantRouterMap
})