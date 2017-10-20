<template lang="pug">
    .login-container
        .sitename
            p.sitename44  当前位置：基本配置 > 任务管理 >
                a.guanli  新增任务
            p.sitename3
                p.sitename2  任务名称：
                    Input(type="text" v-model="taskname" placeholder="请输入任务名称",:disabled="dis"  style="width:22%;height:36px")
                    Button(type="success",@click='checkOut',style="margin-left: 25%;") 签出
                    Button(type="success",@click='checkIn') 签入
                    Button(type="text"  style="border:1px solid  #17BB9C ;color: #fff;background: #2D8CF0;",@click="back") 返回
                    //a     niha
                p.sitename5

                    Tabs(type="card")
                        TabPane(label="基本属性")

                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:15px")
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  任务周期类型： &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                Select(:value="Taskvalue" ,  style="width:22%" ,:disabled="dis")
                                    Option(v-for="item in  Taskcycle" , :value="item.itemType" , :key="item.itemName") {{ item.itemName }}
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px;margin-left:10%;")   编 &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;码：
                                Select(v-model="codevalue" style="width:22%", :disabled="dis")
                                    Option(v-for="item in Codedformat" ,:value="item.itemType",:key="item.itemName") {{ item.itemName }}


                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:15px")
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  页面请求方式： &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                Select(v-model="pagevalue" style="width:22%", :disabled="dis")
                                    Option(v-for="item in Pagerequest", :value="item.itemType" ,:key="item.itemName") {{ item.itemName }}
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px;margin-left: 8%;") 需要URL去重：
                                input(v-model="single",type="checkbox",name="checkbox",:disabled="dis" ,value="需要URL去重")




                            <!--p.BaseAttribute(style="font-size: 14px;color: #323232;padding:15px")-->

                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:15px")
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  URL去重保留时长：
                                Select(v-model="lengthvalue", :disabled="dis" style="width:22%")
                                    Option(v-for="item in lengthoftime", :value="item.value" ,:key="item.value") {{ item.label }}
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px;margin-left: 8%;")   连接超时时间：
                                Select(v-model="model5",:disabled="dis" style="width:22%")
                                    Option(v-for="item in timeout", :value="item.value" ,:key="item.value") {{ item.label }}




                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:15px")
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  最大重试次数：&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                Select(v-model="frevalue",:disabled="dis" style="width:22%")
                                    Option(v-for="item in  frequency" ,:value="item.value" , :key="item.value") {{ item.label }}
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px;margin-left: 8%;")   是否需要代理：
                                Select(v-model="model7" , :disabled="dis" style="width:22%")
                                    Option(v-for="item in agent", :value="item.value" ,:key="item.value") {{ item.label }}





                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:15px")
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px;margin-left: 23px;")   优 先 级：&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Select(v-model="privalue",:disabled="dis" style="width:22%")
                                    Option(v-for="item in priority", :value="item.itemType" , :key="item.itemName") {{ item.itemName }}
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px;margin-left: 7.4%;")   采集时间间隔：&nbsp;&nbsp;
                                Select(v-model="intervalue", :disabled="dis" style="width:22%")
                                    Option(v-for="item in interval", :value="item.value" , :key="item.value") {{ item.label }}

                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:15px")   用户代理 ： &nbsp;&nbsp; &nbsp;&nbsp &nbsp;&nbsp; &nbsp;&nbsp
                                Input(type="text" v-model= "useragent" ,:disabled="dis" style="width:521px;height:36px")
                            p.BaseAttribute(style="font-size: 14px;color: #323232;")
                                Row
                                    Col(span="5")   采集开始时间：
                                        DatePicker(type="date" ,:disabled="dis" placeholder="选择日期", style="width: 200px")
                                    Col(span="5", style="margin-left: 19%;")   采集结束时间： &nbsp;&nbsp;
                                        DatePicker(type="date", :disabled="dis", placeholder="选择日期" ,style="width: 200px")





                        TabPane(label="页面模型")
                            span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")   站 &nbsp; &nbsp;&nbsp;点： &nbsp;&nbsp;
                                Select(v-model="sitevalue",:disabled="dis" style="width:22%")
                                    Option(v-for="item in  site" ,:value="item.value", :key="item.value") {{ item.label }}

                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")   采集起始地址：
                                Input(type="text" v-model="collecStart" ,:disabled="dis" style="width:62%;height:36px")
                                Button(type="success",:disabled="dis" style="width:65px;margin-bottom: 8px;") 匹配
                            p.BaseAttribute2(style="font-size: 14px;color: #323232;width:70%;height:120px;padding-left: 10px;")   更多起始地址：
                                Input(v-model="Startaddress",:disabled="dis" type="textarea"  )
                            p.BaseAttribute2(style="font-size: 14px;color: #323232;width:70%;height:120px;padding-left: 10px;")   允许爬行的url：
                                Input(v-model="Allowscraw",:disabled="dis" type="textarea"  )
                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")   不允许爬行的url：
                                Input(type="text" v-model="NotAllowscraw" ,:disabled="dis" style="width:60.9%;height:36px")

