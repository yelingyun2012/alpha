<template lang="pug">
    section
        AppHeader
        aside.app-main
            Sidebar
            .app-container
                Breadcrumb
                AppMain
</template>
<script>
  import AppHeader from './header.vue'
  import Breadcrumb from './breadcrumb.vue'
  import Sidebar from './sidebar.vue'
  import AppMain from './AppMain.vue'

  export default {
    name: 'layout',
    components: {
      AppHeader,
      Breadcrumb,
      Sidebar,
      AppMain
    }
  }
</script>
<style lang="scss" scoped>
    .app {
        &-main {
            width: 100%;
            padding-top: 55px;
        }
    }
</style>