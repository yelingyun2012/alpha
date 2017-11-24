<template lang="pug">
  section
    headerView
    aside.sidebar-con
      sidebarMenu(:menuList="sidebarList", :open-names="openedSubmenuArr")
    aside.main-con
      breadcrumbNav(:currentPath="currentPath")
      router-view
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import headerView from '../component/layout/header.vue'
  import sidebarMenu from '../component/layout/sidebarMenu.vue'
  import breadcrumbNav from '../component/layout/breadcrumb.vue'
  import { setCurrentPath } from '../utils/utils'
  import { getCookie } from '../utils/cookie'

  export default {
    name: 'Main',
    components: {
      headerView,
      sidebarMenu,
      breadcrumbNav
    },
    computed: {
      ...mapState({
        menuList: state => state.permission.menuList,
        openedSubmenuArr: state => state.permission.openedSubmenuArr,
        currentPath: state => state.permission.currentPath
      }),
      sidebarList: function () {
        let sidebarMenuList
        if (this.menuList[2].access === JSON.parse(getCookie('userInfo')).userRoad) {
          sidebarMenuList = this.menuList
        } else {
          sidebarMenuList = this.menuList.filter(item => {
            return item.access === undefined
          })
        }
        return sidebarMenuList
      }
    },
    mounted () {
      this.initMenuList()
    },
    watch: {
      '$route' (to) {
        let pathArr = setCurrentPath(this, to.name)
        if (pathArr.length >= 2) {
          this.addOpenSubmenu(pathArr[0].name)
        }
      }
    },
    methods: {
      ...mapMutations({
        addOpenSubmenu: 'permission/addOpenSubmenu'
      }),
      initMenuList () {
        let pathArr = setCurrentPath(this, this.$route.name)
        if (pathArr.length >= 2) {
          this.addOpenSubmenu(pathArr[0].name)
        }
      }
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
      margin-left 160px
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
