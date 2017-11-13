/**
 * 获取路由对象name
 * @param {*} routers 路由对象
 * @param {*} name 当前name属性
 */
export const getRouterObjByName = (routers, name) => {
  let routerObj = {}
  routers.forEach(item => {
    if (item.name === 'otherRouter') {
      item.children.forEach(child => {
        if (child.name === name) routerObj = child
      })
    }
    else {
      if (item.children.length === 1) {
        if (item.children[0].name === name) routerObj = item.children[0]
      }
      else {
        item.children.forEach(child => {
          if (child.name === name) routerObj = child
        })
      }
    }
  })
  return routerObj
}
/**
 * 设置打开路径
 * @param {*} vm vue中this对象
 * @param {*} name 当前name属性
 */
export const setCurrentPath = (vm, name) => {
  let title = ''
  let isOtherRouter = false
  vm.$store.state.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = item.title
        if (item.title === 'otherRouter') {
          isOtherRouter = true
        }
      }
    }
    else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = child.title
          if (item.title === 'otherRouter') {
            isOtherRouter = true
          }
        }
      })
    }
  })

}