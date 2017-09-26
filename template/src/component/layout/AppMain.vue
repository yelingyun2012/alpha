<template lang="pug">
    main.app-content
        router-view
</template>
<script>
  export default {
    name: 'AppMain'
  }
</script>
<style lang="scss" scoped>
    .app {
        &-content {
            margin-left: 200px;
        }
    }
</style>