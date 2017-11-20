<template lang="pug">
  section.task-inform
    header
      .task-header-typeIn
        Form(ref="formValidate", :model="formValidate", :rules="ruleValidate", :label-width="120")
          FormItem(label="页面模型名称：", prop="modelName")
            Input(v-model="formValidate.modelName", placeholder="", style="max-width:300px")
      .task-header-btn
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='signStatus', @click='pageModelSignOff' ) 签出
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='!signStatus || signUserStatus',style="margin-left:10px", @click='pageModelSignIn') 签入
        Button(type="success", v-if="$route.params.id==='add'", @click="handleSave") 保存
        Button(type="primary", @click="handleBack") 返回
    section.task-section
      Tabs(type='card',value='2')
        TabPane(label='归属站点',name='1')
          pageSite(ref="pageSite",@siteData="siteData")
        TabPane(label='基本属性',name='2')
          pageBasic(ref="pageBasic",@basicData="basicData")
        TabPane(label='页面模型',name='3')
          pageModelBasic(ref="pageModelBasic",@modelData="modelData",@modelErr="modelErr")
</template>
<script>
import {
  pageModelAdd,
  pageModelQuery,
  pageModelCheckout,
  pageModelCheckIn
} from "../../../config/getData"
import { getCookie } from "../../../utils/cookie"
import pageSite from "./pageSite.vue"
import pageBasic from "./pageBasic.vue"
import pageModelBasic from "./pageModelBasic.vue"

