webpackJsonp([1,4,16,17,18,21],{"24dd":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"pageModelBasicOption",props:{item:Object},computed:{isFolder:function(){return this.item.children&&this.item.children.length}}},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pageModelBasicOption"},[a("Option",{attrs:{value:e.item.propertyId}},[e._v(e._s(e.item.propertyName))]),e._v(" "),e.isFolder?e._l(e.item.children,function(t,r){return t.children?a("pageModelBasicOption",{key:r,attrs:{item:t}},[e._v(e._s(t.propertyName))]):e._e()}):e._e()],2)},s=[],o={render:i,staticRenderFns:s},l=o,n=a("VU/8"),p=n(r,l,!1,null,null,null);t.default=p.exports},"6z9X":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".siteData{margin:0 20px}.siteData label.ivu-radio-wrapper{display:block;margin-bottom:20px}",""])},C9PO:function(e,t,a){var r=a("6z9X");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("8f9fc044",r,!0)},E7xd:function(e,t,a){"use strict";function r(e){a("YpjS")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),o=a("u8GW"),l=a("OjDh"),n=a("u3Vn"),p=a("24dd"),c={name:"pageModelBasic",components:{pageModelBasicTree:n.default,pageModelBasicOption:p.default},data:function(){return{modal:!1,formData:{radio:0,par:"",name:""},ruleValidate:{par:[{required:!0,message:"请选择",trigger:"change"}],name:[{required:!0,message:"请输入名称",trigger:"blur"}]},groupType:[{id:0,name:"属性"},{id:1,name:"属性组"}],items:[],postData:[]}},mounted:function(){this.httpConData()},methods:{uuid:function(){for(var e=[],t="0123456789abcdef",a=0;a<36;a++)e[a]=t.substr(Math.floor(16*Math.random()),1);return e[14]="4",e[19]=t.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-",e.join("")},httpConData:function(){var e=this;Object(o.l)({typeId:3,token:Object(l.a)("token")}).then(function(t){if("0"===t.data.respCode){var a=t.data.data;e.$store.dispatch("setHttpCon",a)}}).catch(function(e){console.log(e.statusCode)})},addCon:function(){this.handleReset("formData"),this.modal=!0},handleSubmit:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var a=t.formData,r=t.items,i=t.uuid(),s={modelId:t.$route.query.modelId,propertyId:i,propertyName:a.name,urlPropertyExtract:0,parseType:1,matchExpression:"",groupType:a.radio,parentId:"0"};0===a.radio?"-1"===a.par?r.push(s):t.insertArr(r,a.par,s):(s.children=[],"-1"===a.par?r.push(s):t.insertArr(r,a.par,s)),t.modal=!1}else t.$Message.error("请填写!")})},insertArr:function(e,t,a){for(var r in e){if(e[r].propertyId==t){a.parentId=t,e[r].children.push(a);break}if(this.insertArr(e[r].children,t,a)){a.parentId=t,e[r].children.push(a);break}}},handleReset:function(e){this.$refs[e].resetFields()},delItem:function(e){this.items.splice(e,1)},pageModelBasicSubmit:function(){this.postData=[];var e=JSON.parse(s()(this.items));this.arrJson(e),this.deleteChildren(this.postData),this.validateCon(this.postData)},arrJson:function(e){for(var t in e)this.postData.push(e[t]),e[t].children&&this.arrJson(e[t].children)},deleteChildren:function(e){for(var t in e)e[t].sortedId=t-0+1,e[t].children&&delete e[t].children},validateCon:function(e){for(var t in e){if(""===e[t].matchExpression){this.$Message.error("页面模型内容不能为空！");this.$emit("modelErr",!1);break}if(t==e.length-1){var a=s()(this.postData);this.$emit("modelErr",!0),this.$emit("modelData",a)}}},returnData:function(){this.arrFormat(this.postData)},arrFormat:function(e){for(var t in e){1===e[t].groupType&&(e[t].children=[]);for(var a in e)e[t].propertyId===e[a].parentId&&e[t].children.push(e[a])}for(var t=e.length-1;t>=0;t--)"0"!==e[t].parentId&&e.splice(t,1);this.items=e}}},u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pageModelBasic"},[0!==e.items.length?a("div",{staticClass:"pageModelTree"},e._l(e.items,function(t,r){return a("pageModelBasicTree",{key:r,attrs:{item:t},on:{remove:function(t){e.delItem(r)}}})})):e._e(),e._v(" "),a("Button",{staticStyle:{width:"60%"},attrs:{type:"dashed",icon:"plus"},on:{click:function(t){e.addCon()}}},[e._v("添加属性或属性组")]),e._v(" "),a("Modal",{attrs:{title:"属性/属性组","class-name":"vertical-center-modal"},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[a("Form",{ref:"formData",attrs:{model:e.formData,rules:e.ruleValidate,"label-width":100}},[a("FormItem",{attrs:{label:" ",prop:"radio"}},[a("RadioGroup",{model:{value:e.formData.radio,callback:function(t){e.$set(e.formData,"radio",t)},expression:"formData.radio"}},e._l(e.groupType,function(t,r){return a("Radio",{key:r,attrs:{label:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"属性组名称：",prop:"par"}},[a("Select",{model:{value:e.formData.par,callback:function(t){e.$set(e.formData,"par",t)},expression:"formData.par"}},[a("Option",{attrs:{value:"-1"}},[e._v("顶级")]),e._v(" "),e._l(e.items,function(t,r){return 1===t.groupType?a("pageModelBasicOption",{key:r,attrs:{item:t}},[e._v(e._s(t.name))]):e._e()})],2)],1),e._v(" "),a("FormItem",{attrs:{label:"抽取个数：",prop:"name"}},[a("Input",{model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1),e._v(" "),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:function(t){e.handleSubmit("formData")}}},[e._v("确定")])],1)],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)},d=[],m={render:u,staticRenderFns:d},g=m,f=a("VU/8"),b=r,h=f(c,g,!1,b,null,null);t.default=h.exports},IgZL:function(e,t,a){var r=a("KWq7");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("9a2eb45e",r,!0)},KWq7:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".task-inform[data-v-030240aa]{padding:30px 20px 20px;background-color:#fff}.task-inform .seed-name[data-v-030240aa]{color:#323232;font-size:14px}.task-inform .typeIn[data-v-030240aa]{margin-left:4px}.task-inform header[data-v-030240aa]{display:-webkit-box;display:-ms-flexbox;display:flex}.task-header-typeIn[data-v-030240aa]{display:block;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}.task-header-btn[data-v-030240aa],.task-header .test[data-v-030240aa]{display:block}.task-header-btn .ivu-btn[data-v-030240aa],.task-header .test .ivu-btn[data-v-030240aa]{padding:6px 23px;font-size:14px}.task-header-btn .ivu-btn[data-v-030240aa]:last-child,.task-header .test .ivu-btn[data-v-030240aa]:last-child{margin-left:10px}.task-section[data-v-030240aa]{margin-top:40px}.task-section .ivu-tabs-tabpane[data-v-030240aa]:first-child{padding-bottom:300px}.ivu-form-item[data-v-030240aa]{margin-bottom:0}",""])},LtsG:function(e,t,a){"use strict";function r(e){a("C9PO")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("u8GW"),s=a("OjDh"),o={name:"pageSite",data:function(){return{siteId:1,siteData:[]}},mounted:function(){this.getData()},methods:{getData:function(){var e=this;Object(i.c)({token:Object(s.a)("token")}).then(function(t){e.siteData=t.data.data,e.siteId=e.siteData[0].siteId})},pageSiteSubmit:function(){this.$emit("siteData",this.siteId)}}},l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"siteData"},[a("RadioGroup",{model:{value:e.siteId,callback:function(t){e.siteId=t},expression:"siteId"}},e._l(e.siteData,function(t){return a("Radio",{key:t.siteId,attrs:{label:t.siteId}},[e._v(e._s(t.siteName))])}))],1)},n=[],p={render:l,staticRenderFns:n},c=p,u=a("VU/8"),d=r,m=u(o,c,!1,d,null,null);t.default=m.exports},QezO:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"ul[data-v-5a3af434]{padding-left:20px}.w100[data-v-5a3af434]{display:inline-block;width:100px;text-align:right}",""])},Uvoz:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".pageModelBasic .pageModelTree{margin-bottom:24px;background:#f7f7f7;padding:0 20px}.pageModelBasic .pageModelTree>.pageModelBasicTree{border-bottom:1px solid #d9d9d9}.pageModelBasic .pageModelTree>.pageModelBasicTree:last-child{border:0}.pageModelBasic .pageModelTree>.pageModelBasicTree>ul{padding:0}.vertical-center-modal{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.vertical-center-modal .ivu-modal{top:0}.vertical-center-modal .ivu-modal-footer{display:none}",""])},YpjS:function(e,t,a){var r=a("Uvoz");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("4fe4b54a",r,!0)},"iv/s":function(e,t,a){var r=a("QezO");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("62995deb",r,!0)},"oe/e":function(e,t,a){var r=a("xS4A");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("bf3a45ae",r,!0)},quW4:function(e,t,a){"use strict";function r(e){a("IgZL")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),o=a("u8GW"),l=a("OjDh"),n=a("LtsG"),p=a("z/Jo"),c=a("E7xd"),u={name:"pageManager",data:function(){return{signStatus:!1,signUserStatus:!1,siteList:"",basicList:[],modelList:"",modelErrState:!0,formValidate:{modelName:""},ruleValidate:{modelName:[{required:!0,message:"页面模型名称不能为空",trigger:"blur"}]}}},methods:{handleBack:function(){this.$router.go(-1)},handleSave:function(){var e=this;this.$refs.formValidate.validate(function(t){if(t){if(e.siteList="",e.basicList=[],e.modelList="",e.$refs.pageSite.pageSiteSubmit(),e.$refs.pageBasic.pageBasicSubmit(),e.$refs.pageModelBasic.pageModelBasicSubmit(),!e.modelErrState)return!1;if(e.siteList&&0!==e.basicList.length){var a=e.basicList;a.siteId=e.siteList,a.pageModelProperty=e.modelList,a.modelName=e.formValidate.modelName;var r={},i={modelType:a.modelType,modelName:a.modelName,browserCrawlable:a.browserCrawlable,urlExtractable:a.urlExtractable,urlsAllowCrawlRegex:a.urlsAllowCrawlRegex,urlsNotAllowCrawlRegex:a.urlsNotAllowCrawlRegex,siteId:a.siteId,contentType:a.contentType,modelRegularExpression:a.modelRegularExpression,pageTurningable:a.pageTurningable,urlExtractRule:a.urlExtractable};if(r.pageModelResult=s()(i),""!==a.pageModelProperty&&(r.pageModelPropertyResult=a.pageModelProperty),1===a.browserCrawlable){var o={refreshable:a.refreshable,refreshType:a.refreshType,eleLocateRule:a.eleLocateRule,maxDropDownNum:a.maxDropDownNum,refreshWaitTime:a.refreshWaitTime,loadFinishedDecisionRule:a.loadFinishedDecisionRule};r.browserParameter=s()(o)}if(1===a.pageTurningable){var n={pageTurningType:a.pageTurningType,extractType:a.extractType,extractRule:a.extractRule,pageDownExpression:a.pageDownExpression};r.pageTurningParameter=s()(n)}r.token=Object(l.a)("token"),e.modelAdd(r)}}else e.$Message.error({content:"页面模型名称不能为空！",duration:3,closable:!0})})},modelErr:function(e){this.modelErrState=e},siteData:function(e){this.siteList=e},basicData:function(e){this.basicList=e},modelData:function(e){this.modelList=e},modelAdd:function(e){var t=this;Object(o.e)(e).then(function(e){t.$Message.success("添加成功"),t.$router.push("/basic/pageModel")})},initQuery:function(){var e=this;Object(o.j)({modelId:this.$route.query.modelId,token:Object(l.a)("token")}).then(function(t){var a=t.data.data;e.formValidate.modelName=a.modelName,e.$refs.pageSite.siteId=a.siteId,e.$refs.pageBasic.basicData=a,null!==a.pageTurningConfigureEntity&&0!==a.browserRefreshConfigureEntity.length&&(e.$refs.pageBasic.basicData.refreshType=a.browserRefreshConfigureEntity[0].refreshType,e.$refs.pageBasic.basicData.maxDropDownNum=a.browserRefreshConfigureEntity[0].maxDropDownNum,e.$refs.pageBasic.basicData.eleLocateRule=a.browserRefreshConfigureEntity[0].eleLocateRule,e.$refs.pageBasic.basicData.refreshable=a.browserRefreshConfigureEntity[0].refreshable,e.$refs.pageBasic.basicData.refreshWaitTime=a.browserRefreshConfigureEntity[0].refreshWaitTime),null!==a.pageTurningConfigureEntity&&0!==a.pageTurningConfigureEntity.length&&(e.$refs.pageBasic.basicData.pageTurningType=a.pageTurningConfigureEntity[0].pageTurningType,e.$refs.pageBasic.basicData.extractType=a.pageTurningConfigureEntity[0].extractType,e.$refs.pageBasic.basicData.extractRule=a.pageTurningConfigureEntity[0].extractRule,e.$refs.pageBasic.basicData.pageDownExpression=a.pageTurningConfigureEntity[0].pageDownExpression),null!==a.pageModelPropertyEntity&&0!==a.pageModelPropertyEntity.length&&(e.$refs.pageModelBasic.postData=a.pageModelPropertyEntity,e.$refs.pageModelBasic.returnData())})},pageModelSignOff:function(){var e=this;Object(o.g)({modelId:this.$route.query.modelId,token:Object(l.a)("token")}).then(function(t){"0"===t.data.respCode&&(e.$Message.success("签出成功"),e.signStatus=!0)})},modelCheckIn:function(e){var t=this;Object(o.f)(e).then(function(e){"0"===e.data.respCode?(t.signStatus=!1,t.$Message.success("签入成功")):t.$Message.error(e.data.respMsg)})},pageModelSignIn:function(){var e=this;this.$refs.formValidate.validate(function(t){if(t){if(e.siteList="",e.basicList=[],e.modelList="",e.$refs.pageSite.pageSiteSubmit(),e.$refs.pageBasic.pageBasicSubmit(),e.$refs.pageModelBasic.pageModelBasicSubmit(),!e.modelErrState)return!1;if(e.siteList&&0!==e.basicList.length){var a=e.basicList;a.siteId=e.siteList,a.pageModelProperty=e.modelList,a.modelName=e.formValidate.modelName;var r={},i={modelId:e.$route.query.modelId,modelType:a.modelType,modelName:a.modelName,browserCrawlable:a.browserCrawlable,urlExtractable:a.urlExtractable,urlsAllowCrawlRegex:a.urlsAllowCrawlRegex,urlsNotAllowCrawlRegex:a.urlsNotAllowCrawlRegex,siteId:a.siteId,contentType:a.contentType,modelRegularExpression:a.modelRegularExpression,pageTurningable:a.pageTurningable,urlExtractRule:a.urlExtractable};if(r.pageModelResult=s()(i),""!==a.pageModelProperty&&(r.pageModelPropertyResult=a.pageModelProperty),1===a.browserCrawlable){var o={modelId:e.$route.query.modelId,refreshable:a.refreshable,refreshType:a.refreshType,eleLocateRule:a.eleLocateRule,maxDropDownNum:a.maxDropDownNum,refreshWaitTime:a.refreshWaitTime,loadFinishedDecisionRule:a.loadFinishedDecisionRule};r.browserParameter=s()(o)}if(1===a.pageTurningable){var n={modelId:e.$route.query.modelId,pageTurningType:a.pageTurningType,extractType:a.extractType,extractRule:a.extractRule,pageDownExpression:a.pageDownExpression};r.pageTurningParameter=s()(n)}r.token=Object(l.a)("token"),e.modelCheckIn(r)}}else e.$Message.error({content:"页面模型名称不能为空！",duration:3,closable:!0})})}},components:{pageSite:n.default,pageBasic:p.default,pageModelBasic:c.default},computed:{getUpdatePersonId:function(){return JSON.parse(Object(l.a)("userInfo")).userId}},mounted:function(){"alter"===this.$route.params.id&&this.initQuery()},created:function(){"alter"===this.$route.params.id&&"1"===this.$route.query.checkType&&(this.signStatus=!0),"alter"===this.$route.params.id&&"1"===this.$route.query.checkType&&parseInt(this.$route.query.updatePersonId)!==this.getUpdatePersonId&&(this.signUserStatus=!0)}},d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"task-inform"},[a("header",[a("div",{staticClass:"task-header-typeIn"},[a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":120}},[a("FormItem",{attrs:{label:"页面模型名称：",prop:"modelName"}},[a("Input",{staticStyle:{"max-width":"300px"},attrs:{placeholder:""},model:{value:e.formValidate.modelName,callback:function(t){e.$set(e.formValidate,"modelName",t)},expression:"formValidate.modelName"}})],1)],1)],1),a("div",{staticClass:"task-header-btn"},["alter"===e.$route.params.id?a("Button",{attrs:{type:"success",disabled:e.signStatus},on:{click:e.pageModelSignOff}},[e._v("签出")]):e._e(),"alter"===e.$route.params.id?a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"success",disabled:!e.signStatus||e.signUserStatus},on:{click:e.pageModelSignIn}},[e._v("签入")]):e._e(),"add"===e.$route.params.id?a("Button",{attrs:{type:"success"},on:{click:e.handleSave}},[e._v("保存")]):e._e(),a("Button",{attrs:{type:"primary"},on:{click:e.handleBack}},[e._v("返回")])],1)]),a("section",{staticClass:"task-section"},[a("Tabs",{attrs:{type:"card",value:"2"}},[a("TabPane",{attrs:{label:"归属站点",name:"1"}},[a("pageSite",{ref:"pageSite",on:{siteData:e.siteData}})],1),a("TabPane",{attrs:{label:"基本属性",name:"2"}},[a("pageBasic",{ref:"pageBasic",on:{basicData:e.basicData}})],1),a("TabPane",{attrs:{label:"页面模型",name:"3"}},[a("pageModelBasic",{ref:"pageModelBasic",on:{modelData:e.modelData,modelErr:e.modelErr}})],1)],1)],1)])},m=[],g={render:d,staticRenderFns:m},f=g,b=a("VU/8"),h=r,y=b(u,f,!1,h,"data-v-030240aa",null);t.default=y.exports},u3Vn:function(e,t,a){"use strict";function r(e){a("iv/s")}Object.defineProperty(t,"__esModule",{value:!0});var i={name:"pageModelBasicTree",props:{item:Object},mounted:function(){var e=this;document.addEventListener("click",function(t){e.$el.contains(t.target)||e.$store.dispatch("setToggleId","-1")})},computed:{isFolder:function(){return this.item.children&&this.item.children.length},toggleId:function(){return this.$store.getters.getToggleId},httpCon:function(){return this.$store.getters.getHttpCon}},methods:{toggle:function(e){this.$store.dispatch("setToggleId",e)},delItem:function(e){this.item.children.splice(e,1)}}},s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pageModelBasicTree"},[a("ul",[a("div",{staticStyle:{padding:"20px 0"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.toggleId!==e.item.propertyId,expression:"toggleId !== item.propertyId"}],staticClass:"w100",on:{click:function(t){t.stopPropagation(),e.toggle(e.item.propertyId)}}},[e._v(e._s(e.item.propertyName))]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.toggleId===e.item.propertyId,expression:"toggleId === item.propertyId"}],on:{click:function(e){e.stopPropagation()}}},[a("Input",{staticClass:"w100",model:{value:e.item.propertyName,callback:function(t){e.$set(e.item,"propertyName",t)},expression:"item.propertyName"}})],1),e._v(" "),a("Select",{staticStyle:{width:"100px","text-align":"left"},model:{value:e.item.parseType,callback:function(t){e.$set(e.item,"parseType",t)},expression:"item.parseType"}},e._l(e.httpCon,function(t,r){return a("Option",{key:r,attrs:{value:t.itemType}},[e._v(e._s(t.itemName))])})),e._v(" "),a("Input",{staticStyle:{width:"300px"},model:{value:e.item.matchExpression,callback:function(t){e.$set(e.item,"matchExpression",t)},expression:"item.matchExpression"}}),e._v("\n      是否为URL属性：\n      "),a("RadioGroup",{model:{value:e.item.urlPropertyExtract,callback:function(t){e.$set(e.item,"urlPropertyExtract",t)},expression:"item.urlPropertyExtract"}},[a("Radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("Radio",{attrs:{label:0}},[e._v("否")])],1),e._v(" "),a("Button",{attrs:{type:"error"},on:{click:function(t){t.stopPropagation(),e.$emit("remove")}}},[e._v("删除")])],1),e._v(" "),e.isFolder?a("ul",e._l(e.item.children,function(t,r){return a("pageModelBasicTree",{key:r,attrs:{item:t},on:{remove:function(t){e.delItem(r)}}})})):e._e()])])},o=[],l={render:s,staticRenderFns:o},n=l,p=a("VU/8"),c=r,u=p(i,n,!1,c,"data-v-5a3af434",null);t.default=u.exports},xS4A:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".pageBasic{padding-bottom:100px;width:60%}.pageBasic .browserCrawlable{padding:20px;border:1px solid #dddee1;border-radius:4px}.pageBasic .browserCrawlable .ivu-form-item{margin-bottom:24px!important}.pageBasic .browserCrawlable .ivu-form-item-content{margin-left:150px!important}",""])},"z/Jo":function(e,t,a){"use strict";function r(e){a("oe/e")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),o=a("//Fk"),l=a.n(o),n=a("u8GW"),p=a("OjDh"),c={name:"pageBasic",data:function(){return{modelTypeList:[],contentTypeList:[],refreshTypeList:[],extractTypeList:[],maxDropDownNumList:[{itemType:1,itemName:"1次"},{itemType:5,itemName:"5次"},{itemType:10,itemName:"10次"},{itemType:20,itemName:"20次"},{itemType:30,itemName:"30次"},{itemType:50,itemName:"50次"},{itemType:100,itemName:"100次"}],refreshWaitTimeList:[{itemType:3,itemName:"3秒"},{itemType:5,itemName:"5秒"},{itemType:10,itemName:"10秒"},{itemType:30,itemName:"30秒"},{itemType:60,itemName:"60秒"},{itemType:120,itemName:"120秒"},{itemType:300,itemName:"300秒"}],basicData:{modelType:1,contentType:1,modelRegularExpression:"",urlsAllowCrawlRegex:"",urlsNotAllowCrawlRegex:"",urlExtractable:0,browserCrawlable:2,pageTurningable:0,refreshType:1,maxDropDownNum:1,eleLocateRule:"",refreshable:0,refreshWaitTime:3,pageTurningType:1,extractType:1,extractRule:"",pageDownExpression:""},ruleValidate:{modelType:[{type:"number",required:!0,message:"请选择",trigger:"change"}],contentType:[{type:"number",required:!0,message:"请选择",trigger:"change"}],modelRegularExpression:[{required:!0,message:"请输入",trigger:"blur"}],urlsAllowCrawlRegex:[{required:!0,message:"请输入",trigger:"blur"}],urlsNotAllowCrawlRegex:[{required:!0,message:"请输入",trigger:"blur"}],urlExtractable:[{type:"number",required:!0,message:"请选择",trigger:"change"}],browserCrawlable:[{type:"number",required:!0,message:"请选择",trigger:"change"}],pageTurningable:[{type:"number",required:!0,message:"请选择",trigger:"change"}],refreshType:[{type:"number",required:!0,message:"请选择",trigger:"change"}],maxDropDownNum:[{type:"number",required:!0,message:"请选择",trigger:"change"}],eleLocateRule:[{required:!0,message:"请输入",trigger:"blur"}],refreshable:[{type:"number",required:!0,message:"请选择",trigger:"change"}],refreshWaitTime:[{type:"number",required:!0,message:"请选择",trigger:"change"}],pageTurningType:[{type:"number",required:!0,message:"请选择",trigger:"change"}],extractType:[{type:"number",required:!0,message:"请选择",trigger:"change"}],extractRule:[{required:!0,message:"请输入",trigger:"blur"}],pageDownExpression:[{required:!0,message:"请输入",trigger:"blur"}]}}},mounted:function(){var e=this;this.$nextTick(function(){var t=e.initQueryType(1),a=e.initQueryType(4),r=e.initQueryType(10),i=e.initQueryType(3);l.a.all([t,a,r,i]).then(function(t){e.modelTypeList=t[0],e.contentTypeList=t[1],e.refreshTypeList=t[2],e.extractTypeList=t[3]})})},methods:{initQueryType:function(e){return new l.a(function(t,a){Object(n.l)({typeId:e,token:Object(p.a)("token")}).then(function(e){"0"===e.data.respCode&&t(e.data.data)}).catch(function(e){a(e.statusCode)})})},pageBasicSubmit:function(){var e=this;this.$refs.basicData.validate(function(t){if(t){var a=JSON.parse(s()(e.basicData));2===a.browserCrawlable&&(delete a.refreshType,delete a.maxDropDownNum,delete a.eleLocateRule,delete a.refreshable,delete a.refreshWaitTime),0===a.pageTurningable&&(delete a.pageTurningType,delete a.extractType,delete a.extractRule,delete a.pageDownExpression),e.$emit("basicData",a)}else e.$Message.error({content:"基本属性请填写完整！",duration:3,closable:!0})})}}},u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"pageBasic"},[a("Form",{ref:"basicData",attrs:{model:e.basicData,rules:e.ruleValidate,"label-width":150}},[a("FormItem",{attrs:{label:"模型类型：",prop:"modelType"}},[a("Select",{model:{value:e.basicData.modelType,callback:function(t){e.$set(e.basicData,"modelType",t)},expression:"basicData.modelType"}},e._l(e.modelTypeList,function(t,r){return a("Option",{key:r,attrs:{value:t.itemType}},[e._v(e._s(t.itemName))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"内容提供方式：",prop:"contentType"}},[a("Select",{model:{value:e.basicData.contentType,callback:function(t){e.$set(e.basicData,"contentType",t)},expression:"basicData.contentType"}},e._l(e.contentTypeList,function(t,r){return a("Option",{key:r,attrs:{value:t.itemType}},[e._v(e._s(t.itemName))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"模型正则表达式：",prop:"modelRegularExpression"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:5}},model:{value:e.basicData.modelRegularExpression,callback:function(t){e.$set(e.basicData,"modelRegularExpression",t)},expression:"basicData.modelRegularExpression"}})],1),e._v(" "),a("FormItem",{attrs:{label:"允许爬行URL正则：",prop:"urlsAllowCrawlRegex"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:5}},model:{value:e.basicData.urlsAllowCrawlRegex,callback:function(t){e.$set(e.basicData,"urlsAllowCrawlRegex",t)},expression:"basicData.urlsAllowCrawlRegex"}})],1),e._v(" "),a("FormItem",{attrs:{label:"不允许爬行URL正则：",prop:"urlsNotAllowCrawlRegex"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:5}},model:{value:e.basicData.urlsNotAllowCrawlRegex,callback:function(t){e.$set(e.basicData,"urlsNotAllowCrawlRegex",t)},expression:"basicData.urlsNotAllowCrawlRegex"}})],1),e._v(" "),a("FormItem",{attrs:{label:"抽取url：",prop:"urlExtractable"}},[a("RadioGroup",{model:{value:e.basicData.urlExtractable,callback:function(t){e.$set(e.basicData,"urlExtractable",t)},expression:"basicData.urlExtractable"}},[a("Radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("Radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"浏览器采集：",prop:"browserCrawlable"}},[a("RadioGroup",{model:{value:e.basicData.browserCrawlable,callback:function(t){e.$set(e.basicData,"browserCrawlable",t)},expression:"basicData.browserCrawlable"}},[a("Radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("Radio",{attrs:{label:2}},[e._v("否")])],1)],1),e._v(" "),1===e.basicData.browserCrawlable?a("FormItem",{attrs:{label:" "}},[a("div",{staticClass:"browserCrawlable"},[a("FormItem",{attrs:{label:"刷新方式：",prop:"refreshType"}},[a("Select",{model:{value:e.basicData.refreshType,callback:function(t){e.$set(e.basicData,"refreshType",t)},expression:"basicData.refreshType"}},e._l(e.refreshTypeList,function(t,r){return a("Option",{key:r,attrs:{value:t.itemType}},[e._v(e._s(t.itemName))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"最大下拉次数：",prop:"maxDropDownNum"}},[a("Select",{model:{value:e.basicData.maxDropDownNum,callback:function(t){e.$set(e.basicData,"maxDropDownNum",t)},expression:"basicData.maxDropDownNum"}},e._l(e.maxDropDownNumList,function(t,r){return a("Option",{key:r,attrs:{value:t.itemType}},[e._v(e._s(t.itemName))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"元素刷新定位规格：（xpath格式）",prop:"eleLocateRule"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},model:{value:e.basicData.eleLocateRule,callback:function(t){e.$set(e.basicData,"eleLocateRule",t)},expression:"basicData.eleLocateRule"}})],1),e._v(" "),a("FormItem",{attrs:{label:"是否刷新：",prop:"refreshable"}},[a("RadioGroup",{model:{value:e.basicData.refreshable,callback:function(t){e.$set(e.basicData,"refreshable",t)},expression:"basicData.refreshable"}},[a("Radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("Radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"刷新等待时间：",prop:"refreshWaitTime"}},[a("Select",{model:{value:e.basicData.refreshWaitTime,callback:function(t){e.$set(e.basicData,"refreshWaitTime",t)},expression:"basicData.refreshWaitTime"}},e._l(e.refreshWaitTimeList,function(t,r){return a("Option",{key:r,attrs:{value:t.itemType}},[e._v(e._s(t.itemName))])}))],1)],1)]):e._e(),e._v(" "),a("FormItem",{attrs:{label:"翻页：",prop:"pageTurningable"}},[a("RadioGroup",{model:{value:e.basicData.pageTurningable,callback:function(t){e.$set(e.basicData,"pageTurningable",t)},expression:"basicData.pageTurningable"}},[a("Radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),a("Radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),1===e.basicData.pageTurningable?a("FormItem",{attrs:{label:" "}},[a("div",{staticClass:"browserCrawlable"},[a("FormItem",{attrs:{label:"翻页方式：",prop:"pageTurningType"}},[a("Select",{model:{value:e.basicData.pageTurningType,callback:function(t){e.$set(e.basicData,"pageTurningType",t)},expression:"basicData.pageTurningType"}},[a("Option",{attrs:{value:1}},[e._v("直接抽取下一页连接")]),e._v(" "),a("Option",{attrs:{value:2}},[e._v("自动生成URL连接")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"抽取规则：",prop:"extractType"}},[a("Select",{model:{value:e.basicData.extractType,callback:function(t){e.$set(e.basicData,"extractType",t)},expression:"basicData.extractType"}},e._l(e.extractTypeList,function(t,r){return a("Option",{key:r,attrs:{value:t.itemType}},[e._v(e._s(t.itemName))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"抽取规则表达式",prop:"extractRule"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},model:{value:e.basicData.extractRule,callback:function(t){e.$set(e.basicData,"extractRule",t)},expression:"basicData.extractRule"}})],1),e._v(" "),a("FormItem",{attrs:{label:"下一页表达式：",prop:"pageDownExpression"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},model:{value:e.basicData.pageDownExpression,callback:function(t){e.$set(e.basicData,"pageDownExpression",t)},expression:"basicData.pageDownExpression"}})],1)],1)]):e._e()],1)],1)},d=[],m={render:u,staticRenderFns:d},g=m,f=a("VU/8"),b=r,h=f(c,g,!1,b,null,null);t.default=h.exports}});