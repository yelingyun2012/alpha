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
                    table.table
                        tr
                            th 序号
                            th 品牌名
                            th 价格带
                            th SKU数
                            th 价格带占比%
                            th {{sales}}
                            th 销量占比%
                            th {{volume}}
                            th 销售额占比%
                            th {{piece}}
                        template(v-for='(item,index) in tabData')
                            tr
                                td(rowspan="3").ivu-table-column-center {{item.Number}}
                                td(rowspan="3",style='padding:0 18px;text-align:center') {{item.Name}}
                                td.ivu-table-body-pd {{item.ListZone[0].Zone}}
                                td.ivu-table-body-pd {{item.ListZone[0].Sku}}
                                td.ivu-table-body-pd {{item.ListZone[0].pricePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[0].Sale}}
                                td.ivu-table-body-pd {{item.ListZone[0].salePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[0].PriceSale}}
                                td.ivu-table-body-pd {{item.ListZone[0].PriceSalePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[0].Price}}
                            tr
                                td.ivu-table-body-pd {{item.ListZone[1].Zone}}
                                td.ivu-table-body-pd {{item.ListZone[1].Sku}}
                                td.ivu-table-body-pd {{item.ListZone[1].pricePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[1].Sale}}
                                td.ivu-table-body-pd {{item.ListZone[1].salePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[1].PriceSale}}
                                td.ivu-table-body-pd {{item.ListZone[1].PriceSalePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[1].Price}}
                            tr
                                td.ivu-table-body-pd {{item.ListZone[2].Zone}}
                                td.ivu-table-body-pd {{item.ListZone[2].Sku}}
                                td.ivu-table-body-pd {{item.ListZone[2].pricePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[2].Sale}}
                                td.ivu-table-body-pd {{item.ListZone[2].salePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[2].PriceSale}}
                                td.ivu-table-body-pd {{item.ListZone[2].PriceSalePercentage}}
                                td.ivu-table-body-pd {{item.ListZone[2].Price}}
                    .pagination-wrapper
                        Button(@click="pageGoto",style="margin:20px 0;float:right;margin-left:15px") 转到
                        Page(ref="goto",:total='pageTotal',:page-size='pageSize',:current="pageCurrent",show-elevator,show-total,@on-change='getPage')
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import moment from 'moment'
  import { getToken } from '../../utils/token'
  import { brandRangCategory, brandPriceZone } from '../../api/actions'

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

        pageTotal: 1,
        pageSize: 10,
        pageCurrent: 1,
        updateTime: '',

        webList: [
          {name: '天猫超市'},
          {name: '京东超市'},
          {name: '一号店超市'},
        ],

        sales: '销量',
        piece: '件单价(元)',
        volume: '销量额(万元)'
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
//                   CategoryId = this.goodsId,
//                   CountPage = this.pageSize,
//                   CurrentPage = this.pageCurrent
//                 }) {
//        let askUrl = `http://121.9.245.185:1188/Ajax/PriceZone.ashx`,
//          params = Qs.stringify({
//            method: 'GetBrandZone',
//            Level: Level,
//            CategoryId: CategoryId,
//            CountPage: CountPage,
//            CurrentPage: CurrentPage
//          })
//        return [askUrl, params]
//      },
      askData () {
        let data = Qs.stringify({
          method: 'GetBrandZone',
          token: getToken('Token'),
          Level: this.goodsLevel,
          CategoryId: this.goodsId,
          CountPage: this.pageSize,
          CurrentPage: this.pageCurrent
        })
        this.tabData = []
        brandPriceZone(data).then(response => {
          if (response.data.Status) {
            this.tabData = response.data.Data
            this.pageTotal = response.data.Count
            this.updateTime = response.data.UpdateTime
          } else {
            this.tabData = []
            this.pageTotal = 1
            this.updateTime = ''
          }
        })

//        axios.post(Params[0], Params[1]).then(response => {
//          if (response.data.Status) {
//            this.tabData = response.data.Data
//            this.pageTotal = response.data.Count
//            this.updateTime = response.data.UpdateTime
//          } else {
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
          this.sales = '销量'
          this.volume = '销量额(万元)'
          this.piece = '件单价(元)'
        } else {
          this.sales = '销量比重'
          this.volume = '销量额比重'
          this.piece = '预估件单价(元)'
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

        brandRangCategory(data).then(response => {
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
        let deriveUrl = `http://121.9.245.185:1188/Ajax/Export.ashx?PlatId=${this.activeIndex + 2}&Level=${this.goodsLevel}&CategoryId=${this.goodsId}&FileName=品牌价格带导出数据 ${moment(new Date).format('YYYY-MM-DD')}&method=BrandPriceZone&Token=${getToken('Token')}`
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

      brandRangCategory(data).then(response => {
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

    .table {
        width: 100%;
        border-spacing: 0;
        border: 1px solid #dddee1;
        th {
            background-color: #F0F0F2;
            height: 40px;
            white-space: nowrap;
            overflow: hidden;
            border-right: 1px solid #e9eaec;
            text-overflow: ellipsis;
            vertical-align: middle;
            border-bottom: 1px solid #e9eaec;
        }
        td {
            border-right: 1px solid #e9eaec;
            padding: 0 18px;
            border-bottom: 1px solid #e9eaec;
        }
        .ivu-table-body-pd {
            padding: 10px 18px 6px;
            text-align: center;
        }
    }
</style>
<style lang="scss">
    .ivu-tree-arrow-disabled ~ span {
        cursor: not-allowed;
    }
</style>