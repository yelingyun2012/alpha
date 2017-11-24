<template lang="pug">
  section
    .error-body
      Card
        .error-codeing 4
          span
            Icon(type="ios-navigate-outline")
          | 4
        p.error-message 页面发生未知错误或页面不存在
        .error-btnCon
          Button(@click='goHome', size='large') 返回首页
          Button(@click='backPage', size='large', type='primary') 返回上一页
</template>
<script>
  export default {
    name: 'Error404',
    methods: {
      backPage () {
        this.$router.go(-1)
      },
      goHome () {
        this.$router.push('/')
      }
    }
  }
</script>
<style lang="stylus">
  @import "ErrorCommon.styl"
  @keyframes animations
    0%
      transform: rotateZ(0deg)
    20%
      transform: rotateZ(-60deg)
    40%
      transform: rotateZ(-10deg)
    60%
      transform: rotateZ(50deg)
    80%
      transform: rotateZ(-20deg)
    100%
      transform: rotateZ(0deg)
  .error
    &-codeing
      span
        display inline-block
        color #19be6b
        font-size 230px
        animation animations 3s ease 0s infinite alternate
</style>


