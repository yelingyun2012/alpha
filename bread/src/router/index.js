import Vue from 'vue'
import Router from 'vue-router'
import Main from '../component/Main.vue'

Vue.use(Router)

// 依赖组件引入模块
const _import = require(`./_import-${process.env.NODE_ENV}`)

// 不作为Main组件的子页面展示的页面单独写,如下
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: _import('login/Login')
  },
  {
    path: '/401',
    name: 'error_401',
    component: _import('error/401')
  },
  {
    path: '/500',
    name: 'error_500',
    component: _import('error/500')
  },
  {
    path: '*',
    name: 'error_404',
    component: _import('error/404')
  }
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的页面
export const otherRouter = [
  {
    path: '/',
    redirect:'/basic',
    name: 'otherRouter',
    component: Main,
    children: [
      {
        path: 'taskManagerChild/:id',
        name: 'taskManagerChild',
        title: '任务操作',
        component: _import('basic/child/taskManagerChild')
      }, // 展示任务添加与详情路由
      {
        path: 'pageManager/:id',
        name: 'pageManager',
        title: '页面模型操作',
        component: _import('basic/child/pageManager')
      },
      {
        path: 'alterUser/:operate',
        name: 'alterUser',
        title: '用户操作',
        component: _import('account/child/alterUser')
      }
    ]
  }
]

// 作为Main组件的子页面展示并且在左侧菜单显示的子页面
export const appRouter = [
  {
    path: '/basic',
    name: 'basic',
    redirect:'/basic/taskManager',
    icon: 'android-settings',
    title: '基本配置',
    component: Main,
    children: [
      {
        path: 'taskManager',
        name: 'taskManager',
        icon: 'compose',
        title: '任务管理',
        component: _import('basic/taskManager')
      },
      {
        path: 'pageModel',
        name: 'pageModel',
        icon: 'pound',
        title: '页面模型',
        component: _import('basic/pageModel')
      },
      {
        path: 'siteManager',
        name: 'siteManager',
        icon: 'crop',
        title: '站点管理',
        component: _import('basic/siteManager')
      },
      {
        path: 'agentManager',
        name: 'agentManager',
        icon: 'arrow-move',
        title: '代理管理',
        component: _import('basic/agentManager')
      }
    ]
  },
  {
    path: '/log',
    name: 'log',
    icon: 'ios-grid-view',
    title: '日志查询',
    component: Main,
    children: [
      {
        path: 'runLog',
        name: 'runLog',
        icon: 'arrow-move',
        title: '运行日志',
        component: _import('log/runLog')
      },
      {
        path: 'logStatis',
        name: 'logStatis',
        icon: 'edit',
        title: '日志统计',
        component: _import('log/logStatis')
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    icon: 'link',
    title: '用户管理',
    component: Main,
    children: [
      {
        path: 'index',
        name: 'account_index',
        title: '用户管理',
        component: _import('account/manager')
      }
    ]
  }
]

export const routers = [
  ...constantRouterMap,
  ...otherRouter,
  ...appRouter
]

export default new Router({
  mode: 'hash',
  routes: routers
})