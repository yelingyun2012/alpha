<template lang="pug">
    .page-wrapper
        .basicWebsite-title
            .website-list(v-for="(list,index) in webList",:class="{active:activeIndex===index}",@click="changIndex(index)",:name=`list.name+'-'+list.key`) {{list.name}}
        .page-content
            .navTree
                .tree-title
                    Icon(type="navicon")
                    | 所有品类
                .tree-list
                    Tree(:data="treeData",@on-select-change="getTreeList")

            .page-message
                .derive-wrapper
                    Button(type="primary",@click='derive') 导出
                .table-list
                    Table(:columns="changeColumns",:data="tabData",border,:no-data-text="dataText")
                    .pagination-wrapper
                        Button(@click="pageGoto",style="margin:20px 0;float:right;margin-left:15px") 转到
                        Page(ref="goto",:total='pageTotal',:page-size='pageSize',:current="pageCurrent",show-elevator,show-total,@on-change='getPage')
</template>
<script>
  import Qs from 'qs'
  import moment from 'moment'
  import { basicCategory, GoodsBaseData } from '../../api/actions'
  import { getToken } from '../../utils/token'

  export default {
    name: 'basicData',
    data () {
      return {
        activeIndex: 0,
        target: '天猫超市',
        webList: [
          {name: '天猫超市', key: 'tmall'},
          {name: '京东超市', key: 'jd'},
          {name: '一号店超市', key: 'yhd'}
        ],
        goodsId: 0,
        goodsLevel: 0,
        treeData: [], //导航数数据
        tabData: [], //表格数数据
        dropName: '', // drop 名
        drop: [],  // drop 数据
        dropData: [], // drop 名
        platId: this.$store.state.user.platId,

        pageTotal: 1,  // 分页总数
        pageSize: 10,   // 每页显示条数
        pageCurrent: 1,  // 当前页码
        dataText: '数据加载中...',
        columns: [
          {
            title: '销量排名',
            width: '5%',
            align: 'center',
            key: 'Number'
          },
          {
            title: '商品名称',
            width: '16%',
            align: 'center',
            key: 'Name'
          },
          {
            title: '品牌',
            width: '10%',
            align: 'center',
            key: 'Brand'
          },
          {
            title: '规格',
            width: '9%',
            align: 'center',
            render: (h, params) => {
              return params.row.Spec === '' ? '—' : params.row.Spec
            }
          },
          {
            title: '价格(元)',
            align: 'center',
            render: (h, params) => {
              return params.row.Price === '' || params.row.Price === -1 ? '—' : params.row.Price
            }
          },
          {
            title: '促销活动',
            width: '15%',
            align: 'center',
            render: (h, params) => {
              return params.row.Activity === '' ? '—' : params.row.Activity
            }
          }
        ],
        columnSale: [
          {
            title: '月销量(单)',
            width: '8%',
            align: 'center',
            render: (h, params) => {
              return params.row.Sales === '' ? '—' : params.row.Sales
            }
          }
        ],
        columnCollect: [
          {
            title: '收藏数',
            align: 'center',
            render: (h, params) => {
              return params.row.Collect === '' ? '—' : params.row.Collect
            }
          }
        ],
        columnEnd: [
          {
            title: '评论数',
            align: 'center',
            render: (h, params) => {
              return params.row.Comment === '' ? '—' : params.row.Comment
            }
          },
          {
            title: '在售状态',
            width: '8%',
            align: 'center',
            render: (h, params) => {
              return params.row.Price === '' || params.row.Price === -1 ? '无货' : params.row.Status ? '无货' : '在售'
            }
          },
          {
            title: '数据采集时间',
            width: '10%',
            align: 'center',
            render: (h, params) => {
              return moment(params.row.UpdateTime).format('YYYY-MM-DD')
            }
          }
        ],
        changeColumns: ''
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
        let data = Qs.stringify({
          method: 'GetAll',
          token: getToken('Token'),
          Level: this.goodsLevel,
          PlatId: this.activeIndex + 2,
          CategoryId: this.goodsId,
          CountPage: this.pageSize,
          CurrentPage: this.pageCurrent
        })
        GoodsBaseData(data).then(response => {
          if (response.data.Status) {
            if (response.data.Data.length === 0) {
              this.dataText = '暂无数据'
            }
            this.tabData = response.data.Data
            this.pageTotal = response.data.Count
          } else {
            this.tabData = []
            this.pageTotal = 1
            this.dataText = '暂无数据'
          }
        })
      },
      askTreeData () {
        this.dataText = '数据加载中...'
        let data = Qs.stringify({
          method: 'GetCategory',
          token: getToken('Token'),
          PlatId: this.activeIndex + 2
        })
        basicCategory(data).then(response => {
          this.goodsId = response.data.Category[0].Id
          this.goodsLevel = response.data.Category[0].Level
          if (response.data.Status) {
            this.dropName = response.data.Category[0].title
            this.treeData = response.data.Category
            response.data.Category.forEach(item => {
              item.expand = false
              this.dropData.push(item)
              this.drop.push(item.title)
            })
          }
          this.askData()
        })
      },
      derive () {
        let Url = `http://121.9.245.185:1188/Ajax/Export.ashx?PlatId=${this.activeIndex + 2}&Level=${this.goodsLevel}&CategoryId=${this.goodsId}&FileName=商品基础数据导出数据 ${moment(new Date).format('YYYY-MM-DD')}&method=BaseDataExport&Token=${getToken('Token')}`
        location.href = Url
      },

      changIndex (index) {
        if (index === 0) {
          this.changeColumns = this.columns.concat(this.columnSale).concat(this.columnCollect).concat(this.columnEnd)
        } else if (index === 1) {
          this.changeColumns = this.columns.concat(this.columnEnd)
        } else {
          this.changeColumns = this.columns.concat(this.columnCollect).concat(this.columnEnd)
        }
        this.activeIndex = index
        this.target = event.target.innerHTML
        this.pageCurrent = 1
        this.tabData = []
        this.askTreeData()
      },

      getTreeList (name) {
        this.pageCurrent = 1
        if (name.length != 0) {
          this.goodsId = name[0].Id
          this.goodsLevel = name[0].Level
        }
        this.askData()
      },
      getPage (page) {
        this.pageCurrent = page
        this.askData()
      },

      setBaseData (name) {
        this.dropName = name.split('-')[0]
        this.dropData.forEach(item => {
          if (name.split('-')[0] === item.title) {
            this.treeData = item.children
          }
        })
        this.goodsId = name.split('-')[2]
        this.goodsLevel = name.split('-')[1]
        this.askData()
      }
    },
    created () {
      this.changeColumns = this.columns.concat(this.columnSale).concat(this.columnCollect).concat(this.columnEnd)
      this.askTreeData()
    }
  }
</script>
<style lang="scss" scoped>
    .basicWebsite-title {
        background-color: #ffffff;
        font-size: 16px;
        color: #323232;
        margin: -10px -20px 0;
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

    .table {
        &-list {
            margin-top: 10px;
            width: 100%;
        }
    }

    .page-message {
        padding: 0 20px 20px 20px;
        min-height: 500px;
        margin-left: 200px;
        border-left: 1px solid #ccc;
    }

    .ivu-table-header table {
        width: 100% !important;
    }
</style>