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
                    button.hint {{hint}}
                    Table(:columns="changeColumns",:data="tabData",border,:no-data-text="dataText")
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import moment from 'moment'
  import { GoodsCategory, CategorySku } from '../../api/actions'
  import { getToken } from '../../utils/token'

  export default {
    name: 'categorySku',
    data () {
      return {
        activeIndex: 0,
        target: '天猫超市',
        goodsId: 0,
        goodsLevel: 2,
        treeData: [],
        tabData: [],
        hint: '国产饼干',
        updateTime: '',
        dataText: '数据加载中...',

        webList: [
          {name: '天猫超市'},
          {name: '京东超市'},
          {name: '一号店超市'},
        ],
        columns: [
          {
            title: '序号',
            width: '6%',
            align: 'center',
            render: (h, params) => {
              if (this.tabData.length === (params.index + 1)) {
                return '合计'
              } else {
                return params.index + 1
              }
            }
          },
          {
            title: '商品小类名称',
            key: 'Name',
            align: 'center',
          },
          {
            title: 'SKU数',
            align: 'center',
            key: 'SkuCount'
          },
          {
            title: 'SKU数占比%',
            align: 'center',
            key: 'SkuPercentage'
          }
        ],
        columnSale: [
          {
            title: '销量(单)',
            align: 'center',
            key: 'SaleCount'
          },
          {
            title: '销量占比%',
            align: 'center',
            key: 'SalePercentage'
          },
          {
            title: '销售额(万元)',
            align: 'center',
            key: 'PriceCount'
          },
          {
            title: '销售额占比%',
            align: 'center',
            key: 'PricePercentage'
          },
        ],
        columnMonthly: [
          {
            title: '月销量比重',
            align: 'center',
            key: 'SaleCount'
          },
          {
            title: '销量占比%',
            align: 'center',
            key: 'SalePercentage'
          },
          {
            title: '月销售额比重',
            align: 'center',
            key: 'PriceCount'
          },
          {
            title: '销售额占比%',
            align: 'center',
            key: 'PricePercentage'
          },
        ],
        columnEnd: [
          {
            title: '件单价(元)',
            width: '8%',
            align: 'center',
            key: 'Price'
          },
          {
            title: '品牌数',
            width: '6%',
            align: 'center',
            key: 'BrandCount'
          }
        ],
        changeColumns: ''
      }
    },
    methods: {
//      askParams ({
//                   Level = this.goodsLevel,
//                   PlatId = this.activeIndex + 2,
//                   CategoryId = this.goodsId
//                 }) {
//        let askUrl = `http://121.9.245.185:1188/Ajax/Sku.ashx`,
//          params = Qs.stringify({
//            method: 'GetCategorySku',
//            Level: Level,
//            PlatId: PlatId,
//            CategoryId: CategoryId
//          })
//        return [askUrl, params]
//      },
      askData () {
        let data = Qs.stringify({
          method: 'GetCategorySku',
          token: getToken('Token'),
          Level: this.goodsLevel,
          PlatId: this.activeIndex + 2,
          CategoryId: this.goodsId
        })
        this.tabData = []

        CategorySku(data).then(response => {
          if (response.data.Status) {
            response.data.Data.push({
              BrandCount: '',
              SkuCount: response.data.SkuSum,
              SkuPercentage: '',
              SaleCount: response.data.SaleSum,
              SalePercentage: '',
              PriceCount: response.data.SalePrice,
              PricePercentage: '',
              Price: '',
              BrandCount: response.data.BrandSum
            })
            if (response.data.Data.length === 0) {
              this.dataText = '暂无数据'
            }
            this.tabData = response.data.Data
            this.updateTime = response.data.UpdateTime
          } else {
            this.dataText = '暂无数据'
            this.tabData = []
            this.updateTime = ''
          }
        })
//        axios.post(Params[0], Params[1]).then(response => {
//          if (response.data.Status) {
//            response.data.Data.push({
//              BrandCount: '',
//              SkuCount: response.data.SkuSum,
//              SkuPercentage: '',
//              SaleCount: response.data.SaleSum,
//              SalePercentage: '',
//              PriceCount: response.data.SalePrice,
//              PricePercentage: '',
//              Price: '',
//              BrandCount: response.data.BrandSum
//            })
//            if (response.data.Data.length === 0) {
//              this.dataText = '暂无数据'
//            }
//            this.tabData = response.data.Data
//            this.updateTime = response.data.UpdateTime
//          } else {
//            this.dataText = '暂无数据'
//            this.tabData = []
//            this.updateTime = ''
//          }
//        })
      },

//      getUrl ({
//                CategoryName = '饼干',
//                PlatId = this.activeIndex + 2,
//                Level = 2
//              }) {
////        let Url = `http://121.9.245.185:1188/Ajax/Category.ashx`,
//        let data = Qs.stringify({
//          method: 'GetParameterCategory',
//          token: getToken('Token'),
//          CategoryName: CategoryName,
//          PlatId: PlatId,
//          Level: Level
//        })
//        return [data]
//      },

      changIndex (index) {
        let _this = this
        this.activeIndex = index
//        this.target = event.target.innerHTML
        if (index === 0) {
          this.columnEnd[0].title = '件单价(元)'
          this.changeColumns = this.columns.concat(this.columnSale).concat(this.columnEnd)
        } else {
          this.columnEnd[0].title = '预估件单价(元)'
          this.changeColumns = this.columns.concat(this.columnMonthly).concat(this.columnEnd)
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
        GoodsCategory(data).then(response => {
          _this.treeData = []
          let data = response.data
          data.Category.forEach(item => {
//            if (data.Category.length === 1) {
//              data.Category[0].children[1].children[0].title='进口'+data.Category[0].children[1].children[0].title
//            }
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
////          _this.askData()
//        })
        if (_this.treeData[0].title.indexOf('进口') === 0) {
          _this.hint = '进口饼干'
        } else {
          _this.hint = '国产饼干'
        }
      },
      getTreeList (name) {
        this.pageCurrent = 1
        if (name.length != 0) {
          this.goodsId = name[0].Id
          this.goodsLevel = name[0].Level
        }
        if (name[0].title.indexOf('进口') === -1) {
          this.hint = '国产饼干'
        } else {
          this.hint = name[0].title
        }
        if (name[0].FatherId === 8560) {
          this.hint = '进口饼干'
        }
        this.askData()
      },
      derive () {
        let deriveUrl = `http://121.9.245.185:1188/Ajax/Export.ashx?PlatId=${this.activeIndex + 2}&Level=${this.goodsLevel}&CategoryId=${this.goodsId}&FileName=品类SKU导出数据 ${moment(new Date).format('YYYY-MM-DD')}&method=SkuCategoryExport&Token=${getToken('Token')}`
        location.href = deriveUrl
      },
      getPage (page) {
        this.pageCurrent = page
        this.askData()
      }
    },
    created () {
      this.changeColumns = this.columns.concat(this.columnSale).concat(this.columnEnd)

//      function sort () {
//        let data = _this.getUrl({CategoryName: '饼干,进口饼干'})
//        return data
//      }

      let data = Qs.stringify({
        method: 'GetParameterCategory',
        token: getToken('Token'),
        CategoryName: '饼干,进口饼干',
        PlatId: this.activeIndex + 2,
        Level: 2
      })

      GoodsCategory(data).then(response => {
        let data = response.data
        data.Category.forEach(item => {
          if (JSON.stringify(item) !== '{}') {
            this.treeData.push(item)
          }
        })
        this.goodsId = this.treeData[0].children[0].children[0].Id
        this.goodsLevel = this.treeData[0].children[0].children[0].Level
        this.askData()
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
        padding: 0 20px 50px 20px;
        min-height: 500px;
        margin-left: 200px;
        border-left: 1px solid #ccc;
    }

    .brandWebsite-title {
        background-color: #ffffff;
        font-size: 16px;
        color: #323232;
        margin: 9px -20px 0;
        padding-left: 20px;
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

    .hint {
        background: #F6A623;
        border: 0 none;
        border-radius: 3px;
        font-size: 14px;
        color: #FFFFFF;
        padding: 8px 16px
    }
</style>
<style lang="scss">
    .ivu-tree-arrow-disabled ~ span {
        cursor: not-allowed;
    }

    .website-list {
        display: inline-block;
        padding: 12px 15px;
        cursor: pointer;
    }
</style>