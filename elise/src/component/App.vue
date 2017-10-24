<template lang="pug">
  #app
    router-view
</template>
<script>
  export default {
    name: 'App'
  }
</script>
<style lang="stylus">
  html
    overflow-y scroll
  :root
    overflow-y auto
    overflow-x hidden
    body
      position absolute
  html, body
    width 100%
    height 100%
    background-color #f0f0f0
  body
    width 100vw
    min-height 100vh
    overflow hidden
  #app
    width 100%
    height 100%
    min-height 100vh
</style>



