import Vue from 'vue'
import Router from 'vue-router'
/* login */
import login from '../component/login/login.vue'
/* error */
import Error404 from '../component/error/404.vue'
/* dashboard */
import dashboard from '../component/dashboard/index.vue'
import message from '../component/dashboard/message.vue'
import upload from '../component/dashboard/upload.vue'
/* layout */
import layout from '../component/layout/index.vue'
/* categorySku */
import categorySku from '../component/category/categorySku.vue'
import brandSku from '../component/category/brandSku.vue'
import categoryRang from '../component/category/categoryRang.vue'
import brandRang from '../component/category/brandRang.vue'
/* basic */
import basic from '../component/basicData/index.vue'
/*supplier*/
import supplier from '../component/supplier/index.vue'
/*feedback*/
import feedback from '../component/feedback/index.vue'
import present from '../component/feedback/present.vue'
/* manage */
import manage from '../component/manage/index.vue'
import addUser from '../component/manage/addUser.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/404',
    component: Error404,
    hidden: true
  },
  {
    path: '/',
    name: '首页',
    redirect: '/dashboard',
    component: layout,
    hidden: true,
    children: [{path: 'dashboard', component: dashboard}]
  },
  {
    path: '/dashboard',
    name: '商品比价',
    redirect: '/dashboard/index',
    component: layout,
    icon: 'search',
    children: [
      {path: 'index', component: dashboard, name: '商品比价列表'},
      {path: 'message', component: message, name: '商品详细信息', hidden: true},
      {path: 'upload', component: upload, name: '上传比价商品'}
    ]
  },
  {
    path: '/basic',
    name: 'basic',
    redirect: '/basic/index',
    component: layout,
    icon: 'android-share-alt',
    noDropdown: true,
    children: [{path: 'index', name: '商品基础数据', component: basic}]
  },
  {
    path: '/category',
    name: '品类统计数据',
    redirect: '/category/categorySku',
    component: layout,
    icon: 'android-menu',
    children: [
      {path: 'categorySku', component: categorySku, name: '品类SKU数据'},
      {path: 'brandSku', component: brandSku, name: '品牌SKU数据'},
      {path: 'categoryRang', component: categoryRang, name: '品类价格带数据'},
      {path: 'brandRang', component: brandRang, name: '品牌价格带数据'},
    ]
  },
  {
    path: '/supplier',
    name: 'supplier',
    redirect: '/supplier/index',
    component: layout,
    icon: 'ios-pie',
    noDropdown: true,
    children: [
      {
        path: 'index',
        name: '供应商信息',
        component: supplier
      }
    ]
  },
  {
    path: '/present',
    name: 'present',
    redirect: '/present/index',
    component: layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: '客户提交列表',
        component: present
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/manage',
    name: 'manage',
    redirect: '/manage/index',
    component: layout,
    meta: { role: ['Admin'] },
    icon: 'person-stalker',
    noDropdown: true,
    children: [
      {
        path: 'index',
        name: '用户管理',
        component: manage
      },
      {
        path: 'addUser/:id',
        name: '添加用户',
        component: addUser
      }
    ]
  },
  {
    path: '/feedback',
    name: 'feedback',
    meta: { role: ['Admin'] },
    redirect: '/feedback/index',
    component: layout,
    icon: 'ios-email',
    noDropdown: true,
    children: [
      {
        path: 'index',
        name: '客户反馈',
        component: feedback
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]