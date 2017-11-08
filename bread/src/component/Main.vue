<template lang="pug">
  section
    headerView
    aside.sidebar-con
      sidebarMenu(:menuList="menuList")
    aside.main-con
      router-view
</template>
<script>
  import headerView from '../component/layout/header.vue'
  import sidebarMenu from '../component/layout/sidebarMenu.vue'

  export default {
    name: 'mainTest',
    components: {
      headerView,
      sidebarMenu
    },
    computed: {
      menuList () {
        return this.$store.state.permission.menuList
      }
    },
    methods: {
      init () {
        console.log(this.$route.name)
        console.log(this.$route.fullPath)
        console.log(this.$route.path)
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