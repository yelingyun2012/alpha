webpackJsonp([20],{AeNe:function(e,a,t){var r=t("BaCi");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("rjj0")("ac1667b0",r,!0)},BaCi:function(e,a,t){a=e.exports=t("FZ+f")(!1),a.push([e.i,".user-panel[data-v-58f42947]{padding:20px;background-color:#fff}.user-panel .ivu-btn[data-v-58f42947]:last-child{margin-left:20px}",""])},YIt0:function(e,a,t){"use strict";function r(e){t("AeNe")}Object.defineProperty(a,"__esModule",{value:!0});var s=t("u8GW"),o=t("OjDh"),l={name:"UserInfo",data:function(){var e=this;return{userPermissionList:[{value:1,label:"超级管理员"},{value:2,label:"普通用户"}],userPhone:"",email:"",role:1,formValidate:{userName:"",password:"",newPassword:""},ruleValidate:{userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],newPassword:[{required:!0,validator:function(a,t,r){""===t?r(new Error("请输入密码")):t!==e.formValidate.password?r(new Error("两次输入密码不一致")):r()},trigger:"blur"}]}}},methods:{handleSave:function(e){var a=this;this.$refs[e].validate(function(e){e?("add"===a.$route.params.operate&&a.addUser(),"alter"===a.$route.params.operate&&a.alterUser()):a.$Message.warning("缺少必填信息")})},addUser:function(){var e=this;Object(s.t)({userName:this.formValidate.userName,loginName:this.formValidate.userName,pwd:this.formValidate.password,userPhone:this.userPhone,email:this.email,role:this.role,token:Object(o.a)("token")}).then(function(a){switch(a.data.respCode){case"0":e.$Message.success("用户添加成功"),e.$router.push("/account/index");break;default:e.$Message.warning(a.data.respMsg)}})},alterUser:function(){var e=this;Object(s.w)({userName:this.formValidate.userName,pwd:this.formValidate.password,cellPhone:this.userPhone,email:this.email,userId:this.$route.query.userId,roleId:this.role,token:Object(o.a)("token")}).then(function(a){switch(a.data.respCode){case"0":e.$Message.success("用户修改成功"),e.$router.push("/account/index");break;default:e.$Message.warning(a.data.respMsg)}})},handleBack:function(){this.$router.go(-1)}},created:function(){"alter"===this.$route.params.operate&&(this.formValidate.userName=this.$route.query.userName,this.email=this.$route.query.email,this.userPhone=this.$route.query.cellPhone,this.role=parseInt(this.$route.query.userRole))}},i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("section",{staticClass:"user-panel"},[t("Form",{ref:"formValidate",attrs:{"label-width":90,model:e.formValidate,rules:e.ruleValidate}},[t("FormItem",{attrs:{label:"用户名",prop:"userName"}},[t("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入用户名",maxlength:50},model:{value:e.formValidate.userName,callback:function(a){e.$set(e.formValidate,"userName",a)},expression:"formValidate.userName"}})],1),t("FormItem",{attrs:{label:"add"===e.$route.params.operate?"密码":"新密码",prop:"password"}},[t("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入密码"},model:{value:e.formValidate.password,callback:function(a){e.$set(e.formValidate,"password",a)},expression:"formValidate.password"}})],1),"alter"===e.$route.params.operate?t("FormItem",{attrs:{label:"确认新密码",prop:"newPassword"}},[t("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入新密码"},model:{value:e.formValidate.newPassword,callback:function(a){e.$set(e.formValidate,"newPassword",a)},expression:"formValidate.newPassword"}})],1):e._e(),t("FormItem",{attrs:{label:"联系电话"}},[t("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入联系电话"},model:{value:e.userPhone,callback:function(a){e.userPhone=a},expression:"userPhone"}})],1),t("FormItem",{attrs:{label:"Email"}},[t("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入Email地址"},model:{value:e.email,callback:function(a){e.email=a},expression:"email"}})],1),t("FormItem",{attrs:{label:"用户权限",prop:"role"}},[t("Select",{staticStyle:{width:"300px"},model:{value:e.role,callback:function(a){e.role=a},expression:"role"}},e._l(e.userPermissionList,function(a){return t("Option",{key:a.value,attrs:{value:a.value}},[e._v(e._s(a.label))])}))],1),t("FormItem",[t("Button",{attrs:{type:"primary"},on:{click:function(a){e.handleSave("formValidate")}}},[e._v("保存")]),t("Button",{on:{click:e.handleBack}},[e._v("返回")])],1)],1)],1)},n=[],u={render:i,staticRenderFns:n},d=u,c=t("VU/8"),m=r,p=c(l,d,!1,m,"data-v-58f42947",null);a.default=p.exports}});