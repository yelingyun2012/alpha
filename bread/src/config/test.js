const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: Main,
  children: [
    { path: 'home', title: '首页', name: 'home_index' },
    { path: 'ownspace', title: '个人中心', name: 'ownspace_index' },
    { path: 'order/:order_id', title: '订单详情', name: 'order_info' },  // 用于展示动态路由
    { path: 'shopping', title: '购物详情', name: 'shopping' },  // 用于展示带参路由
    { path: 'message', title: '消息中心', name: 'message_index' }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
const appRouter = [
  {
    path: '/access',
    icon: 'key',
    name: 'access',
    title: '权限管理',
    component: Main,
    children: [
      { path: 'index', title: '权限管理', name: 'access_index' }
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
      { path: 'index', title: '权限测试页', name: 'accesstest_index' }
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
        title: '富文本编辑器'
      },
      {
        path: 'md-editor',
        icon: 'pound',
        name: 'md-editor',
        title: 'Markdown编辑器'
      },
      {
        path: 'image-editor',
        icon: 'crop',
        name: 'image-editor',
        title: '图片预览编辑'
      },
      {
        path: 'draggable-list',
        icon: 'arrow-move',
        name: 'draggable-list',
        title: '可拖拽列表'
      },
      {
        path: 'file-upload',
        icon: 'android-upload',
        name: 'file-upload',
        title: '文件上传'
      },
      {
        path: 'count-to',
        icon: 'arrow-graph-up-right',
        name: 'count-to',
        title: '数字渐变'
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
      { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose' },
      { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap' }

    ]
  },
  {
    path: '/tables',
    icon: 'ios-grid-view',
    name: 'tables',
    title: '表格',
    component: Main,
    children: [
      { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move' },
      { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit' },
      { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download' },
      { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images' }
    ]
  },
  {
    path: '/advanced-router',
    icon: 'ios-infinite',
    name: 'advanced-router',
    title: '高级路由',
    component: Main,
    children: [
      { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link' },
      { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send' }
    ]
  },
  {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    component: Main,
    children: [
      { path: 'index', title: '错误页面', name: 'errorpage_index' }
    ]
  }
]

function getRouterObjByName(routers, name) {
  let routerObj = {}
  routers.forEach(item => {
    if (item.name === 'otherRouter') {
      item.children.forEach((child, i) => {
        if (child.name === name) {
          routerObj = item.children[i]
        }
      })
    } else {
      if (item.children.length === 1) {
        if (item.children[0].name === name) {
          routerObj = item.children[0]
        }
      } else {
        item.children.forEach((child, i) => {
          if (child.name === name) {
            routerObj = item.children[i]
          }
        })
      }
    }
  })
  return routerObj
}

function toDefaultPage(routers, name, route, next) {
  let len = routers.length
  let i = 0
  let notHandle = true
  while (i < len) {
    if (routers[i].name === name && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      })
      notHandle = false
      next()
      break
    }
    i++
  }
  if (notHandle) {
    next()
  }
}

if (getRouterObjByName([otherRouter, ...appRouter], 'home').access !== undefined) {
  if (getRouterObjByName([otherRouter, ...appRouter], 'home').access === parseInt(Cookies.get('access'))) {
    toDefaultPage([otherRouter, ...appRouter], 'home', router, next)
  } else {
    router.replace({
      name: '/401'
    })
    next()
  }
} else {
  toDefaultPage([otherRouter, ...appRouter], 'home', router, next)
}