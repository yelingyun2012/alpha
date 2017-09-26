<template lang="pug">
    nav.app-sidebar
        .sidebar-title Dashboard
</template>
<script>
  export default {
    name: 'sidebar'
  }
</script>
<style lang="scss" scoped>
    .app {
        &-sidebar {
            position: fixed;
            width: 200px;
            height: 100%;
            background-color: teal;
        }
    }
    .sidebar{
        &-title{
            height: 45px;
            color: #ffffff;
            font-size: 14px;
            padding: 0.75rem 1rem;
            background-color: #304047;
        }
    }
</style>