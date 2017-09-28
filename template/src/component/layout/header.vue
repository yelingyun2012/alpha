<style lang="scss" scoped>
    .app {
        &-header {
            height: 55px;
            line-height: 39px;
            z-index: 1020;
            position: fixed;
            width: 100%;
            background-color: mediumaquamarine;
        }
    }
    .header {
        &-link {
            width: 155px;
            height: 55px;
            display: inline-block;
            padding: 0.5rem 1rem;
            color: rgba(0, 0, 0, 0.3);
            font-size: 18px;
        }
        &-menu {
            font-size: 20px;
            width: 48px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        }
        &-hint {
            float: right;
            height: 54px;
            line-height: 54px;
            a {
                font-size: 14px;
                color: #ffffff;
                .ivu-icon {
                    margin: 0 60px 0 8px;
                }
            }
        }
    }

</style>
<style lang="scss">
    .ivu-select-dropdown {
        margin: -12px 0;
    }
</style>
<template lang="pug">
    header.app-header
        router-link(to="").header-link Beyebe比一比
        span.header-menu ☰
        aside.header-hint
            Dropdown(placement="bottom-start", trigger="click")
                a(href="javascript:void(0)") 下拉菜单
                    Icon(type="arrow-down-b")
                DropdownMenu(slot="list", @on-click="handleOut")
                    DropdownItem 退出登录
</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'header',
    methods: {
      ...mapActions({
        loginOut: 'user/LoginOut'
      }),
      handleOut () {
        this.loginOut()
      }
    }
  }
</script>
