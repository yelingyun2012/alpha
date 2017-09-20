<style lang="scss" scoped>
    .login {
        &-container {
            width: 100%;
            height: 100vh;
            min-height: 100%;
        }
    }

    footer {
        a {
            color: inherit;
        }
    }
</style>
<template lang="pug">
    aside.login-container
        main
            h5.login-form-title {{title}}
            Form(ref="loginForm", :model="loginForm", :rules="ruleValidate")
                FormItem(prop="username")
                    Input(placeholder="账号", v-model="loginForm.username", icon="android-person")
                FormItem(prop="password")
                    Input(placeholder="密码", v-model="loginForm.password", icon="ios-locked-outline")
                FormItem
                    Button(type="success") 提交
        footer
            p 版权所有 @ 深圳市比一比网络科技有限公司
            p 增值电信业务经营许可证:粤B2-20110200
                a(href="http://www.miibeian.gov.cn/") 粤ICP备08129733号
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        title: '新零售大数据',
        loginForm: {
          username: '',
          password: ''
        },
        ruleValidate: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    }
  }
</script>