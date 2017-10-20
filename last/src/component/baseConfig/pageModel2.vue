<template lang="pug">
    .login-container
        .sitename
            p.sitename44  当前位置：基本配置：>
                a.guanli  站点模型
            p.sitename2  站点名称：
                Input(type="text" v-model="value" placeholder="请输入站点名称"  style="width:22%;height:36px")
                Button(type="success" ,style="margin-left: 30%;",@click="search") 查询
                Button(type="text"  style="border:1px solid  #17BB9C ;color: #17BB9C;",@click="modal10=true") 新建
                Modal(title="添加站点",v-model="modal10", class-name="vertical-center-modal", width="640px", height="288px", text-align="center",cancel-text="取消",@on-ok="keep",ok-text="保存",)
                    p(style="font-size: 14px;padding-top: 15px;")  站点名称:
                        Input(v-model="value11" , style="width: 300px")
                    p(style="font-size: 14px; padding-top: 15px;")  域   &nbsp; &nbsp; &nbsp;名:&nbsp;
                        Input(v-model="value22",style="width: 300px")
                Modal(title="更新站点", v-model="modal11", class-name="vertical-center-modal", width="640px", height="288px", text-align="center",cancel-text="取消",@on-ok="update()",ok-text="保存",)
                    p(style="font-size: 14px;padding-top: 15px;")  站点名称:
                        Input(v-model="value12" , :disabled="dis" style="width: 300px")

                    p(style="font-size: 14px; padding-top: 15px;")  域   &nbsp; &nbsp; &nbsp;名:&nbsp;
                        Input(v-model="value23", :disabled="dis",style="width: 300px")
                    p(style="font-size: 14px; padding-top: 15px;")
                         Button(@click="checkout" )   签出



            p.sitename3
                p.sitename5
                    Table(:columns="columns1",:data="data1")
                    Page(:total="col", :current="current", :page-size="pageSize"  show-total, style="float:right", @on-change="test3")
                Modal(v-model="delmodel" title="删除", @on-ok="ok" , @on-cancel="cancel" , )
                      p(style="font-size: 20px;padding-left: -4px;margin-left: 127px;margin-top: 20px;") 确定删除吗？




