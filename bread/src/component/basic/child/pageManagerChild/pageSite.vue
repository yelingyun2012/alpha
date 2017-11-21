<template lang="pug">
  section.siteData
    RadioGroup(v-model="siteId")
      Radio(v-for="site in siteData", :label="site.siteId", :key="site.siteId") {{site.siteName}}
</template>
<script>
  import { listSiteName } from '../../../../config/getData'
  import { getCookie } from '../../../../utils/cookie'

  export default {
    name: 'pageSite',
    data () {
      return {
        siteId: 1,
        siteData: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      //获取列表
      getData () {
        listSiteName({token: getCookie('token')}).then(response => {
          this.siteData = response.data.data
          this.siteId = this.siteData[0].siteId
        })
      },
      //提交
     pageSiteSubmit () {
       this.$emit('siteData', this.siteId)
     }
    }
  }
</script>

<style lang="stylus">
.siteData{
  margin:0 20px;
  label.ivu-radio-wrapper{
    display block
    margin-bottom: 20px;
  }
}
</style>
