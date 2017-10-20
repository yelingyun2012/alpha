<template lang="pug">
    .form-group
        img.form-group-img(src="../../assets/images/logo.png" style="padding-left:20px")
        span.form-group-text 比一比大数据服务平台
        Dropdown.form-group-text2(trigger="click" style="margin-left: 20px", @on-click="test")
            a(href="javascript:void(0)")    {{userName}}
                Icon(type="arrow-down-b")
            DropdownMenu(slot="list")
                DropdownItem(name="退出登陆") 退出登陆


</template>
<script>
  import {removeToken} from '../../utils/token.js'
  import { getToken } from '../../utils/token'

  export default {
    name: 'sidebar',
    data () {
      return {
          visible: false,
          userName:''
      }
    },
    methods: {
      test (name) {
        // 发送请求 表明已退出，返回成功则删除token,路由跳转至login
          removeToken('Token')
          removeToken('Name')
         this.$router.push({path: '/login'})
         console.log(name)
      }
    },
    created(){
      this.userName=getToken('Name')
    }

  }
</script>
<style lang="scss" scoped>
    .form-group {
        min-width: 100%;
        height: 70px;
        background: #2B3D4F;
        position: fixed;
        z-index: 1000;
        .form-group-img {
            padding-top: 10px;
        }
        .form-group-text {
            position: absolute;
            padding-top: 5px;

        }
        .form-group-text2 {
            float: right;
            color: #fff;
            font-size: 16px;
            padding-top: 10px;
            padding-right: 46px;
            a {
                color: #ddd;
            }

        }
        &-text {
            color: #fff;
            font-size: 22px;
            text-align: center;

        }

    }
</style>
