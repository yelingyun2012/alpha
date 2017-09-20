<template lang="pug">
    .login-container
        .form-group
            h5.form-group-text 比一比商超大数据
            Input(v-model='loginForm.account',placeholder='账号',icon="android-person")
            Input(v-model='loginForm.password',placeholder='密码',      type="password",icon="ios-locked-outline", @keyup.enter.native="register")
            Button(type="success", long, @click.native.prevent='register') 登录
        .page-footer
            p 版权所有 @ 深圳市比一比网络科技有限公司
            p 增值电信业务经营许可证:粤B2-20110200
                a(href="http://www.miibeian.gov.cn/") 粤ICP备08129733号
</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions({
        Login: 'user/Login'
      }),
      register () {
        this.Login(this.loginForm).then(() => {
          this.$router.push({path: '/'})
        }).catch(error => {
          this.$Message.info(error)
        })
      }
    }
  }
</script>
<style lang="scss">
    .login-container {
        width: 100%;
        min-height: 100%;
        height: 100vh;
        position: relative;
        background-image: url("../../assets/images/login.jpg");
        .form-group {
            position: absolute;
            left: 0;
            right: 0;
            width: 380px;
            height: 320px;
            margin: 120px auto;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            padding: 30px;
            &-text {
                color: #fff;
                font-size: 20px;
                text-align: center;
                margin-bottom: 30px;
            }
        }
        .ivu-input {
            padding: 10px 7px;
            height: auto;
            font-size: 14px;
            padding-left: 30px;
        }
        .ivu-input-wrapper {
            margin-bottom: 20px;
        }
        .ivu-btn-success {
            padding: 8px 15px;
            font-size: 18px;
            letter-spacing: 10px
        }
        .ivu-input-icon {
            height: 100%;
            left: 0;
            line-height: 43px;
        }
    }

    .page {
        &-footer {
            width: 100%;
            position: absolute;
            bottom: 3%;
            text-align: center;
            color: #ffffff;
            font-size: 14px;
            a {
                color: #ffffff;
            }
        }
    }
</style>
