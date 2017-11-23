export const setCurrentPath = (vm, name) => {
  let currentPathArr = []
  let currentPathObj = vm.$store.state.permission.routers.filter(item => {
    if (item.children.length <= 1) {
      return item.children[0].name === name
    } else {
      let [i, childArr] = [0, item.children]
      let len = childArr.length
      while (i < len) {
        if (childArr[i].name === name) {
          return true
        }
        i++
      }
      return false
    }
  })[0]
  if (currentPathObj.name === 'otherRouter') {
    return false
  } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
    currentPathArr = [{
      title: currentPathObj.title,
      path: '',
      name: name
    }]
  } else {
    let childObj = currentPathObj.children.filter(child => {
      return child.name === name
    })[0]
    currentPathArr = [{
      title: currentPathObj.title,
      path: '',
      name: currentPathObj.name
    }, {
      title: childObj.title,
      path: `${currentPathObj.path}/${childObj.path}`,
      name: name
    }]
  }
  vm.$store.commit('permission/setCurrentPath', currentPathArr)
  return currentPathArr
}