</template>
<script>
    import axios from '../../api/http'
    import Qs from 'qs'
    import {getToken} from '../../utils/token'
    export default {

        name: 'pageModel2',
        data() {
            return {
                delmodel:false,
                col:1,
                dis:true,
                value: '',
                value11: '',
                value22: '',
                value12:'',
                value23:'',
                upDtaId:'',
                modal10: false,
                modal11:false,
                columns1: [
                    {
                        title: 'ID',
                        width: 100,
                        key: 'siteId'
                    },
                    {
                        title: '站点名称',
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.modal11=true;
                                        this.upDtaId=params.row.siteId;
                                        this.value23=params.row.siteDomainName;
                                        this.value12=params.row.siteName;
                                    }
                                }
                            }, params.row.siteName)
                        }
                    },
                    {
                        title: '域名',
                        align: 'center',
                        key: 'siteDomainName'
                    }
                    ,
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createTimes'
                    }
                    ,
                    {
                        title: '创建人',
                        align: 'center',
                        key: 'updatePersonName'
                    },

                    {
                        title: '签出时间',
                        key: 'updateTimes'
                    },
                    {
                        title: '操作',
                        width: 210,
                        key: 'operation',
                        render: (h, params) => {
                            return h('Icon', {
                                style: {
                                    'fontSize': '20px',
                                    color: '#E64B3C',
                                    padding: '2px 15px',
                                    border: '1px solid #E64B3C'
                                },
                                attrs: {
                                    type: 'trash-a',
                                },
                                nativeOn: {
                                    click: () => {
                                       this.delete(params.row.siteId);
                                        console.log(params)
                                    }
                                }
                            })
                        }
                    }
                ],
                data1: [
                ],
              pageSize: 10,
              current: 1,
              delId:''
            }
        },
        methods: {
          cancel(){
            this.delmodel=false;
          },
          checkout(){
            this.dis = false
            let params = Qs.stringify({
              siteId:  this.upDtaId,
              token: getToken('Token')//token验证
            })
            axios.post('/site/checkout', params).then(response => {
              this.get_list();
              console.log(response)
            })
          },
          ok(){
            let params = Qs.stringify({
              siteId: this.delId,
              token: getToken('Token')
            });
            var that=this;
            axios.post('site/delete',params).then(response =>{
              that.get_list()
              if(response.data.data!=null){
                that.success("删除成功！");
                that.delmodel=false;
              }else{
                that.error("删除失败！");
              }
            })
          },
            delete(id) {
                this.delmodel=true;
                // 发送请求
                this.delId=id;

            },

            search() {  //站点查询
                let params = Qs.stringify({
                    siteName: this.value,
                    pageIndex: this.current,
                    pageSize: this.pageSize,
                    token: getToken('Token')
                })
                axios.post('site/list', params).then(response => {
                  this.col = response.data.data.recordCount
                  this.data1 = response.data.data.result

                })
            },
          test3 (page) {   ///----------------page
            let params = Qs.stringify({
              siteName: this.value,
              pageIndex: page,
              pageSize: this.pageSize,
              token: getToken('Token')
            })
            axios.post('site/list', params).then(response => {
              this.col = response.data.data.recordCount
              this.data1 = response.data.data.result
            })
          },

            keep() {   //添加站点
              var that=this;
              var strRegex =/^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
              //var re=new RegExp(strRegex);
              if(this.value11==''||this.value22==''){
                this.error("站点名称和域名不能为空！");
                return false;
              }
              if(this.value11.length>50){
                this.error("站点名称过长！");
                return false;
              }
              if(this.value22.length>200){
                this.error("域名名称过长！");
                return false;
              }

//              console.log(strRegex.test(this.value22))
              if(!strRegex.test(this.value22)){
                this.error("请输入正确的域名！");
                return false;
              }

                let params = Qs.stringify({
                    siteName: this.value11,
                    siteDomainName: this.value22,
                    token: getToken('Token')
                });

                axios.post('site/add', params).then(response => {
                    console.log("success")
                    console.log(response.data.respMsg)
                  var _this=that;
                    if(response.data.data!=null){
                        console.log("成功")
                        that.get_list();
                        that.success("新建成功！");
                        that.value11 = '';
                        that.value22 = '';
                    }else{
                       console.log("失败")
                       that.error("新建失败！");
                    }

                })
            },
            update() {    //更新站点
              var that=this;
//              var strRegex =/^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
//            var strRegex ='/^((http://)|(https://))?([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}(/)';
              var strRegex =/^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
              //var re=new RegExp(strRegex);
              if(this.value12==''||this.value23==''){
                this.error("站点名称和域名不能为空！");
                return false;
              }
              if(this.value12.length>50){
                this.error("站点名称过长！");
                return false;
              }
              if(this.value22.length>200){
                this.error("域名名称过长！");
                return false;
              }
//              console.log(strRegex.test(this.value22))
              if(!strRegex.test(this.value23)){
                this.error("请输入正确的域名！");
                return false;
              }


              let params = Qs.stringify({
                    siteId:this.upDtaId,
                    siteName: this.value12,
                    siteDomainName: this.value23,
                    token: getToken('Token')
                });
                console.log(params)
                axios.post('site/checkin', params).then(response => {
                    that.get_list();
                    that.success("更新成功！");
                })
            },
            success (msg) {
                this.$Message.success(msg);
            },
            error (msg) {
                this.$Message.error(msg);
            },
            get_list(){

                let params = Qs.stringify({
                    siteName: '',
                    pageIndex: this.current,
                    pageSize: this.pageSize,
                    token:getToken('Token'),
                });
                var that=this;
                axios.post('site/list', params).then(response => {
                    console.log(response)
                    that.data1=[];
                  this.col = response.data.data.recordCount
                  this.data1 = response.data.data.result
                })
            }
        },
        created(){//
            this.get_list();
           let wr=Qs.stringify({
                token:getToken('Token'),
             })
          axios.post('site/listsitename',wr).then(response=>{
                console.log(response)
          })
          let xq=Qs.stringify({
            siteId:111,
            token:getToken('Token'),
          })
          axios.post('/site/geisite',xq).then(response=>{
            console.log(response)
          })
            let params=Qs.stringify({
                siteId:111,
                token:getToken('Token'),
             })
          axios.post('/site/listmodelname',params).then(response=>{
                console.log(response)
          })


        }
    }