</template>
<script>
  import axios from '../../api/http'
  import Qs from 'qs'
  import { getToken } from '../../utils/token'

  export default {
    name: 'pageModel2',
    data () {

      return {
        dis: true,
        single: true,
        taskname: '',            //站点名称
        Startaddress: '',      //更多起始地址
        Allowscraw: '',       //允许的
        NotAllowscraw: '',   //不允许爬行的url
        useragent: '',    //用户代理
        collecStart: '',//采集起始地址
        vertical: 'apple',
        site: [

        ],//
        sitevalue: '',
        Taskcycle: [//任务周期类型


        ],
        Taskvalue:'',
        Codedformat: [//编码方式

        ],
        codevalue: ' ',
        Pagerequest: [//页面请求方式

        ],
        pagevalue: ' ',
        timeout: [//超时
          {value:'1',
            label:'10s'
          },
          { value:'2',
            label:'20s'
          },
          { value:'3',
            label:'30s'
          }

        ],
        model5: ' ',
        lengthoftime: [//去
          {value:'1',
            label:'10s'
          },
          { value:'2',
            label:'20s'
          },
          { value:'3',
            label:'30s'
          }

        ],
        lengthvalue: ' ',
        agent: [//是否需要代理
          {
            value:'1',
            label:'需要'

          },
          {
            value:'2',
            label:'不需要'

          }

        ],
        model7: ' ',
        frequency: [//重试次数
          {value:'1',
            label:'1次'
          },
          {value:'2',
            label:'2次'
          },
          {value:'3',
            label:'3次'
          }

        ],
        frevalue: ' ',
        priority: [//优先级

        ],
        privalue: ' ',
        Acquisition: [//采集方式

        ],
        model10: ' ',
        interval: [//采集时间间隔
          {value:'0',
            label:'10s'
          },
          { value:'1',
            label:'20s'
          },
          { value:'2',
            label:'30s'
          }
        ],
        intervalue: ' ',//采集时间间隔
        quit: this.$route.query.plan,
      }

    },
//        created(){
//          console.log("989898989")
//          console.log(this.$route)
//          this.taskname=this.$route.query.name;
//        },

    methods: {
      back () {
        this.$router.push({path: '/base/siteManagement'})
      },

      checkOut () {    //迁出
        this.dis = false
        var quit = this.$route.query.plan//---------------------------------- taskid
        let params = Qs.stringify({
          taskId: quit,
          token: getToken('Token')//token验证
        })
        var that = this
        axios.post('task/checkout', params).then(response => {
          console.log(response)
        })
      },

      checkIn () {   //迁入//保存
        console.log('保存')
        console.log(this.$route.query.active)
        if (this.$route.query.active === 'update') {
          var quit = this.$route.query.plan
          let params = Qs.stringify({
            taskId: quit,
            strategyName: this.taskname,// 任务名称
            taskPeriodType: this.Taskvalue,//1：一次性任务;2、周期性任务
            charSet: this.codevalue,     //网页编码方式
            requestType: 1,  //请求方式(1、get；2、post)
            deduplicate: 1,  //0:不去重;1:去重
            maxDeduplicateTime: this.lengthvalue,  //url去重保留时长(s)--------------------
            siteId: this.sitevalue,      //站点Id
            connectionTimeout: 60,   //默认60
            maxRetryCount: this.frevalue,  //最大数------------------
            priority: this.privalue,   //1、high；2、middle；3、low
            proxyId: this.useragent,    //代理Id
            startUrl: this.collecStart,    //采集其实地址
            token: getToken('Token')   //token验证
          })
          var that = this
          axios.post('/task/checkin', params).then(response => {
            console.log("qianru")
            console.log(response)
          })
        } else {//    这是我的任务添加
          let params = Qs.stringify({
            strategyName: this.taskname,// 任务名称
            taskPeriodType: this.Taskvalue,
            charSet: this.codevalue,
            requestType: 1,
            deduplicate: 1,
            siteId: this.sitevalue,
            maxDeduplicateTime: this.lengthvalue,//url
            connectionTimeout: 60,
            maxRetryCount: this.frevalue,
            priority: this.privalue,
            proxyId: this.useragent,
            startUrl: this.collecStart,
            token: getToken('Token')
          })
//          console.log(params)
          axios.post('task/add', params).then(response => {
            console.log("add")
            console.log(response)
//             this.taskname='',// 任务名称
//             this.Taskvalue='',//1：一次性任务;2、周期性任务
//              this.codevalue='',     //网页编码方式
//              this.lengthvalue='',  //url去重保留时长(s)
//              this.siteId='',      //站点Id
//              this.frevalue='',  //最大数
//              this.privalue='',   //1、high；2、middle；3、low
//              this.useragent='',    //代理Id
//              this.collecStart=''   //采集其实地址
//              charSet: this.codevalue,     //网页编码方式
//              requestType: 1,//请求方式(1、get；2、post)
//              deduplicate: 1,  //0:不去重;1:去重
//              maxDeduplicateTime: this.lengthvalue,  //url去重保留时长(s)
//              siteId: this.siteId,      //站点Id
//              connectionTimeout: 60,   //默认60
//              maxRetryCount: this.frevalue,  //最大数
//              priority: this.privalue,   //1、high；2、middle；3、low
//              proxyId: this.useragent,    //代理Id
//              startUrl: this.collecStart,    //采集其实地址
          })
        }
      },//保存 and 更新

    },
    created () {
      var quit = this.$route.query.plan//---------------------------------- taskid
      let params = Qs.stringify({           ///页面加载的详情
        taskId: this.quit,
        token: getToken('Token')
      })
      var that = this
      axios.post('task/query', params).then(response => {
        console.log("页面加载的详情")
        console.log(response.data.data)
          //基本属性
         that.taskname =response.data.data.strategyName    // 名称
//          that.sitevalue=that.site[response.data.data.siteId].value
//          that.Taskvalue = that.Taskcycle[response.data.data.requestType].value  //请求类型
         that.lengthvalue = that.lengthoftime[response.data.data.priority].value//URL去重保留时长
         that.model5 = that.timeout[response.data.data.deduplicate].value   //连接超时时间：
         that.useragent = response.data.data.proxyId //用户代理
         that.Startaddress = response.data.data.moreStartUrl //更多起始地址
//         that.Startaddress = response.data.data.moreStartUrl //更多起始地址
//         that.useragent = response.data.data.userAgent //用户代理
         that.frevalue = that.frequency[response.data.data.maxRetryCount].value //最大重试次数
         that.model7 = that.agent[response.data.data.taskPeriodType].value   //是否需要代理
         that.intervalue=that.interval[response.data.data.endTime].value//采集时间间隔
           //页面模型
           that.Startaddress = response.data.data.moreStartUrl //更多起始地址
//         that.sitevalue=that.site[response.data.data.siteId].value
           that.collecStart=response.data.data.startUrl //起始地址
//        that.sitevalue=that.site[response.data.data.siteId].value
//        console.log(response.data.data.taskPeriodType)
//          that.Taskvalue = that.Taskcycle[response.data.data.requestType].value  //请求类型
//         that.codevalue = that.Codedformat[response.data.data.checkType].value    //编码
//         that.pagevalue = that.Pagerequest[response.data.data.requestType].value
//         that.lengthvalue = that.lengthoftime[response.data.data.priority].value//URL去重保留时长
//         that.privalue = that.priority[response.data.data.priority].value//优先级
//         that.Allowscraw = response.data.data.startUrl  //允许爬行
//         that.NotAllowscraw = response.data.data.startUrl  //不允许
//        that.starts = data.createTime//起始时间
//        that.ends = data.updateTime//结束时间
//        that.Taskvalue = that.Taskcycle[data.requestType].value  //请求类型
//        that.codevalue = that.Codedformat[data.charSet].value    //编码
//        that.pagevalue = that.Pagerequest[data.requestType].value
//        that.lengthvalue = that.lengthoftime[data.priority].value//URL去重保留时长
//        that.model5 = that.timeout[data.deduplicate].value   //连接超时时间：
//        that.frevalue = that.frequency[data.maxRetryCount].value //最大重试次数
//        that.model7 = that.agent[data.siteId].value   //是否需要代理
//        that.privalue = that.priority[data.siteId].value//优先级
//        that.useragent = data.userAgent //用户代理
//        that.Startaddress = data.moreStartUrl //更多起始地址
//        that.Allowscraw = data.startUrl  //允许爬行
//        that.NotAllowscraw = data.startUrl  //不允许
      })
      if (this.$route.query.active === 'update') {
        this.dis = true
      } else {
        this.dis = false
      }
      let aaa= Qs.stringify({
        token: getToken('Token'),
      })
      axios.post('pagemodel/codedFormat', aaa).then(response => {    // 编码格式
        console.log("编码格式")
        console.log(response)
        that.Codedformat=response.data.data;
        that.codevalue=that.Codedformat[0].itemType;
//        response.data.data.map(item5 => {
//          this.Codedformat.push({
//            value:item5.itemType,
//            label:item5.itemName
//          })
//        })
      })

      let www= Qs.stringify({
        token: getToken('Token'),
      })
      axios.post('pagemodel/taskPriority', www).then(response => {    // 任务优先级
        console.log(response.data.data)
        that.priority=response.data.data;
        that.privalue=that.priority[0].itemType;
//        response.data.data.map(item4 => {
//          this.priority.push({
//            value:item4.itemType,
//            label:item4.itemName
//          })
//        })
      })

      let sss= Qs.stringify({
        token: getToken('Token'),
      })
      axios.post('pagemodel/taskPeriodType', sss).then(response => {    // 任务周期类型
        console.log("任务周期类型")
        that.Taskcycle=response.data.data;
        that.Taskvalue=that.Taskcycle[0].itemType;
//        response.data.data.map(item3 => {
//          this.Taskcycle.push({
//            value:item3.itemType,
//            label:item3.itemName
//          })
//        })
      })
      let FANGSHI = Qs.stringify({
          token: getToken('Token'),
      })
      axios.post('pagemodel/requestMode', FANGSHI).then(response => {    // 页面请求方式类型
        that.Pagerequest=response.data.data;
        that.pagevalue=that.Pagerequest[0].itemType;

//        response.data.data.map(item2 => {
//          this.Pagerequest.push({
//              value:item2.itemType,
//              label:item2.itemName
//          })
//        })
      })
          let pp=Qs.stringify({
          token:getToken('Token'),
             })
          axios.post('site/listsitename',pp).then(response=>{
               console.log('889')
                console.log(response)
//           that.sitevalue=that.site[response.data.data.siteId].value
            response.data.data.map(item => {
              this.site.push({
                value: item.siteId,
                label: item.siteName
              })
            })

          })
//      let app = Qs.stringify({      // SITEID
//        siteName: '',
//        pageIndex: 1,
//        pageSize: 10,
//        token: getToken('Token')
//      })
//      axios.post('site/list', app).then(response => {  ///
//        console.log("zhandian")
//        console.log(response)  //
//        response.data.data.result.map(item => {
//          this.site.push({
//            value: item.siteId,
//            label: item.siteName
//          })
//        })
//      })//  ---------------------------OTHER

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
        .sitename {
            background: #FFFFFF;
            width: 80%;
            height: 96px;
            position: absolute;
            top: 113px;
            left: 283px;
            .sitename2 {
                font-size: 14px;
                color: #323232;
                padding-top: 37px;
                padding-bottom: 27px;
                padding-left: 21px;
                .ivu-btn-success {
                    margin-left: 15px;
                    font-size: 14px;
                    width: 76px;
                }
                .ivu-btn-text {
                    font-size: 14px;
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

    .ivu-select-single .ivu-select-selection {
        border-radius: 0;
    }

    .ivu-tabs {
        height: 100%;
    }

    .ivu-input {
        border-radius: 2px;
    }

    textarea.ivu-input {
        height: 99px;
    }

    .ivu-tabs {
        margin-left: 20px;
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
        height:900px;

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
