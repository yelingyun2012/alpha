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
                FormItem(prop="realname")
                    Input(placeholder="真名", v-model="loginForm.realname", icon="android-person")
                FormItem(prop="email")
                    Input(placeholder="邮箱", v-model="loginForm.email", icon="email")
                FormItem
                    Button(type="success", @click="handleRegister('loginForm')", long) 提交
</template>
<script>
  import { fetch } from '../../api/http'

  export default {
    name: 'login',
    data () {
      return {
        title: '注册',
        loginForm: {
          username: '',
          password: '',
          realname: '',
          email: ''
        },
        ruleValidate: {
          username: [
            {message: '用户名不能为空', trigger: 'blur', required: true},
            {type: 'string', min: 3, max: 50, message: '个数必须是3和50之间', trigger: 'blur'}
          ],
          password: [
            {message: '密码不能为空', trigger: 'blur', required: true},
            {type: 'string', min: 3, max: 64, message: '个数必须是3和64之间', trigger: 'blur'}
          ],
          realname: [
            {message: '真名不能为空', trigger: 'blur', required: true}
          ],
          email: [
            {message: '邮箱不能为空', trigger: 'blur', required: true},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleRegister (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            fetch('user/register', {
              params: {
                userName: this.loginForm.username.trim(),
                password: this.loginForm.password,
                realName: this.loginForm.realname,
                email: this.loginForm.email
              }
            }).then(response => {
              if (response && response.data.code === '0') {
                this.$router.push('/login')
                this.$Message.info('注册成功，请去邮箱完成注册验证')
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      }
    }
  }
</script>