<template lang="pug">
  section
    .sidebar-con
      sidebarMenu(:menuList="menuList")
    .main-con
      router-view
</template>
<script>
  import sidebarMenu from '../component/layout/sidebarMenu.vue'

  export default {
    name: 'mainTest',
    components: {
      sidebarMenu
    },
    computed: {
      menuList () {
        return this.$store.state.permission.menuList
      }
    }
  }
</script>
<style lang="stylus">
  .sidebar
    &-con
      position fixed
      left 0
      bottom 0
      height 100%
      background-color #495060
  .main
    &-con
      margin-left 200px
      padding 20px
</style>