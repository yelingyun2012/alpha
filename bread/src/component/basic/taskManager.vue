<template lang="pug">
  section
    aside.task-name
      span.explain 任务名称 :
      Input(v-model='searchName', placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="success", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.task-minute
      header.task-site
        template(v-for="(item,index) of siteList")
          span(:class="{'task-site-active':activeIndex===index}", :key="item.number", @click="handleCut(index,item.siteId)") {{item.siteName}}
            i(style='font-style: inherit;', v-if='item.siteName!=="全部"') ({{item.number}})
      section.task-mission
        Table(:columns="taskColumns",:data="taskData")
        Page(:total="pageTotal", show-elevator, show-total, @on-change="handlePage")
</template>
<script>
  import { siteNum, taskList } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'TaskManager',
    data () {
      return {
        activeIndex: 0,
        pageTotal: 0,
        pageSize: 10,
        pageIndex: 1,
        searchName: '',
        siteId: '',
        taskName: '',
        siteList: [
          {
            siteName: '全部',
            siteId: ''
          }
        ],
        taskColumns: [
          {title: 'ID', key: 'taskId'},
          {
            title: '任务名称',
            render: (h, params) => {
              return h(
                'router-link',
                {
                  props: {
                    to: '/taskManagerChild/alter'
                  }
                },
                params.row.strategyName
              )
            }
          },
          {
            title: '有效时间',
            render: (h, params) => {
              if (params.row.startTime !== undefined)
                return `${params.row.startTime} ~ ${params.row.endTime}`
            }
          },
          {title: '创建时间', key: 'createTimes'},
          {title: '上次更新时间', key: 'lastCrawlTime'},
          {title: '创建人', key: 'createName'},
          {
            title: '优先级',
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
            title: '签出状态',
            render: (h, params) => {
              switch (params.row.checkType) {
                case 0:
                  return `未签出`
                  break
                case 1:
                  return `签出`
                  break
              }
            }
          },
          {title: '签出时间', key: 'updateTimes'},
          {
            title: '当前状态',
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
          {title: '进度', key: 'speedOfProgress'},
          {title: '抽取率', key: 'extractionRate'},
          {title: '操作', key: 'operate'}
        ],
        taskData: [
          {
            id: 123,
            taskName: 'Haas的',
            validTime: '2017-05-06',
            createdTime: '2017-08-09',
            createPeople: '哈哈',
            priority: 1,
            checkOutTheStatus: true,
            checkOutTime: '2018-06-04',
            currentState: false,
            plan: '20%',
            extractionRate: '20%',
            operate: 'asdad'
          }
        ]
      }
    },
    methods: {
      initSite () {
        // 统计站点
        siteNum({
          token: getCookie('token'),
          typeId: 0
        }).then(response => {
          this.siteList = this.siteList.concat(response.data.data)
        })
      },
      initTaskList ({
                      taskName = this.taskName,
                      siteId = this.siteId,
                      pageSize = this.pageSize,
                      pageIndex = this.pageIndex
                    }) {
        // 模型列表
        taskList({
          taskname: taskName,
          siteId: siteId,
          pageSize: pageSize,
          pageIndex: pageIndex,
          token: getCookie('token')
        }).then(response => {
          this.pageTotal = response.data.data.recordCount
          this.taskData = response.data.data.result
        })
      },
      handleSearch () {
        this.initTaskList({taskName: this.searchName})
      },
      handleAdd () {
        this.$router.push('/taskManagerChild/add')
      },
      handleCut (subscript, siteId) {
        this.activeIndex = subscript
        this.siteId = siteId
        this.initTaskList({siteId: this.siteId})
      },
      handlePage (pageIndex) {
        this.pageIndex = pageIndex
        this.initTaskList({})
      }
    },
    created () {
      this.initSite()
      this.initTaskList({})
    }
  }
</script>
<style lang="stylus" scoped>
  // 公共函数
  taskWrapper(top, right, bottom, left) {
    background-color: #fff;
    padding: top right bottom left;
  }
  .task {
    &-name { // 任务名称
      taskWrapper: 30px 20px 30px 20px;
      margin-bottom: 20px;

      .explain {
        font-size: 14px;
        color: #323232;
      }

      .typeIn {
        margin-right: 30px;
        margin-left: 4px;
      }

      .ivu-btn {
        padding: 6px 23px;
        font-size: 14px;

        &-success {
          background-color: rgba(23, 187, 156, 1);

          &:hover {
            background-color: rgba(23, 187, 156, 0.8);
          }
        }

        &:last-child {
          margin-left: 10px;
          color: #17BB9C;
          border-color: #17BB9C;

          &:hover {
            color: #57a3f3;
            border-color: #57a3f3;
          }
        }
      }
    }

    &-minute { // 任务详细
      taskWrapper: 20px 20px 20px 20px;
    }

    &-site {
      padding-bottom: 10px;
      border-bottom: 1px dashed #B7B7B7;

      span {
        font-size: 14px;
        color: #589BEE;
        display: inline-block;
        padding: 6px 15px;

        &.task-site-active {
          background-color: #2D8CF0;
          color: #fff;
          border-radius: 4px;
        }
      }
    }

    &-mission {
      margin-top: 20px;

      .ivu-page {
        margin-top: 20px;
        margin-right: 20px;
        text-align: right;
      }
    }
  }
</style>
<style lang="stylus">
  // 公共函数
  taskWrapper(top, right, bottom, left) {
    background-color: #fff;
    padding: top right bottom left;
  }
  .task {
    &-name { // 任务名称
      taskWrapper: 30px 20px 30px 20px;
      margin-bottom: 20px;

      .explain {
        font-size: 14px;
        color: #323232;
      }

      .typeIn {
        margin-right: 30px;
        margin-left: 4px;
      }

      .ivu-btn {
        padding: 6px 23px;
        font-size: 14px;

        &-success {
          background-color: rgba(23, 187, 156, 1);

          &:hover {
            background-color: rgba(23, 187, 156, 0.8);
          }
        }

        &:last-child {
          margin-left: 10px;
          color: #17BB9C;
          border-color: #17BB9C;

          &:hover {
            color: #57a3f3;
            border-color: #57a3f3;
          }
        }
      }
    }

    &-minute { // 任务详细
      taskWrapper: 20px 20px 20px 20px;
    }

    &-site {
      padding-bottom: 10px;
      border-bottom: 1px dashed #B7B7B7;

      span {
        font-size: 14px;
        color: #589BEE;
        display: inline-block;
        padding: 6px 15px;

        &.task-site-active {
          background-color: #2D8CF0;
          color: #fff;
          border-radius: 4px;
        }
      }
    }

    &-mission {
      margin-top: 20px;

      .ivu-page {
        margin-top: 20px;
        margin-right: 20px;
        text-align: right;
      }
    }
  }
</style>