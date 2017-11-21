<template lang="pug">
  section
    aside.task-name
      span.explain 任务名称 :
      Input(v-model='taskName', placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="primary", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.task-minute
      header.task-site
        template(v-for="(item,index) of siteList")
          span(:class="{'task-site-active':activeIndex===index}", :key="item.number", @click="handleCut(index,item.siteId)") {{item.siteName}}
            i(style='font-style: inherit;', v-if='item.siteName!=="全部"') ({{item.number}})
      section.task-mission
        Table(:columns="taskColumns", :data="taskData", border)
        Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
</template>
<script>
  import { siteNum, taskList, queryCollectionHistory } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'TaskManager',
    data () {
      return {
        activeIndex: 0, // 站点初始化数据
        siteList: [{siteName: '全部', siteId: ''}],
        siteId: '', // 查询条件
        taskName: '',
        pageTotal: 0, // 分页插件初始化数据
        pageSize: 10,
        pageIndex: 1,
        taskData: [], // 表格初始化数据
        taskColumns: [
          {title: 'ID', width: 50, align: 'center', key: 'taskId'},
          {
            title: '任务名称',
            render: (h, params) => {
              return h('router-link',
                {
                  attrs: {
                    to: {
                      path: '/taskManagerChild/alter',
                      query: {
                        checkType: `${params.row.checkType}`,
                        taskId: `${params.row.taskId}`,
                        updatePersonId: `${params.row.updatePersonId}`,
                        status: `${params.row.status}`
                      }
                    }
                  }
                }, params.row.taskName)
            }
          },
          {
            title: '有效时间', width: 180,
            render: (h, params) => {
              if (params.row.startTime !== undefined)
                return `${params.row.startTimes.split(' ')[0]} ~ ${params.row.endTimes.split(' ')[0]}`
            }
          },
          {title: '创建时间', width: 85, align: 'center', key: 'createTimes'},
          {
            title: '上次运行时间', width: 100, align: 'center',
            render: (h, params) => {
              if (params.row.lastCrawlTimes !== null) {
                return h('div', [
                  h('p', `${params.row.lastCrawlTimes.split(' ')[0]}`),
                  h('p', `${params.row.lastCrawlTimes.split(' ')[1]}`)
                ])
              }
            }
          },
          {title: '创建人', width: 70, align: 'center', key: 'createName'},
          {
            title: '优先级', width: 60, align: 'center',
            render: (h, params) => {
              switch (params.row.priority) {
                case 1:
                  return `高`
                  break
                case 2:
                  return `中`
                  break
                case 3:
                  return `低`
                  break
              }
            }
          },
          {
            title: '签出状态', align: 'center', width: 150,
            render: (h, params) => {
              switch (params.row.checkType) {
                case 0:
                  return h('span', {'class': {signInTab: true}}, '已签入')
                  break
                case 1:
                  return h('span', {'class': {signOutTab: true}}, `已签出${params.row.updatePersonName}`)
                  break
              }
            }
          },
          {title: '签出时间', width: 85, align: 'center', key: 'updateTimes'},
          {
            title: '当前状态', width: 70, align: 'center',
            render: (h, params) => {
              switch (params.row.status) {
                case 0:
                  return `停止`
                  break
                case 1:
                  return `运行中`
                  break
                case 2:
                  return `暂停`
                  break
                case 3:
                  return `删除`
                  break
                case 4:
                  return `已完成`
                  break
              }
            }
          },
          {
            title: '进度',
            render: (h, params) => {return params.row.speedOfProgress > 0 ? `${params.row.speedOfProgress}%` : params.row.speedOfProgress}
          },
          {
            title: '抽取率',
            width: 60,
            align: 'center',
            render: (h, params) => {return params.row.extractionRate > 0 ? `${params.row.extractionRate}%` : params.row.extractionRate}
          },
          {
            title: '操作',
            key: 'operate',
            render: (h, params) => {
              // 停止操作
              let secure = h('span',
                {
                  on: {
                    click: event => {
                      (async ()=> {
                        try {
                          await queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 0,
                            token: getCookie('token')
                          })
                          params.row.status = 0
                        } catch (error) {
                          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
                        }
                      })()
                    }
                  }
                }, '停止')
              // 启动操作
              let startUpFunction = h('span', {
                on: {
                  click: event => {
                    (async ()=> {
                      try {
                        await queryCollectionHistory({
                          taskId: params.row.taskId,
                          statusId: 1,
                          token: getCookie('token')
                        })
                        params.row.status = 1
                      } catch (error) {
                        this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
                      }
                    })()
                  }
                }
              }, '启动')
              // 暂停操作
              let suspendOperations = h('span',
                {
                  on: {
                    click: event => {
                      (async ()=> {
                        try {
                          await queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 2,
                            token: getCookie('token')
                          })
                          params.row.status = 2
                        } catch (error) {
                          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
                        }
                      })()
                    }
                  }
                }, '暂停')
              // 删除操作
              let deleteOperation = h('span', {
                on: {
                  click: event => {
                    (async ()=> {
                      try {
                        await queryCollectionHistory({
                          taskId: params.row.taskId,
                          statusId: 3,
                          token: getCookie('token')
                        })
//                        params.row.status = 3
                        this.taskData.splice(params.index, 1)
                      } catch (error) {
                        this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
                      }
                    })()
                  }
                }
              }, '删除')
              switch (params.row.status) {
                case 0:
                  return h('div', [startUpFunction, deleteOperation])
                  break
                case 1:
                  return h('div', [secure, suspendOperations, deleteOperation])
                  break
                case 2:
                  return h('div', [secure, startUpFunction, deleteOperation])
                  break
                case 4:
                  return h('div', [startUpFunction, deleteOperation])
                  break
              }
            }
          }
        ]
      }
    },
    mounted () {
      this.initSite()
      this.initTaskList()
    },
    methods: {
      handleSearch () {
        this.pageIndex = 1
        this.initTaskList()
      },
      handleAdd () {
        this.$router.push('/taskManagerChild/add')
      },
      handleCut (subscript, siteId) {
        this.activeIndex = subscript
        this.siteId = siteId
        this.pageIndex = 1
        this.initTaskList()
      },
      handlePage (pageIndex) {
        this.pageIndex = pageIndex
        this.initTaskList()
      },
      // 统计站点
      async initSite () {
        try {
          let res = await siteNum({token: getCookie('token'), typeId: 0})
          this.siteList = [...this.siteList, ...res.data.data]
        } catch (error) {
          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
        }
      },
      // 模型列表
      async initTaskList () {
        try {
          let res = await taskList({
            taskName: this.taskName,
            siteId: this.siteId,
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
            token: getCookie('token')
          })
          this.pageTotal = res.data.data.recordCount
          this.taskData = res.data.data.result
        } catch (error) {
          this.taskData = []
          this.$Message.error(error.match(/([^\[\]]+)(?=\])/g)[0])
        }
      }
    }
  }
