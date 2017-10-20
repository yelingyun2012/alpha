<template lang="pug">
    .login-container
        .sitename
            p.sitename44  当前位置：基本配置：>
                a.guanli  任务管理
            p.sitename2  任务名称：
                Input(type="text" v-model="value" placeholder="请输入任务名称"  style="width:22%;height:36px;")
                Button(type="success", style="margin-left: 30%;", @click="search") 查询
                Button(type="text", style="border:1px solid  #17BB9C ;color: #17BB9C;", @click="append") 新增
            p.sitename3
                p.sitename5
                    p.d1
                        a(@click="search") 全部
                        a(v-for='item of demos') {{item.siteName}}
                        p.textline
                            Table(size="small", :columns="columns1", :data="data1")
                            Page(:total="col", :current="current", :page-size="pageSize"  show-total, style="float:right", @on-change="test")
                Modal(v-model="delmodel" title="删除", @on-ok="ok" , @on-cancel="cancel" , )
                     p(style="font-size: 20px;padding-left: -4px;margin-left: 127px;margin-top: 20px;") 确定删除吗？

</template>


<script>
  import axios from '../../api/http'
  import Qs from 'qs'
  import { getToken } from '../../utils/token'

  export default {
    name: 'pageModel2',
    data () {
      return {
        delmodel:false,
        modal10: false,
        demos: [],
        col: 1,
        value: '',
        columns1: [
          {
            title: 'ID',
            width: 50,
            key: 'taskId'
          },
          {
            title: '任务名称',
            key: 'strategyName',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/base/newtask',
                      query: {plan: params.row.taskId, name: params.row.strategyName, active: 'update'}
                    })
                  }
                }
              }, params.row.strategyName)
            }
          },
          {
            title: '有效时间',
            key: 'createTimes'
          },
          {
            title: '创建时间',
            key: 'createTimes'
          },
          {
            title: '创建人',
            key: 'creatorId'
          },
          {
            title: '签出状态',
            key: 'moveOutName'
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
                    this.delete(params.row.taskId)
                    console.log(123)
                  }
                }
              })
            }
          }
        ],
        data1: [],
        pageSize: 10,
        current: 1
      }
    },
    methods: {
      append () {
        this.$router.push({path: '/base/newtask'})
      },
      cancel(){
        this.delmodel=false;
      },
      ok(){
        let params = Qs.stringify({
          taskId: this.delId,// -----------------------
          token: getToken('Token')
        })
        var that = this
        axios.post('task/delete', params).then(response => {
          that.get_list()
          if(response.data.data!=null){
            console.log("成功")
            that.success("删除成功！");
            that.delmodel=false;
          }else{
            that.error("删除失败！");
          }
        })
      },
      delete (id) {
        console.log("shanchu")
        this.delmodel=true;
        this.delId=id;
      },
      success (msg) {
        this.$Message.success(msg)
      },
      error (msg) {
        this.$Message.error(msg)
      },
//      delete (id) {  //删除
//        // 发送请求
//        console.log('id')
//        console.log(id)
//        let params = Qs.stringify({
//          taskId: id,
//          token: getToken('Token')
//        })
//        var that = this
//        axios.post('task/delete', params).then(response => {
//          console.log(response)
//          that.get_list()
//        })
//      },

      search () {
        let params = Qs.stringify({
          taskName: this.value,
          pageIndex: this.current,
          pageSize: this.pageSize,
          siteId: this.siteId,
          token: getToken('Token')
        })
        axios.post('task/list', params).then(response => {
          this.col = response.data.data.recordCount
          this.data1 = response.data.data.result
        })

      },
      get_list () {
        let params = Qs.stringify({
          taskName: this.value,
          pageIndex: this.current,
          pageSize: this.pageSize,
          siteId: this.siteId,
          token: getToken('Token')
        })
        var that = this
        axios.post('task/list', params).then(response => {
          console.log(response)
          that.data1 = []
          that.data1 = response.data.data.result
        })
      },
      test (page) {
        console.log(page)
        let params = Qs.stringify({
          taskName: this.value,
          pageIndex: page,
          pageSize: this.pageSize,
          siteId: this.siteId,
          token: getToken('Token')
        })
        var that = this
        axios.post('task/list', params).then (response => {
          console.log(response)
          that.data1 = []
          that.data1 = response.data.data.result
        })
      }
    },
    created () {
      console.log("站点")
      this.search()
      let params = Qs.stringify({
        token: getToken('Token')
      })
      axios.post('/task/sitenum', params).then(response => {
        this.demos = response.data.data
        console.log(response)
        console.log('0000')
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
            /*width: 1630px;*/
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

        .sidebar {
            background: red;
        }
    }

    .ivu-page {
        padding-top: 20px;
        padding-right: 65px;
        position: relative;
    }

    .ivu-table-wrapper {
        margin-top: 60px;
        margin-left: 30px;
        margin-right: 30px;
    }

    .sitename5 {
        background: #fff;
        position: absolute;
        width: 100%;
        height: 827px;
    }

    .d1 > a {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #589BEE;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 11px;
        padding-bottom: 11px;
        margin-top: 20px;
        display: inline-block;
        position: relative;
    }

    .d1 > a:hover {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        background: #2D8CF0;
        color: #FFFFFF;
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
