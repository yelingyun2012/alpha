<template lang="pug">
    .page-wrapper
        p.updateTime-wrapper(v-if='updateTime!=""')
            span 页面数据最近更新时间：{{updateTime}}
        .page-content
            .navTree(v-if="treeData.length!=0")
                .tree-title
                    Icon(type="navicon")
                    | 所有商品
                .tree-list
                    Tree(:data="treeData", @on-select-change="getTreeList")
            .page-message(:class="{'page-message-pd':treeData.length!=0}")
                .form-group
                    .form-list
                      Select(v-model="website", style='width:120px', @on-change="getWebsite")
                        Option(v-for="(item,index) in webList", :value="item.value", :key="index") {{item.label}}
                    .form-list
                        Select(v-model="sort", style='width:120px',@on-change="getSort")
                            Option(v-for="(item,index) in priceList", :value="item.value", :key="index") {{item.label}}
                    Button(type='primary',@click="derive") 导出
                .table-list
                    Table(:columns="columns", :data="tabData",:row-class-name="rowClassName", border, :no-data-text="dataText")
                    .pagination-wrapper
                        Button(@click="pageGoto", style="margin:20px 0;float:right;margin-left:15px") 转到
                        Page(ref="goto", :total='pageTotal', :page-size='pageSize', :current="pageCurrent", show-elevator, show-total, @on-change='getPage')
