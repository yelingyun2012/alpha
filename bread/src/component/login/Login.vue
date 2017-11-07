<template lang="pug">
  section.login-con
    main.login-wrapper
      .ivu-card
        .login-form-logo
          img(src='../../assets/images/logo.png')
        h5.login-form-head 比一比大数据平台
        Form(ref="loginForm", :model='loginForm', :rules="ruleValidate")
          FormItem(prop="account")
            Input(placeholder='账号', icon="android-person", v-model='loginForm.account')
          FormItem(prop='password')
            Input(placeholder='密码', icon="ios-locked-outline", v-model='loginForm.password', type="password", @keyup.enter.native='handleSubmit("loginForm")')
          FormItem
            Button(type="success", long, @click.native='handleSubmit("loginForm")') 登陆
    footer.login-form-footer
      p 版权所有 @ 深圳市比一比网络科技有限公司
      p 增值电信业务经营许可证:粤B2-20110200
        a(href="http://www.miibeian.gov.cn/") 粤ICP备08129733号
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import md5 from 'js-md5'

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          account: '',
          password: ''
        },
        ruleValidate: {
          account: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions({
        Login: 'user/handleLogin'
      }),
      handleSubmit (name) {
        this.$Message.config({
          top: 30,
          duration: 2.5
        })
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loginForm.password = md5(this.loginForm.password)
            this.Login(this.loginForm).then(() => {
              this.$router.push({path: '/basic'})
            }).catch(error => {
              this.$Message.error(error)
            })
          }
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .login
    &-con
      width 100%
      height 100%
      background-image url(../../assets/images/login.jpg)
      background-size cover
    &-wrapper
      width 100%
      position absolute
      top 40%
      transform translateY(-50%)
      .ivu-card
        width 350px
        margin 0 auto
        padding 20px
        background-color transparent
        .ivu-btn-success
          padding: 8px 15px;
          font-size: 16px;
          letter-spacing: 10px;
  .login
    &-form
      &-logo
        text-align center
      &-head
        font-size 22px
        color hsla(0, 0%, 100%, 1)
        text-align center
        margin-bottom 19px
      &-footer
        text-align center
        width 100%
        position absolute
        bottom 1%
        color hsla(0, 0%, 100%, 1)
        a
          margin-left 10px
          color hsla(0, 0%, 100%, 1)
</style>
<style lang="stylus">
  .ivu-card
    &:hover
      box-shadow none
  .ivu-input
    padding 7px 7px
    height auto
    font-size 16px
    padding-left 30px
  .ivu-icon-android-person,
  .ivu-icon-ios-locked-outline
    left 0
    height auto
    line-height 40px
</style>



