<template lang="pug">
  section
    aside.logStatis-name
      Row
        Col(span="24")
          span.title 时间：
          DatePicker(:value="search.startTime", type="datetime", placeholder="请选择时间" @on-change="startTimeFn")
          span  - 
          DatePicker(:value="search.endTime", type="datetime", placeholder="请选择时间" @on-change="endTimeFn")
          Select(v-model="search.periodType").select
            Option(v-for="item in periodTypeList", :value="item.value", :key="item.value") {{item.label}}
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
      Page(:total="pageTotal", :current="pageNo", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
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
import { taskLogStatistic } from "../../config/getData";
import { getCookie } from "../../utils/cookie";

export default {
  name: "logStatis",
  data() {
    return {
      //搜索高级&简易切换
      searchToggleState: false,
      //统计
      periodTypeList: [
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
        startTime: new Date(new Date() - (60 * 60 * 24 * 1000)), //开始时间
        endTime: new Date(), //结束时间
        periodType: 0, //统计
        taskName: "", //任务名称
        siteName: "", //站点名称
        creatorName: "", //任务创建者
        pageNo: 1, //页码
        pageSize: 10, //每页最大条数
        token: getCookie("token")
      },
      //提交查询
      postData: {},
      //日志配置
      logColumns: [
        {
          title: "运行时间段",
          render: (h, params) => {
            if (params.row.startTime !== undefined)
              return `${params.row.startTime} - ${params.row.endTime}`;
          }
        },
        {
          title: "采集成功URL数量",
          key: "successCount",
          align: "center"
        },
        {
          title: "采集失败URL数量",
          key: "failedCount",
          align: "center"
        },
        {
          title: "下载失败URL数量",
          key: "downLoadFailedCount",
          align: "center"
        },
        {
          title: "抽取失败URL数量",
          key: "extractionFailedCount",
          align: "center"
        },
        {
          title: "新增抓取URL数量",
          key: "addedCount",
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
      logData: [],
      //页码
      pageTotal: 0,
      pageSize: 10,
      pageNo: 1,

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
  mounted() {
    this.$nextTick(() => {
      this.postData = JSON.parse(JSON.stringify(this.search));
      this.postData.startTime = new Date(this.postData.startTime).getTime();
      this.postData.endTime = new Date(this.postData.endTime).getTime();
      this.getData(this.postData);
    });
  },
  methods: {
    //查询
    handleSearch() {
      this.pageNo = 1;
      this.search.pageNo = 1;
      this.chuliData();
    },
    //时间判断
    timeJudge(newTime, endTime, txt) {
      if (newTime <= endTime) {
        this.getData(this.postData);
      } else {
        this.$Message.error({
          content: txt,
          duration: 3,
          closable: true
        });
      }
    },
    //开始时间
    startTimeFn(val) {
      this.search.startTime = val;
    },
    //结束时间
    endTimeFn(val) {
      this.search.endTime = val;
    },
    //分页
    handlePage(pageNo) {
      this.pageNo = pageNo;
      this.search.pageNo = pageNo;
      this.chuliData();
    },
    //处理数据
    chuliData(){
      let con = (this.postData = JSON.parse(JSON.stringify(this.search)));
      let startTime = (con.startTime = new Date(con.startTime).getTime());
      let endTime = (con.endTime = new Date(con.endTime).getTime());
      let periodType = con.periodType;
      if (startTime > endTime) {
        this.$Message.error("结束时间必须大于开始时间！");
      } else {
        if (periodType === 0) {
          //默认
          let txt = "结束时间必须大于开始时间！";
          this.timeJudge(startTime, endTime, txt);
        } else if (periodType === 1) {
          //按小时统计
          let newTime = startTime + 60 * 60 * 1000;
          let txt = "结束时间必须大于开始时间一小时！";
          this.timeJudge(newTime, endTime, txt);
        } else if (periodType === 2) {
          //按天统计
          let newTime = startTime + 60 * 60 * 1000 * 24;
          let txt = "结束时间必须大于开始时间一天！";
          this.timeJudge(newTime, endTime, txt);
        } else if (periodType === 3) {
          //按月统计
          let newTime = startTime + 60 * 60 * 1000 * 24 * 30;
          let txt = "结束时间必须大于开始时间一个月！";
          this.timeJudge(newTime, endTime, txt);
        }
      }
    },
    //获取数据
    getData(data) {
      taskLogStatistic(data)
        .then(res => {
          if (res.data.respCode === "0") {
            let data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              data[i].startTime = this.formatDateTime(data[i].startTime);
              data[i].endTime = this.formatDateTime(data[i].endTime);
            }
            this.logData = data;
            this.pageTotal = res.data.totalPage;
          }
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    //时间转换
    formatDateTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    //搜索高级&简易切换
    searchToggle() {
      this.searchToggleState = !this.searchToggleState;
      if (!this.searchToggleState) {
        this.logColumns.splice(2, 1);
        this.logColumns.splice(2, 1);
        this.logColumns.splice(1, 1);
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
        let creatorName = {
          title: "任务创建者",
          key: "creatorName",
          align: "center"
        };
        this.logColumns.splice(1, 0, creatorName);
        this.logColumns.splice(2, 0, taskName);
        this.logColumns.splice(3, 0, siteName);
      }
    },
    //详情
    goDetail(val) {
      let success = val.successCount, //采集成功
        downErr = val.downLoadFailedCount, //下载失败
        extractErr = val.extractionFailedCount, //抽取失败
        errSum = val.failedCount, //错误总数
        other = errSum - val.downLoadFailedCount - val.extractionFailedCount; //其他
      let sum = success + errSum; //总和
      let arr = [success, downErr, extractErr, other];
      let color = ["#4FC1E9", "#AC92EC", "#A0D468", "#FC6E51"];
      let sumPie = 100;
      let pieData = this.pieData;
      for (let i = 0; i < pieData.length; i++) {
        pieData[i].color = color[i];
        if (sum === 0) {
          pieData[i].name = "0.00%";
        } else {
          pieData[i].value = arr[i];
          let val = (arr[i] / sum * 100).toFixed(2);
          pieData[i].name = val + "%";
          if (i !== 0) {
            sumPie -= val;
          }
        }
      }
      if(sum !== 0){
        this.pieData[0].name = sumPie.toFixed(2) + "%";
      }
      let myPie = echarts.init(document.getElementById("myPie"));
      let option = {
        series: [
          {
            type: "pie",
            color: this.pieData.filter(function(x){
              x.name !== "0.00%" ? x.color : ""
            }),
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
            data: this.pieData.filter(function(x){
              return (x.name !== "0.00%");
            })
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
taskWrapper(top,right,bottom,left)
  padding top right bottom left
  background-color #fff
.logStatis
  &-name // 任务名称
    margin-bottom 20px
    color #323232
    font-size 14px
    taskWrapper 30px 20px 30px 20px
    .select
      margin-left 10px
      width 160px
    .rowCenter
      margin 20px 0 0
    .title
      display inline-block
      width 90px
      text-align right
    .inputText
      width calc(100% - 90px - 20px)
    .btn
      margin-top 24px
      text-align right
      button
        min-width 60px
        height 35px
        font-size 14px
  &-minute // 任务详细
    taskWrapper 20px 20px 20px 20px
    .ivu-page
      margin-top 20px
      margin-right 20px
      text-align right
.vertical-center-modal
  display flex
  justify-content center
  align-items center
  .ivu-modal
    top 0
  .ivu-modal-footer
    display none
  .pieDiv
    overflow hidden
    margin-left 20px
    width 800px
    div
      float left
      height 400px
      &#myPie
        width 500px
      &#dateList
        display flex
        align-items center
        width 300px
        ul
          width 100%
          li
            height 50px
            border-bottom 1px solid #453937
            color #453937
            font-size 16px
            line-height 50px
            i
              display inline-block
              margin-right 20px
              width 8px
              height 8px
              border-radius 50%
            &:nth-child(1)
              i
                background #4FC1E9
            &:nth-child(2)
              i
                background #AC92EC
            &:nth-child(3)
              i
                background #A0D468
            &:nth-child(4)
              i
                background #FC6E51
            span.name
              float right
              margin-right 20px
</style>