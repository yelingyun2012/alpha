<template lang="pug">
  section.task-inform
    header
      .task-header-typeIn
        span.seed-name 种子名称:
        Input(placeholder='请输入采集种子名称', style="max-width:300px").typeIn
      .task-header-btn
        Button(type="success", v-if="$route.params.id==='alter'") 签出
        Button(type="success", v-if="$route.params.id==='alter'", style="margin-left:10px") 签入
        Button(type="success", v-if="$route.params.id==='add'") 保存
        Button(type="primary", @click="handleBack") 返回
    section.task-section
      Tabs(type='card')
        TabPane(label='基本属性')
          taskBasicAttribute
        TabPane(label='页面模型')
          taskPageModel
</template>
<script>
  import taskBasicAttribute from './taskBasicAttribute.vue'
  import taskPageModel from './taskPageModel.vue'

  export default {
    name: 'TaskManagerChild',
    methods: {
      handleBack () {
        this.$router.push('/basic/taskManager')
      }
    },
    components: {
      taskBasicAttribute,
      taskPageModel
    },
    created () {
    }
  }
</script>
<style lang="stylus">
  .task
    &-inform
      padding 30px 20px 20px
      background-color #ffffff
      .seed-name
        font-size 14px
        color #323232
      .typeIn
        margin-left 4px
      header
        display flex
    &-header
      &-typeIn
        display block
        flex-grow 1
        flex-shrink 1
      &-btn
        display block
        .ivu-btn
          padding 6px 23px
          font-size 14px
          &:last-child
            margin-left 10px
    &-section
      margin-top 40px
      .ivu-tabs-tabpane:first-child
        padding-bottom 300px
</style>
<style lang="stylus">
  .ivu-input
    height 36px
</style>


