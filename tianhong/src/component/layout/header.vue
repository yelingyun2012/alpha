<template lang="pug">
    article
        .header-logo
            span Beyebe比一比
        .header-container
            span 商超大数据
        .header-hint
            Icon(type='person')
            span 欢迎登入系统
            Dropdown
                a(href='javascript:void(0)') {{userName}}
                    Icon(type="arrow-down-b")
                Dropdown-menu(slot="list")
                    router-link(to="/present")
                        Dropdown-item 用户反馈
                    router-link(to="/login", @click.native.parsent='logout')
                        Dropdown-item 退出登录
</template>
<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'header',
    computed: {
      ...mapGetters({
        userName: 'user/username'
      })
    },
    methods: {
      ...mapActions({
        FedLoginOut: 'user/FedLoginOut'
      }),
      logout () {
        this.FedLoginOut().then(() => {
          location.reload()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
    .header {
        &-logo {
            width: 180px;
            text-align: center;
            padding: 16px 0;
            font-size: 18px;
            color: #FFFFFF;
            border-right: 2px solid #5A6470;
            letter-spacing: 1px;
            display: inline-block;
        }
        &-container {
            display: inline-block;
            margin-left: 20px;
            span {
                font-size: 20px;
                color: #fff;
            }
        }
        &-hint {
            display: inline-block;
            color: #ffffff;
            float: right;
            line-height: 58px;
            margin-right: 20px;
            span {
                font-size: 16px;
                margin: 0 8px;
            }
            .ivu-icon-person {
                font-size: 18px;
                vertical-align: text-bottom;
            }
        }
    }
    .ivu-dropdown {
        line-height: 1.5;
        margin-left: 12px;
        padding-right: 30px;
        &-rel {
            a {
                color: #ffffff;
                font-size: 14px;
            }
            .ivu-icon-arrow-down-b {
                margin: 0 5px;
            }
        }
    }
    .ivu-dropdown-item:hover {
        background-color: #e4e8f1;
    }
</style>