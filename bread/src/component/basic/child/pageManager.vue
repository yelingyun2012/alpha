<template lang="pug">
  section.task-inform
    header
      .task-header-typeIn
        Form(ref="formValidate", :model="formValidate", :rules="ruleValidate", :label-width="120")
          FormItem(label="页面模型名称：", prop="modelName")
            Input(v-model="formValidate.modelName", placeholder="", style="max-width:300px")
      .task-header-btn
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='signStatus', @click='pageModelSignOff' ) 签出
        Button(type="success", v-if="$route.params.id==='alter'", :disabled='!signStatus || signUserStatus',style="margin-left:10px", @click="handleSave('signIn')") 签入
        Button(type="success", v-if="$route.params.id==='add'", @click="handleSave('save')") 保存
        Button(type="primary", @click="handleBack") 返回
    section.task-section
      Tabs(type='card',value='2')
        TabPane(label='归属站点',name='1')
          pageSite(ref="pageSite",@siteData="siteData")
        TabPane(label='基本属性',name='2')
          pageBasic(ref="pageBasic",@basicData="basicData")
        TabPane(label='页面模型',name='3')
          pageModelBasic(ref="pageModelBasic",@modelData="modelData",@modelErr="modelErr",@testClick="testClick")
</template>
<script>
import {
  pageModelAdd,
  pageModelQuery,
  pageModelCheckout,
  pageModelCheckIn,
  pageModelTest
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
    handleSave(type) {
      let name = "formValidate";
      this.$refs[name].validate(valid => {
        if (valid) {
          this.siteList = ""
          this.basicList = []
          this.modelList = ""

          this.$refs.pageSite.pageSiteSubmit()
          this.$refs.pageBasic.pageBasicSubmit('delete')
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
              needLogin: objData.needLogin,
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
              urlExtractRule: objData.urlExtractRule
            };
            if(type === 'signIn'){
              pageModelResult.modelId = this.$route.query.modelId;
            }
            postData.pageModelResult = JSON.stringify(pageModelResult);
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
              };
              if(type === 'signIn'){
                browserParameter.modelId = this.$route.query.modelId;
              }
              postData.browserParameter = JSON.stringify(browserParameter);
            }
            if (objData.pageTurningable === 1) {
              let pageTurningParameter = {
                pageTurningType: objData.pageTurningType,
                extractType: objData.extractType,
                extractRule: objData.extractRule,
                pageDownExpression: objData.pageDownExpression
              };
              if(type === 'signIn'){
                pageTurningParameter.modelId = this.$route.query.modelId;
              }
              postData.pageTurningParameter = JSON.stringify(pageTurningParameter);
            }
            postData.token = getCookie("token");

            let txt = "添加成功！";
            if(type === 'signIn'){
              txt = "签入成功！"
            }
            this.modelAdd(postData,type,txt);
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
    //添加 & 签入
    modelAdd(data,type,txt) {
      let ajaxUrl = pageModelAdd;
      if(type === "signIn"){
        ajaxUrl = pageModelCheckIn;
      }
      ajaxUrl(data).then(res => {
        if(res.data.respCode === "0"){
          this.$Message.success(txt);
          this.$router.push("/basic/pageModel");
        }else{
          this.$Message.error(res.data.respMsg);
        }
      });
    },
    initQuery() {
      pageModelQuery({modelId: this.$route.query.modelId,token: getCookie("token")}).then(response => {
        let queryData = response.data.data;
        this.formValidate.modelName = queryData.modelName;
        this.$refs.pageSite.siteId = queryData.siteId;
        
        this.$refs.pageBasic.basicData.needLogin = queryData.needLogin;
        this.$refs.pageBasic.basicData.modelType = queryData.modelType;
        this.$refs.pageBasic.basicData.contentType = queryData.contentType;
        this.$refs.pageBasic.basicData.modelRegularExpression = queryData.modelRegularExpression;
        this.$refs.pageBasic.basicData.urlsAllowCrawlRegex = queryData.urlsAllowCrawlRegex;
        this.$refs.pageBasic.basicData.urlsNotAllowCrawlRegex = queryData.urlsNotAllowCrawlRegex;
        this.$refs.pageBasic.basicData.urlExtractable = queryData.urlExtractable;
        this.$refs.pageBasic.basicData.browserCrawlable = queryData.browserCrawlable;
        this.$refs.pageBasic.basicData.pageTurningable = queryData.pageTurningable;

        this.$refs.pageBasic.basicData.urlExtractRule = queryData.urlExtractRule;
        
        if ( queryData.browserCrawlable === 1 ) {
          this.$refs.pageBasic.basicData.refreshType = queryData.browserRefreshConfigureEntity[0].refreshType;
          this.$refs.pageBasic.basicData.maxDropDownNum = queryData.browserRefreshConfigureEntity[0].maxDropDownNum;
          this.$refs.pageBasic.basicData.eleLocateRule = queryData.browserRefreshConfigureEntity[0].eleLocateRule;
          this.$refs.pageBasic.basicData.refreshable = queryData.browserRefreshConfigureEntity[0].refreshable;
          this.$refs.pageBasic.basicData.refreshWaitTime = queryData.browserRefreshConfigureEntity[0].refreshWaitTime;
        }
        if ( queryData.pageTurningable === 1 ) {
          this.$refs.pageBasic.basicData.pageTurningType = queryData.pageTurningConfigureEntity[0].pageTurningType;
          this.$refs.pageBasic.basicData.extractType = queryData.pageTurningConfigureEntity[0].extractType;
          this.$refs.pageBasic.basicData.extractRule = queryData.pageTurningConfigureEntity[0].extractRule;
          this.$refs.pageBasic.basicData.pageDownExpression = queryData.pageTurningConfigureEntity[0].pageDownExpression;
        }
        if(queryData.pageModelPropertyEntity !== null && queryData.pageModelPropertyEntity.length !== 0){
          let data = queryData.pageModelPropertyEntity;
          let newData = [];
          for(var i = 0; i<data.length; i++){
            let newSort = data[i].sortedId;
            newData[newSort-1] = data[i];
          }
          this.$refs.pageModelBasic.arrFormat(newData);
        }
      });
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
      });
    },
    //测试
    testClick(testUrl){
      let name = "formValidate";
      this.$refs[name].validate(valid => {
        if (valid) {
          let modelId = '';
          if(this.$route.query.modelId){
            modelId = Number(this.$route.query.modelId);
          }

          this.siteList = ""
          this.basicList = []
          this.modelList = ""

          this.$refs.pageSite.pageSiteSubmit()
          this.$refs.pageBasic.pageBasicSubmit('notDelete')
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
              needLogin:objData.needLogin,
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
              urlExtractRule: objData.urlExtractRule,
              modelId: modelId
            };
            postData.pageModelParameter = JSON.stringify(pageModelResult);

            postData.pageModelProperties = objData.pageModelProperty

            let browserParameter = {
              refreshable: objData.refreshable,
              refreshType: objData.refreshType,
              eleLocateRule: objData.eleLocateRule,
              maxDropDownNum: objData.maxDropDownNum,
              refreshWaitTime: objData.refreshWaitTime,
              loadFinishedDecisionRule: objData.loadFinishedDecisionRule,
              modelId: modelId
            };
            postData.browserParameter = JSON.stringify(browserParameter);
            
            let pageTurningParameter = {
              pageTurningType: objData.pageTurningType,
              extractType: objData.extractType,
              extractRule: objData.extractRule,
              pageDownExpression: objData.pageDownExpression,
              modelId: modelId
            };
            postData.pageTurningParameter = JSON.stringify(pageTurningParameter);
            
            postData.testUrl = testUrl;

            pageModelTest(postData).then(res=>{
              if(res.data.respCode === "0"){
                this.$refs.pageModelBasic.syntaxHighlight(res.data.data);
              }
            }).catch(err => {
              this.$Message.error(err);
            });
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
    if (this.$route.params.id === "alter" && this.$route.query.checkType === "1") {
      this.signStatus = true;
      if(parseInt(this.$route.query.updatePersonId) !== this.getUpdatePersonId){
        this.signUserStatus = true;
      }
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