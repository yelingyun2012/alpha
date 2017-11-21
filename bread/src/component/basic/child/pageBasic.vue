<template>
  <section class="pageBasic">
    <Form ref="basicData" :model="basicData" :rules="ruleValidate" :label-width="150">
      <FormItem label="模型类型：" prop="modelType">
        <Select v-model="basicData.modelType">
          <Option v-for="(val,index) in modelTypeList" :key="index" :value="val.itemType">{{val.itemName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="内容提供方式：" prop="contentType">
        <Select v-model="basicData.contentType">
          <Option v-for="(val,index) in contentTypeList" :key="index" :value="val.itemType">{{val.itemName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="模型正则表达式：" prop="modelRegularExpression">
        <Input v-model="basicData.modelRegularExpression" type="textarea" :autosize="{minRows: 4,maxRows: 5}"></Input>
      </FormItem>
      <FormItem label="允许爬行URL正则：" prop="urlsAllowCrawlRegex">
        <Input v-model="basicData.urlsAllowCrawlRegex" type="textarea" :autosize="{minRows: 4,maxRows: 5}"></Input>
      </FormItem>
      <FormItem label="不允许爬行URL正则：" prop="urlsNotAllowCrawlRegex">
        <Input v-model="basicData.urlsNotAllowCrawlRegex" type="textarea" :autosize="{minRows: 4,maxRows: 5}"></Input>
      </FormItem>
      <FormItem label="抽取url：">
        <Row>
          <Col span="6">
            <FormItem prop="urlExtractable">
              <RadioGroup v-model="basicData.urlExtractable">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="15" v-if="basicData.urlExtractable === 1">
            <FormItem prop="urlExtractRule">
              <Input v-model="basicData.urlExtractRule"></Input>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="浏览器采集：" prop="browserCrawlable">
        <RadioGroup v-model="basicData.browserCrawlable">
          <Radio :label="1">是</Radio>
          <Radio :label="2">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label=" " v-if=" basicData.browserCrawlable === 1 ">
        <div class="browserCrawlable">
          <FormItem label="刷新方式：" prop="refreshType">
            <Select v-model="basicData.refreshType">
              <Option v-for="(val,index) in refreshTypeList" :key="index" :value="val.itemType">{{val.itemName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="最大下拉次数：" prop="maxDropDownNum">
            <Select v-model="basicData.maxDropDownNum">
              <Option v-for="(val,index) in maxDropDownNumList" :key="index" :value="val.itemType">{{val.itemName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="元素刷新定位规格：（xpath格式）" prop="eleLocateRule">
            <Input v-model="basicData.eleLocateRule" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
          </FormItem>
          <FormItem label="是否刷新：" prop="refreshable">
            <RadioGroup v-model="basicData.refreshable">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="刷新等待时间：" prop="refreshWaitTime">
            <Select v-model="basicData.refreshWaitTime">
              <Option v-for="(val,index) in refreshWaitTimeList" :key="index" :value="val.itemType">{{val.itemName}}</Option>
            </Select>
          </FormItem>
        </div>
      </FormItem>
      <FormItem label="翻页：" prop="pageTurningable">
        <RadioGroup v-model="basicData.pageTurningable">
          <Radio :label="1">是</Radio>
          <Radio :label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label=" " v-if=" basicData.pageTurningable === 1 ">
        <div class="browserCrawlable">
          <FormItem label="翻页方式：" prop="pageTurningType">
            <Select v-model="basicData.pageTurningType">
              <Option :value="1">直接抽取下一页连接</Option>
              <Option :value="2">自动生成URL连接</Option>
            </Select>
          </FormItem>
          <FormItem label="抽取规则：" prop="extractType">
            <Select v-model="basicData.extractType">
              <Option v-for="(val,index) in extractTypeList" :key="index" :value="val.itemType">{{val.itemName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="抽取规则表达式" prop="extractRule">
            <Input v-model="basicData.extractRule" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
          </FormItem>
          <FormItem label="下一页表达式：" prop="pageDownExpression">
            <Input v-model="basicData.pageDownExpression" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
          </FormItem>
        </div>
      </FormItem>
    </Form>
  </section>
</template>

<script>
import { queryType } from "../../../config/getData"
import { getCookie } from "../../../utils/cookie"

export default {
  name: "pageBasic",
  data() {
    return {
      modelTypeList: [], //模型类别data
      contentTypeList: [], //内容提供方式data
      refreshTypeList: [], //刷新方式
      extractTypeList: [], //抽取规则
      //最大下拉次数
      maxDropDownNumList: [
        { itemType: 1, itemName: "1次" },
        { itemType: 5, itemName: "5次" },
        { itemType: 10, itemName: "10次" },
        { itemType: 20, itemName: "20次" },
        { itemType: 30, itemName: "30次" },
        { itemType: 50, itemName: "50次" },
        { itemType: 100, itemName: "100次" }
      ],
      //刷新等待时间
      refreshWaitTimeList: [
        { itemType: 3, itemName: "3秒" },
        { itemType: 5, itemName: "5秒" },
        { itemType: 10, itemName: "10秒" },
        { itemType: 30, itemName: "30秒" },
        { itemType: 60, itemName: "60秒" },
        { itemType: 120, itemName: "120秒" },
        { itemType: 300, itemName: "300秒" }
      ],
      //列表
      basicData: {
        needLogin:0,  //是否需要登录
        modelType: 1, //模型类别
        contentType: 1, //内容提供方式
        modelRegularExpression: "", //模型正则表达式
        urlsAllowCrawlRegex: "", //允许爬行URL正则
        urlsNotAllowCrawlRegex: "", //不允许爬行URL正则
        urlExtractable: 0, //抽取url
        browserCrawlable: 2, //浏览器采集
        pageTurningable: 0, //翻页

        urlExtractRule:"",  //抽取url地址
        
        refreshType: 1, //刷新方式
        maxDropDownNum: 1, //最大下拉次数
        eleLocateRule: "", //元素刷新定位规格：（xpath格式）
        refreshable: 0, //是否刷新
        refreshWaitTime: 3, //刷新等待时间

        pageTurningType: 1, //翻页方式
        extractType: 1, //抽取规则
        extractRule: "", //抽取链接或页码的表达式
        pageDownExpression: "" //下一个表达式
      },
      ruleValidate: {
        modelType: [
          { type: "number", required: true, message: "请选择", trigger: "change" }
        ],
        contentType: [
          { type: "number", required: true, message: "请选择", trigger: "change" }
        ],
        modelRegularExpression: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        urlExtractRule: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      //模型类型
      const modelTypeList = this.initQueryType(1)
      //内容提供方式
      const contentTypeList = this.initQueryType(4)
      //刷新方式
      const refreshTypeList = this.initQueryType(10)
      //抽取规则
      const extractTypeList = this.initQueryType(3)

      Promise.all([
        modelTypeList,
        contentTypeList,
        refreshTypeList,
        extractTypeList
      ]).then(response => {
        this.modelTypeList = response[0]
        this.contentTypeList = response[1]
        this.refreshTypeList = response[2]
        this.extractTypeList = response[3]
      })
    })
  },
  methods: {
    initQueryType(typeId) {
      return new Promise((resolve, reject) => {
        queryType({ typeId: typeId, token: getCookie("token") })
          .then(response => {
            if (response.data.respCode === "0") {
              resolve(response.data.data)
            }
          })
          .catch(err => {
            reject(err.statusCode)
          })
      })
    },
    pageBasicSubmit(val) {
      let name = "basicData"
      this.$refs[name].validate(valid => {
        if (valid) {
          if(val === 'delete'){
            let data = JSON.parse(JSON.stringify(this.basicData))
            if (data.browserCrawlable === 2) {
              delete data.refreshType
              delete data.maxDropDownNum
              delete data.eleLocateRule
              delete data.refreshable
              delete data.refreshWaitTime
            }
            if (data.pageTurningable === 0) {
              delete data.pageTurningType
              delete data.extractType
              delete data.extractRule
              delete data.pageDownExpression
            }
            this.$emit("basicData", data)
          }else{
            let data = JSON.parse(JSON.stringify(this.basicData));
            this.$emit("basicData", data)
          }
        } else {
          this.$Message.error({
            content: "基本属性请填写完整！",
            duration: 3,
            closable: true
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.pageBasic
  padding-bottom 100px
  width 60%
  .browserCrawlable
    padding 20px
    border 1px solid #dddee1
    border-radius 4px
    .ivu-form-item
      margin-bottom 24px !important
    .ivu-form-item-content
      margin-left 150px !important
</style>