<template lang="pug">
  section
    aside.logStatis-name
      Row
        Col(span="24")
          span.title 时间：
          DatePicker(:value="search.startDate", type="datetime", placeholder="请选择时间" @on-change="startDateFn")
          span  - 
          DatePicker(:value="search.endDate", type="datetime", placeholder="请选择时间" @on-change="endDateFn")
          Select(v-model="search.count").select
            Option(v-for="item in countList", :value="item.value", :key="item.value") {{item.label}}
      Row(v-show="searchToggleState").rowCenter
        Col(span="8")
          span.title 任务名称：
          Input(v-model='search.taskName', placeholder='请输入任务名称').inputText
        Col(span="8")
          span.title 站点名称：
          Input(v-model='search.siteName', placeholder='请输入站点名称').inputText
        Col(span="8")
          span.title 创建者：
          Input(v-model='search.creatorName', placeholder='请输入任务创建者').inputText
      Row.btn
        Col(span="24")
          Button(type="primary", @click="handleSearch") 查询
          Button(type="text" @click="searchToggle") 
            | {{ searchToggleState? '收起' : '高级' }}
            Icon(:type=" searchToggleState ? 'chevron-up' : 'chevron-down' " style="margin-left:5px;")
    aside.logStatis-minute
      Table(:columns="logColumns", :data="logData", border)
      Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
      Modal(v-model="pieShow", title="采集详情", width="1000",class-name="vertical-center-modal")
        div.pieDiv
            div(id="myPie")
            div(id="dateList")
              ul
                li(v-for="item in pieData")
                  i
                  span {{ item.pieName }}
                  span.name {{ item.name }}
        div(slot="footer")
</template>

<script>
import echarts from "echarts";

