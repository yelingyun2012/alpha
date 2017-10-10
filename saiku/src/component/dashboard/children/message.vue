<style lang="scss" scoped>
    .line-chart {
        width: 1000px;
        height: 400px;
        background-color: #fff !important;
    }
</style>
<template lang="pug">
    aside
        section.line-chart
</template>
<script>
  import echarts from 'echarts'
  //  import tooltip from 'echarts/lib/component/tooltip'
  //  import title from 'echarts/lib/component/title'
  //  import line from 'echarts/lib/chart/line'
  import { fetch } from '../../../api/http'

  export default {
    name: 'Message',
    mounted () {
      const myChart = echarts.init(document.querySelector('.line-chart'))
      myChart.setOption({
        color: ['#00a0e9', '#f4b93b', '#85bd41', '#f29c9f', '#8f82bc', '#0068b7', '#f29b76', '#13b5b1', '#ea68a2', '#fff100', '#1ec0ff', '#f9a11b', '#8cd790', '#40ccca', '#aaabd3', '#2b90d9', '#ec7a4a', '#f29b76', '#ea68a2', '#ffdd38'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#999',
              width: 2,
              type: 'solid'
            }
          },
          backgroundColor: 'rgba(0,0,0,.6)',
          borderColor: '#000',
          padding: [6, 10],
          extraCssText: 'border-radius: 5px',
          textStyle: {
            fontSize: 12
          }
        },
        legend: {
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 10,
          itemGap: 10,
          data: []
        },
        xAxis: {
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#777'
            },
            interval: 'auto',
            formatter: function (t) {
              if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t.replace(/\d{4}-/, '')
              if (/^\d{4}-\d{2}-\d{2}\|\d{4}-\d{2}-\d{2}$/.test(t)) {
                var e = t.match(/\d{4}-\d{2}-\d{2}/g)
                return e[0].replace(/\d{4}-/, '') + '~' + e[1].replace(/\d{4}-/, '')
              }
              return t
            }
          },
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      })
      fetch('https://www.easy-mock.com/mock/59dc75661de3d46fa94d2035/echarts/details').then(response => {
        let a = [],
          b = []
        response.data.app_data.series.map(item => {
          a.push(item.names[0])
          b.push({
            name: item.names[0],
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            data: item.values
          })
        })
        myChart.setOption({
          legend: {
            data: a
          },
          xAxis: {
            data: response.data.app_data.x_axis
          },
          series: b
        })
      })
    }
  }
</script>