<template>
  <div class="pageModelBasic">
    <div class="pageModelUrl">
      <Input v-model="testURL" style="width:70%" placeholder="测试URL地址" @on-focus="testFocus"></Input>
      <Button type="primary" @click="testClick">测试</Button>
      <div class="history" v-show="historyShow && testDataHistory.length !== 0">
        <div class="historyList" v-for="(val,index) in testDataHistory" :key="index">
          <span class="historyName" @click.stop="historyClick(val)">{{val}}</span>
          <span class="operation" @click.stop="historyDelete(val)">删除</span>
        </div>
      </div>
    </div>
    <div class="pageModelCenter">
      <div class="pageModelTree" v-if="items.length !== 0">
        <pageModelBasicTree v-for="(val, index) in items" :item="val" @remove="delItem(index)" :key="index"></pageModelBasicTree>
      </div>
      <div class="testData" v-if="testData.length !== 0">
        <pre v-html="testData"></pre>
      </div>
    </div>
    <Button type="dashed" icon="plus" @click="addCon()" style="width:70%;">添加属性或属性组</Button>
    <Modal title="属性/属性组" v-model="modal" class-name="vertical-center-modal">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
        <FormItem label=" " prop="radio">
          <RadioGroup v-model="formData.radio">
            <Radio v-for="(val,index) in groupType" :key="index" :label="val.id">{{val.name}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="属性组：" prop="par">
          <Select v-model="formData.par">
            <Option value="-1">顶级</Option>
            <pageModelBasicOption v-for="(val,index) in items" :key="index" v-if="val.groupType === 1" :item="val">{{val.name}}</pageModelBasicOption>
          </Select>
        </FormItem>
        <FormItem label="名称：" prop="name">
          <Input v-model="formData.name"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formData')">确定</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { queryType, pageModelTestHistory,pageModelTestHistoryDelete } from "../../../../config/getData";
import { getCookie } from "../../../../utils/cookie";
import pageModelBasicTree from "./pageModelBasicTree";
import pageModelBasicOption from "./pageModelBasicOption";

export default {
  name: "pageModelBasic",
  components: {
    pageModelBasicTree,
    pageModelBasicOption
  },
  data() {
    return {
      testURL: "", //测试url
      testData: "", //测试数据
      modal: false, //添加弹出层
      testDataHistory: [], //历史查询数据
      historyShow:false,  //历史记录开关
      //弹出层表单
      formData: {
        radio: 0,
        par: "",
        name: ""
      },
      ruleValidate: {
        par: [{ required: true, message: "请选择", trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      groupType: [{ id: 0, name: "属性" }, { id: 1, name: "属性组" }],
      items: [], //数据
      postData: [] //提交数据
    };
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
          this.historyShow = false;
        }
      })
      this.httpConData();
    });
  },
  methods: {
    //测试URL
    testClick() {
      if (!this.testURL) {
        this.$Message.error("请填写页面模型的测试地址");
      } else {
        this.$emit("testClick", this.testURL);
      }
    },
    //测试记录
    testFocus() {
      pageModelTestHistory({ modelId: this.$route.query.modelId })
        .then(res => {
          if (res.data.respCode === "0") {
            this.testDataHistory = res.data.data;
            if(this.testDataHistory.length !== 0 && this.testDataHistory.length !== null){
              this.historyShow = true;
            }
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    //点击历史记录
    historyClick(val){
      this.testURL = val;
      this.historyShow = false;
    },
    //删除历史记录
    historyDelete(val){
      pageModelTestHistoryDelete({testUrl:val,modelId:this.$route.query.modelId}).then(res=>{
        this.testFocus();
      }).catch(err => {
        this.$Message.error(err);
      });
    },
    //json格式化
    syntaxHighlight(json) {
      if (typeof json != "string") {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">");
      this.testData = json;
    },
    //uuid
    uuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";

      let uuid = s.join("");
      return uuid;
    },
    //获取parseType
    httpConData() {
      queryType({ typeId: 3, token: getCookie("token") })
        .then(response => {
          if (response.data.respCode === "0") {
            let httpCon = response.data.data;
            this.$store.dispatch("setHttpCon", httpCon);
          }
        })
        .catch(err => {
          console.log(err.statusCode);
        });
    },
    //添加
    addCon() {
      this.handleReset("formData");
      this.modal = true;
    },
    //确定
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let formData = this.formData;
          let items = this.items;
          let propertyId = this.uuid();
          let obj = {
            modelId: this.$route.query.modelId,
            propertyId: propertyId,
            propertyName: formData.name,
            urlPropertyExtract: 0,
            parseType: 1,
            matchExpression: "",
            groupType: formData.radio,
            parentId: "0"
          };
          if (formData.radio === 0) {
            if (formData.par === "-1") {
              items.push(obj);
            } else {
              this.insertArr(items, formData.par, obj);
            }
          } else {
            obj.children = [];
            if (formData.par === "-1") {
              items.push(obj);
            } else {
              this.insertArr(items, formData.par, obj);
            }
          }
          this.modal = false;
        } else {
          this.$Message.error("请填写!");
        }
      });
    },
    //递归插入数据
    insertArr(arr, id, val) {
      let result;
      for (let i in arr) {
        if (arr[i].propertyId == id) {
          val.parentId = id;
          arr[i].children.push(val);
          break;
        } else {
          result = this.insertArr(arr[i].children, id, val);
          if (result) {
            val.parentId = id;
            arr[i].children.push(val);
            break;
          }
        }
      }
    },
    //重置表单
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    //删除
    delItem(index) {
      this.items.splice(index, 1);
    },
    //获取json格式
    pageModelBasicSubmit() {
      this.postData = [];
      let jsonItems = JSON.parse(JSON.stringify(this.items));
      this.arrJson(jsonItems);
      this.deleteChildren(this.postData);
      this.validateCon(this.postData);
    },
    //数据结构转换
    arrJson(arr) {
      for (let i in arr) {
        this.postData.push(arr[i]);
        if (arr[i].children) {
          this.arrJson(arr[i].children);
        }
      }
    },
    //删除children
    deleteChildren(arr) {
      for (let i in arr) {
        arr[i].sortedId = i - 0 + 1;
        if (arr[i].children) {
          delete arr[i].children;
        }
      }
    },
    //验证内容是否为空
    validateCon(arr) {
      for (let i in arr) {
        if (arr[i].matchExpression === "") {
          this.$Message.error("页面模型内容不能为空！");
          let f = false;
          this.$emit("modelErr", f);
          break;
        } else {
          if (i == arr.length - 1) {
            let jsonData = JSON.stringify(this.postData);
            let f = true;
            this.$emit("modelErr", f);
            this.$emit("modelData", jsonData);
          }
        }
      }
    },
    //回显数据
    arrFormat(arr) {
      for (var i in arr) {
        //插入children
        if (arr[i].groupType === 1) {
          arr[i].children = [];
        }
        //把数据插入到children
        for (var j in arr) {
          if (arr[i].propertyId === arr[j].parentId) {
            arr[i].children.push(arr[j]);
          }
        }
      }
      //删除第一级以外的数据
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].parentId !== "0") {
          arr.splice(i, 1);
        }
      }
      //插入数据
      this.items = arr;
    }
  }
};
</script>

<style lang="stylus">
.pageModelBasic
  .pageModelUrl
    position relative
    margin-bottom 20px
  .history
    position absolute
    top 35px
    left 0
    z-index 999
    width 70%
    border 1px solid #dddee1
    background #fff
    font-size 14px
    cursor pointer
    .historyList
      padding 0 10px
      width 100%
      height 30px
      line-height 30px
      &:hover
        background #2d8cf0
        color #fff
      span
        display inline-block
        &.historyName
          width calc(100% - 5% - 10px)
        &.operation
          width 5%
          text-align center
  .pageModelCenter
    width 100%
    .pageModelTree
      display inline-block
      margin-bottom 24px
      padding 0 20px
      width 60%
      background #F7F7F7
      & > .pageModelBasicTree
        &:last-child
          border 0
        border-bottom 1px solid #d9d9d9
        & > ul
          padding 0
    .testData
      display inline-block
      width calc(100% - 60% - 20px)
      border 1px solid #ccc
      vertical-align top
      pre
        margin 0
        padding 5px
        white-space pre-wrap
        word-wrap break-word
.vertical-center-modal
  display flex
  justify-content center
  align-items center
  .ivu-modal
    top 0
  .ivu-modal-footer
    display none
</style>
