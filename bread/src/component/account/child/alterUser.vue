<template lang="pug">
  section.user-panel
    Form(:label-width="90", ref="formValidate", :model="formValidate", :rules="ruleValidate")
      FormItem(label="用户名", prop="userName")
        Input(placeholder="请输入用户名", v-model="formValidate.userName", style="width: 300px")
      FormItem(:label="$route.params.operate==='add'?'密码':'新密码'", prop="password")
        Input(placeholder="请输入密码", v-model="formValidate.password", style="width: 300px")
      FormItem(label="确认新密码", v-if="$route.params.operate==='alter'", prop="newPassword")
        Input(placeholder="请输入新密码", v-model="formValidate.newPassword", style="width: 300px")
      FormItem(label="联系电话")
        Input(placeholder="请输入联系电话", v-model="userPhone", style="width: 300px")
      FormItem(label="Email")
        Input(placeholder="请输入Email地址", v-model="email", style="width: 300px")
      FormItem(label="用户权限", prop="role")
        Select(v-model="role", style="width: 300px")
          Option(v-for="item in userPermissionList", :value="item.value", :key="item.value") {{item.label}}
      FormItem
        Button(type="primary", @click="handleSave('formValidate')") 保存
        Button(@click="handleBack") 返回
</template>
<script>
import { userAdd, userGet, userUpdate } from "../../../config/getData"
import { getCookie } from "../../../utils/cookie"

export default {
  name: "UserInfo",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if (value !== this.formValidate.password) {
        callback(new Error("两次输入密码不一致"))
      } else {
        callback()
      }
    }
    return {
      userPermissionList: [
        {
          value: 1,
          label: "超级管理员"
        },
        {
          value: 2,
          label: "普通用户"
        }
      ],
      userPhone: "",
      email: "",
      role: 1,
      formValidate: {
        userName: "",
        password: "",
        newPassword: ""
      },
      ruleValidate: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newPassword: [
          { required: true, validator: validatePassCheck, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    handleSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.$route.params.operate === "add") {
            this.addUser()
          }
          if (this.$route.params.operate === "alter") {
            this.alterUser()
          }
        } else {
          this.$Message.warning("缺少必填信息")
        }
      })
    },
    addUser() {
      userAdd({
        userName: this.formValidate.userName,
        loginName: this.formValidate.userName,
        pwd: this.formValidate.password,
        userPhone: this.userPhone,
        email: this.email,
        role: this.role,
        token: getCookie("token")
      }).then(response => {
        switch (response.data.respCode) {
          case "0":
            this.$Message.success("用户添加成功")
            break
          default:
            this.$Message.warning(response.data.respMsg)
            break
        }
      })
    },
    alterUser() {
      userUpdate({
        userName: this.formValidate.userName,
        pwd: this.formValidate.password,
        cellPhone: this.userPhone,
        email: this.email,
        userId: this.$route.query.userId,
        roleId: this.$route.query.userRole,
        token: getCookie("token")
      }).then(response => {
        switch (response.data.respCode) {
          case "0":
            this.$Message.success("用户修改成功")
            break
          default:
            this.$Message.warning(response.data.respMsg)
            break
        }
      })
    },
    handleBack(){
      this.$router.go(-1)
    }
  },
  created() {
    if (this.$route.params.operate === "alter") {
      this.formValidate.userName = this.$route.query.userName
      this.email = this.$route.query.email
      this.userPhone = this.$route.query.cellPhone
      this.role = parseInt(this.$route.query.userRole)
    }
  }
}
</script>
<style lang="stylus" scoped>
.user
  &-panel
    padding 20px
    background-color #fff
    .ivu-btn:last-child
      margin-left 20px
</style>
