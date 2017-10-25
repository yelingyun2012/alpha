<template>
  <section>
    <sidebarMenu :menuList="menuList"></sidebarMenu>
  </section>
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