<template lang="pug">
  section
    headerView
    aside.sidebar-con
      sidebarMenu(:menuList="menuList")
    aside.main-con
      router-view
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import headerView from '../component/layout/header.vue'
  import sidebarMenu from '../component/layout/sidebarMenu.vue'

  export default {
    name: 'Main',
    components: {
      headerView,
      sidebarMenu
    },
    computed: {
      ...mapState({
        menuList: state => state.permission.menuList
      })
    },
    methods: {
      ...mapMutations({
        addOpenSubmenu: 'permission/addOpenSubmenu'
      }),
      init () {
        this.addOpenSubmenu('basic')
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<style lang="stylus">
  .sidebar
    &-con
      position fixed
      top 85px
      bottom 0
      height 100%
      background-color #fff
  .main
    &-con
      margin-left 200px
      padding 10px
      padding-top 85px
      padding-left 20px
  .ivu-input, .ivu-select-selection
    border 1px solid #bfbfbf
  .ivu-table-border td, .ivu-table-border th
    border-right 1px solid #bfbfbf
  .ivu-table td, .ivu-table th
    border-bottom 1px solid #bfbfbf
  .ivu-table-wrapper
    border-color #bfbfbf
</style>
