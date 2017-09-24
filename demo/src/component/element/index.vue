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
                    el-table(:data="panelData", style="width: 100%")
                        el-table-column(prop="key", label="展示字段")
                            template(scope="scope")
                                el-select(placeholder="请选择", v-model="value")
                                    el-option(v-for="item of panelData", :key="item.key", :label="item.name", :value="item.key")
                        el-table-column(prop="name", label="字段名")
                        el-table-column(prop="age", label="查询字段")
                Button(type="primary",  @click="modal = true") 显示对话框
                Modal(v-model="modal", title="对话框标题", :loading="loading",  @on-ok="asyncOK")
                    p 击确定后，对话框将在 2秒 后关闭

</template>
<script>
  import axios from 'axios'

  export default {
    name: 'element',
    data () {
      return {
        modal:false,
        loading: true,
        treeData: [],
        count: 2,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
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
        value:''
      }
    },
    methods: {
      asyncOK () {
        setTimeout(() => {
          this.modal = false;
        }, 2000);
      },
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