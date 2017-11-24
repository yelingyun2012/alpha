<template lang="pug">
  section
    .error-body
      Card
        .error-codeing 5
          span
            Icon(type="social-freebsd-devil")
          span
            Icon(type="social-freebsd-devil")
        p.error-message 服务器程序发生错误
        .error-btnCon
          Button(@click='goHome', size='large') 返回首页
          Button(@click='backPage', size='large', type='primary') 返回上一页
</template>
<script>
  export default {
    name: 'Error500',
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
<style lang="stylus" scoped>
  @import "ErrorCommon.styl"
  @keyframes animations
    0%
      transform rotateZ(0deg)
    20%
      transform rotateZ(-10deg)
    40%
      transform rotateZ(5deg)
    60%
      transform rotateZ(-5deg)
    80%
      transform rotateZ(10deg)
    100%
      transform rotateZ(0deg)
  .error
    &-codeing
      span
        display inline-block
        position relative
        width 170px
        height 170px
        border-radius 50%
        border 20px solid #ed3f14
        color #ed3f14
        margin-right 10px
        i
          font-size 120px
          position absolute
          bottom -10px
          left 10px
          transform-origin center bottom
          animation animations 3s ease 0s infinite alternate
</style>


