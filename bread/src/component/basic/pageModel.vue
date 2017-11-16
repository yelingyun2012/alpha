<template lang="pug">
  section
    aside.page-name
      span.explain 页面模型名称 :
      Input(v-model='pageModelName', placeholder='请输入页面模型', style="width: 20%;max-width:300px").typeIn
      Button(type="success", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.page-minute
      header.page-site
        template(v-for="(item,index) of siteList")
          span(:class="{'task-site-active':activeIndex===index}", :key="item.number", @click="handleCut(index,item.siteId)") {{item.siteName}}
            i(v-if='item.siteName!=="全部"') ({{item.number}})
      section.page-mission
        Table(:columns="pageModelColumns", :data="pageModelData", border)

</template>
<script>
  import { taskList, siteNum } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'PageModel',
    data () {
      return {
        pageModelName: '',
        siteList: [
          {
            siteName: '全部',
            siteId: ''
          }
        ],
        pageModelColumns:[
          {
            title:'ID'
          },
          {
            title:'模型名称'
          },
          {
            title:'站点'
          },
          {
            title:'创建时间'
          },
          {
            title:'创建人'
          }
        ],
        pageModelData:[]
      }
    },
    methods: {
      initSite () {
        siteNum({
          token: getCookie('token'),
          typeId:1
        }).then(response => {
          this.siteList = this.siteList.concat(response.data.data)
        })
      },
      handleSearch () {},
      handleAdd () {},
      handleCut () {}
    },
    created(){
      this.initSite()
    }
  }
</script>
<style lang="stylus">
  // 公共函数
  taskWrapper(top, right, bottom, left)
    padding top right bottom left
    background-color #fff
  .page
    &-name
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
          background-color rgba(23, 187, 156, 1)
          &:hover
            background-color rgba(23, 187, 156, .8)
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
        &.task-site-active
          border-radius 4px
          background-color #2D8CF0
          color #fff
        i
          font-style inherit
</style>
