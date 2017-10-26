<template lang="pug">
    .page-wrapper
        .details-message
            span.details-updateTime(v-if='updateTime!==""') 数据最近更新时间:{{updateTime}}
            .details-table-layout
                Table(:columns="columns",:data="data",border)
            .details-table-similar
                Button(type='success',@click="activeSimilar",:class="{'is-similar':isActive}")
                    | 相似商品
                    Icon(type="chevron-down")
                span.details-updateTime.details-similarTime(v-if='similarTime!==""') 数据最近更新时间:{{similarTime}}
                Table(:columns="similarGoods",:data="similarData",v-if="isActive",border)
        .details-tendencyChart
            .trendChart
                .trendChart-title
                    Icon(type="arrow-graph-up-right")
                    | 近一个月价格走势图
                #trendChart-map.trendChart-map(:style="{width:'100%',height:'400px'}")
        .details-tendencyChart(v-show="this.$route.query.plan == '2'")
            .trendChart
                .trendChart-title
                    Icon(type="arrow-graph-up-right")
                    | 近一个月活动销量图
                #trendChart-activity.trendChart-map(:style="{width:'100%',height:'400px'}")
                .trendActive
                    span(v-for='active of activeContent') {{active.name}} : {{active.content}}
</template>
<script>
  import Qs from 'qs'
  import echarts from 'echarts'
  import moment from 'moment'

  import { messageShopsBJ, GetTendencys } from '../../api/actions'
  import { getToken } from '../../utils/token'

  export default {
    name: 'message',
    data () {
      return {
        data: [],
        similarData: [],
        updateTime: '',
        similarTime: '',
        isActive: false,
        activeContent: [],
        columns: [],

        defaultMeterStart: [
          {
            title: '商品id',
            width: 150,
            align: 'center',
            key: 'GoodsId'
          },
          {
            title: `天猫品名`,
            align: 'center',
            key: 'Name'
          },
          {
            title: '规格',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return params.row.Spec === '' || params.row.Spec === null ? '—' : params.row.Spec
            }
          },
          {
            title: '天猫价格(元)',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return params.row.Price === '' || params.row.Price === null ? '—' : params.row.Price
            }
          },
          {
            title: '促销活动',
            align: 'center',
            render: (h, params) => {
              return params.row.Contents === '' || params.row.Contents === null ? '—' : params.row.Contents
            }
          }
        ],
        jdMeter: [
          {
            title: '月销量(单)',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return params.row.SalesNumber === '' || params.row.SalesNumber === null ? '—' : params.row.SalesNumber
            }
          },
          {
            title: '收藏数',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return params.row.CollectNumber === '' || params.row.CollectNumber === null ? '—' : params.row.CollectNumber
            }
          }
        ],
        defaultMeterEnd: [
          {
            title: '评论数',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return params.row.Comment === '' ? '—' : params.row.Comment
            }
          }
        ],
        similarGoods: [
          {
            title: '序号',
            type: 'index',
            width: 85,
            align: 'center'
          },
          {
            title: `天猫品名`,
            align: 'center',
            render: (h, params) => {
              return params.row.GOODS_NAME === '' || params.row.GOODS_NAME === null ? '—' : params.row.GOODS_NAME
            }
          },
          {
            title: '规格',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return params.row.GOODS_SIZE === '' || params.row.GOODS_SIZE === null ? '—' : params.row.GOODS_SIZE
            }
          },
          {
            title: '天猫价格(元)',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return params.row.PRICE === '' || params.row.PRICE === null ? '—' : params.row.PRICE
            }
          }
        ],
      }
    },
    methods: {
      activeSimilar () {
        this.isActive = !this.isActive
      },
      getDaysInMonth () {
        let nowDate = new Date()
        let month = (nowDate.getMonth() + 1)
        let year = nowDate.getFullYear()
        let days
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) days = 31
        else if (month == 4 || month == 6 || month == 9 || month == 11) days = 30
        else if (month == 2) {
          if (isLeapYear(year)) { days = 29 }
          else { days = 28 }
        }
        let b = []
        for (let i = 1, len = days; i < len + 1; i++) {
          b.push(i)
        }
        return b
      }
    },

    created () {
      let _this = this
      switch (this.$route.query.plan) {
        case '2':
          this.columns = this.defaultMeterStart.concat(this.jdMeter).concat(this.defaultMeterEnd)
          this.columns[1].title = '天猫品名'
          this.columns[3].title = '天猫价格'
          this.similarGoods[1].title = '天猫品名'
          this.similarGoods[3].title = '天猫价格(元)'
          break
        case '3':
          this.columns = this.defaultMeterStart.concat(this.defaultMeterEnd)
          this.columns[1].title = '京东品名'
          this.columns[3].title = '京东价格'
          this.similarGoods[1].title = '京东品名'
          this.similarGoods[3].title = '京东价格(元)'
          break
        case '4':
          this.columns = this.defaultMeterStart.concat(this.jdMeter[1]).concat(this.defaultMeterEnd)
          this.columns[1].title = '一号店品名'
          this.columns[3].title = '一号店价格'
          this.similarGoods[1].title = '一号店品名'
          this.similarGoods[3].title = '一号店价格(元)'
          break
        case '5':
          this.columns = this.defaultMeterStart.concat(this.defaultMeterEnd)
          this.columns[1].title = '华润品名'
          this.columns[3].title = '华润价格'
          this.similarGoods[1].title = '华润品名'
          this.similarGoods[3].title = '华润价格(元)'
          break
        case '7':
          this.columns = this.defaultMeterStart
          this.columns[1].title = '沃尔玛品名'
          this.columns[3].title = '沃尔玛价格'
          this.similarGoods[1].title = '沃尔玛品名'
          this.similarGoods[3].title = '沃尔玛价格(元)'
          break
        case '9':
          this.columns = this.defaultMeterStart.concat(this.defaultMeterEnd)
          this.columns[1].title = '永辉品名'
          this.columns[3].title = '永辉价格'
          this.similarGoods[1].title = '永辉品名'
          this.similarGoods[3].title = '永辉价格(元)'
          break
      }
      let data = Qs.stringify({
        method: 'GetInfo',
        token: getToken('Token'),
        Id: this.$route.query.planId,
        BJPlatId: this.$route.query.plan
      })
      messageShopsBJ(data).then(response => {
        this.data.push(response.data.Data)
        this.updateTime = response.data.Data.UpdateTime
        this.similarTime = response.data.UpdateTime
        this.similarData = response.data.SimilarData
        let data = Qs.stringify({
          method: 'GetTendencys',
          token: getToken('Token'),
          GoodsId: response.data.Data.GoodsId,
          BJPlatId: this.$route.query.plan
        })
        GetTendencys(data).then(response => {
          if (response.data.Status) {
            let chartData = []
            let activityChartData = []
            let actives = []
            let priceData = []
            if (response.data.Tendency.SP.length != 0) {
              response.data.Tendency.SP.forEach(item => {
                chartData.push(item.Price)
                priceData.push(moment(item.Day).format('M/DD'))
                activityChartData.push(item.Sale)
              })
              response.data.Tendency.Active.forEach((ele, index) => {
                var data = [{
                  name: `${ele.name}`,
                  xAxis: moment(ele.start).format('M/DD'),
                  itemStyle: {
                    normal: {
                      color: 'rgba(218, 223, 253,0.65)'
                    }
                  }
                }, {
                  xAxis: moment(ele.end).format('M/DD')
                }]
                _this.activeContent.push({name: ele.name, content: ele.content})
                actives.push(data)
              })
            } else {
              priceData = this.getDaysInMonth()
            }
            let myChart = echarts.init(document.getElementById('trendChart-map'))
            let myChartactivity = echarts.init(document.getElementById('trendChart-activity'))
            myChart.setOption({
              legend: {
                icon: 'circle',
                data: [`历史最高 ${Math.max(...chartData)}`, `历史最低 ${Math.min(...chartData)}`],
                right: 0,
                itemWidth: 10,
                orient: 'vertical'
              },
              xAxis: {
                data: priceData,
                name: '日期(日)'
              },
              yAxis: [
                {type: 'value', name: '价格(元)'}
              ],

              series: [
                {
                  name: `历史最高 ${Math.max(...chartData)}`,
                  type: 'line',
                  symbolSize: 5,
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                      }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                      }], false),
                      shadowColor: 'rgba(0, 0, 0, 0.1)',
                      shadowBlur: 10
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#27BDFF'
                    }
                  },
                  data: chartData,
                  markPoint: {
                    data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                    ]
                  }
                },
                {
                  name: `历史最低 ${Math.min(...chartData)}`,
                  type: 'line',
                  itemStyle: {
                    normal: {
                      color: '#27BDFF'
                    }
                  },
                }
              ]
            })

            myChartactivity.setOption({
              tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              xAxis: {
                data: priceData,
                boundaryGap: false,
                name: '日期(日)'
              },
              yAxis: [
                {type: 'value', name: '销量'}
              ],
              series: [
                {
                  type: 'line',
                  symbolSize: 5,
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                      }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                      }], false),
                      shadowColor: 'rgba(0, 0, 0, 0.1)',
                      shadowBlur: 10
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#27BDFF'
                    }
                  },
                  markArea: {
                    data: actives
                  },
                  barCategoryGap: 0.01,
                  data: activityChartData
                },
              ]
            })
          }
        })
      })
    }
  }
