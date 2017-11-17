<template lang="pug">
  section.task-manager-basic
    Form(:label-width="130")
      Row
        Col(span="8")
          FormItem(label='任务周期类型:')
            Select(style='width:300px', v-model="taskCycleTypeVal")
              Option(v-for='task in taskCycleTypeData', :value="task.itemType", :key="task.itemType") {{task.itemName}}
        Col(span="8")
          FormItem(label="编码:")
            Select(style='width:300px', v-model="codingSchemeVal")
              Option(v-for="code in codingSchemeData", :value="code.itemType", :key="code.itemType") {{code.itemName}}
      Row
        Col(span="8")
          FormItem(label="页面请求方式:")
            Select(style='width:300px', v-model="requestMethodVal")
              Option(v-for="method in requestMethodValData", :value="method.itemType", :key="method.itemType") {{method.itemName}}
        Col(span="8")
          aside(style='display:inline-block')
            label.periodic 需要URL去重:
            checkbox(v-model="urlDeWeightVal")
          aside(style='display:inline-block', v-if='periodicWeight')
            label.periodic.periodicWeight 需要URL周期性去重
            checkbox(v-model="periodicWeightVal")
      Row
        Col(span="8")
          FormItem(label="URL去重保留时长:")
            Select(style='width:300px', v-model="durationVal")
              Option(v-for='duration in theRetentionTimeData', :value='duration.value', :key='duration.value') {{duration.label}}
        Col(span="8")
          FormItem(label="连接超时时间:")
            Select(style='width:300px', v-model="connectionVal")
              Option(v-for='connection in connectionTimeoutData', :value='connection.value', :key='connection.value') {{connection.label}}
      Row
        Col(span="8")
          FormItem(label="最大重试次数:")
            Select(style='width:300px', v-model="numberVal")
              Option(v-for="number in numberOfRetriesData", :value="number.value", :key="number.value") {{number.label}}
        Col(span="8")
          FormItem(label="是否需要代理:")
            Select(style='width:300px', v-model="agencyVal")
              Option(v-for='agency in agencyData', :value='agency.value', :key='agency.value') {{agency.label}}
      Row
        Col(span="8")
          FormItem(label="优先级:")
            Select(style='width:300px', v-model="taskPriorityVal")
              Option(v-for="priority in taskPriorityValData", :value="priority.itemType", :key="priority.itemType") {{priority.itemName}}
        Col(span="8")
          FormItem(label="采集时间间隔:")
            Select(style='width:300px', v-model="intervalVal")
              Option(v-for="interval in intervalData", :value="interval.value", :key="interval.value") {{interval.label}}
      Row
        Col(span="8")
          FormItem(label="采集开始时间:")
            DatePicker(type="date", placeholder="选择日期", style="width: 300px", @on-change="collectStart", @on-open-change="setAttr")
        Col(span="8")
          FormItem(label="采集结束时间:")
            DatePicker(type="date", placeholder="选择日期", style="width: 300px", @on-change="collectEnd", @on-open-change="setAttr")
      FormItem(label="用户代理:")
        Input(style="width:58%", v-model="userAgentVal")