export default {
  name: "pageManager",
  data() {
    return {
      signStatus: false,
      signUserStatus: false,
      siteList: "", //归属站点数据
      basicList: [], //基本属性数据
      modelList: "", //页面模型数据
      modelErrState: true,
      formValidate: {
        modelName: ""
      },
      ruleValidate: {
        modelName: [{ required: true, message: "页面模型名称不能为空", trigger: "blur" }]
      }
    }
  },
  methods: {
    //返回
    handleBack() {
      this.$router.go(-1)
    },
    //保存
    handleSave() {
      let name = "formValidate"
      this.$refs[name].validate(valid => {
        if (valid) {
          this.siteList = ""
          this.basicList = []
          this.modelList = ""

          this.$refs.pageSite.pageSiteSubmit()
          this.$refs.pageBasic.pageBasicSubmit()
          this.$refs.pageModelBasic.pageModelBasicSubmit()

          if (!this.modelErrState) {
            return false
          }

          if (this.siteList && this.basicList.length !== 0) {
            let objData = this.basicList
            objData.siteId = this.siteList
            objData.pageModelProperty = this.modelList
            objData.modelName = this.formValidate.modelName

            let postData = {}
            let pageModelResult = {
              modelType: objData.modelType,
              modelName: objData.modelName,
              browserCrawlable: objData.browserCrawlable,
              urlExtractable: objData.urlExtractable,
              urlsAllowCrawlRegex: objData.urlsAllowCrawlRegex,
              urlsNotAllowCrawlRegex: objData.urlsNotAllowCrawlRegex,
              siteId: objData.siteId,
              contentType: objData.contentType,
              modelRegularExpression: objData.modelRegularExpression,
              pageTurningable: objData.pageTurningable,
              urlExtractRule: objData.urlExtractable
            }
            postData.pageModelResult = JSON.stringify(pageModelResult)
            if (objData.pageModelProperty !== "") {
              postData.pageModelPropertyResult = objData.pageModelProperty
            }
            if (objData.browserCrawlable === 1) {
              let browserParameter = {
                refreshable: objData.refreshable,
                refreshType: objData.refreshType,
                eleLocateRule: objData.eleLocateRule,
                maxDropDownNum: objData.maxDropDownNum,
                refreshWaitTime: objData.refreshWaitTime,
                loadFinishedDecisionRule: objData.loadFinishedDecisionRule
              }
              postData.browserParameter = JSON.stringify(browserParameter)
            }
            if (objData.pageTurningable === 1) {
              let pageTurningParameter = {
                pageTurningType: objData.pageTurningType,
                extractType: objData.extractType,
                extractRule: objData.extractRule,
                pageDownExpression: objData.pageDownExpression
              }
              postData.pageTurningParameter = JSON.stringify(
                pageTurningParameter
              )
            }
            postData.token = getCookie("token")
            this.modelAdd(postData)
          }
        } else {
          this.$Message.error({
            content: "页面模型名称不能为空！",
            duration: 3,
            closable: true
          })
        }
      })
    },
    //页面模型错误
    modelErr(val) {
      this.modelErrState = val
    },
    //归属站点数据
    siteData(val) {
      this.siteList = val
    },
    //基本属性数据
    basicData(val) {
      this.basicList = val
    },
    //页面模型数据
    modelData(val) {
      this.modelList = val
    },
    //添加
    modelAdd(val) {
      pageModelAdd(val).then(res => {
        this.$Message.success("添加成功")
        this.$router.push("/basic/pageModel")
      })
    },
    initQuery() {
      pageModelQuery({
        modelId: this.$route.query.modelId,
        token: getCookie("token")
      }).then(response => {
        let queryData = response.data.data
        this.formValidate.modelName = queryData.modelName
        this.$refs.pageBasic.basicData = queryData
        if (
          queryData.pageTurningConfigureEntity !== null &&
          queryData.browserRefreshConfigureEntity.length !== 0
        ) {
          this.$refs.pageBasic.basicData.refreshType =
            queryData.browserRefreshConfigureEntity[0].refreshType
          this.$refs.pageBasic.basicData.maxDropDownNum =
            queryData.browserRefreshConfigureEntity[0].maxDropDownNum
          this.$refs.pageBasic.basicData.eleLocateRule =
            queryData.browserRefreshConfigureEntity[0].eleLocateRule
          this.$refs.pageBasic.basicData.refreshable =
            queryData.browserRefreshConfigureEntity[0].refreshable
          this.$refs.pageBasic.basicData.refreshWaitTime =
            queryData.browserRefreshConfigureEntity[0].refreshWaitTime
        }
        if (
          queryData.pageTurningConfigureEntity !== null &&
          queryData.pageTurningConfigureEntity.length !== 0
        ) {
          this.$refs.pageBasic.basicData.pageTurningType =
            queryData.pageTurningConfigureEntity[0].pageTurningType
          this.$refs.pageBasic.basicData.extractType =
            queryData.pageTurningConfigureEntity[0].extractType
          this.$refs.pageBasic.basicData.extractRule =
            queryData.pageTurningConfigureEntity[0].extractRule
          this.$refs.pageBasic.basicData.pageDownExpression =
            queryData.pageTurningConfigureEntity[0].pageDownExpression
        }
      })
    },
    pageModelSignOff() {
      pageModelCheckout({
        modelId: this.$route.query.modelId,
        token: getCookie("token")
      }).then(response => {
        if (response.data.respCode === "0") {
          this.$Message.success("签出成功")
          this.signStatus = true
        }
      })
    },
    modelCheckIn(val) {
      pageModelCheckIn(val).then(response => {
        if (response.data.respCode === "0") {
          this.signStatus = false
          this.$Message.success("签入成功")
        } else {
          this.$Message.error(response.data.respMsg)
        }
      })
    },
    pageModelSignIn() {
      let name = "formValidate"
      this.$refs[name].validate(valid => {
        if (valid) {
          this.siteList = ""
          this.basicList = []
          this.modelList = ""

          this.$refs.pageSite.pageSiteSubmit()
          this.$refs.pageBasic.pageBasicSubmit()
          this.$refs.pageModelBasic.pageModelBasicSubmit()

          if (!this.modelErrState) {
            return false
          }

          if (this.siteList && this.basicList.length !== 0) {
            let objData = this.basicList
            objData.siteId = this.siteList
            objData.pageModelProperty = this.modelList
            objData.modelName = this.formValidate.modelName

            let postData = {}
            let pageModelResult = {
              modelId: this.$route.query.modelId,
              modelType: objData.modelType,
              modelName: objData.modelName,
              browserCrawlable: objData.browserCrawlable,
              urlExtractable: objData.urlExtractable,
              urlsAllowCrawlRegex: objData.urlsAllowCrawlRegex,
              urlsNotAllowCrawlRegex: objData.urlsNotAllowCrawlRegex,
              siteId: objData.siteId,
              contentType: objData.contentType,
              modelRegularExpression: objData.modelRegularExpression,
              pageTurningable: objData.pageTurningable,
              urlExtractRule: objData.urlExtractable
            }
            postData.pageModelResult = JSON.stringify(pageModelResult)
            if (objData.pageModelProperty !== "") {
              postData.pageModelPropertyResult = objData.pageModelProperty
            }
            if (objData.browserCrawlable === 1) {
              let browserParameter = {
                modelId: this.$route.query.modelId,
                refreshable: objData.refreshable,
                refreshType: objData.refreshType,
                eleLocateRule: objData.eleLocateRule,
                maxDropDownNum: objData.maxDropDownNum,
                refreshWaitTime: objData.refreshWaitTime,
                loadFinishedDecisionRule: objData.loadFinishedDecisionRule
              }
              postData.browserParameter = JSON.stringify(browserParameter)
            }
            if (objData.pageTurningable === 1) {
              let pageTurningParameter = {
                modelId: this.$route.query.modelId,
                pageTurningType: objData.pageTurningType,
                extractType: objData.extractType,
                extractRule: objData.extractRule,
                pageDownExpression: objData.pageDownExpression
              }
              postData.pageTurningParameter = JSON.stringify(
                pageTurningParameter
              )
            }
            postData.token = getCookie("token")
            this.modelCheckIn(postData)
          }
        } else {
          this.$Message.error({
            content: "页面模型名称不能为空！",
            duration: 3,
            closable: true
          })
        }
      })
    }
  },
  components: {
    pageSite,
    pageBasic,
    pageModelBasic
  },
  computed: {
    getUpdatePersonId() {
      return JSON.parse(getCookie("userInfo")).userId
    }
  },
  mounted() {
    if (this.$route.params.id === "alter") {
      this.initQuery()
    }
  },
  created() {
    if (
      this.$route.params.id === "alter" &&
      this.$route.query.checkType === "1"
    ) {
      this.signStatus = true
    }

    if (
      this.$route.params.id === "alter" &&
      this.$route.query.checkType === "1" &&
      parseInt(this.$route.query.updatePersonId) !== this.getUpdatePersonId
    ) {
      this.signUserStatus = true
    }
  }
}
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