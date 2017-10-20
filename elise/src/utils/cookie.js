import Cookies from 'js-cookie'

export const getCookie = params => Cookies.get(params)   // 获取Cookies属性值
export const removeCookie = params => Cookies.remove(params)  // 删除Cookies属性值
export const setCookie = (params, payload) => Cookies.set(params, payload) // 设置Cookies 属性值