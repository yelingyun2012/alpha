<template lang="pug">
  section.error404
    .error404-body
      Select(v-model="test")
        Option(v-for="item of webList", :value="item.value", :key="item.value") {{item.label}}
      Card
        .error404-body-title
          | 4
          span
            Icon(type="ios-navigate-outline")
          | 4
        p.error404-body-message 当访问的页面不存在46
        .error404-body-btn
          Button(@click='goHome', size='large') 返回首页
          Button(@click='backPage', size='large', type='primary') 返回上一页
</template>
<script>
  export default {
    name: 'Error404',
    data () {
      return {
        test: 2,
        webList: [
          {
            value: 2,
            label: '对标天猫'
          },
          {
            value: 3,
            label: '对标京东'
          },
          {
            value: 4,
            label: '对标一号店'
          },
          {
            value: 5,
            label: '对标华润'
          },
          {
            value: 7,
            label: '对标沃尔玛'
          },
          {
            value: 9,
            label: '对标永辉'
          }
        ]
      }
    },
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
  @keyframes error404animation
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
  .error404
    &-body
      width 700px
      height 500px
      position absolute
      top 50%
      left 50%
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
          color #19be6b
          font-size 230px
          animation error404animation 3s ease 0s infinite alternate
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


