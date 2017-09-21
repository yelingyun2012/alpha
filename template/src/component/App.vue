<style lang="scss">
    html {
        overflow-y: scroll;
    }

    :root {
        overflow-y: auto;
        overflow-x: hidden;
    }

    :root body {
        position: absolute;
    }

    body {
        width: 100vw;
        overflow: hidden;
    }
</style>
<template lang="pug">
    #app
        router-view
</template>
<script>
  export default {
    name: 'App'
  }
</script>