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
    body
        width 100vw
        min-height 100vh
        overflow hidden
        background-color #eef0fe
    #app
        min-height 100vh
</style>



