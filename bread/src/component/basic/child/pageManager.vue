<template lang="pug">
  section.task-inform
    header
      .task-header-typeIn
        Form(ref="formTaskName", :model="formValidate", :rules="ruleValidate", :label-width="120")
          FormItem(label="页面模型名称：", prop="taskName")
            Input(v-model="formValidate.taskName", placeholder="", style="max-width:300px")
      .task-header-btn
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='signStatus') 签出
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='!signStatus || signUserStatus',style="margin-left:10px") 签入
        Button(type="success", v-if="$route.params.id==='add'", @click="handleSave('formTaskName')") 保存
        Button(type="primary", @click="handleBack") 返回
    section.task-section
      Tabs(type='card')
        TabPane(label='归属站点')
          pageSite
        TabPane(label='基本属性')
          pageBasic
        TabPane(label='页面模型')
          pageModelBasic
</template>
<script>
import pageSite from "./pageSite.vue";
import pageBasic from "./pageBasic.vue";
import pageModelBasic from "./pageModelBasic.vue";

export default {
  name: "pageManager",
  data() {
    return {
      signStatus: false,
      signUserStatus: false,
      formValidate: {
        taskName: ""
      },
      ruleValidate: {
        taskName: [{ required: true, message: "页面模型名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  },
  components: {
    pageSite,
    pageBasic,
    pageModelBasic
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