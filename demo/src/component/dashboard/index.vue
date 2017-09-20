<style lang="scss" scoped>
    @import "scss/index";
</style>
<style lang="scss">
    html, body {
        background-color: #e9edf2;
    }

    .el-tree {
        border: 0 none;
        background-color: inherit;
        color: #aebace;
    }

    .el-tree-node__content:hover {
        background-color: #57708c;
    }
</style>
<template lang="pug">
    section
        nav.dash-sidebar
            header Demo
            el-tree(:data="treeData", :props="defaultProps", @node-click="handleNodeClick")
        main.dash-main
            header
            aside.dash-action
                aside.dash-form
                    .dash-list
                        label 报表名称:
                        Input(placeholder="请输入报表名称", style="width:75%")
                    Button(type="primary") 查询
                    Button(type="primary") 查看已生成报表
                aside.dash-board
                    p 操作列表
                    Button(type="primary", icon="plus", @click="addColumn") 添加字段
                    Table(:columns="panelColumns", :data="panelData")
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'dashboard',
    data () {
      return {
        treeData: [],
        data: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        panelColumns: [
          {
            title: '展示字段',
            key: 'key'
          },
          {
            title: '字段名',
            render:(h,params)=> {
              return h('select',this.panelData1.map(item => {
                return h('option',item.name)
              }))
            }
          },
          {
            title: '查询字段',
            key: 'age'
          }
        ],
        panelData: [
          {
            key: '0',
            name: 'Edward King 0',
            age: '32',
          },
          {
            key: '1',
            name: 'Edward King 1',
            age: '32',
          }
        ],
        panelData1: [
          {
            key: '0',
            name: 'Edward King 0',
            age: '32',
          },
          {
            key: '1',
            name: 'Edward King 1',
            age: '32',
          }
        ],
        count: 2
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
      },
      addColumn () {
        const newData = {
          key: this.count,
          name: `Edward King ${this.count}`,
          age: 32,
        }
        this.count = this.count + 1
        this.panelData.unshift(newData)
      }
    },
    created () {
      axios.get('https://www.easy-mock.com/mock/59b73c5ae0dc663341a6450b/jinDao/sidebar_copy_1505185248062').then(response => {
        this.treeData = response.data.response
        console.log(this.treeData)
      })
    }
  }
</script>