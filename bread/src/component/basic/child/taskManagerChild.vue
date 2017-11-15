<template lang="pug">
  section.task-inform
    header
      .task-header-typeIn
        Form(ref="formTaskName", :model="formValidate", :rules="ruleValidate", :label-width="100")
          FormItem(label="任务名称", prop="taskName")
            Input(v-model="formValidate.taskName", placeholder="", style="max-width:300px")
      .task-header-btn
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='signStatus', @click="signOff") 签出
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='!signStatus || signUserStatus', @click="signIn('formTaskName')" ,style="margin-left:10px") 签入
        Button(type="success", v-if="$route.params.id==='add'", @click="handleSave('formTaskName')") 保存
        Button(type="primary", @click="handleBack") 返回
    section.task-section
      Tabs(type='card')
        TabPane(label='基本属性')
          taskBasicAttribute(ref='property')
        TabPane(label='页面模型')
          taskPageModel(ref="model")
</template>
<script>
import taskBasicAttribute from "./taskBasicAttribute.vue";
import taskPageModel from "./taskPageModel.vue";
import { taskCheckout, taskAdd, taskCheckin } from "../../../config/getData";
import { getCookie } from "../../../utils/cookie";

export default {
  name: "TaskManagerChild",
  data() {
    return {
      signStatus: false,
      signUserStatus: false,
      formValidate: {
        taskName: ""
      },
      ruleValidate: {
        taskName: [{ required: true, message: "任务名不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleBack() {
      this.$router.push("/basic/taskManager");
    },
    signOff() {
      taskCheckout({
        taskId: this.$route.query.taskId,
        token: getCookie("token")
      }).then(response => {
        if (response.data.respCode === "0") {
          this.$Message.success("签出成功");
          this.signStatus = true;
        }
      });
    },
    signIn(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (
            this.$refs.property.collectStartVal === "" ||
            this.$refs.property.collectEndVal === ""
          ) {
            this.$Message.warning("采集时间不能为空");
            return false;
          }
          if (this.$refs.model.startAddressVal === "") {
            this.$Message.warning("采集起始地址不能为空");
            return false;
          }
          taskCheckin({
            taskId: this.$route.query.taskId,
            taskName: this.formValidate.taskName,
            taskPeriodType: this.$refs.property.taskCycleTypeVal,
            charSet: this.$refs.property.codingSchemeVal,
            requestType: this.$refs.property.requestMethodVal,
            deduplicate: this.$refs.property.urlDeWeightVal ? 1 : 0,
            periodicDeduplicate: this.$refs.property.periodicWeightVal ? 1 : 0,
            siteId: this.$refs.model.siteVal,
            maxDeduplicateTime: this.$refs.property.durationVal * 24 * 60 * 60,
            connectionTimeout: this.$refs.property.connectionVal,
            maxRetryCount: this.$refs.property.numberVal,
            proxyId: 0,
            priority: this.$refs.property.taskPriorityVal,
            userAgent: this.$refs.property.userAgentVal,
            startTime: new Date(this.$refs.property.collectStartVal).getTime(),
            endTime: new Date(this.$refs.property.collectEndVal).getTime(),
            crawlTimeInterval: this.$refs.property.intervalVal,
            startUrl: this.$refs.model.startAddressVal,
            moreStartUrl: this.$refs.model.moreStartAddressVal,
            status: this.$route.query.status,
            token: getCookie("token")
          }).then(response => {
            if (response.data.respCode === "0") {
              this.signStatus = false;
              this.$Message.success("签入成功");
            } else {
              this.$Message.error("任务已签入,不能重复签入同一任务");
            }
          });
        }
      });
    },
    handleSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (
            this.$refs.property.collectStartVal === "" ||
            this.$refs.property.collectEndVal === ""
          ) {
            this.$Message.warning("采集时间不能为空");
            return false;
          }
          if (this.$refs.model.startAddressVal === "") {
            this.$Message.warning("采集起始地址不能为空");
            return false;
          }
          taskAdd({
            taskName: this.formValidate.taskName,
            taskPeriodType: this.$refs.property.taskCycleTypeVal,
            charSet: this.$refs.property.codingSchemeVal,
            requestType: this.$refs.property.requestMethodVal,
            deduplicate: this.$refs.property.urlDeWeightVal ? 1 : 0,
            periodicDeduplicate: 0,
            siteId: this.$refs.model.siteVal,
            maxDeduplicateTime: this.$refs.property.durationVal * 24 * 60 * 60,
            connectionTimeout: this.$refs.property.connectionVal,
            maxRetryCount: this.$refs.property.numberVal,
            proxyId: 0,
            priority: this.$refs.property.taskPriorityVal,
            userAgent: this.$refs.property.userAgentVal,
            startTime: new Date(this.$refs.property.collectStartVal).getTime(),
            endTime: new Date(this.$refs.property.collectEndVal).getTime(),
            crawlTimeInterval: this.$refs.property.intervalVal,
            startUrl: this.$refs.model.startAddressVal,
            moreStartUrl: this.$refs.model.moreStartAddressVal,
            token: getCookie("token")
          }).then(response => {
            switch (response.data.respCode) {
              case "0":
                this.$Message.success("任务添加成功");
                this.$router.push("/basic/taskManager");
                break;
              case "201":
                this.$Message.warning(response.data.respMsg);
                break;
              case "204":
                this.$Message.warning(response.data.respMsg);
                break;
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    getUpdatePersonId() {
      return JSON.parse(getCookie("userInfo")).userId;
    }
  },
  components: {
    taskBasicAttribute,
    taskPageModel
  },
  created() {
    if (
      this.$route.params.id === "alter" &&
      this.$route.query.checkType === "1"
    ) {
      this.signStatus = true;
    }

    if (
      this.$route.params.id === "alter" &&
      this.$route.query.checkType === "1" &&
      parseInt(this.$route.query.updatePersonId) !== this.getUpdatePersonId
    ) {
      this.signUserStatus = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.task
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
          margin-left 10px // asdsa
  &-section
    margin-top 40px
    .ivu-tabs-tabpane:first-child
      padding-bottom 300px
.ivu-form-item
  margin-bottom 0
	
</style>


