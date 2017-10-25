<template>
  <Menu ref="sideMenu" :active-name="currentPageName" theme="dark" width="auto" @on-select="changeMenu">
    <template v-for="item in menuList">
      <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="item.path">
        <Icon :type="item.icon" :key="item.path"></Icon>
        <span class="layout-text" :key="item.path">{{ item.title }}</span>
      </MenuItem>

      <Submenu v-if="item.children.length>1" :name="item.name" :key="item.path">
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          <span class="layout-text">{{ item.title }}</span>
        </template>
        <template v-for="child in item.children">
          <MenuItem :name="child.name" :key="child.name">
            <Icon :type="child.icon" :key="child.name"></Icon>
            <span class="layout-text" :key="child.name">{{ child.title }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  export default {
    data () {
      return {
        currentPageName: this.$route.name,
        openedSubmenuArr: this.$store.state.openedSubmenuArr
      }
    },
    name: 'sidebarMenu',
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
