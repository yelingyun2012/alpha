<template lang="pug">
    .login-container
        .form-group
            img(src="../../assets/images/logo.png" style="padding-left:140px")
            h5.form-group-text 比一比大数据平台
            Form(ref="loginForm",:model="loginForm",:rules="ruleValidate")
                Form-item(prop="username")
                    Input(v-model="loginForm.username",placeholder="账 号", icon="android-person")
                Form-item(prop="password")
                    Input(v-model="loginForm.password", placeholder="密 码", type='password', icon="ios-locked-outline", @keyup.enter.native="handleSubmit('loginForm')")
                Form-item
                    Button(type="success",long,@click.native.prevent="handleSubmit('loginForm')") 登陆
        .page-footer
            p 版权所有 @ 深圳市比一比网络科技有限公司
            p 增值电信业务经营许可证:粤B2-20110200
                a(href="http://www.miibeian.gov.cn/",style='margin-left:20px') 粤ICP备08129733号
</template>
<script>
    import axios from '../../api/http.js'
    import Qs from 'qs'
    import md5 from 'js-md5'
    import {setToken} from '../../utils/token.js'

    export default {
        name: 'login',
        data() {
            return {

                loginForm: {
                    username: '',
                    password: ''
                },
                ruleValidate: {
                    username: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$Message.config({
                    top: 30,
                    duration: 2.5
                });
                let params = Qs.stringify({
                    loginName: this.loginForm.username,
                    pwd: md5(this.loginForm.password)
                })
                axios.post('elise/login', params).then(response => {

                  console.log("denglu")
                    console.log(response)
                  if(response.data.data!=null){
                    this.success("登陆成功！");
                    setToken('Token', response.data.data.token)
                    setToken('Name',response.data.data.userName)
                    this.$router.push({path: '/'})

                  }else{
                    console.log("denglushibai")
                     this.error("用户名或密码错误！");
                  }
                }).catch(err=>{
                  console.log(err);
                });

            },
          success (msg) {
            this.$Message.success(msg);
          },
          error (msg) {
            this.$Message.error(msg);
          },


        }
    }
</script>
<style lang="scss" scoped>
    .login-container {
        width: 100%;
        min-height: 100%;
        height: 100vh;
        position: relative;
        background-image: url("../../assets/images/login.png");
        background-size: cover;
        .form-group {
            position: absolute;
            left: 0;
            right: 0;
            width: 380px;
            height: 320px;
            margin: 120px auto;
            border-radius: 4px;
            padding: 30px;
            &-text {
                color: #fff;
                font-size: 20px;
                text-align: center;
                margin-bottom: 30px;
            }
        }
        .ivu-input-wrapper {
            // margin-bottom: 20px;
        }
        .ivu-btn-success {
            padding: 8px 15px;
            font-size: 18px;
            letter-spacing: 10px
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
<style lang="scss">
    .login-container {
        .ivu-input {
            padding: 8px 7px;
            height: auto;
            font-size: 16px;
            padding-left: 30px;
        }
        .ivu-input-icon {
            height: 100%;
            left: 0;
            line-height: 43px;
        }
    }
</style>