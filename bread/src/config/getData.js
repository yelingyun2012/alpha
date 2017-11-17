import { fetch } from './fetch'

/**
 * 用户登陆
 */
export const Login = (loginForm) => fetch('elise/login', {
  method: 'post',
  data: {
    loginName: loginForm.account,
    pwd: loginForm.password
  }
})

/**
 * 用户退出
 */
export const LoginOut = (token) => fetch('account/logout', {
  method: 'post',
  data: {token}
})

/**
 * 统计站点
 */
export const siteNum = (params) => fetch('site/sitenum', {
  method: 'post',
  data: params
})

/**
 * 模型列表
 */
// export const pageModelList = (params) => fetch('pagemodel/list', {
//   method: 'post',
//   data: params
// })

/**
 * 任务列表
 */
export const taskList = (params) => fetch('task/list', {
  method: 'post',
  data: params
})
/**
 * 字典类型
 */
export const queryType = params => fetch('pagemodel/querytype', {
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
 * 模型删除
 */
export const pageModelAdd = params => fetch('pagemodel/add', {
  method: 'post',
  data: params
})
/***
 * 异常任务列表
 */
export const taskLog = params => fetch('taskLog/exceptionTaskList', {
  method: 'post',
  data: params
})