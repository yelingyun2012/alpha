<template lang="pug">
  section
    .error500-body
      Card
        .error500-body-title
          | 5
          span
            Icon(type="social-freebsd-devil")
          span
            Icon(type="social-freebsd-devil")
        p.error500-body-message 服务器程序发生错误
        .error500-body-btn
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
        this.$router.push({name: ' '})
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @keyframes error500animation
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
  .error500
    &-body
      width 700px
      height 500px
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      &-title
        text-align center
        font-size 240px
        font-weight 700
        color #2d8cf0
        line-height 260px
        margin-top 40px
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
            animation error500animation 3s ease 0s infinite alternate
      &-message
        text-align center
        font-size 30px
        font-weight 500
        color #dddde2
      &-btn
        text-align center
        padding 20px 0
        margin-bottom 40px
        .ivu-btn-large
          &:first-child
            width 200px
            background-color transparent
            border-color transparent
          &:last-child
            width 200px
            margin-left 40px
            background-color #dc9a35
            border-color #dc9a35
</style>


