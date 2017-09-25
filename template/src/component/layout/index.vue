<template lang="pug">
    section
        AppHeader
        Sidebar
        AppMain
</template>
<script>
  import AppHeader from './header.vue'
  import Sidebar from './sidebar.vue'
  import AppMain from './AppMain.vue'

  export default {
    name: 'layout',
    components: {
      AppHeader,
      Sidebar,
      AppMain
    }
  }
</script>