</script>
<style lang="scss" scoped>
    .login-container {

        min-height: 100%;
        height: 100vh;
        top: -114px;
        left: -262px;

        .form-group {
            width: 100%;
            height: 70px;
            background: #2B3D4F;
            .form-group-img {
                padding-top: 10px;
            }
            .form-group-text {
                position: absolute;
                padding-top: 5px;

            }
            .form-group-text2 {
                float: right;
                color: #fff;
                font-size: 16px;
                padding-top: 10px;
                padding-right: 46px;

            }
            &-text {
                color: #fff;
                font-size: 22px;
                text-align: center;

            }

        }
        //form-group
        .menus {
            width: 230px;
            height: 930px;
            background: #2B3D4F;
            margin-top: 19px;
            margin-left: 20px;
            float: left;
        }
        .top {
            background: #35414F;
            height: 50px;
            color: #EFF2F7;
            border-bottom: 1px solid #FFFFFF;
            p {
                font-size: 16px;
                text-align: center;
                padding-top: 13px;

            }

        }
        .down {
            background: #2B3D4F;
            p {
                font-size: 14px;
                padding-left: 53px;
                color: #CCCCCC;

            }

        }
        .list-left {
            padding-top: 10px;
            a {
                font-size: 14px;
                color: #FFFFFF;
                padding-left: 69px;

            }
            li {
                height: 29px;
            }
        }
        .lacation {
            float: left;
            padding-left: 40px;
            padding-top: 17px;
            .nowlacation {
                a {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #323232;
                    a:last-child {
                        color: #0B0000;

                    }
                }
            }
        }
        //...........
        .sitename {
            background: #FFFFFF;
            width: 80%;
            /*width: 1630px;*/
            height: 96px;
            position: absolute;
            top: 113px;
            left: 283px;
            .sitename2 {
                font-size: 14px;
                color: #323232;
                padding-top: 37px;
                padding-bottom: 40px;
                padding-left: 21px;
                .ivu-btn-success {
                    margin-left: 20px;
                    width: 76px;
                }
                .ivu-btn-text {
                    margin-left: 20px;
                    width: 76px;
                }
            }

        }
        .formlist {
            width: 1630px;
            height: 827px;
            background: #FFFFFF;
            position: absolute;
            top: 229px;
            left: 281px;
            .tabletr {
                ont-family: MicrosoftYaHei;
                font-size: 14px;
                color: #000000;
                padding-left: 15px;
            }

        }
        .ivu-btn-success {
            color: #fff;
            background: #17BB9C;
            border-radius: 3px;
            font-size: 14px;

        }

    }
</style>
<style lang="scss">
    html, body {
        height: 100vh;
        min-height: 100%;
        background: #EBEFF0;
        box-sizing: border-box;
        margin: 0;
        padding: 0;

    }
    .ivu-modal-footer > button:first-child {
        background: #EBEFF0;
        color: #323232;
        border: 1px solid #CCCCCC;
    }

    .ivu-modal-footer > button:last-child {
        background: #17BB9C;
        color: #fff;
    }

    .ivu-modal-body {
        height: 112px;
        background: #F0F0F2;
        border-radius: 3px;
        .ivu-input {
            width: 527px;
        }
    }

    .ivu-modal-footer {
        padding: 12px 259px 12px 18px;
        background: #F0F0F2;
    }

    .ivu-modal-header-inner {
        text-align: center;
        font-size: 16px;
        border-radius: 3px;
        color: #fff;
    }

    .ivu-modal-header {
        background: #2B3D4F;
        border-radius: 3px;
        border-bottom: 1px solid #CCCCCC;;
    }

    .ivu-btn ivu-btn-text ivu-btn-large {
        background: red;
    }

    .ivu-page {
        padding-top: 20px;
        padding-right: 65px;
        position: relative;
    }

    .ivu-table-wrapper {
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;
    }

    .sitename5 {
        background: #fff;
        position: absolute;
        width: 100%;
        height: 800px;
    }

    .guanli {
        color: #17BB9C;
    }

    p.sitename44 {
        margin-top: -25px;
        font-size: 14px;
    }

    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        background: #17BB9C;
    }

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }


</style>
