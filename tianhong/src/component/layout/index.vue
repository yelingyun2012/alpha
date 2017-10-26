<template lang="pug">
    .app-wrapper
        .sidebar-wrapper
            Sidebar(v-if="this.$route.path!='/dashboard/message'")
        .main-container
            AppMain
</template>
<script>
  import Sidebar from './sidebar'
  import AppMain from './AppMain'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      AppMain
    }
  }
</script>
<style lang="scss">
    .app-wrapper {
        position: relative;
    }

    .main-container {
        min-height: 100%;
        transition: all .28s ease-out;
    }
</style>