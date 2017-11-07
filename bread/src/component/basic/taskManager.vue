<template lang="pug">
  section
    aside.task-name
      span.explain 任务名称 :
      Input(placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="success", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.task-minute
      header.task-site
        template(v-for="(item,index) of siteList")
          span(:class="{'task-site-active':activeIndex===index}", :key="item.number", @click="handleCut(index)") {{item.siteName}}
            i(style='font-style: inherit;', v-if='item.siteName!=="全部"') ({{item.number}})
      section.task-mission
        Table(:columns="taskColumns",:data="taskData")
        Page(:total="100", show-elevator, show-total)
</template>
<script>
  import { siteNum, pageModelList } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'TaskManager',
    data () {
      return {
        activeIndex: 0,
        siteList: [
          {
            siteName: '全部',
          }
        ],
        taskColumns: [
          {title: 'ID', key: 'id'},
          {
            title: '任务名称',
            key: 'taskName',
            render: (h, params) => {
              return h('router-link', {
                props: {
                  to: '/taskManagerChild/alter'
                }
              }, params.row.taskName)
            }
          },
          {title: '有效时间', key: 'validTime'},
          {title: '创建时间', key: 'createdTime'},
          {title: '创建人', key: 'createPeople'},
          {title: '优先级', key: 'priority'},
          {title: '签出状态', key: 'checkOutTheStatus'},
          {title: '签出时间', key: 'checkOutTime'},
          {title: '当前状态', key: 'currentState'},
          {title: '进度', key: 'plan'},
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
      initSite () { // 统计站点
        siteNum({token: getCookie('token')}).then(response => {
          this.siteList = this.siteList.concat(response.data.data)
        })
      },
      initPageModelList () {  // 模型列表
        pageModelList({
          taskname: '',
          siteId: '',
          pageSize: 10,
          pageIndex: 1,
          token: getCookie('token')
        }).then(response => {

        })
      },
      handleSearch () {

      },
      handleAdd () {
        this.$router.push('/taskManagerChild/add')
      },
      handleCut (subscript) {
        this.activeIndex = subscript
      }
    },
    created () {
      this.initSite()
    }
  }
</script>
<style lang="stylus" scoped>
  // 公共函数
  taskWrapper(top, right, bottom, left)
    background-color #fff
    padding top right bottom left
  .task
    &-name // 任务名称
      taskWrapper 30px 20px 30px 20px
      margin-bottom 20px
      .explain
        font-size 14px
        color #323232
      .typeIn
        margin-right 30px
        margin-left 4px
      .ivu-btn
        padding 6px 23px
        font-size 14px
        &-success
          background-color rgba(23, 187, 156, 1)
          &:hover
            background-color rgba(23, 187, 156, 0.8)
        &:last-child
          margin-left 10px
          color #17BB9C
          border-color #17BB9C
          &:hover
            color #57a3f3
            border-color #57a3f3
    &-minute // 任务详细
      taskWrapper 20px 20px 20px 20px
    &-site
      padding-bottom 10px
      border-bottom 1px dashed #B7B7B7
      span
        font-size 14px
        color #589BEE
        display inline-block
        padding 6px 15px
        &.task-site-active
          background-color #2D8CF0
          color #fff
          border-radius 4px
    &-mission
      margin-top: 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
</style>
<style lang="stylus">
  .ivu-input
    font-size 14px
    height 36px
</style>