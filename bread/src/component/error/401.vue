<template lang="pug">
  section
    .error-body
      Card
        .error-codeing 4
          span
            Icon(type="android-lock")
          span.error-key
            Icon(type='key')
        p.error-message 权限不足
        .error-btnCon
          Button(@click='goHome', size='large') 返回首页
          Button(@click='backPage', size='large', type='primary') 返回上一页
</template>
<script>
export default {
  name: "Error401",
  methods: {
    backPage() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push("/")
    }
  }
}
</script>
<style lang="stylus" scoped>
@import 'ErrorCommon.styl'

@keyframes animations
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
.error
  &-codeing
    span:first-child
      error-con(170px,span)
      i
        position absolute
        top 50%
        left 50%
        display inline-block
        font-size 120px
        transform translate(-50%,-50%)
  &-key
    error-con(100px)
    i
      position absolute
      left 20px
      display inline-block
      font-size 190px
      transform translate(-50%,-50%)
      transform-origin center bottom
      animation animations 2.8s ease 0s infinite
</style>


