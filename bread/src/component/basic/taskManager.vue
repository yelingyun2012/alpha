<template lang="pug">
  section
    aside.public-name
      span.explain 任务名称：
      Input(v-model='taskName', placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="primary", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.public-minute
      header.public-site
        template(v-for="(item,index) of siteList")
          span(:class="{'task-site-active':activeIndex===index}", :key="item.number", @click="handleCut(index,item.siteId)") {{item.siteName}}
            i(style='font-style: inherit;', v-if='item.siteName!=="全部"') ({{item.number}})
      section.public-mission
        Table(:columns="taskColumns", :data="taskData", border)
        section.public-page
          Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage",ref="goto")
          Button(type="primary", @click="pageGoto") GO
</template>
<script>
import {
  siteNum,
  taskList,
  queryCollectionHistory
} from "../../config/getData";
import { getCookie } from "../../utils/cookie";

export default {
  name: "TaskManager",
  data() {
    return {
      activeIndex: 0, // 站点初始化数据
      siteList: [{ siteName: "全部", siteId: "" }],
      siteId: "", // 查询条件
      taskName: "",
      pageTotal: 0, // 分页插件初始化数据
      pageSize: 10,
      pageIndex: 1,
      taskData: [], // 表格初始化数据
      taskColumns: [
        { title: "ID", width: 70, align: "center", key: "taskId" },
        {
          title: "任务名称",
          render: (h, params) => {
            return h(
              "router-link",
              {
                attrs: {
                  to: {
                    path: "/taskManagerChild/alter",
                    query: {
                      checkType: `${params.row.checkType}`,
                      taskId: `${params.row.taskId}`,
                      updatePersonId: `${params.row.updatePersonId}`,
                      status: `${params.row.status}`
                    }
                  }
                }
              },
              params.row.taskName
            );
          }
        },
        {
          title: "有效时间",
          width: 110,
          render: (h, params) => {
            if (params.row.startTime !== undefined)
              return `${params.row.startTimes.split(
                " "
              )[0]} - ${params.row.endTimes.split(" ")[0]}`;
          }
        },
        { title: "创建时间", width: 100, align: "center", key: "createTimes" },
        {
          title: "上次运行时间",
          width: 110,
          align: "center",
          render: (h, params) => {
            if (params.row.lastCrawlTimes !== null) {
              return h("div", [
                h("p", `${params.row.lastCrawlTimes.split(" ")[0]}`),
                h("p", `${params.row.lastCrawlTimes.split(" ")[1]}`)
              ]);
            }
          }
        },
        { title: "创建人", width: 120, align: "center", key: "createName" },
        {
          title: "优先级",
          width: 100,
          align: "center",
          render: (h, params) => {
            switch (params.row.priority) {
              case 1:
                return `高`;
                break;
              case 2:
                return `中`;
                break;
              case 3:
                return `低`;
                break;
            }
          }
        },
        {
          title: "签出状态",
          align: "center",
          width: 150,
          render: (h, params) => {
            switch (params.row.checkType) {
              case 0:
                return h("span", { class: { signInTab: true } }, "已签入");
                break;
              case 1:
                return h(
                  "span",
                  { class: { signOutTab: true } },
                  `已签出（${params.row.updatePersonName}）`
                );
                break;
            }
          }
        },
        { title: "签出时间", width: 100, align: "center", key: "updateTimes" },
        {
          title: "当前状态",
          width: 100,
          align: "center",
          render: (h, params) => {
            switch (params.row.status) {
              case 0:
                return h("p", [
                  h("Icon", {
                    style: {
                      marginRight: "5px",
                      color: "#9B9B9B",
                      opacity: "0.9",
                      marginLeft: "-10px"
                    },
                    attrs: {
                      type: "record"
                    }
                  }),
                  h("span", "停止")
                ]);
                break;
              case 1:
                return h("p", [
                  h("Icon", {
                    style: {
                      marginRight: "5px",
                      color: "#3DBD7D",
                      opacity: "0.9"
                    },
                    attrs: {
                      type: "record"
                    }
                  }),
                  h("span", "运行中")
                ]);
                break;
              case 2:
                return h("p", [
                  h("Icon", {
                    style: {
                      marginRight: "5px",
                      color: "#FFBF00",
                      opacity: "0.9",
                      marginLeft: "-10px"
                    },
                    attrs: {
                      type: "record"
                    }
                  }),
                  h("span", "暂停")
                ]);
                break;
              case 4:
                return h("p", [
                  h("Icon", {
                    style: {
                      marginRight: "5px",
                      color: "#108EE9",
                      opacity: "0.9"
                    },
                    attrs: {
                      type: "record"
                    }
                  }),
                  h("span", "已完成")
                ]);
                break;
            }
          }
        },
        {
          title: "进度",
          width: 180,
          render: (h, params) => {
            return params.row.speedOfProgress > 0
              ? `${params.row.speedOfProgress}%`
              : params.row.speedOfProgress;
          }
        },
        {
          title: "抽取率",
          width: 80,
          align: "center",
          render: (h, params) => {
            return params.row.extractionRate > 0
              ? `${params.row.extractionRate}%`
              : params.row.extractionRate;
          }
        },
        {
          title: "操作",
          key: "operate",
          render: (h, params) => {
            // 停止操作
            let secure = h(
              "span",
              {
                style: {
                  fontSize: "16px",
                  padding: "5px 18px",
                  background: "#F2F2F2",
                  color: "#FFBF00",
                  display: "inline-block",
                  borderRadius: "4px",
                  margin: "0 5px"
                },
                on: {
                  click: event => {
                    (async () => {
                      try {
                        await queryCollectionHistory({
                          taskId: params.row.taskId,
                          statusId: 0,
                          token: getCookie("token")
                        });
                        params.row.status = 0;
                      } catch (error) {
                        this.$Message.warning(
                          error.match(/([^\[\]]+)(?=\])/g)[0]
                        );
                      }
                    })();
                  }
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "ios-skipforward"
                  }
                })
              ]
            );
            // 启动操作
            let startUpFunction = h(
              "span",
              {
                style: {
                  fontSize: "16px",
                  padding: "5px 18px",
                  background: "#F2F2F2",
                  color: "#329A23",
                  display: "inline-block",
                  borderRadius: "4px",
                  margin: "0 5px"
                },
                on: {
                  click: event => {
                    (async () => {
                      try {
                        await queryCollectionHistory({
                          taskId: params.row.taskId,
                          statusId: 1,
                          token: getCookie("token")
                        });
                        params.row.status = 1;
                      } catch (error) {
                        this.$Message.warning(
                          error.match(/([^\[\]]+)(?=\])/g)[0]
                        );
                      }
                    })();
                  }
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "ios-play"
                  }
                })
              ]
            );
            // 暂停操作
            let suspendOperations = h(
              "span",
              {
                style: {
                  fontSize: "16px",
                  padding: "5px 18px",
                  background: "#F2F2F2",
                  color: "#108EE9",
                  display: "inline-block",
                  borderRadius: "4px",
                  margin: "0 5px"
                },
                on: {
                  click: event => {
                    (async () => {
                      try {
                        await queryCollectionHistory({
                          taskId: params.row.taskId,
                          statusId: 2,
                          token: getCookie("token")
                        });
                        params.row.status = 2;
                      } catch (error) {
                        this.$Message.warning(
                          error.match(/([^\[\]]+)(?=\])/g)[0]
                        );
                      }
                    })();
                  }
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "ios-pause"
                  }
                })
              ]
            );
            // 删除操作
            let deleteOperation = h(
              "span",
              {
                style: {
                  fontSize: "16px",
                  padding: "5px 18px",
                  background: "#F2F2F2",
                  color: "#F04134",
                  display: "inline-block",
                  borderRadius: "4px",
                  margin: "0 5px"
                },
                on: {
                  click: event => {
                    (async () => {
                      try {
                        await queryCollectionHistory({
                          taskId: params.row.taskId,
                          statusId: 3,
                          token: getCookie("token")
                        });
                        //                        params.row.status = 3
                        this.taskData.splice(params.index, 1);
                      } catch (error) {
                        this.$Message.warning(
                          error.match(/([^\[\]]+)(?=\])/g)[0]
                        );
                      }
                    })();
                  }
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "trash-a"
                  }
                })
              ]
            );
            switch (params.row.status) {
              case 0:
                return h("div", [startUpFunction, deleteOperation]);
                break;
              case 1:
                return h("div", [secure, suspendOperations, deleteOperation]);
                break;
              case 2:
                return h("div", [secure, startUpFunction, deleteOperation]);
                break;
              case 4:
                return h("div", [startUpFunction, deleteOperation]);
                break;
            }
          }
        }
      ]
    };
  },
  mounted() {
    this.initSite();
    this.initTaskList();
  },
  methods: {
    handleSearch() {
      this.pageIndex = 1;
      this.initTaskList();
    },
    handleAdd() {
      this.$router.push("/taskManagerChild/add");
    },
    handleCut(subscript, siteId) {
      this.activeIndex = subscript;
      this.siteId = siteId;
      this.pageIndex = 1;
      this.initTaskList();
    },
    handlePage(pageIndex) {
      this.pageIndex = pageIndex;
      this.initTaskList();
    },
    //分页跳转
    pageGoto(){
      let val = parseInt(document.querySelector('.ivu-page-options-elevator input[type="text"]').value);
      const page = this.$refs.goto.allPages;
      if(val > page){
        this.pageIndex = page;
        document.querySelector('.ivu-page-options-elevator input[type="text"]').value = page;
      }else if(val <= 0){
        this.pageIndex = 1;
        document.querySelector('.ivu-page-options-elevator input[type="text"]').value = 1;
      }else{
        this.pageIndex = val;
      }
      this.initTaskList();
    },
    // 统计站点
    async initSite() {
      try {
        let res = await siteNum({ token: getCookie("token"), typeId: 0 });
        this.siteList = [...this.siteList, ...res.data.data];
      } catch (error) {
        this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0]);
      }
    },
    // 模型列表
    async initTaskList() {
      try {
        let res = await taskList({
          taskName: this.taskName,
          siteId: this.siteId,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          token: getCookie("token")
        });
        this.pageTotal = res.data.data.recordCount;
        this.taskData = res.data.data.result;
      } catch (error) {
        this.taskData = [];
        this.$Message.error(error.match(/([^\[\]]+)(?=\])/g)[0]);
      }
    }
  }
};
</script>