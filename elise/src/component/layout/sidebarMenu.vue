<template lang="pug">
  Menu(ref="sidebarMenu", :active-name="$route.name", :open-names="openNames", theme="light", width="200px", @on-select="changeMenu", accordion)
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
  export default {
    name: 'SidebarMenu',
    props: {
      menuList: Array,
      openNames: Array
    },
    methods: {
      changeMenu (active) {
        this.$router.push({name: active})
      }
    },
    updated () {
      this.$nextTick(() => {
        if (this.$refs.sidebarMenu) {
          this.$refs.sidebarMenu.updateOpened()
        }
      })
    }
  }
</script>
