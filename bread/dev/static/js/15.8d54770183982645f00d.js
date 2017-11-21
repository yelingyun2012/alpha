webpackJsonp([15],{cvjZ:function(e,t,a){"use strict";function n(e){a("rnnR")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("u8GW"),o=a("OjDh"),s={name:"PageModel",data:function(){var e=this;return{activeIndex:0,pageModelName:"",siteList:[{siteName:"全部",siteId:""}],pageModelColumns:[{title:"ID",key:"modelId"},{title:"模型名称",render:function(e,t){return e("router-link",{attrs:{to:{path:"/pageManager/alter",query:{modelId:""+t.row.modelId,checkType:""+t.row.checkType,updatePersonId:""+t.row.updatePersonId}}}},t.row.modelName)}},{title:"站点",key:"siteName"},{title:"创建时间",key:"createTimes"},{title:"创建人",key:"createName"},{title:"签出状态",key:"checkType",render:function(e,t){switch(t.row.checkType){case 0:return e("span",{style:{color:"#646464",display:"inline-block",padding:"4px 10px",opacity:"0.7",background:"#EBF8F2",border:"1px solid #A7E1C4",borderRadius:"2px"}},"未签出");case 1:return e("span",{style:{color:"#646464",display:"inline-block",padding:"4px 10px",opacity:"0.7",background:"#EBF8F2",border:"1px solid #FABEB9",borderRadius:"2px"}},"已签出"+t.row.updateName)}}},{title:"签出时间",key:"updateTimes"},{title:"操作",render:function(t,a){return t("span",{on:{click:function(t){e.confirm(a.row.modelId,a.index)}}},[t("Icon",{style:{color:"#F04134",cursor:"pointer",fontSize:"20px",padding:"7px 20px",background:"#F2F2F2",borderRadius:"4px"},attrs:{type:"trash-a"}})])}}],pageModelData:[],pageTotal:0,pageIndex:1,pageSize:10,siteId:""}},methods:{confirm:function(e,t){var a=this;this.$Modal.confirm({content:"<p>是否确定删除该模型</p>",onOk:function(){Object(i.h)({modelId:e,token:Object(o.a)("token")}).then(function(e){"0"===e.data.respCode&&(a.pageModelData.splice(t,1),a.$Message.success("删除成功"))}).catch(function(e){var t=e.match(/([^\[\]]+)(?=\])/g);a.$Message.error(t[0])})}})},initSite:function(){var e=this;Object(i.r)({typeId:1,token:Object(o.a)("token")}).then(function(t){e.siteList=e.siteList.concat(t.data.data)})},initPageModelList:function(){var e=this;Object(i.i)({pageIndex:this.pageIndex,pageSize:this.pageSize,siteId:this.siteId,modelName:this.pageModelName,token:Object(o.a)("token")}).then(function(t){null!==t.data.data?(e.pageTotal=t.data.data.recordCount,e.pageModelData=t.data.data.result):e.pageModelData=[]})},handleSearch:function(){this.pageIndex=1,this.activeIndex=0,this.siteId="",this.initPageModelList()},handleAdd:function(){this.$router.push("/pageManager/add")},handleCut:function(e,t){this.activeIndex=e,this.siteId=t,this.initPageModelList()},handlePage:function(e){this.pageIndex=e,this.initPageModelList()}},created:function(){this.initSite(),this.initPageModelList()}},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("aside",{staticClass:"page-name"},[a("span",{staticClass:"explain"},[e._v("页面模型名称 :")]),a("Input",{staticClass:"typeIn",staticStyle:{width:"20%","max-width":"300px"},attrs:{placeholder:"请输入页面模型"},model:{value:e.pageModelName,callback:function(t){e.pageModelName=t},expression:"pageModelName"}}),a("Button",{attrs:{type:"success"},on:{click:e.handleSearch}},[e._v("查询")]),a("Button",{on:{click:e.handleAdd}},[e._v("新增")])],1),a("aside",{staticClass:"page-minute"},[a("header",{staticClass:"page-site"},[e._l(e.siteList,function(t,n){return[a("span",{key:t.number,class:{"task-site-active":e.activeIndex===n},on:{click:function(a){e.handleCut(n,t.siteId)}}},[e._v(e._s(t.siteName)),"全部"!==t.siteName?a("i",[e._v("("+e._s(t.number)+")")]):e._e()])]})],2),a("section",{staticClass:"page-mission"},[a("Table",{attrs:{columns:e.pageModelColumns,data:e.pageModelData,border:"border"}}),a("Page",{attrs:{total:e.pageTotal,current:e.pageIndex,"page-size":e.pageSize,"show-elevator":"show-elevator","show-total":"show-total"},on:{"on-change":e.handlePage}})],1)])])},d=[],c={render:r,staticRenderFns:d},p=c,l=a("VU/8"),g=n,u=l(s,p,!1,g,null,null);t.default=u.exports},eWlU:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".page-name{margin-bottom:20px;padding:30px 20px;background-color:#fff}.page-name .ivu-input{padding:7px;height:auto;font-size:14px}.page-name .explain{color:#323232;font-size:14px}.page-name .typeIn{margin-right:30px;margin-left:4px}.page-name .ivu-btn{padding:6px 23px;font-size:16px}.page-name .ivu-btn-success{background-color:#17bb9c}.page-name .ivu-btn-success:hover{background-color:rgba(23,187,156,.8)}.page-name .ivu-btn:last-child{margin-left:10px;border-color:#17bb9c;color:#17bb9c}.page-name .ivu-btn:last-child:hover{border-color:#57a3f3;color:#57a3f3}.page-minute{padding:20px;background-color:#fff}.page-site{padding-bottom:10px;border-bottom:1px dashed #b7b7b7}.page-site span{display:inline-block;padding:6px 15px;color:#589bee;font-size:14px;cursor:pointer}.page-site span.task-site-active{border-radius:4px;background-color:#2d8cf0;color:#fff}.page-site span i{font-style:inherit}.page-mission{margin-top:20px}.page-mission .ivu-page{margin-top:20px;margin-right:20px;text-align:right}",""])},rnnR:function(e,t,a){var n=a("eWlU");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("4a93d5fa",n,!0)}});