</template>
<script>
  import { queryType } from '../../../config/getData'
  import { getCookie } from '../../../utils/cookie'

  export default {
    name: 'TaskBasicAttribute',
    data () {
      return {
        // input Val
        taskCycleTypeVal: '',
        codingSchemeVal: '',
        requestMethodVal: '',
        urlDeWeightVal: false,
        durationVal: 1,
        connectionVal: 10,
        numberVal: 1,
        agencyVal: 0,
        taskPriorityVal: '',
        intervalVal: 5,
        userAgentVal: '',
        collectStartVal: '',
        collectEndVal: '',
        periodicWeight: true,
        periodicWeightVal: false,
        // input Data
        taskCycleTypeData: [],
        codingSchemeData: [],
        requestMethodValData: [],
        theRetentionTimeData: [
          {value: 1, label: '1天'},
          {value: 2, label: '2天'},
          {value: 5, label: '5天'},
          {value: 7, label: '7天'},
          {value: 10, label: '10天'},
          {value: 15, label: '15天'},
          {value: 30, label: '1月'},
          {value: 60, label: '2月'},
          {value: 90, label: '3月'},
          {value: 365, label: '1年'}
        ],
        connectionTimeoutData: [
          {value: 10, label: '10秒'},
          {value: 20, label: '20秒'},
          {value: 30, label: '30秒'},
          {value: 60, label: '1分钟'},
          {value: 120, label: '2分钟'},
          {value: 180, label: '3分钟'},
          {value: 300, label: '5分钟'}
        ],
        numberOfRetriesData: [
          {value: 1, label: '1次'},
          {value: 3, label: '3次'},
          {value: 5, label: '5次'}
        ],
        agencyData: [
          {value: 0, label: '不需要'},
          {value: 0, label: '境内动态'}
        ],
        taskPriorityValData: [],
        intervalData: [
          {value: 5, label: '5秒'},
          {value: 10, label: '10秒'},
          {value: 20, label: '20秒'},
          {value: 30, label: '30秒'},
          {value: 60, label: '1分钟'},
          {value: 120, label: '2分钟'},
          {value: 180, label: '3分钟'},
          {value: 300, label: '5分钟'},
          {value: 600, label: '10分钟'},
          {value: 900, label: '15分钟'},
          {value: 1200, label: '20分钟'},
          {value: 1800, label: '30分钟'},
          {value: 3600, label: '1小时'},
          {value: 7200, label: '2小时'},
          {value: 10800, label: '3小时'},
          {value: 43200, label: '12小时'},
          {value: 86400, label: '1天'},
          {value: 172800, label: '2天'},
          {value: 604800, label: '1周'},
          {value: 2592000, label: '1月'}
        ]
      }
    },
    methods: {
      setAttr () {
        document.querySelectorAll('.ivu-input')[1].setAttribute('readonly', true)
        document.querySelectorAll('.ivu-input')[2].setAttribute('readonly', true)
      },
      initQueryType (typeId) {
        return new Promise((resolve, reject) => {
          queryType({typeId: typeId, token: getCookie('token')})
            .then(response => {
              resolve(response)
            })
            .catch(err => {
              reject(err.statusCode)
            })
        })
      },
      collectStart (start) {
        if (start !== '') {
          this.collectStartVal = start
        }
      },
      collectEnd (end) {
        if (end !== '') {
          this.collectEndVal = end
        }
      }
    },
    watch: {
      taskCycleTypeVal: function (val) {
        if (val) {
          this.periodicWeight = !this.periodicWeight
        }
      }
    },
    created () {
      // 任务周期类型
      const taskCycleType = this.initQueryType(5)
      // 编码方式
      const codingScheme = this.initQueryType(9)
      // 请求方式
      const requestMethod = this.initQueryType(7)
      // 任务优先级
      const taskPriority = this.initQueryType(6)

      Promise.all([
        taskCycleType,
        codingScheme,
        requestMethod,
        taskPriority
      ]).then(response => {
        this.taskCycleTypeData = response[0].data.data
        this.taskCycleTypeVal = this.taskCycleTypeData[0].itemType
        this.codingSchemeData = response[1].data.data
        this.codingSchemeVal = this.codingSchemeData[0].itemType
        this.requestMethodValData = response[2].data.data
        this.requestMethodVal = this.requestMethodValData[0].itemType
        this.taskPriorityValData = response[3].data.data
        this.taskPriorityVal = this.taskPriorityValData[0].itemType
      })
    }
  }
</script>
<style lang="stylus">
  .task
    &-manager
      &-basic
        margin-top -16px
        padding 20px
  .periodic
    display inline-block
    padding 10px 12px 10px 0
    width 130px
    color #323232
    text-align right
    font-size 14px
  .periodicWeight
    margin-left 10px
    width 150px
</style>
