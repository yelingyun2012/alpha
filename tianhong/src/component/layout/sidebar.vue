<template lang="pug">
    article
        Row
            Col(span="8")
                Menu(:theme="theme", width='180px', :active-name="$route.path", @on-select="showDropdown", :open-names="openNames")
                    sidebar-item(:routes="permission_routers")
</template>
<script>
  import SidebarItem from './sidebarItem.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'sidebar',
    data () {
      return {
        theme: 'light',
        openNames: []
      }
    },
    computed: {
      ...mapGetters({
        'permission_routers': 'permission/permission_routers'
      })
    },
    methods: {
      showDropdown () {
        if (this.$route.path.indexOf('/category') === 0) {
          this.openNames.push('品类统计数据')
        } else if (this.$route.path.indexOf('/dashboard') === 0) {
          this.openNames.push('商品比价')
        }
      }
    },
    components: {SidebarItem},
    created(){
      this.showDropdown()
    }
  }
</script>
<style lang="scss" scoped>
    .menu-title {
        font-size: 16px;
        text-align: center;
        padding: 13px 0;
    }
    .ivu-menu {
        position: fixed;
        left: 0;
        min-height: 100%;
        background: #3E4A58;
    }
</style>