<template lang="pug">
  section
    aside.log-name
      Row
        Col(span="24")
          span.title 时间：
          DatePicker(:value="search.startTime", type="datetime", placeholder="请选择时间" @on-change="startTimeFn")
          span  - 
          DatePicker(:value="search.endTime", type="datetime", placeholder="请选择时间" @on-change="endTimeFn")
          Select(v-model="search.crawlingLogState").select
            Option(v-for="item in crawlingLogStateList", :value="item.value", :key="item.value") {{item.label}}
      Row.rowCenter
        Col(span="6")
          span.title 采集url：
          Input(v-model='search.crawlingUrl', placeholder='请输入采集url').inputText
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
      Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
</template>

<script>
import { taskLogList } from "../../config/getData";
import { getCookie } from "../../utils/cookie";

export default {
  name: "RunLog",
  data() {
    return {
      //查询
      search: {
        startTime: "", //开始时间
        endTime: "", //结束时间
        crawlingLogState: "0", //异常
        crawlingUrl: "", //采集url
        taskName: "", //任务名称
        siteName: "", //站点名称
        creatorName: "", //任务创建者
        pageIndex: 1, //页码
        pageSize: 10, //每页最大条数
        token: getCookie("token")
      },
      //异常列表
      crawlingLogStateList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "网络请求异常"
        },
        {
          value: "2",
          label: "抽取异常"
        }
      ],
      //日志配置
      logColumns: [
        {
          title: "任务ID",
          key: "taskId"
        },
        {
          title: "任务名称",
          key: "taskName"
        },
        {
          title: "站点",
          key: "siteName"
        },
        {
          title: "任务创建者",
          key: "creatorName",
          align: "center"
        },
        {
          title: "采集器IP",
          key: "host"
        },
        {
          title: "采集状态",
          key: "state",
          align: "center"
        },
        {
          title: "发生时间",
          key: "date"
        },
        {
          title: "当前URL",
          key: "crawlingUrl"
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
      pageIndex: 1
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    //查询
    handleSearch() {
      this.pageIndex = 1;
      this.search.pageIndex = 1;
      let con = this.search;
      if (con.startTime > con.endTime) {
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
    startTimeFn(val) {
      this.search.startTime = val;
    },
    //结束时间
    endTimeFn(val) {
      this.search.endTime = val;
    },
    //分页
    handlePage(pageIndex) {
      this.pageIndex = pageIndex;
      this.search.pageIndex = pageIndex;
      this.getDate();
    },
    //获取数据
    getDate() {
      // taskLogList(this.search).then(res=>{
      //   console.log(res)
      // })
    },
    //详情
    goDetail(val) {
      console.log(val);
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

.log {
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
      margin: 20px 0 24px;
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
      text-align: right;

      button {
        width: 60px;
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
</style>