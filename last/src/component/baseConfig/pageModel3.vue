<!--<template lang="pug">-->
    <!--.page-wrapper-->
        <!--p asd243454-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--name: 'pageModel3'-->
    <!--}-->
<!--</script>-->
<template lang="pug">
    .login-container
        .sitename
            p.sitename44  当前位置：基本配置：>
                a.guanli  代理管理
            p.sitename2  代理名称：
                Input(type="text" v-model="value" placeholder="请输入代理名称"  style="width:300px;height:36px")
                Button(type="success") 查询
                    <!--Modal(-->
                    <!--title="对话框标题"-->
                    <!--v-model="modal10",-->
                    <!--class-name="vertical-center-modal"-->
                    <!--)-->
                Button(type="text"  style="border:1px solid  #17BB9C ;color: #17BB9C;",@click="modal10=true") 新建
                Modal(title="添加代理", v-model="modal10", class-name="vertical-center-modal", width="640px"
                ,height="288px",text-align="center",cancel-text="保存",ok-text="取消",)
                    p(style="font-size: 14px;padding-top: 15px;")  代理名称：
                        Input(v-model="value1" , style="width: 520px")
                    <!--p(style="font-size: 14px;padding-top: 15px;")  代理类型：-->
                        <!--Input(v-model="value2" , style="width: 200px")-->
                    p.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")
                       span.BaseAttribute(style="font-size: 14px;color: #323232;margin-left: -9px;")   采集方式：
                           Select(v-model="model1" style="width:200px")
                               Option(v-for="item in Proxytype" :value="item.value" :key="item.value") {{ item.label }}
                    p(style="font-size: 14px;")  代理 ip&nbsp; &nbsp;：
                        Input(v-model="value3" , style="width: 200px;")
                    p(style="font-size: 14px;padding-top: 15px;")  端&nbsp; 口 &nbsp; &nbsp;&nbsp;：
                        Input(v-model="value4", style="width: 200px;")



            p.sitename3
               p.sitename5
                Table(:columns="columns1",:data="data1")
                Page(:total="100" show-total style="float:right")

</template>


<script>
    export default {
        name: 'login',
        data() {
            return {
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                modal10: false,
                maskclosable:"flase",
                value: '',
                Proxytype: [
                    {
                        value: 'beijing',
                        label: '代理类型一'
                    },
                    {
                        value: 'shanghai',
                        label: '代理类型二'
                    },
                    {
                        value: 'shenzhen',
                        label: '代理类型三'
                    },

                ],
                model1: '11',
                columns1: [
                    {
                        title: 'ID',
                        width: 50,
                        key: 'num'
                    },
                    {
                        title: '站点名称',
                        key:"domainname"
                    },
                    {
                        title: '代理类型',
                        align: 'center',
                        key: 'domain'
                    }
                    ,
                    {
                        title: '代理ip',
                        align: 'center',
                        key: 'CreationTime',
                        render: (h, params) => {
                            return h('a',{
//                                attrs:{
//                                    href:'http://www.baidu.com'
//                                }
                                on: {
                                    click: () => {
                                        this.$router.push({path: '/base/addPage', query: {plan: params.row.num}})
                                    }
                                }
                            },params.row.domainname)
                        }
                    }
                    ,
                    {
                        title: '代理端口',
                        align: 'center',
                        key: 'creater'
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'lasttime'
                    },
                    {
                        title: '创建人',
                        key: 'lastcreater'
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
//                                        this.delete(params.index)
                                        console.log(123)
                                    }
                                }
                            })
                        }
                    }
                ],
                data1: [
                    {
                        num: '1',
                        domainname: '代理1',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '2',
                        domainname: '代理2',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '3',
                        domainname: '代理3',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '4',
                        domainname: '代理4',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '5',
                        domainname: '代理5',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '6',
                        domainname: '代理6',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '7',
                        domainname: '代理7',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '8',
                        domainname: '代理8',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '9',
                        domainname: '代理9',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '10',
                        domainname: '代理10',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '10',
                        domainname: '代理11',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '10',
                        domainname: '代理12',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },
                    {
                        num: '10',
                        domainname: '代理13',
                        domain: '境内动态',
                        CreationTime: '2017-05-31 17:16:27',
                        creater: 'admin',
                        lasttime: '2017-04-01 11：21：57',
                        lastcreater: 'admin',

                    },

                ]

            }

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
    .ivu-modal-footer{
        padding: 12px 259px 12px 18px;
        background: #F0F0F2;
    }
    .ivu-modal-header-inner{
        text-align: center;
        font-size: 16px;
        border-radius: 3px;
    }
    .ivu-modal-header{
        background: #F0F0F2;
        border-radius: 3px;
        border-bottom: 1px solid #CCCCCC;;
    }
    .ivu-modal-body{
     height: 200px;
        background: #F0F0F2;
        border-radius: 3px;
        .ivu-input{

        }
    }
    .ivu-page{
        padding-top: 20px;
        padding-right: 65px;
        position: relative;
    }
    .ivu-table-wrapper {
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;
    }
    .sitename5{
        background: #fff;
        position: absolute;
        width: 100%;
        height: 980px;
    }
    .guanli{
        color: #17BB9C;
    }
    p.sitename44{
        margin-top:-25px;
        font-size: 14px;
    }
    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
        background: #17BB9C;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }


</style>
