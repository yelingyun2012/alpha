<template lang="pug">
  section.child-inform
    header
      .child-header-typeIn
        Form(ref="formTaskName", :model="formValidate", :rules="ruleValidate", :label-width="100")
          FormItem(label="任务名称：", prop="taskName")
            Input(v-model="formValidate.taskName", placeholder="", style="max-width:300px;",:maxlength="200")
      .child-header-btn
        Button(type="error", v-if="$route.params.id==='alter'", :disabled='signStatus', @click="initSignOut") 签出
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='!signStatus || signUserStatus', @click="initSignIn" ,style="margin-left:10px") 签入
        Button(type="primary", v-if="$route.params.id==='add'", @click="handleSave('formTaskName')") 保存
        Button(@click="handleBack") 返回
    section.child-section
      Tabs(type='card')
        TabPane(label='基本属性')
          taskBasicAttribute(ref='property')
        TabPane(label='页面模型')
          taskPageModel(ref="model")
</template>
<script>
  import taskBasicAttribute from './taskBasicAttribute.vue'
  import taskPageModel from './taskPageModel.vue'
  import { taskCheckout, taskAdd, taskCheckin, taskQuery } from '../../../../config/getData'
  import { getCookie } from '../../../../utils/cookie'
  import { mapMutations } from 'vuex'

  export default {
    name: 'TaskManagerChild',
    data () {
      return {
        signStatus: false,
        signUserStatus: false,
        formValidate: {
          taskName: ''
        },
        ruleValidate: {
          taskName: [{required: true, message: '任务名不能为空', trigger: 'blur'}]
        }
      }
    },
    methods: {
      ...mapMutations({
        setCurrentPath: 'permission/setCurrentPath'
      }),
      handleBack () {
        this.$router.push('/basic/taskManager')
      },
      async initSignOut () {
        try {
          await taskCheckout({taskId: this.$route.query.taskId, token: getCookie('token')})
          this.$Message.success('签出成功')
          this.signStatus = true
        } catch (error) {
          this.$Message.warning(error)
        }
      },
      taskManagerChildData () {
        let data = {
          taskName: this.formValidate.taskName,
          taskPeriodType: this.$refs.property.taskCycleTypeVal,
          charSet: this.$refs.property.codingSchemeVal,
          requestType: this.$refs.property.requestMethodVal,
          deduplicate: this.$refs.property.urlDeWeightVal ? 1 : 0,
          periodicDeduplicate: this.$refs.property.periodicWeightVal ? 1 : 0,
          siteId: this.$refs.model.siteVal,
          maxDeduplicateTime: this.$refs.property.durationVal * 24 * 60 * 60 * 1000,
          connectionTimeout: this.$refs.property.connectionVal * 1000,
          maxRetryCount: this.$refs.property.numberVal,
          proxyId: this.$refs.property.agencyVal,
          priority: this.$refs.property.taskPriorityVal,
          userAgent: this.$refs.property.userAgentVal,
          startTime: new Date(this.$refs.property.startTimeVal).getTime(),
          endTime: new Date(this.$refs.property.endTimeVal).getTime(),
          crawlTimeInterval: this.$refs.property.intervalVal,
          startUrl: this.$refs.model.startAddressVal,
          moreStartUrl: this.$refs.model.moreStartAddressVal,
          token: getCookie('token')
        }
        return data
      },
      taskManagerChildVerirfy () {
        if (this.$refs.property.startTimeVal === '') {
          this.$Message.warning('采集起始时间不能为空')
          return false
        }
        if (this.$refs.property.endTimeVal === '') {
          this.$Message.warning('采集结束时间不能为空')
          return false
        }
        if (this.$refs.model.startAddressVal === '') {
          this.$Message.warning('采集起始地址不能为空')
          return false
        }
      },
      initSignIn () {
        let name = 'formTaskName'
        this.$refs[name].validate(valid => {
          if (valid) {
            this.taskManagerChildVerirfy()
            let tackCheckInData = Object.assign(this.taskManagerChildData(), {
              taskId: this.$route.query.taskId,
              status: this.$route.query.status,
            })
            taskCheckin(tackCheckInData).then(res => {
              this.signStatus = false
              this.$Message.success('签入成功')
              this.$router.push('/basic/taskManager')
            }).catch(error => {
              this.$Message.error(error)
            })
          }
        })
      },
      handleSave (name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.taskManagerChildVerirfy()
            taskAdd(this.taskManagerChildData()).then(res => {
              this.$Message.success('任务添加成功')
              this.$router.push('/basic/taskManager')
            }).catch(error => {
              this.$Message.warning(error)
            })
          }
        })
      },
      formatDate (time) {
        let date = new Date(time)
        let dateMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        return `${date.getFullYear()}-${dateMonth}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      },
      initTaskQuery () {
        taskQuery({
          taskId: this.$route.query.taskId,
          token: getCookie('token')
        }).then(response => {
          let taskQueryData = response.data.data
          this.formValidate.taskName = taskQueryData.taskName
          this.$refs.property.taskCycleTypeVal = taskQueryData.taskPeriodType
          this.$refs.property.codingSchemeVal = taskQueryData.charSet
          this.$refs.property.requestMethodVal = taskQueryData.requestType
          this.$refs.property.urlDeWeightVal = taskQueryData.deduplicate === 1 ? true : false
          this.$refs.property.periodicDeduplicate = taskQueryData.periodicDeduplicate === 1 ? true : false
          this.$refs.property.durationVal = taskQueryData.maxDeduplicateTime / (1000 * 24 * 60 * 60)
          this.$refs.property.connectionVal = taskQueryData.connectionTimeout / 1000
          this.$refs.property.numberVal = taskQueryData.maxRetryCount
          this.$refs.property.agencyVal = taskQueryData.proxyId
          this.$refs.property.taskPriorityVal = taskQueryData.priority
          this.$refs.property.intervalVal = taskQueryData.crawlTimeInterval
          this.$refs.property.userAgentVal = taskQueryData.userAgent
          this.$refs.model.siteVal = taskQueryData.siteId
          this.$refs.model.startAddressVal = taskQueryData.startUrl
          this.$refs.model.moreStartAddressVal = taskQueryData.moreStartUrl
          this.$refs.property.startTimeVal = this.formatDate(taskQueryData.startTime)
          this.$refs.property.endTimeVal = this.formatDate(taskQueryData.endTime)
        })
      }
    },
    computed: {
      getUpdatePersonId () {
        return JSON.parse(getCookie('userInfo')).userId
      }
    },
    components: {
      taskBasicAttribute,
      taskPageModel
    },
    created () {
      let setMenuList = [{
        title: '基本配置',
        path: '',
        name: 'basic'
      }, {
        title: '任务管理',
        path: '',
        name: 'taskManager'
      }, {
        title: '新建任务',
        path: this.$route.path,
        name: this.$route.name
      }]
      this.setCurrentPath(setMenuList)
      if (this.$route.params.id === 'alter') {
        this.initTaskQuery()
      }
      if (this.$route.params.id === 'alter' && this.$route.query.checkType === '1') {
        this.signStatus = true
      }

      if (this.$route.params.id === 'alter' && this.$route.query.checkType === '1' && parseInt(this.$route.query.updatePersonId) !== this.getUpdatePersonId) {
        this.signUserStatus = true
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .child
    &-inform
      padding 30px 20px 20px
      background-color #ffffff
      .seed-name
        color #323232
        font-size 14px
      .typeIn
        margin-left 4px
      header
        display flex
    &-header
      &-typeIn
        display block
        flex-grow 1
        flex-shrink 1
      &-btn, .test
        display block
        .ivu-btn
          padding 6px 23px
          font-size 14px
          &:last-child
            margin-left 10px
            border-color #108EE9
            color #108EE9
            opacity .9
            &:hover
              border-color #57a3f3
              color #57a3f3
    &-section
      margin-top 40px
</style>
