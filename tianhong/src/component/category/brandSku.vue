<template lang="pug">
    .page-wrapper
        .brandWebsite-title
            .website-list(v-for="(list,index) in webList",:class="{active:activeIndex===index}",@click="changIndex(index)") {{list.name}}
        .page-content
            .navTree
                .tree-title
                    Icon(type="navicon")
                    | 所有商品
                .tree-list
                    Tree(:data="treeData",@on-select-change="getTreeList")
                p(style='font-size:13px;color: #949494;margin-top:10px;display: inline-block;text-align:center;width:100%') 本期仅展示饼干，其他敬请期待
            .page-message
                .form-group
                    span.turnoverTime(style='float: left',v-if='updateTime!=""') 页面数据最新更新时间：{{updateTime}}
                    Button(type="primary",@click='derive') 导出
                .table-list
                    Table(:columns="columns",:data="tabData",border,:no-data-text="dataText")
                    .pagination-wrapper
                        Button(@click="pageGoto",style="margin:20px 0;float:right;margin-left:15px") 转到
                        Page(ref="goto",:total='pageTotal',:page-size='pageSize',:current="pageCurrent",show-elevator,show-total,@on-change='getPage')
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import moment from 'moment'
  import { getToken } from '../../utils/token'
  import { brandCategory, brandSku } from '../../api/actions'

  export default {
    name: 'brandSku',
    data () {
      return {
        activeIndex: 0,
        target: '天猫超市',
        goodsId: 0,
        goodsLevel: 2,
        treeData: [],
        tabData: [],
        dataText: '数据加载中...',

        pageTotal: 1,
        pageSize: 10,
        pageCurrent: 1,
        updateTime: '',

        webList: [
          {name: '天猫超市'},
          {name: '京东超市'},
          {name: '一号店超市'},
        ],
        columns: [
          {
            title: '序号',
            width: '5%',
            align: 'center',
            key: 'Number'
          },
          {
            title: '品牌名',
            key: 'Name',
            align: 'center',
          },
          {
            title: '商品小类名称',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.Categorys.split(',').map(item => {
                return h('p', item)
              }))
            }
          },
          {
            title: 'SKU数',
            width: '6%',
            align: 'center',
            key: 'SkuCount'
          },
          {
            title: 'SKU数占比%',
            width: '10%',
            align: 'center',
            key: 'SkuPercentage'
          },
          {
            title: '销量',
            width: '8%',
            align: 'center',
            key: 'SaleCount'
          },
          {
            title: '销量占比%',
            width: '8%',
            align: 'center',
            key: 'SalePercentage'
          },
          {
            title: '销售额(万元)',
            width: '9%',
            align: 'center',
            key: 'PriceCount'
          },
          {
            title: '销售额占比%',
            align: 'center',
            key: 'PricePercentage'
          },
          {
            title: '件单价(元)',
            width: '8%',
            align: 'center',
            key: 'Price'
          }
        ]
      }
    },
    methods: {
      pageGoto () {
        let val = parseInt(document.querySelector('.ivu-page-options-elevator input[type="text"]').value)
        const page = this.$refs.goto.allPages
        if (val > page) {
          this.pageCurrent = page
        } else if (val <= 0) {
          this.pageCurrent = 1
        } else {
          this.pageCurrent = val
        }
        this.askData()
      },
//      askParams ({
//                   Level = this.goodsLevel,
//                   PlatId = this.activeIndex + 2,
//                   CategoryId = this.goodsId,
//                   Page = this.pageSize,
//                   CurrentPage = this.pageCurrent
//                 }) {
//        let askUrl = `http://121.9.245.185:1188/Ajax/Sku.ashx`,
//          params = Qs.stringify({
//            method: 'GetBrandSku',
//            Level: Level,
//            PlatId: PlatId,
//            CategoryId: CategoryId,
//            Page: Page,
//            CurrentPage: CurrentPage
//          })
//        return [askUrl, params]
//      },
      askData () {
        this.tabData = []
        let data = Qs.stringify({
          method: 'GetBrandSku',
          token: getToken('Token'),
          Level: this.goodsLevel,
          PlatId: this.activeIndex + 2,
          CategoryId: this.goodsId,
          Page: this.pageSize,
          CurrentPage: this.pageCurrent
        })
        brandSku(data).then(response => {
          if (response.data.Status) {
            if (response.data.Data.length === 0) {
              this.dataText = '暂无数据'
            }
            this.tabData = response.data.Data
            this.pageTotal = response.data.Count
            this.updateTime = response.data.UpdateTime
          } else {
            this.dataText = '暂无数据'
            this.tabData = []
            this.pageTotal = 1
            this.updateTime = ''
          }
        })
//        axios.post(Params[0], Params[1]).then(response => {
//          if (response.data.Status) {
//            if (response.data.Data.length === 0) {
//              this.dataText = '暂无数据'
//            }
//            this.tabData = response.data.Data
//            this.pageTotal = response.data.Count
//            this.updateTime = response.data.UpdateTime
//          } else {
//            this.dataText = '暂无数据'
//            this.tabData = []
//            this.pageTotal = 1
//            this.updateTime = ''
//          }
//        })
      },
//      getUrl ({
//                CategoryName = '饼干',
//                PlatId = this.activeIndex + 2,
//                Level = 2
//              }) {
//        let Url = `http://121.9.245.185:1188/Ajax/Category.ashx`,
//          data = Qs.stringify({
//            method: 'GetParameterCategory',
//            CategoryName: CategoryName,
//            PlatId: PlatId,
//            Level: Level
//          })
//        return [Url, data]
//      },
      changIndex (index) {
        let _this = this
        this.activeIndex = index
//        this.target = event.target.innerHTML
        this.pageCurrent = 1
        this.pageTotal = 1

        if (index === 0) {
          this.columns[5].title = '销量'
          this.columns[7].title = '销量额(万元)'
          this.columns[9].title = '件单价'
        } else {
          this.columns[5].title = '销量比重'
          this.columns[7].title = '销量额比重'
          this.columns[9].title = '预估件单价(元)'
        }

//        function sort () {
//          let [Url, data] = _this.getUrl({CategoryName: index === 1 ? '饼干' : '饼干,进口饼干'})
//          return axios.post(Url, data)
//        }

        let data = Qs.stringify({
          method: 'GetParameterCategory',
          token: getToken('Token'),
          CategoryName: index === 1 ? '饼干' : '饼干,进口饼干',
          PlatId: this.activeIndex + 2,
          Level: 2
        })

        brandCategory(data).then(response => {
          _this.treeData = []
          let data = response.data
          data.Category.forEach(item => {
            if (JSON.stringify(item) !== '{}') {
              _this.treeData.push(item)
            }
          })
          _this.goodsId = _this.treeData[0].children[0].children[0].Id
          _this.gooodLevel = _this.treeData[0].children[0].children[0].Level
          _this.askData()
        })

//        sort().then(response => {
//          _this.treeData = []
//          let data = response.data
//          data.Category.forEach(item => {
//            if (JSON.stringify(item) !== '{}') {
//              _this.treeData.push(item)
//            }
//          })
//          _this.goodsId = _this.treeData[0].children[0].children[0].Id
//          _this.gooodLevel = _this.treeData[0].children[0].children[0].Level
//          _this.askData()
//        })
      },
      getTreeList (name) {
        this.pageCurrent = 1
        if (name.length != 0) {
          this.goodsId = name[0].Id
          this.goodsLevel = name[0].Level
        }
        this.askData()
      },
      derive () {
        let deriveUrl = `http://121.9.245.185:1188/Ajax/Export.ashx?PlatId=${this.activeIndex + 2}&Level=${this.goodsLevel}&CategoryId=${this.goodsId}&FileName=品牌SKU导出数据 ${moment(new Date).format('YYYY-MM-DD')}&method=SkuBrandExport&Token=${getToken('Token')}`
        location.href = deriveUrl
      },
      getPage (page) {
        this.pageCurrent = page
        this.askData()
      }
    },
    created () {
      let _this = this

//      function sort () {
//        let [Url, data] = _this.getUrl({CategoryName: '饼干,进口饼干'})
//        return axios.post(Url, data)
//      }

      let data = Qs.stringify({
        method: 'GetParameterCategory',
        token: getToken('Token'),
        CategoryName: '饼干,进口饼干',
        PlatId: this.activeIndex + 2,
        Level: 2
      })

      brandCategory(data).then(response => {
        let data = response.data
        data.Category.forEach(item => {
          if (JSON.stringify(item) !== '{}') {
            _this.treeData.push(item)
          }
        })
        _this.goodsId = _this.treeData[0].children[0].children[0].Id
        _this.goodsLevel = _this.treeData[0].children[0].children[0].Level
        _this.askData()
      })

//      sort().then(response => {
//        let data = response.data
//        data.Category.forEach(item => {
//          if (JSON.stringify(item) !== '{}') {
//            _this.treeData.push(item)
//          }
//        })
//        _this.goodsId = _this.treeData[0].children[0].children[0].Id
//        _this.goodsLevel = _this.treeData[0].children[0].children[0].Level
//        _this.askData()
//      })
    }
  }
</script>
<style lang="scss" scoped>
    .page-message {
        padding: 0 20px 20px 20px;
        min-height: 500px;
        margin-left: 200px;
        border-left: 1px solid #ccc;
    }

    .brandWebsite-title {
        background-color: #ffffff;
        font-size: 16px;
        color: #323232;
        margin: 0px -20px 0;
        padding-left: 20px;
    }

    .website-list {
        display: inline-block;
        padding: 12px 15px;
    }

    .active {
        color: #2D8CF0;
        border-bottom: 2px solid #2D8CF0;
    }

    .navTree {
        width: 190px;
    }

    .form {
        &-group {
            padding: 20px 0 5px 0;
            border-bottom: 1px solid #00B27A;
            text-align: right;
        }
    }

    .table {
        &-list {
            margin-top: 10px;
            width: 100%;
        }
    }

    .turnoverTime {
        font-size: 14px;
        color: #949494;
    }
</style>
<style lang="scss">
    .ivu-table-border td {
        border-right: 1px solid #ccc !important;
    }

    .ivu-table td {
        border-bottom: 1px solid #ccc !important;
    }

    .ivu-table-wrapper {
        border-color: #ccc;
    }

    .ivu-table-cell {
        padding: 5px;
    }
</style>
