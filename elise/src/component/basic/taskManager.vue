<template lang="pug">
  section
    aside.task-name
      span.explain 任务名称 :
      Input(placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="success") 查询
      Button(@click="handleAdd") 新增
    aside.task-minute
      header.task-site
        span.task-site-active 全部
        span 百度外卖 深圳(10)
      section.task-mission
        Table(:columns="taskColumns")
        Page(:total="100", show-elevator, show-total)
</template>
<script>
  export default {
    name: 'TaskManager',
    data () {
      return {
        taskColumns: [
          {title: 'ID'},
          {title: '任务名称'},
          {title: '有效时间'},
          {title: '创建时间'},
          {title: '创建人'},
          {title: '优先级'},
          {title: '签出状态'},
          {title: '签出时间'},
          {title: '当前状态'},
          {title: '进度'},
          {title: '抽取率'},
          {title: '操作'}
        ]
      }
    },
    methods: {
      handleAdd () {
        this.$router.push('/basic/taskManagerChild/add')
      }
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
        margin-left 3px
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
</style>