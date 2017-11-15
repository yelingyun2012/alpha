<template lang="pug">
  aside.header-con
    .logo-con
      img(src='../../assets/images/logo.png')
      span Welcome to elise
    .userInfo-con
      Dropdown(trigger="click")
        span 用户名
          Icon(type="arrow-down-b")
        DropdownMenu(slot="list")
          DropdownItem 退出登录
</template>
<script>
  export default {
    name: 'Header'
  }
</script>
<style lang="stylus">
  .header
    &-con
      position fixed
      z-index 1000
      display flex
      width 100%
      height 60px
      background-color #404040
      color #fff
      line-height 60px
  .logo
    &-con
      display block
      flex 1 1 auto
      margin-left 20px
      img
        margin-right 10px
        margin-left 25px
        width 120px
        height 30px
        vertical-align middle
      span
        margin-left 70px
        vertical-align middle
        font-weight bold
        font-size 22px
  .userInfo
    &-con
      margin-right 50px
      span
        font-size 16px
        cursor pointer
  .ivu-select-dropdown
    top 40px !important
  .ivu-icon
    margin-left 5px

</style>