</script>
<style lang="stylus">
  // 公共函数
  taskWrapper(top, right, bottom, left)
    padding top right bottom left
    background-color #fff
  tableDefault()
  .ivu-table-cell
    padding-right 10px
    padding-left 10px
  .task
    &-name // 任务名称
      margin-bottom 20px
      taskWrapper 30px 20px 30px 20px
      .ivu-input
        height 35px
      .explain
        color #323232
        font-size 14px
      .typeIn
        margin-right 30px
        margin-left 4px
      .ivu-btn
        padding 6px 23px
        &-success
          background-color rgba(23, 187, 156, 1)
          &:hover
            background-color rgba(23, 187, 156, .8)
        &:last-child
          margin-left 10px
          border-color #108EE9
          color #108EE9
          opacity .9
          &:hover
            border-color #57a3f3
            color #57a3f3
    &-minute // 任务详细
      taskWrapper 20px 20px 20px 20px
    &-site
      padding-bottom 10px
      border-bottom 1px dashed #B7B7B7
      span
        display inline-block
        padding 6px 15px
        color #589BEE
        font-size 14px
        cursor pointer
        &.task-site-active
          border-radius 4px
          background-color #2D8CF0
          color #fff
    &-mission
      margin-top 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
      .ivu-table-header
        tr
          th
            tableDefault()
      .ivu-table-body
        tr
          td
            tableDefault()
  .signInTab
    color #646464
    display inline-block
    padding 4px 10px
    opacity 0.7
    background #EBF8F2
    border 1px solid #A7E1C4
    border-radius 2px
  .signOutTab
    color #646464
    display inline-block
    padding 4px 10px
    opacity 0.7
    background #FFF5F4
    border 1px solid #FABEB9
    border-radius 2px
</style>









