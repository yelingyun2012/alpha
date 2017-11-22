<template lang="pug">
  section.error401
    .error401-body
      Card
        .error401-body-title
          | 4
          span
            Icon(type="android-lock")
          span.error401-key-span
            Icon(type='key')
        p.error401-body-message 权限不足
        .error401-body-btn
          Button(@click='goHome', size='large') 返回首页
          Button(@click='backPage', size='large', type='primary') 返回上一页
</template>
<script>
  export default {
    name: 'Error401',
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
  @keyframes error401animation
    0%
      transform rotateZ(0deg)
    40%
      transform rotateZ(-20deg)
    45%
      transform rotateZ(-15deg)
    50%
      transform rotateZ(-20deg)
    55%
      transform rotateZ(-15deg)
    60%
      transform rotateZ(-20deg)
    100%
      transform rotateZ(0deg)
  .error401
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
        span:first-child
          display inline-block
          position relative
          width 170px
          height 170px
          border-radius 50%
          border 20px solid #ed3f14
          color #ed3f14
          margin-right 10px
          i
            display inline-block
            font-size 120px
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)
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
    &-key
      &-span
        display inline-block
        position relative
        width 100px
        height 170px
        border-radius 50%
        margin-right 10px
        i
          display inline-block
          font-size 190px
          position absolute
          left 20px
          transform translate(-50%, -50%)
          transform-origin center bottom
          animation error401animation 2.8s ease 0s infinite
</style>


