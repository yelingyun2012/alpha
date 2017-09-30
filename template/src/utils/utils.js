import * as fundebug from 'fundebug-javascript'
import Cookies from 'js-cookie'

/**
 * 引入代码在线监控
 */
fundebug.apikey = `193c68f5a0b0cb42703a7fa4224574d06bac33dd803da781289df5dffb2894cd`

/**
 * 操作Cookie模块
 */
// 获取存储的Cookie值
export const getCookie = name => Cookies.get(name)
// 删除存储的Cookie值
export const removeCookie = name => Cookies.remove(name)
// 设置存储的Cookie值
export const setCookie = (name, params) => Cookies.set(name, params)

