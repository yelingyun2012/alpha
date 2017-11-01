<template lang="pug">
  section.task-manager-page
    Form(:label-width="100")
      FormItem(label='站点:')
        Select(style="width:300px")
          Option
      FormItem(label='采集起始地址:')
        Input(style='width:300px')
        Button(type='primary').mate 匹配
      FormItem(label='更多起始地址')
        Input(type="textarea", :rows="6", style='width:600px')
</template>
<script>
  export default {
    name: 'TaskPageModel'
  }
</script>
<style lang="stylus">
  .task
    &-manager
      &-page
        padding 20px
        margin-top -16px
        .mate
          margin-left:15px
  .ivu-form .ivu-form-item-label
    font-size 14px
    color #323232
</style>

