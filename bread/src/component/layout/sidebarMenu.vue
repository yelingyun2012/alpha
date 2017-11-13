<template lang="pug">
  Menu(ref="sidebarMenu", :active-name="$route.name", :open-names="openedSubmenuArr", theme="dark", width="200px", @on-select="changeMenu")
    template(v-for="item in menuList")
      MenuItem(v-if="item.children.length<=1", :name="item.children[0].name", :key="item.path")
        Icon(v-if="item.icon", :type="item.icon")
        span.layout-text {{item.title}}
      Submenu(v-if="item.children.length>1", :name="item.name", :key="item.path")
        template(slot="title")
          Icon(v-if="item.icon", :type="item.icon")
          span.layout-text {{item.title}}
        template(v-for="child in item.children")
          MenuItem(:name="child.name", :key="child.name")
            Icon(v-if="child.icon", :type="child.icon")
            span.layout-text {{child.title}}
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'SidebarMenu',
    data () {
      return {
        openedSubmenuArr: this.$store.state.permission.openedSubmenuArr
      }
    },
    props: {
      menuList: Array
    },
    methods: {
      changeMenu (active) {
        this.$router.push({name: active})
      }
    },
    updated () {
      this.$nextTick(() => {
        this.$refs.sidebarMenu.updateOpened()
      })
    }
  }
</script>
