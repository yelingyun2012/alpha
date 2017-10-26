import Vue from 'vue'
import Router from 'vue-router'
import Main from '../component/Main.vue'

Vue.use(Router)

// 依赖组件引入模块
const _import = require(`./_import-${process.env.NODE_ENV}`)
// 路由常量

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
  },

]

export const appRouter = [
  {
    path: '/basic',
    icon: 'key',
    name: 'basic',
    title: '基本配置',
    component: Main,
    children: [
      {
        path: 'taskManager',
        icon: 'compose',
        title: '任务管理',
        name: 'taskManager',
        component: _import('basic/taskManager')
      },
      {path: 'pageManager', icon: 'pound', title: '页面模型', name: 'pageManager', component: _import('basic/pageManager')},
      {path: 'siteManager', icon: 'crop', title: '站点管理', name: 'siteManager', component: _import('basic/siteManager')},
      {
        path: 'agentManager',
        icon: 'arrow-move',
        title: '代理管理',
        name: 'agentManager',
        component: _import('basic/agentManager')
      },
    ]
  },
  {
    path: 'log',
    icon: 'android-checkbox',
    name: 'log',
    title: '日志查询',
    component: Main,
    children: [
      {path: 'runLog', icon: 'compose', title: '运行日志', name: 'runLog', component: _import('log/runLog')},
      {path: 'logStats', icon: 'arrow-swap', title: '日志统计', name: 'logStats', component: _import('log/logStats')}
    ]
  },
  {
    path: '/access',
    icon: 'key',
    name: 'access',
    title: '权限管理',
    component: Main,
    children: [
      {path: 'index', title: '权限管理', name: 'access_index', component: _import('layout/access')}
    ]
  },
  {
    path: '/access-test',
    icon: 'lock-combination',
    title: '权限测试页',
    name: 'accesstest',
    access: 0,
    component: Main,
    children: [
      {path: 'index', title: '权限测试页', name: 'accesstest_index', component: _import('layout/access_test')}
    ]
  },
  {
    path: '/component',
    icon: 'social-buffer',
    name: 'component',
    title: '组件',
    component: Main,
    children: [
      {
        path: 'text-editor',
        icon: 'compose',
        name: 'text-editor',
        title: '富文本编辑器',
        component: _import('layout/editor')
      },
      {
        path: 'md-editor',
        icon: 'pound',
        name: 'md-editor',
        title: 'Markdown编辑器',
      },
      {
        path: 'image-editor',
        icon: 'crop',
        name: 'image-editor',
        title: '图片预览编辑',
      },
      {
        path: 'draggable-list',
        icon: 'arrow-move',
        name: 'draggable-list',
        title: '可拖拽列表',
      },
      {
        path: 'file-upload',
        icon: 'android-upload',
        name: 'file-upload',
        title: '文件上传',
      },
      {
        path: 'count-to',
        icon: 'arrow-graph-up-right',
        name: 'count-to',
        title: '数字渐变',
      }
    ]
  },
  {
    path: '/form',
    icon: 'android-checkbox',
    name: 'form',
    title: '表单编辑',
    component: Main,
    children: [
      {path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose'},
      {path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap'}
    ]
  },
  {
    path: '/tables',
    icon: 'ios-grid-view',
    name: 'tables',
    title: '表格',
    component: Main,
    children: [
      {path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move'},
      {path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit'},
      {path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download'},
      {path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images'}
    ]
  },
  {
    path: '/advanced-router',
    icon: 'ios-infinite',
    name: 'advanced-router',
    title: '高级路由',
    component: Main,
    children: [
      {path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link'},
      {path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send'}
    ]
  },
  {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    component: Main,
    children: [
      {path: 'index', title: '错误页面', name: 'errorpage_index'}
    ]
  }
]

export const routers = [
  ...constantRouterMap,
  ...appRouter
]

export default new Router({
  mode: 'hash',
  routes: routers
})