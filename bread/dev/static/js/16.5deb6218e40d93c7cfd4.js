webpackJsonp([16],{SaxH:function(t,a,e){a=t.exports=e("FZ+f")(!1),a.push([t.i,".task-manager-page{margin-top:-16px;padding:20px}.task-manager-page .mate{margin-left:15px}.ivu-form .ivu-form-item-label{color:#323232;font-size:14px}",""])},ceQ9:function(t,a,e){"use strict";function s(t){e("iKOw")}Object.defineProperty(a,"__esModule",{value:!0});var r=e("u8GW"),n=e("OjDh"),l={name:"TaskPageModel",data:function(){return{siteData:[],siteVal:"",startAddressVal:"",moreStartAddressVal:"",addressData:[]}},methods:{handleMate:function(){var t=this;if(""===this.startAddressVal)return this.$Message.warning("采集起始地址不能为空"),!1;Object(r.d)({siteId:this.siteVal,modelurl:this.startAddressVal,token:Object(n.a)("token")}).then(function(a){0===a.data.data.length&&t.$Message.info("匹配页面模型为空"),t.addressData=a.data.data})}},created:function(){var t=this;Object(r.c)({token:Object(n.a)("token")}).then(function(a){t.siteData=a.data.data,"alter"!==t.$route.params.id&&(t.siteVal=t.siteData[0].siteId)})}},i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"task-manager-page"},[e("Form",{attrs:{"label-width":100}},[e("Row",[e("Col",{attrs:{span:"16"}},[e("FormItem",{attrs:{label:"站点:"}},[e("Select",{staticStyle:{width:"300px"},model:{value:t.siteVal,callback:function(a){t.siteVal=a},expression:"siteVal"}},t._l(t.siteData,function(a){return e("Option",{key:a.siteId,attrs:{value:a.siteId}},[t._v(t._s(a.siteName))])}))],1),e("FormItem",{attrs:{label:"采集起始地址:"}},[e("Input",{staticStyle:{width:"300px"},model:{value:t.startAddressVal,callback:function(a){t.startAddressVal=a},expression:"startAddressVal"}}),e("Button",{staticClass:"mate",attrs:{type:"primary"},on:{click:t.handleMate}},[t._v("匹配")])],1),e("FormItem",{attrs:{label:"更多起始地址"}},[e("Input",{staticStyle:{width:"600px"},attrs:{type:"textarea",rows:6},model:{value:t.moreStartAddressVal,callback:function(a){t.moreStartAddressVal=a},expression:"moreStartAddressVal"}})],1)],1),e("Col",{attrs:{span:"8"}},[0!==t.addressData.length?e("aside",[e("span",[t._v("匹配模型:")]),e("ul",t._l(t.addressData,function(a){return e("li",[t._v(t._s(a.modelName))])}))]):t._e()])],1)],1)],1)},d=[],o={render:i,staticRenderFns:d},c=o,u=e("VU/8"),m=s,p=u(l,c,!1,m,null,null);a.default=p.exports},iKOw:function(t,a,e){var s=e("SaxH");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("71b7f6ad",s,!0)}});