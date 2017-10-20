<template lang="pug">
    Row
        Col(span="8")
            Menu(:theme="theme",width='229px',:open-names="openNames")
                aside.sidebar
                    .header-logo
                    Menu-group(title="功能菜单")
                        template(v-for='item in routers')
                            router-link(v-if="!item.hidden&&item.noDropdown&&item.children.length>0",:to="item.path+'/'+item.children[0].path")
                                Menu-item(:name="item.redirect")
                                    Icon(v-if='item.icon',:type="item.icon")
                                    | {{item.children[0].name}}
                            Submenu(:name='item.name',v-if="!item.noDropdown&&!item.hidden")
                                template(slot='title')
                                    Icon(v-if='item.icon',:type="item.icon")
                                    | {{item.name}}
                                template(v-for='child in item.children',v-if='!child.hidden')
                                    router-link(:to="item.path+'/'+child.path")
                                        Menu-item(:name="item.path+'/'+child.path")
                                            Icon(v-if='child.icon',:type="child.icon")
                                            |{{child.name}}

</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'sidebarItem',
        data() {
            return {
                theme: 'light',
                openNames: []
            }
        },
        methods: {

        },
        computed: {
            ...mapState({
                routers: state => state.permission.routers
            })
        }
    }
</script>

<style lang="scss">
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item{
        color: #fff;
        margin-left: -2px;
        padding-left: 65px;
    }

    .ivu-col-span-8{
        padding-left: 2px;
        padding-top: 0px;
        width: 230px;
        background: #2B3D4F;
        margin-top: 19px;
        margin-left: 30px;
        min-height: 100%;
        position: fixed;

    }
    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
        background: #2B3D4F;
    }
    .ivu-menu-vertical .ivu-menu-item-group-title{
        background: #35414F;
    }
    .sidebar {

        .router-link-exact-active.router-link-active {
            background: #35414F;
            display: inline-block;
            width: 100%;
            .ivu-menu-item {
                color: #fff !important;
            }
        }


    }

    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
        padding: 14px;
        margin-left: -2px;

    }

    .ivu-menu-item-group-title {
        color: #EFF2F7;
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

    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        background-color: #57708c;

    }

</style>
<style lang="scss">
    .sidebar .ivu-menu-item-group>ul>a>li.ivu-menu-item{
        padding-left:17px;
    }
</style>


