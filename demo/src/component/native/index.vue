<style lang="scss" scoped>
    @import "scss/index";

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
<style lang="scss">
    html {
        overflow-y: scroll;
    }

    :root {
        overflow-y: auto;
        overflow-x: hidden;
    }

    :root body {
        position: absolute;
    }

    body {
        width: 100vw;
        overflow: hidden;
    }

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

    .ivu-table th {
        font-weight: inherit;
        font-size: 14px;
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
                        Input(placeholder="请输入报表名称", style="width:75%", v-model="reportName")
                    Button(type="primary", @click="search") 查询
                    Button(type="primary", @click="generated") 查看已生成报表
                aside.dash-board
                    p 操作列表
                    Button(type="primary", icon="plus", @click="addColumn") 添加字段
                    table
                        thead
                            tr
                                th 展示字段
                                th 字段名
                                th 查询字段
                        tbody.dash-template
                            tr(v-for="item in templateData")
                                td
                                    input(type="checkbox")
                                td
                                    select
                                        option(v-for="list in panelData", :value="list.fieldName") {{list.fieldAlias}}
                                td
                                    select
                                        option(v-for="item in actionsGroup") {{item.name}}
                aside.dash-search(v-if="searchShow")
                    p 生成报表
                    Table(:columns="searchColumns", :data="searchData", :no-data-text="defaultText")
                aside.dash-generated(v-if="reportShow")
                    p 已生成报表
                    Table(:columns="reportColumns", :data="reportData")
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'element',
    data () {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        templateData: [], //模板数据
        dataLibraryName: [],// 库名
        dataTableName: [], // 表名
        panelData: [], // 展示表名
        actionsGroup: [
          {name: '无'},
          {name: 'Group_by'},
          {name: 'Count'},
          {name: 'Max'},
          {name: 'Min'},
          {name: 'Avg'},
          {name: 'Sum'}
        ],
        // table data
        groupByData: [],
        countData: [],
        maxData: [],
        minData: [],
        avgData: [],
        sumData: [],
        reportName: 'beyebe', // 报表名
        searchShow: false,
        reportShow: false,
        resourceId: '',// 库Id
        tableName: '', // 表字段
        searchColumns: [],
        searchData: [],
        reportColumns: [
          {
            title: '报表名',
            key: 'exportName'
          },
          {
            title: '报表ID',
            key: 'id'
          }
        ],
        reportData: [],
        defaultText: '加载中...'
      }
    },
    methods: {
      handleNodeClick (data, node) {
        if (!this.dataLibraryName.includes(data.label)) {
          this.searchShow = false
          this.reportShow = false
          this.tableName = data.tableName
          this.resourceId = node.parent.data.id
          this.dataTableName.map(value => {
            if (data.label === value.label) {
              this.panelData = value.children
            }
          })
          this.templateData = []
        }
      },
      search () {
        if (this.reportName === '') {
          this.$Message.error('生成报表名称不能为空')
        } else {
          this.searchShow = true
          let templateTr = document.querySelector('.dash-saiku').querySelectorAll('tr')
          let templateEachData = []
          let fieldArray = []

          templateTr.forEach((item) => {
            let fieldSelect = item.querySelectorAll('td')[1].querySelector('select')
            let querySelect = item.querySelectorAll('td')[2].querySelector('select')
            let outputSelect = item.querySelectorAll('td')[0].querySelector('input')

            if (outputSelect.checked === true && querySelect.options[querySelect.selectedIndex].text === 'Group_by') {
              fieldArray.push({
                fieldName: fieldSelect.options[fieldSelect.selectedIndex].value,
                fieldAlias: fieldSelect.options[fieldSelect.selectedIndex].text
              })
            }

            templateEachData.push({
              field: {
                fieldName: fieldSelect.options[fieldSelect.selectedIndex].value,
                fieldAlias: fieldSelect.options[fieldSelect.selectedIndex].text
              },
              query: querySelect.options[querySelect.selectedIndex].text
            })
          })
          this.groupByData = []
          this.countData = []
          this.maxData = []
          this.minData = []
          this.avgData = []
          this.sumData = []
          templateEachData.forEach(item => {
            switch (item.query) {
              case 'Group_by':
                this.groupByData.push(item.field)
                break
              case 'Count':
                this.countData.push(item.field)
                break
              case 'Max':
                this.maxData.push(item.field)
                break
              case 'Min':
                this.minData.push(item.field)
                break
              case 'Avg':
                this.avgData.push(item.field)
                break
              case 'Sum':
                this.sumData.push(item.field)
                break
              default:
                return
            }
          })

          let tabParams = {
            resourceId: this.resourceId,
            reportName: this.reportName,
            tableName: this.tableName,
            groupByArray: this.groupByData,
            sum: this.sumData,
            count: this.countData,
            max: this.maxData,
            min: this.minData,
            avg: this.avgData,
            fieldArray: fieldArray
          }

          axios.get('http://192.168.10.173:8080/jinDao_BI/report/save', {params: {fieldJson: tabParams}}).then(response => {
            if (response.data.code === '0') {
              axios.get('http://192.168.10.173:8080/jinDao_BI/report/reportDetail', {params: {id: response.data.response[0].id}}).then(response => {
                if (response.data.response.length !== 0) {
                  this.defaultText = '加载中...'
                  let columns = Object.keys(response.data.response[0])
                  this.searchColumns = []
                  this.searchData = []
                  columns.map(item => {
                    this.searchColumns.push({title: item, key: item})
                  })
                  this.searchData = response.data.response
                } else {
                  this.defaultText = '暂无数据'
                }
              })
            }
          })
        }
      },
      addColumn () {
        let templateEle = {
          title: ''
        }
        this.templateData.push(templateEle)
      },
      generated () {
        this.reportShow = true
        this.searchShow = false
        axios.get('http://192.168.10.173:8080/jinDao_BI/report/list', {params: {resourceId: this.resourceId}}).then(response => {
          if (response.data.code === '0') {
            this.reportData = response.data.response
          } else {
            this.$Message.error('查询错误,请重新查询')
          }
        })
      }
    },
    created () {
      axios.get('https://www.easy-mock.com/mock/59b73c5ae0dc663341a6450b/jinDao/sidebar_copy_1505185248062').then(response => {
        this.treeData = response.data.response
      })
      axios.get('https://www.easy-mock.com/mock/59b73c5ae0dc663341a6450b/jinDao/sidebar').then(response => {
        let defaultData = response.data.response
        this.panelData = defaultData[0].children[0].children
        this.resourceId = defaultData[0].id
        this.tableName = defaultData[0].children[0].tableName  // 表名

        defaultData.forEach(item => {
          this.dataLibraryName.push(item.label)
          item.children.forEach(ele => {
            this.dataTableName.push(ele)
          })
        })
      })
    }
  }
</script>