<template lang="pug">
  section.task-manager-basic
      Form(:label-width="130")
        Row
          Col(span="8")
            FormItem(label='任务周期类型:')
              Select(style='width:300px')
                Option
          Col(span="8")
            FormItem(label="编码:")
              Select(style='width:300px')
                Option
        Row
          Col(span="8")
            FormItem(label="页面请求方式:")
              Select(style='width:300px')
                Option
          Col(span="8")
            FormItem(label="需要URL去重:")
              checkbox
        Row
          Col(span="8")
            FormItem(label="URL去重保留时长:")
              Select(style='width:300px')
                Option
          Col(span="8")
            FormItem(label="连接超时时间:")
              Select(style='width:300px')
                Option
        Row
          Col(span="8")
            FormItem(label="最大重试次数:")
              Select(style='width:300px')
                Option
          Col(span="8")
            FormItem(label="是否需要代理:")
              Select(style='width:300px')
                Option
        Row
          Col(span="8")
            FormItem(label="优先级:")
              Select(style='width:300px')
                Option
          Col(span="8")
            FormItem(label="采集时间间隔:")
              Select(style='width:300px')
                Option
        FormItem(label="用户代理:")
          Input(style="width:58%")
        Col(span="8")
          FormItem(label="采集开始时间:")
            DatePicker(type="date", placeholder="选择日期", style="width: 300px")
        Col(span="8")
          FormItem(label="采集结束时间:")
            DatePicker(type="date", placeholder="选择日期", style="width: 300px")
</template>
<script>
  export default {
    name: 'TaskBasicAttribute'
  }
</script>
<style lang="stylus">
  .task
    &-manager
      &-basic
        padding 20px
        margin-top -16px
</style>
