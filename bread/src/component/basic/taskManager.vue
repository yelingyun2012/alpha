<template lang="pug">
  section
    aside.task-name
      span.explain 任务名称 :
      Input(v-model='taskName', placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="success", @click="handleSearch") 查询
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
import { siteNum, taskList, queryCollectionHistory } from "../../config/getData"
import { getCookie } from "../../utils/cookie"

export default {
  name: "TaskManager",
  data() {
    return {
      activeIndex: 0,
      pageTotal: 0,
      pageSize: 10,
      pageIndex: 1,
      searchName: "",
      siteId: "",
      taskName: "",
      siteList: [
        {
          siteName: "全部",
          siteId: ""
        }
      ],
      taskColumns: [
        {
          title: "ID",
          width: 50,
          align: "center",
          key: "taskId"
        },
        {
          title: "任务名称",
          render: (h, params) => {
            return h(
              "router-link",
              {
                props: {
                  to: {
                    path: "/taskManagerChild/alter",
                    query: {
                      checkType: `${params.row.checkType}`,
                      taskId: `${params.row.taskId}`,
                      updatePersonId: `${params.row.updatePersonId}`,
                      status: `${params.row.status}`
                    }
                  }
                }
              },
              params.row.taskName
            )
          }
        },
        {
          title: "有效时间",
          render: (h, params) => {
            if (params.row.startTime !== undefined)
              return `${params.row.startTimes.split(
                " "
              )[0]} ~ ${params.row.endTimes.split(" ")[0]}`
          }
        },
        {
          title: "创建时间",
          width: 85,
          align: "center",
          key: "createTimes"
        },
        {
          title: "上次运行时间",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.lastCrawlTime !== 0) {
              return h("div", [
                h("p", `${params.row.lastCrawlTime.split(" ")[0]}`),
                h("p", `${params.row.lastCrawlTime.split(" ")[1]}`)
              ])
            } else {
              return `${params.row.lastCrawlTime}`
            }
          }
        },
        {
          title: "创建人",
          width: 70,
          align: "center",
          key: "createName"
        },
        {
          title: "优先级",
          width: 60,
          align: "center",
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
          title: "签出状态",
          render: (h, params) => {
            switch (params.row.checkType) {
              case 0:
                return h(
                  "span",
                  {
                    style: {
                      color: "#646464",
                      display: "inline-block",
                      padding: "4px 10px",
                      opacity: "0.7",
                      background: "#EBF8F2",
                      border: "1px solid #A7E1C4",
                      borderRadius: "2px"
                    }
                  },
                  "未签出"
                )
                break
              case 1:
                return h(
                  "span",
                  {
                    style: {
                      color: "#646464",
                      display: "inline-block",
                      padding: "4px 10px",
                      opacity: "0.7",
                      background: "#EBF8F2",
                      border: "1px solid #FABEB9",
                      borderRadius: "2px"
                    }
                  },
                  `已签出${params.row.updatePersonName}`
                )
                break
            }
          }
        },
        {
          title: "签出时间",
          width: 85,
          align: "center",
          key: "updateTimes"
        },
        {
          title: "当前状态",
          width: 70,
          align: "center",
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
          title: "进度",
          key: "speedOfProgress"
        },
        {
          title: "抽取率",
          width: 60,
          align: "center",
          key: "extractionRate"
        },
        {
          title: "操作",
          key: "operate",
          render: (h, params) => {
            let a
            switch (params.row.status) {
              case 0:
                return (a = [
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 1,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              params.row.status = 1
                            }
                          })
                        }
                      }
                    },
                    "启动"
                  ),
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          let _this = this
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 3,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              this.remove(params.index)
                            }
                          })
                        }
                      }
                    },
                    "删除"
                  )
                ])
                break
              case 1:
                return (a = [
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 0,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              params.row.status = 0
                            }
                          })
                        }
                      }
                    },
                    "停止"
                  ),
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 2,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              params.row.status = 2
                            }
                          })
                        }
                      }
                    },
                    "暂停"
                  ),
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 3,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              this.remove(params.index)
                            }
                          })
                        }
                      }
                    },
                    "删除"
                  )
                ])
                break
              case 2:
                return (a = [
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 0,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              params.row.status = 0
                            }
                          })
                        }
                      }
                    },
                    "停止"
                  ),
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 1,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              params.row.status = 1
                            }
                          })
                        }
                      }
                    },
                    "启动"
                  ),
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 3,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              this.remove(params.index)
                            }
                          })
                        }
                      }
                    },
                    "删除"
                  )
                ])
                break
              case 4:
                return (a = [
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 1,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              params.row.status = 1
                            }
                          })
                        }
                      }
                    },
                    "启动"
                  ),
                  h(
                    "span",
                    {
                      on: {
                        click: event => {
                          queryCollectionHistory({
                            taskId: params.row.taskId,
                            statusId: 3,
                            token: getCookie("token")
                          }).then(response => {
                            if (response.data.respCode !== "0") {
                              this.$Message.warning(response.data.respMsg)
                            } else {
                              this.remove(params.index)
                            }
                          })
                        }
                      }
                    },
                    "删除"
                  )
                ])
                break
            }
            return h("div", a)
          }
        }
      ],
      taskData: []
    }
  },
  methods: {
    remove(index) {
      this.taskData.splice(index, 1)
    },
    initSite() {
      // 统计站点
      siteNum({
        token: getCookie("token"),
        typeId: 0
      }).then(response => {
        this.siteList = this.siteList.concat(response.data.data)
      })
    },
    initTaskList() {
      // 模型列表
      taskList({
        taskName: this.taskName,
        siteId: this.siteId,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        token: getCookie("token")
      }).then(response => {
        if (response.data.data !== null) {
          this.pageTotal = response.data.data.recordCount
          this.taskData = response.data.data.result
        } else {
          this.taskData = []
        }
      })
    },
    handleSearch() {
      this.activeIndex = 0
      this.pageIndex = 1
      this.siteId = ""
      this.initTaskList()
    },
    handleAdd() {
      this.$router.push("/taskManagerChild/add")
    },
    handleCut(subscript, siteId) {
      this.activeIndex = subscript
      this.siteId = siteId
      this.initTaskList()
    },
    handlePage(pageIndex) {
      this.pageIndex = pageIndex
      this.initTaskList()
    }
  },
  created() {
    this.initSite()
    this.initTaskList()
  }
}
</script>
<style lang="stylus">
// 公共函数
taskWrapper(top,right,bottom,left)
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
      padding 7px 7px
      height auto
      font-size 14px
    .explain
      color #323232
      font-size 14px
    .typeIn
      margin-right 30px
      margin-left 4px
    .ivu-btn
      padding 6px 23px
      font-size 16px
      &-success
        background-color rgba(23,187,156,1)
        &:hover
          background-color rgba(23,187,156,.8)
      &:last-child
        margin-left 10px
        border-color #17BB9C
        color #17BB9C
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
</style>









