<style lang="scss" scoped>
    @import "scss/index";
</style>
<style lang="scss">
    .ivu-input {
        padding: 8px 7px;
        height: auto;
        font-size: 16px;
        // 图标左对齐时添加
        /* padding-left: 30px; */
    }
    .ivu-input-icon {
        // 图标左对齐时添加
        /* left: 0; */
        height: 100%;
        line-height: 42px;
    }
</style>
<template lang="pug">
    aside.login-container
        main.login-active
            h3.login-form-title {{title}}
            Form(ref="loginForm", :model="loginForm", :rules="ruleValidate")
                FormItem(prop="username")
                    Input(placeholder="账号", v-model="loginForm.username", icon="android-person")
                FormItem(prop="password")
                    Input(placeholder="密码", v-model="loginForm.password", icon="ios-locked-outline", type="password")
                FormItem
                    Button(type="success", @click="handleSubmit('loginForm')", long) 提交
        footer(v-if="show")
            p 版权所有 @ 深圳市比一比网络科技有限公司
            p 增值电信业务经营许可证:粤B2-20110200
                a(href="http://www.miibeian.gov.cn/") 粤ICP备08129733号
</template>
<script>
  import { mapActions } from 'vuex'
  import { fetch } from '../../api/http'

  export default {
    name: 'login',
    data () {
      return {
        title: '新零售大数据',
        show: false,
        loginForm: {
          username: '',
          password: ''
        },
        ruleValidate: {
          username: [
            {message: '账号不能为空', trigger: 'blur', required: true}
          ],
          password: [
            {message: '密码不能为空', trigger: 'blur', required: true}
          ]
        }
      }
    },
    methods: {
      ...mapActions({
        Login: 'user/LoginByUserName'
      }),
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.Login(this.loginForm).then(response => {
              console.log(response)
            })
          }
        })
      }
    }
  }
</script>