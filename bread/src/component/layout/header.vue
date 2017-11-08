<template lang="pug">
  aside.header-con
    .logo-con
      img(src='../../assets/images/logo.png')
      span 比一比大数据平台
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
      background-color: #2B3D4F
      height: 60px
      line-height: 60px
      color: #fff
      display: flex
  .logo
    &-con
      display block
      flex 1 1 auto
      margin-left 20px
      img
        width 36px
        height 36px
        vertical-align middle
        margin-right 10px
      span
        font-weight bold
        font-size 22px
        vertical-align middle
  .userInfo
    &-con
      margin-right: 50px
      span
        font-size: 16px
        cursor: pointer
  .ivu-select-dropdown
    top 40px !important
  .ivu-icon
    margin-left 5px
</style>