</template>
<script>
  import Qs from 'qs'
  import moment from 'moment'
  import { getToken } from '../../utils/token'
  import { Category, ShopsBJ } from '../../api/actions'

  export default {
    name: 'dashboard',
    data () {
      return {
        goodsId: 0,
        goodsLevel: 0,
        treeData: [], // 树数据
        dataText: '数据加载中...',

        website: 2,  // 对标商品默认参数
        sort: 0,  // 显示价格默认参数

        pageTotal: 1,  // 分页总数
        pageSize: 10,   // 每页显示条数
        pageCurrent: 1,  // 当前页码
        tabData: [],
        updateTime: '',
        platId: this.$store.state.user.ID,

        webList: [
          {
            value: 2,
            label: '对标天猫'
          },
          {
            value: 3,
            label: '对标京东'
          },
          {
            value: 4,
            label: '对标一号店'
          },
          {
            value: 5,
            label: '对标华润'
          },
          {
            value: 7,
            label: '对标沃尔玛'
          },
          {
            value: 9,
            label: '对标永辉'
          }
        ],



        priceList: [
          {
            value: 0,
            label: '显示全部商品'
          },
          {
            value: 1,
            label: '只显示价高商品'
          },
          {
            value: 2,
            label: '只显示价低商品'
          }
        ],

        columns: [
          {
            title: '商品id',
            width: '10%',
            align: 'center',
            render: (h, params) => {
              return params.row.BAR_CODE === null || params.row.BAR_CODE === '' ? '—' : params.row.BAR_CODE
            }
          },
          {
            title: '商品名称',
            align: 'center',
            key: 'GOODS_NAME'
          },
          {
            title: '规格',
            width: '8%',
            align: 'center',
            render: (h, params) => {
              return params.row.GOODS_SIZE === null || params.row.GOODS_SIZE === '' ? '—' : params.row.GOODS_SIZE
            }
          },
          {
            title: '品牌',
            width: '6%',
            align: 'center',
            render: (h, params) => {
              return params.row.BRAND === null || params.row.BRAND === '' ? '—' : params.row.BRAND
            }
          },
          {
            title: '价格(元)',
            width: '6%',
            align: 'center',
            render: (h, params) => {
              return params.row.PRICE === null || params.row.PRICE === '' ? '—' : params.row.PRICE
            }
          },
          {
            title: '天猫价差率',
            width: '7%',
            align: 'center',
            render: (h, params) => {
              return params.row.TM_GOODS_ID === null ? '—' : h('router-link', {
                attrs: {
                  to: {path: `/dashboard/message`, query: {plan: 2, planId: `${params.row.TM_GOODS_ID}`}},
                  target: '_blank'
                }
              }, `${(params.row.TM_DIFFERENT_PRICE * 100).toFixed(2)}%`)
            }
          },
          {
            title: '京东价差率',
            width: '7%',
            align: 'center',
            render: (h, params) => {
              return params.row.JD_GOODS_ID === null ? '—' : h('router-link', {
                attrs: {
                  to: {path: `/dashboard/message`, query: {plan: 3, planId: `${params.row.JD_GOODS_ID}`}},
                  target: '_blank'
                }
              }, `${(params.row.JD_DIFFERENT_PRICE * 100).toFixed(2)}%`)
            }
          },
          {
            title: '1号店价差率',
            width: '8%',
            align: 'center',
            render: (h, params) => {
              return params.row.YHD_GOODS_ID === null ? '—' : h('router-link', {
                attrs: {
                  to: {path: `/dashboard/message`, query: {plan: 4, planId: `${params.row.YHD_GOODS_ID}`}},
                  target: '_blank'
                }
              }, `${(params.row.YHD_DIFFERENT_PRICE * 100).toFixed(2)}%`)
            }
          },
          {
            title: '华润价差率',
            width: '7%',
            align: 'center',
            render: (h, params) => {
              return params.row.HR_GOODS_ID === null ? '—' : h('router-link', {
                attrs: {
                  to: {path: `/dashboard/message`, query: {plan: 5, planId: `${params.row.HR_GOODS_ID}`}},
                  target: '_blank'
                }
              }, `${(params.row.HR_DIFFERENT_PRICE * 100).toFixed(2)}%`)
            }
          },
          {
            title: '沃尔玛价差率',
            width: '8%',
            align: 'center',
            render: (h, params) => {
              return params.row.WOM_GOODS_ID === null ? '—' : h('router-link', {
                attrs: {
                  to: {path: `/dashboard/message`, query: {plan: 7, planId: `${params.row.WOM_GOODS_ID}`}},
                  target: '_blank'
                }
              }, `${(params.row.WOM_DIFFERENT_PRICE * 100).toFixed(2)}%`)
            }
          },
          {
            title: '永辉价差率',
            width: '7%',
            align: 'center',
            render: (h, params) => {
              return params.row.YH_GOODS_ID === null ? '—' : h('router-link', {
                attrs: {
                  to: {path: `/dashboard/message`, query: {plan: 9, planId: `${params.row.YH_GOODS_ID}`}},
                  target: '_blank'
                }
              }, `${(params.row.YH_DIFFERENT_PRICE * 100).toFixed(2)}%`)
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
      askData () {
        this.tabData = []
        let params = Qs.stringify({
          method: 'GetAll',
          token: getToken('Token'),
          CountPage: this.pageSize,
          CurrentPage: this.pageCurrent,
          PlatId: this.platId,
          BJPlatId: this.website,
          showType: this.sort,
          CId: this.goodsId,
          Level: this.goodsLevel
        })
        ShopsBJ(params).then(response => {
          if (response.data.Data.length === 0) {
            this.dataText = '暂无数据'
          }
          this.tabData = response.data.Data
          this.pageTotal = response.data.Count
          this.updateTime = response.data.UpdateTime
        })
      },
      getTreeList (data) {
        if (data.length != 0) {
          this.goodsId = data[0].Id
          this.goodsLevel = data[0].Level
        }
        this.askData()
      },
      getPage (page) {
        this.pageCurrent = page
        this.askData()
      },
      getWebsite () {
        this.pageCurrent = 1
        this.askData()
      },
      getSort () {
        this.pageCurrent = 1
        this.askData()
      },
      rowClassName (row, index) {
        if (row.IS_HEIGHT) {
          return 'demo-table-error-row'
        }
        return ''
      },
      derive () {
        let Url = `http://121.9.245.185:1188/Ajax/Export.ashx?PlatId=${this.platId}&BJPlatId=${this.website}&showType=${this.sort}&Level=${this.goodsLevel}&CId=${this.goodsId}&FileName=比价导出数据 ${moment(new Date).format('YYYY-MM-DD')}&method=BJExport&Token=${getToken('Token')}`
        location.href = Url
      }
    },
    created () {
      let data = Qs.stringify({
        method: 'GetCategory',
        token: getToken('Token'),
        PlatId: this.$store.state.user.ID
      })
      Category(data).then(response => {
        if (response.data.Category.length !== 0) {
          response.data.Category.forEach(item => {
            item.expand = false
          })
          this.treeData = response.data.Category
        } else {
          this.treeData = []
        }
      })
      this.askData()
    }
  }
</script>
<style lang="scss" scoped>
    .navTree {
        width: 175px;
    }
    .page-message {
        padding: 0 20px 20px 20px;
        min-height: 500px;
        border-left: 1px solid #ccc;
        &-pd {
            margin-left: 190px;
        }
    }
    .form {
        &-group {
            padding: 20px 0;
            border-bottom: 1px solid #00B27A;
            .ivu-btn-primary {
                float: right;
            }
        }
        &-list {
            display: inline-block;
            &:nth-child(1) {
                margin-right: 20px;
            }
        }
    }
    .table {
        &-list {
            margin-top: 10px;
            width: 100%;
        }
    }
    .ivu-table-header table {
        width: 100% !important;
    }
</style>
<style lang="scss">
    .demo-table-error-row td {
        background-color: #ffbc00 !important;
        color: #592c04;
    }
    .demo-table-error-row td a {
        color: #592c04;
    }
</style>