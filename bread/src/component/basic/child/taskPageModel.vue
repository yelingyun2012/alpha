<template lang="pug">
  section.task-manager-page
    Form(:label-width="100")
      FormItem(label='站点:')
        Select(style="width:300px", v-model='siteVal')
          Option(v-for="site in siteData", :value="site.siteId", :key="site.siteId") {{site.siteName}}
      FormItem(label='采集起始地址:')
        Input(style='width:300px', v-model="startAddressVal")
        Button(type='primary', @click="handleMate").mate 匹配
      FormItem(label='更多起始地址')
        Input(type="textarea", :rows="6", style='width:600px', v-model="moreStartAddressVal")
</template>
<script>
  import { listSiteName, matchingModel } from '../../../config/getData'
  import { getCookie } from '../../../utils/cookie'

  export default {
    name: 'TaskPageModel',
    data () {
      return {
        siteData: [],
        siteVal: '',
        startAddressVal: '',
        moreStartAddressVal: ''
      }
    },
    methods: {
      handleMate () {
        matchingModel({
          siteId:this.siteVal,
          token:getCookie('token')
        }).then(response => {
          console.log(response)
        })
      }
    },
    created () {
      listSiteName({token: getCookie('token')}).then(response => {
        this.siteData = response.data.data
        this.siteVal = this.siteData[0].siteId
      })
    }
  }
</script>
<style lang="stylus">
  .task
    &-manager
      &-page
        padding 20px
        margin-top -16px
        .mate
          margin-left: 15px
  .ivu-form .ivu-form-item-label
    font-size 14px
    color #323232
</style>

