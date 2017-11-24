import { fetch } from './fetch'
// 用户登录模块
/**
 * 用户登陆
 */
export const Login = loginForm => fetch('elise/login', {
  method: 'post',
  data: {
    loginName: loginForm.account,
    pwd: loginForm.password
  }
})
/**
 * 用户退出
 */
export const LoginOut = params => fetch('sign/signOut', {method: 'post', data: params})

// 任务模块
/**
 * 任务列表
 */
export const taskList = params => fetch('task/list', {
  method: 'post',
  data: params
})

/**
 * 任务签出
 */
export const taskCheckout = params => fetch('task/checkout', {
  method: 'post',
  data: params
})
/**
 * 任务添加
 */
export const taskAdd = params => fetch('task/add', {
  method: 'post',
  data: params
})
/***
 * 任务匹配
 */
export const matchingModel = params => fetch('task/matchingModel', {
  method: 'post',
  data: params
})
/***
 * 任务操控
 */
export const queryCollectionHistory = params => fetch('task/queryCollectionHistory', {
  method: 'post',
  data: params
})
/***
 * 任务签入
 */
export const taskCheckin = params => fetch('task/checkin', {
  method: 'post',
  data: params
})
/**
 * 任务详情
 */
export const taskQuery = params => fetch('task/query', {
  method: 'post',
  data: params
})

// 模型模块
/**
 * 字典类型
 */
export const queryType = params => fetch('pagemodel/querytype', {
  method: 'post',
  data: params
})
/***
 * 模型列表
 */
export const pageModelList = params => fetch('pagemodel/list', {
  method: 'post',
  data: params
})
/***
 * 模型删除
 */
export const pageModelDelete = params => fetch('pagemodel/delete', {
  method: 'post',
  data: params
})
/***
 * 模型添加
 */
export const pageModelAdd = params => fetch('pagemodel/add', {
  method: 'post',
  data: params
})
/**
 * 模型详情
 */
export const pageModelQuery = params => fetch('pagemodel/query', {
  method: 'post',
  data: params
})
/**
 * 模型签出
 */
export const pageModelCheckout = params => fetch('pagemodel/checkout', {
  method: 'post',
  data: params
})
/**
 * 模型签入
 */
export const pageModelCheckIn = params => fetch('pagemodel/checkin', {
  method: 'post',
  data: params
})
/**
 * 模型测试
 */
export const pageModelTest = params => fetch('http://192.168.10.144:8686/modelVerify/getPageModelAttribute', {
  method: 'post',
  data: params
})
/**
 * 模型测试历史记录
 */
export const pageModelTestHistory = params => fetch('http://192.168.10.93:8686/modelVerify/getTestUrls', {
  method: 'get',
  params: params
})
/**
 * 模型测试历史记录删除
 */
export const pageModelTestHistoryDelete = params => fetch('http://192.168.10.93:8686/modelVerify/deleteTestUrl', {
  method: 'get',
  params: params
})

// 站点模块
/***
 * 站点列表
 */
export const siteList = params => fetch('site/list', {
  method: 'post',
  data: params
})
/***
 * 站点添加
 */
export const siteAdd = params => fetch('site/add', {
  method: 'post',
  data: params
})
/**
 * 站点删除
 */
export const siteDelete = params => fetch('site/delete', {
  method: 'post',
  data: params
})
/***
 * 站点签出
 */
export const siteCheckOut = params => fetch('site/checkout', {
  method: 'post',
  data: params
})
/***
 * 站点签入
 */
export const siteCheckIn = params => fetch('site/checkin', {
  method: 'post',
  data: params
})
/**
 * 统计站点
 */
export const siteNum = (params) => fetch('site/sitenum', {
  method: 'post',
  data: params
})
/**
 * 站点加载
 */
export const listSiteName = params => fetch('site/listsitename', {
  method: 'post',
  data: params
})

// 日志模块
/***
 * 异常任务列表
 */
export const taskLogList = params => fetch('taskLog/exceptionTaskList', {
  method: 'post',
  data: params
})
/***
 * 任务抓取统计
 */
export const taskLogStatistic = params => fetch('taskLog/crawlingStatistic', {
  method: 'get',
  params: params
})

// 用户模块
/***
 * 用户列表
 */
export const userList = params => fetch('user/list', {
  method: 'post',
  data: params
})
/***
 * 用户删除
 */
export const userDelete = params => fetch('user/delete', {
  method: 'post',
  data: params
})
/***
 * 用户状态更改
 */
export const userUpdateEnableds = params => fetch('user/updateEnableds', {
  method: 'post',
  data: params
})
/**
 * 用户添加
 */
export const userAdd = params => fetch('user/add', {
  method: 'post',
  data: params
})
/***
 * 用户详情
 */
export const userGet = params => fetch('user/get', {
  method: 'post',
  data: params
})
/***
 * 用户信息修改
 */
export const userUpdate = params => fetch('user/update', {
  method: 'post',
  data: params
})
