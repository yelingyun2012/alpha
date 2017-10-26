<template lang="pug">
    .page-wrapper
        p.updateTime-wrapper
            span(v-if='updateTime!=""') 页面数据最近更新时间：{{updateTime}}
        .page-content
            .navTree
                .tree-title
                    Icon(type="navicon")
                    | {{supplierName}}
                .tree-list
                    Tree(:data="treeData",@on-select-change="getTreeList")
            .page-message
                .derive-wrapper
                    Button(type="primary",@click="derive") 导出
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
  import { GetCategorySupplier, GetSupplierGoods } from '../../api/actions'

  export default {
    name: 'supplier',
    data () {
      return {
        updateTime: '', //更新时间
        goodsId: 0, // 类别ID
        SupplierId: 1,
        supplierName: '元初',
        dataText: '数据加载中...',

        pageTotal: 1,  // 分页总数
        pageSize: 10,   // 每页显示条数
        pageCurrent: 1,  // 当前页码

        treeData: [],  // 类别Tree 数据
        tabData: [],   //表格数据

        columns: [   //表格th
          {
            title: '序号',
            width: '5%',
            align: 'center',
            key: 'Number'
          },
          {
            title: '商品名称',
            align: 'center',
            render: (h, params) => {
              return params.row.GOODS_NAME === '' ? '—' : params.row.GOODS_NAME
            }
          },
          {
            title: '规格',
            width: '7%',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return params.row.SIZE === '' ? '—' : params.row.SIZE
            }
          },
          {
            title: '品牌',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return params.row.BRAND === '' ? '—' : params.row.BRAND
            }
          },
          {
            title: '价格(元)',
            width: '7%',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return params.row.PRICE === '' ? '—' : params.row.PRICE
            }
          },
          {
            title: '月销量(单)',
            width: '8%',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return params.row.MONTH_SALE === '' ? '—' : params.row.MONTH_SALE
            }
          },
          {
            title: '厂名',
            align: 'center',
            render: (h, params) => {
              return params.row.FACTORY === '' ? '—' : params.row.FACTORY
            }
          },
          {
            title: '厂址',
            align: 'center',
            render: (h, params) => {
              return params.row.FACTORY_ADDRESS === '' ? '—' : params.row.FACTORY_ADDRESS
            }
          },
          {
            title: '省市',
            width: '6%',
            align: 'center',
            render: (h, params) => {
              return params.row.PRIVINCE === '' ? '—' : params.row.PRIVINCE
            }
          },
          {
            title: '联系方式',
            width: '11%',
            align: 'center',
            render: (h, params) => {
              return params.row.TELEPHONE === '' ? '—' : params.row.TELEPHONE
            }
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
//                   SupplierId = this.SupplierId,
//                   CategoryId = this.goodsId,
//                   CountPage = this.pageSize,
//                   CurrentPage = this.pageCurrent
//                 }) {
//        let askUrl = `http://121.9.245.185:1188/Ajax/Supplier.ashx`,
//          params = Qs.stringify({
//            method: 'GetSupplierGoods',
//            SupplierId: SupplierId,
//            CategoryId: CategoryId,
//            CountPage: CountPage,
//            CurrentPage: CurrentPage
//          })
//        return [askUrl, params]
//      },
      askData () {
        this.tabData = []
        let data = Qs.stringify({
          method: 'GetSupplierGoods',
          token: getToken('Token'),
          SupplierId: this.SupplierId,
          CategoryId: this.goodsId,
          CountPage: this.pageSize,
          CurrentPage: this.pageCurrent
        })
        GetSupplierGoods(data).then(response => {
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
      getTreeList (data) {
        this.pageCurrent = 1
        if (data.length != 0) {
          this.goodsId = data[0].id
        }
        this.askData()
      },
      getPage (page) {
        this.pageCurrent = page
        this.askData()
      },
      derive () {
        let Url = `http://121.9.245.185:1188/Ajax/Export.ashx?SupplierId=${this.SupplierId}&CategoryId=${this.goodsId}&FileName=供应商导出数据 ${moment(new Date).format('YYYY-MM-DD')}&method=Supplier&Token=${getToken('Token')}`
        location.href = Url
      }
    },
    created () {
//      let Url = `http://121.9.245.185:1188/Ajax/Supplier.ashx`
      let data = Qs.stringify({
        method: 'GetCategorySupplier',
        token: getToken('Token'),
        SupplierId: 1
      })
      GetCategorySupplier(data).then(response => {
        if (response.data.Status) {
          this.treeData = response.data.Data
        } else {
          this.treeData = []
        }
      })
//      axios.post(Url, data).then(response => {
//        if (response.data.Status) {
//          this.treeData = response.data.Data
//        } else {
//          this.treeData = []
//        }
//      })
      this.askData()
    }
  }
</script>
<style lang="scss" scoped>
    .page-message {
        padding: 0 20px 20px 20px;
        min-height: 500px;
        margin-left: 170px;
        border-left: 1px solid #ccc;
    }

    .table {
        &-list {
            margin-top: 10px;
            width: 100%;
            .ivu-table-cell {
                padding: 0;
            }
        }
    }

    .ivu-table-header table {
        width: 100% !important;
    }
</style>
