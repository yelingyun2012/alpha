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
        section.public-page
          Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage",ref="goto")
          Button(type="primary", @click="pageGoto") GO
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
    //分页跳转
    pageGoto() {
      let val = parseInt(
        document.querySelector('.ivu-page-options-elevator input[type="text"]')
          .value
      );
      const page = this.$refs.goto.allPages;
      if (val > page) {
        this.pageIndex = page;
        document.querySelector(
          '.ivu-page-options-elevator input[type="text"]'
        ).value = page;
      } else if (val <= 0) {
        this.pageIndex = 1;
        document.querySelector(
          '.ivu-page-options-elevator input[type="text"]'
        ).value = 1;
      } else {
        this.pageIndex = val;
      }
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
        this.pageTotal = this.pageTotal - 1;
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
taskWrapper(top,right,bottom,left)
  padding top right bottom left
  background-color #fff
.public
  &-name
    margin-bottom 20px
    taskWrapper 30px 20px 30px 20px
    .ivu-input
      height 35px
    .explain
      color #323232
      font-size 14px
    .typeIn
      margin-right 30px
      margin-left 4px
    .ivu-btn
      padding 6px 23px
      &:last-child
        margin-left 10px
        border-color #108EE9
        color #108EE9
        opacity .9
        &:hover
          border-color #57a3f3
          color #57a3f3
  &-minute // 任务详细
    taskWrapper 20px 20px 20px 20px
  &-site
    margin-bottom 20px
    padding-bottom 10px
    border-bottom 1px dashed #B7B7B7
    span
      display inline-block
      padding 6px 15px
      color #589BEE
      font-size 14px
      cursor pointer
      &.task-site-active
        border-radius 4px
        background-color #2D8CF0
        color #fff
      i
        font-style inherit
  &-mission, .ivu-page
    margin-top 20px
    margin-right 20px
    text-align right
.signInTab
  display inline-block
  padding 4px 10px
  border 1px solid #A7E1C4
  border-radius 2px
  background #EBF8F2
  color #646464
  opacity .7
.signOutTab
  display inline-block
  padding 4px 10px
  border 1px solid #FABEB9
  border-radius 2px
  background #FFF5F4
  color #646464
  opacity .7
.vertical-center-modal
  display flex
  justify-content center
  align-items center
  .ivu-modal
    top 0
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
