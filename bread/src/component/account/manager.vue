<template lang="pug">
  section
    aside.public-name
      span.explain 用户名称：
      Input(placeholder="请输入用户名称", v-model="userName" ,style="width: 20%;max-width:300px").typeIn
      Button(type='primary', @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.public-minute
      section.public-mission
        Table(:columns="accountColumns", :data="accountData",border)
        Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
</template>
<script>
import { userList, userDelete, userUpdateEnableds } from "../../config/getData";
import { getCookie } from "../../utils/cookie";

export default {
  name: "AccountManager",
  data() {
    return {
      accountColumns: [
        { title: "用户ID", key: "userId" },
        {
          title: "用户名",
          key: "userName",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "rgb(45, 140, 240)"
                },
                on: {
                  click: event => {
                    this.$router.push({
                      path: "/alterUser/alter",
                      query: {
                        userId: params.row.userId,
                        userRole: params.row.userRole,
                        userName: params.row.userName,
                        email: params.row.email,
                        cellPhone: params.row.cellPhone
                      }
                    });
                  }
                }
              },
              params.row.userName
            );
          }
        },
        {
          title: "用户类型",
          render: (h, params) => {
            switch (params.row.userRole) {
              case 1:
                return `超级管理员`;
                break;
              case 2:
                return `普通用户`;
                break;
            }
          }
        },
        {
          title: "在线状态",
          render: (h, params) => {
            switch (params.row.onLineStatus) {
              case 0:
                return `未登录`;
                break;
              case 1:
                return `已登录`;
                break;
            }
          }
        },
        { title: "联系方式", key: "cellPhone" },
        { title: "创建时间", key: "creatTimes" },
        {
          title: "启用状态",
          align: "center",
          render: (h, params) => {
            switch (params.row.enabled) { // 被禁用
              case 0:
                return h(
                  "span",
                  {
                    on: {
                      click: event => {
                        (async () => {
                          try {
                            await userUpdateEnableds({
                              enabled: 1,
                              userId: params.row.userId,
                              token: getCookie("token")
                            });
                            this.$Message.success("状态修改成功");
                            params.row.enabled = 1;
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
                      class: {
                        managerClose: true
                      },
                      attrs: {
                        type: this.operateStatus ? "ios-play" : "ios-pause"
                      }
                    })
                  ]
                );
                break;
              case 1:
                return h(
                  "span",
                  {
                    on: {
                      click: event => {
                        (async () => {
                          try {
                            await userUpdateEnableds({
                              enabled: 0,
                              userId: params.row.userId,
                              token: getCookie("token")
                            });
                            this.$Message.success("状态修改成功");
                            params.row.enabled = 0;
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
                      class: {
                        managerOpen: true
                      },
                      attrs: {
                        type: !this.operateStatus ? "ios-play" : "ios-pause"
                      }
                    })
                  ]
                );
                break;
            }
          }
        },
        { title: "邮箱", key: "email" },
        { title: "上次登录时间", key: "lastTimes" },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                on: {
                  click: event => {
                    this.confirm(params.row.userId, params.index);
                  }
                }
              },
              [
                h("Icon", {
                  class: {
                    manageDelete: true
                  },
                  attrs: {
                    type: "trash-a"
                  }
                })
              ]
            );
          }
        }
      ],
      accountData: [],
      pageSize: 10,
      pageIndex: 1,
      pageTotal: 0,
      userName: "",
      operateStatus: true
    };
  },
  methods: {
    confirm(userId, index) {
      this.$Modal.confirm({
        content: "<p>是否确定删除该用户</p>",
        onOk: () => {
          this.initUserDelete(userId, index);
        }
      });
    },

    handleSearch() {
      this.pageIndex = 1;
      this.initUserList();
    },
    handlePage(pageIndex) {
      this.pageIndex = pageIndex;
      this.initUserList();
    },
    handleAdd() {
      this.$router.push("/alterUser/add");
    },
    async initUserList() {
      try {
        let res = await userList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          userName: this.userName,
          token: getCookie("token")
        });
        this.pageTotal = res.data.data.recordCount;
        this.accountData = res.data.data.result;
      } catch (error) {
        this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0]);
        this.accountData = [];
      }
    },
    async initUserDelete(userId, index) {
      try {
        await userDelete({
          userId: userId,
          token: getCookie("token")
        });
        this.accountData.splice(index, 1);
        this.$Message.success("删除成功");
      } catch (error) {
        this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0]);
      }
    }
  },
  mounted() {
    this.initUserList();
  }
};
</script>

<style lang="stylus">
.manageDelete
  padding 7px 20px
  border-radius 4px
  background #F2F2F2
  color #F04134
  font-size 20px
  cursor pointer
.managerOpen
  padding 5px 13px
  border-radius 4px
  background #F2F2F2
  color #EE2337
  font-size 16px
.managerClose
  padding 5px 13px
  border-radius 4px
  background #F2F2F2
  color #108EE9
  font-size 16px
</style>
