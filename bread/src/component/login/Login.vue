<template lang="pug">
  section.login-con
    main.login-wrapper
      .ivu-card
        .login-form-logo
          img(src='../../assets/images/logo.png')
        h5.login-form-head 比一比大数据平台 1.3.8_010101
        Form(ref="loginForm", :model='loginForm', :rules="ruleValidate")
          FormItem(prop="account")
            Input(placeholder='账号', icon="android-person", v-model='loginForm.account').login-form-con
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
import md5 from "js-md5"
import { Login } from "../../config/getData"
import { setCookie } from "../../utils/cookie"

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },
      ruleValidate: {
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "账号不能为空", trigger: "blur" }]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$Message.config({
        top: 30,
        duration: 2.5
      })
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loginForm.password = md5(this.loginForm.password)
          this.initLogin()
        }
      })
    },
    async initLogin() {
      try {
        let res = await Login(this.loginForm)
        setCookie("token", res.data.data.token)
        setCookie("userInfo", res.data.data)
        this.$router.push({ path: "/basic" })
      } catch (error) {
        this.$Message.error(error.match(/([^\[\]]+)(?=\])/g)[0])
      }
    }
  }
}
</script>
<style lang="stylus">
.login
  &-con
    width 100%
    height 100%
    background-image url('../../assets/images/login.jpg')
    background-size cover
  &-wrapper
    position absolute
    top 40%
    width 100%
    transform translateY(-50%)
    .ivu-card
      margin 0 auto
      padding 20px
      width 350px
      background-color transparent
      &:hover
        box-shadow none
      .ivu-input-icon
        left 0
        line-height 40px
      .ivu-input
        padding 7px 7px 7px 30px
        height auto
        font-size 16px
      .ivu-btn-success
        padding 8px 15px
        letter-spacing 10px
        font-size 16px
.login
  &-form
    &-logo
      text-align center
    &-head
      margin-bottom 19px
      color hsla(0,0%,100%,1)
      text-align center
      font-size 22px
    &-footer
      position absolute
      bottom 1%
      width 100%
      color hsla(0,0%,100%,1)
      text-align center
      a
        margin-left 10px
        color hsla(0,0%,100%,1)
</style>