export default {
  name: "logStatis",
  data() {
    return {
      //搜索高级&简易切换
      searchToggleState: false,
      //统计
      countList: [
        {
          value: 0,
          label: "默认"
        },
        {
          value: 1,
          label: "按小时统计"
        },
        {
          value: 2,
          label: "按天统计"
        },
        {
          value: 3,
          label: "按月统计"
        }
      ],
      //查询
      search: {
        startDate: "", //开始时间
        endDate: "", //结束时间
        count: 0, //统计
        taskName: "", //任务名称
        siteName: "", //站点名称
        creatorName: "", //任务创建者
        pageIndex: 1, //页码
        pageSize: 10 //每页最大条数
      },
      //日志配置
      logColumns: [
        {
          title: "运行时间段",
          key: "date"
        },
        {
          title: "任务创建者",
          key: "creatorName",
          align: "center"
        },
        {
          title: "采集成功URL数量",
          key: "successUrl",
          align: "center"
        },
        {
          title: "采集失败URL数量",
          key: "errorUrl",
          align: "center"
        },
        {
          title: "下载失败URL数量",
          key: "errDownUrl",
          align: "center"
        },
        {
          title: "抽取失败URL数量",
          key: "errUrl",
          align: "center"
        },
        {
          title: "新增抓取URL数量",
          key: "extractedUrlNum",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.goDetail(params.row);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      //日志数据
      logData: [
        {
          date: "1",
          creatorName: "2",
          taskName: "3",
          siteName: "4",
          successUrl: 55,
          errorUrl: 66,
          errDownUrl: 7,
          errUrl: 8,
          extractedUrlNum: 9
        }
      ],
      //页码
      pageTotal: 0,
      pageSize: 10,
      pageIndex: 1,

      pieShow: false, //显示饼图
      pieData: [
        {
          value: 0,
          pieName: "采集成功",
          name: "0%"
        },
        {
          value: 0,
          pieName: "下载失败",
          name: "0%"
        },
        {
          value: 0,
          pieName: "抽取失败",
          name: "0%"
        },
        {
          value: 0,
          pieName: "其他",
          name: "0%"
        }
      ]
    };
  },
  methods: {
    //查询
    handleSearch() {
      this.pageIndex = 1;
      this.search.pageIndex = 1;
      let con = this.search;
      if (con.startDate > con.endDate) {
        this.$Message.error({
          content: "结束时间不能小于开始时间！",
          duration: 3,
          closable: true
        });
      } else {
        this.getDate();
      }
    },
    //开始时间
    startDateFn(val) {
      this.search.startDate = val;
    },
    //结束时间
    endDateFn(val) {
      this.search.endDate = val;
    },
    //分页
    handlePage(pageIndex) {
      this.pageIndex = pageIndex;
      this.search.pageIndex = pageIndex;
      this.getDate();
    },
    //获取数据
    getDate() {
      console.log(this.search);
    },
    //搜索高级&简易切换
    searchToggle() {
      this.searchToggleState = !this.searchToggleState;
      if (!this.searchToggleState) {
        this.logColumns.splice(2, 1);
        this.logColumns.splice(2, 1);
      } else {
        let taskName = {
          title: "任务名称",
          key: "taskName"
        };
        let siteName = {
          title: "站点名称",
          key: "siteName",
          align: "center"
        };
        this.logColumns.splice(2, 0, taskName);
        this.logColumns.splice(3, 0, siteName);
      }
    },
    //详情
    goDetail(val) {
      let success = val.successUrl, //采集成功
        downErr = val.errDownUrl, //下载失败
        extractErr = val.errUrl, //抽取失败
        errSum = val.errorUrl, //错误总数
        other = errSum - val.errDownUrl - val.errUrl; //其他
      let sum = success + errSum; //总和
      let arr = [success, downErr, extractErr, other];
      let sumPie = 100;

      let pieData = this.pieData;
      for (let i = 0; i < pieData.length; i++) {
        pieData[i].value = arr[i];
        let val = (arr[i] / sum * 100).toFixed(2);
        pieData[i].name = val + "%";
        if (i !== 0) {
          sumPie -= val;
        }
      }
      this.pieData[0].name = sumPie.toFixed(2) + "%";

      let myPie = echarts.init(document.getElementById("myPie"));
      let option = {
        series: [
          {
            type: "pie",
            color: ["#4FC1E9", "#AC92EC", "#A0D468", "#FC6E51"],
            label: {
              normal: {
                position: "inner",
                textStyle: {
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 14
                }
              }
            },
            data: this.pieData
          }
        ]
      };
      if (option && typeof option === "object") {
        myPie.setOption(option, true);
      }
      this.pieShow = true;
    }
  }
};
</script>

<style lang="stylus">
// 公共函数
taskWrapper(top, right, bottom, left) {
  background-color: #fff;
  padding: top right bottom left;
}

.logStatis {
  &-name { // 任务名称
    taskWrapper: 30px 20px 30px 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #323232;

    .select {
      margin-left: 10px;
      width: 160px;
    }

    .rowCenter {
      margin: 20px 0 0;
    }

    .title {
      display: inline-block;
      width: 90px;
      text-align: right;
    }

    .inputText {
      width: calc(100% - 90px - 20px);
    }

    .btn {
      margin-top: 24px;
      text-align: right;

      button {
        min-width: 60px;
        height: 35px;
        font-size: 14px;
      }
    }
  }

  &-minute { // 任务详细
    taskWrapper: 20px 20px 20px 20px;

    .ivu-page {
      margin-top: 20px;
      margin-right: 20px;
      text-align: right;
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

  .pieDiv {
    width: 800px;
    margin-left: 20px;
    overflow: hidden;

    div {
      float: left;
      height: 400px;

      &#myPie {
        width: 500px;
      }

      &#dateList {
        display: flex;
        align-items: center;
        width: 300px;

        ul {
          width: 100%;

          li {
            border-bottom: 1px solid #453937;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            color: #453937;

            i {
              width: 8px;
              height: 8px;
              display: inline-block;
              margin-right: 20px;
              border-radius: 50%;
            }

            &:nth-child(1) {
              i {
                background: #4FC1E9;
              }
            }

            &:nth-child(2) {
              i {
                background: #AC92EC;
              }
            }

            &:nth-child(3) {
              i {
                background: #A0D468;
              }
            }

            &:nth-child(4) {
              i {
                background: #FC6E51;
              }
            }

            span.name {
              float: right;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>