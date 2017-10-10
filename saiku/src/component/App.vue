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
        min-height: 100vh;
        overflow: hidden;
        background-color: #eef0f3;
    }
    #app {
        min-height: 100vh;
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