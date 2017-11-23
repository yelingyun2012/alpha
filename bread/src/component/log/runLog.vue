<template lang="pug">
  section
    aside.log-name
      Row
        Col(span="24")
          span.title 时间：
          DatePicker(:value="search.startTime", type="datetime", placeholder="请选择时间" @on-change="startTimeFn")
          span  - 
          DatePicker(:value="search.endTime", type="datetime", placeholder="请选择时间" @on-change="endTimeFn")
          Select(v-model="search.logType").select
            Option(v-for="item in logTypeList", :value="item.value", :key="item.value") {{item.label}}
      Row.rowCenter
        Col(span="6")
          span.title 采集url：
          Input(v-model='search.taskUrl', placeholder='请输入采集url').inputText
        Col(span="6")
          span.title 任务名称：
          Input(v-model='search.taskName', placeholder='请输入任务名称').inputText
        Col(span="6")
          span.title 站点名称：
          Input(v-model='search.siteName', placeholder='请输入站点名称').inputText
        Col(span="6")
          span.title 任务创建者：
          Input(v-model='search.creatorName', placeholder='请输入任务创建者').inputText
      Row
        Col(span="24").btn
          Button(type="primary", @click="handleSearch") 查询
    aside.log-minute
      Table(:columns="logColumns", :data="logData", border)
      Page(:total="pageTotal", :current="pageNo", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
      Modal(v-model="modelShow", title="详情", width="1000",class-name="vertical-center-modal")
        pre(v-html="modelData", style="margin:0;")
</template>

<script>
import { taskLogList } from "../../config/getData";
import { statusCode } from "../../utils/logStatusCode";
import { getCookie } from "../../utils/cookie";

export default {
  name: "RunLog",
  data() {
    return {
      modelShow: false, //详情显示层
      modelData: {}, //详情数据
      //查询
      search: {
        startTime: new Date(new Date() - 60 * 60 * 2 * 1000), //开始时间
        endTime: new Date(), //结束时间
        logType: "0", //异常
        taskUrl: "", //采集url
        taskName: "", //任务名称
        siteName: "", //站点名称
        creatorName: "", //任务创建者
        pageNo: 1, //页码
        pageSize: 10, //每页最大条数
        token: getCookie("token")
      },
      //异常列表
      logTypeList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "采集失败"
        },
        {
          value: "2",
          label: "模型匹配失败"
        },
        {
          value: "3",
          label: "下载失败"
        },
        {
          value: "4",
          label: "抽取失败"
        },
        {
          value: "5",
          label: "持久化失败"
        }
      ],
      //日志配置
      logColumns: [
        {
          title: "任务ID",
          align: "center",
          key: "taskId"
        },
        {
          title: "任务名称",
          key: "taskName"
        },
        {
          title: "站点",
          align: "center",
          key: "siteName"
        },
        {
          title: "任务创建者",
          key: "creatorName",
          align: "center"
        },
        {
          title: "采集器IP",
          key: "sourceIp",
          align: "center"
        },
        {
          title: "采集状态",
          align: "center",
          render: (h, params) => {
            return statusCode[params.row.crawlStatus];
          }
        },
        {
          title: "发生时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "当前URL",
          key: "crawlUrl"
        },
        {
          title: "操作",
          key: "action",
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
      postData: {},
      //页码
      pageTotal: 0,
      pageSize: 10,
      pageNo: 1
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
    chuliData() {
      let con = (this.postData = JSON.parse(JSON.stringify(this.search)));
      let startTime = (con.startTime = new Date(con.startTime).getTime());
      let endTime = (con.endTime = new Date(con.endTime).getTime());
      if (startTime > endTime) {
        this.$Message.error("结束时间必须大于开始时间！");
      } else {
        this.getData(this.postData);
      }
    },
    //获取数据
    getData(data) {
      taskLogList(data).then(res => {
        if (res.data.respCode === "0") {
          var resData = res.data.data;
          if (resData.length !== 0) {
            for (var i = 0; i < resData.length; i++) {
              resData[i].createTime = this.formatDateTime(
                Number(resData[i].createTime)
              );
            }
          }
          this.logData = resData;
          this.pageTotal = res.data.totalNumber;
        }
      }).catch(err => {
        this.$Message.error(err.match(/([^\[\]]+)(?=\])/g)[0]);
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
    //详情
    goDetail(data) {
      let json = JSON.parse(JSON.stringify(data));
      delete json.startTime;
      delete json.endTime;
      delete json._index;
      delete json._rowKey;
      if (typeof json != "string") {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">");
      this.modelData = json;
      this.modelShow = true;
    }
  }
};
</script>

<style lang="stylus">
// 公共函数
taskWrapper(top,right,bottom,left)
  padding top right bottom left
  background-color #fff
.log
  &-name // 任务名称
    margin-bottom 20px
    color #323232
    font-size 14px
    taskWrapper 30px 20px 30px 20px
    .select
      margin-left 10px
      width 160px
    .rowCenter
      margin 20px 0 24px
    .title
      display inline-block
      width 90px
      text-align right
    .inputText
      width calc(100% - 90px - 20px)
    .btn
      text-align right
      button
        width 60px
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
</style>