<template lang="pug">
    aside
        .header-logo
            span Beyebe比一比
        Menu-group(title="功能菜单")
        template(v-for='item in routes')
            router-link(v-if="!item.hidden&&item.noDropdown&&item.children.length>0", :to="item.path+'/'+item.children[0].path")
                Menu-item(:name="item.redirect")
                    Icon(v-if='item.icon', :type="item.icon")
                    | {{item.children[0].name}}
            Submenu(:name='item.name', v-if="!item.noDropdown&&!item.hidden")
                template(slot='title')
                    Icon(v-if='item.icon', :type="item.icon")
                    | {{item.name}}
                template(v-for='child in item.children', v-if='!child.hidden')
                    router-link(:to="item.path+'/'+child.path")
                        Menu-item(:name="item.path+'/'+child.path") {{child.name}}
</template>
<script>
  export default {
    name: 'sidebarItem',
    props: {
      routes: {
        type: Array
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
    }
    .ivu-icon {
        vertical-align: middle;
        font-size: 20px;
    }
    .ivu-menu-item {
        color: #AEBACE;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        background-color: #00B27A;
        color: #ffffff;
        border-right: 0;
    }
</style>
<style lang="scss">
    .ivu-menu {
        background-color: #2C3744;
    }
    .ivu-menu-item-group-title {
        color: #999;
        background-color: rgba(255, 255, 255, 0.15);
        padding: 0 !important;
        text-align: center;
        margin-left: -2px;
        font-size: 16px !important;
        letter-spacing: 1px;
    }
    .ivu-menu-submenu-title {
        color: #AEBACE;
    }
    .router-link-exact-active.router-link-active {
        display: inline-block;
        width: 100%;
        .ivu-menu-item {
            color: #fff !important;
        }
    }
    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        background-color: #57708c !important;
    }
</style>