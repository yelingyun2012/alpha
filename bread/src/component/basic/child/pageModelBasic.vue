<template>
  <div class="pageModelBasic">
    <div class="pageModelTree" v-if="items.length !== 0">
      <pageModelBasicTree v-for="(val, index) in items" :item="val" @remove="delItem(index)" :key="index"></pageModelBasicTree>
    </div>
    <Button type="dashed" icon="plus" @click="addCon()" style="width:60%;">添加属性或属性组</Button>
    <Modal title="属性/属性组" v-model="modal" class-name="vertical-center-modal">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
        <FormItem label=" " prop="radio">
          <RadioGroup v-model="formData.radio">
            <Radio v-for="(val,index) in groupType" :key="index" :label="val.id">{{val.name}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="属性组名称：" prop="par">
          <Select v-model="formData.par">
            <Option value="-1">顶级</Option>
            <pageModelBasicOption v-for="(val,index) in items" :key="index" v-if="val.groupType === 1" :item="val">{{val.name}}</pageModelBasicOption>
          </Select>
        </FormItem>
        <FormItem label="抽取个数：" prop="name">
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
import { queryType } from "../../../config/getData";
import { getCookie } from "../../../utils/cookie";
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
      modal: false,
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
      items: [],
      postData: []
    };
  },
  mounted() {
    this.httpConData();
  },
  methods: {
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
    returnData() {
      this.arrFormat(this.postData);
    },
    arrFormat(arr) {
      for (var i in arr) {
        //插入children
        if (arr[i].type === 1) {
          arr[i].children = [];
        }
        //把数据插入到children
        for (var j in arr) {
          if (arr[i].id === arr[j].parId) {
            arr[i].children.push(arr[j]);
          }
        }
      }
      //删除第一级以外的数据
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].parId !== "0") {
          arr.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style lang="stylus">
.pageModelBasic {
  .pageModelTree {
    margin-bottom: 24px;
    background: #F7F7F7;
    padding: 0 20px;

    & > .pageModelBasicTree {
      &:last-child {
        border: 0;
      }

      border-bottom: 1px solid #d9d9d9;

      & > ul {
        padding: 0;
      }
    }
  }
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }

  .ivu-modal-footer {
    display: none;
  }
}
</style>