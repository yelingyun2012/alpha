<template>
  <Menu ref="sideMenu" :active-name="$route.name" :open-names="openedSubmenuArr" theme="dark" width="200px" @on-select="changeMenu">
    <template v-for="item in menuList">
      <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="item.path">
        <Icon v-if="item.icon" :type="item.icon"></Icon>
        <span class="layout-text">{{ item.title }}</span>
      </MenuItem>

      <Submenu v-if="item.children.length>1" :name="item.name" :key="item.path">
        <template slot="title">
          <Icon v-if="item.icon" :type="item.icon"></Icon>
          <span class="layout-text">{{ item.title }}</span>
        </template>
        <template v-for="child in item.children">
          <MenuItem :name="child.name" :key="child.name">
            <Icon v-if="child.icon" :type="child.icon"></Icon>
            <span class="layout-text">{{ child.title }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  export default {
    name: 'sidebarMenu',
    data () {
      return {
        openedSubmenuArr: this.$store.state.openedSubmenuArr
      }
    },
    props: {
      menuList: Array
    },
    methods: {
      changeMenu (active) {
        this.$router.push({name: active})
      }
    }
  }
</script>