</script>
<style lang="scss" scoped>
    #trendChart-map,
    #trendChart-activity {
        padding: 0 20px;
    }

    .page-wrapper {
        margin-left: 0;
    }

    .details {
        &-message {
            background-color: #ffffff;
            padding: 20px 20px 40px;
            box-shadow: 0 0 8px 0 rgba(147, 147, 147, 0.50);
        }
        &-updateTime {
            color: #949494;
            font-size: 14px;
        }
        &-similarTime {
            margin-left: 20px;
            vertical-align: sub;
        }
        &-table {
            &-layout {
                border-bottom: 1px solid #ccc;
                padding: 10px 0 30px;
                .ivu-table-wrapper {
                    max-width: 1100px;
                }
            }
            &-similar {
                padding-top: 20px;
                .ivu-table-wrapper {
                    max-width: 800px;
                    margin-top: 10px;
                }
                .ivu-icon {
                    margin-left: 10px;
                }
            }
        }
        &-tendencyChart {
            background: #fff;
            margin-top: 20px;
            border-top: 2px solid #00B27A;
        }
    }

    .trendChart {
        &-title {
            font-size: 16px;
            color: #323232;
            padding: 15px 0 30px 20px;
        }
        &-map {
            padding-left: 20px;
        }
    }

    .is-similar {
        .ivu-icon-chevron-down:before {
            content: "\F126"
        }
    }

    .trendActive {
        padding: 0 10% 80px;
        span {
            font-size: 14px;
            margin-right: 30px;
        }
    }
</style>
<style lang="scss">
    .main-container {
        margin-left: 0;
    }

    body {
        min-width: 1349px
    }
</style>
