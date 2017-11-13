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
      left 10px
      bottom 0
      top 80px
      height 100%
      background-color #495060
  .main
    &-con
      margin-left 210px
      padding 20px
</style>