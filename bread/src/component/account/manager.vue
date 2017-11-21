<template lang="pug">
  section
    aside.account-name
      span.explain 用户名称:
      Input(placeholder="请输入用户名称", v-model="userName" ,style="width: 20%;max-width:300px").typeIn
      Button(type='primary', @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.account-minute
      Table(:columns="accountColumns", :data="accountData")
      Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
</template>
<script>
  import { userList, userDelete, userUpdateEnableds } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'AccountManager',
    data () {
      return {
        accountColumns: [
          {title: '用户ID', key: 'userId'},
          {
            title: '用户名',
            key: 'userName',
            render: (h, params) => {
              return h(
                'span',
                {
                  style: {
                    color: 'rgb(45, 140, 240)'
                  },
                  on: {
                    click: event => {
                      this.$router.push({
                        path: '/alterUser/alter',
                        query: {
                          userId: params.row.userId,
                          userRole: params.row.userRole,
                          userName: params.row.userName,
                          email: params.row.email,
                          cellPhone: params.row.cellPhone
                        }
                      })
                    }
                  }
                },
                params.row.userName
              )
            }
          },
          {
            title: '用户类型',
            render: (h, params) => {
              switch (params.row.userRole) {
                case 1:
                  return `超级管理员`
                  break
                case 2:
                  return `普通用户`
                  break
              }
            }
          },
          {
            title: '在线状态',
            render: (h, params) => {
              switch (params.row.onLineStatus) {
                case 0:
                  return `未登录`
                  break
                case 1:
                  return `已登录`
                  break
              }
            }
          },
          {title: '联系方式', key: 'cellPhone'},
          {title: '创建时间', key: 'creatTimes'},
          {
            title: '启用状态',
            align:'center',
            render: (h, params) => {
              switch (params.row.enabled) { // 被禁用
                case 0:
                  return h('span', {
                    on: {
                      click: event => {
                        this.alterUserUpdateEnableds(1, params.row.userId)
                        params.row.enabled = 1
                      }
                    }
                  }, [
                    h('Icon', {
                      style:{
                        fontSize: '16px',
                        padding: '5px 13px',
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        color:'#108EE9'
                      },
                      attrs: {
                        type: this.operateStatus ? 'ios-play' : 'ios-pause'
                      }
                    })
                  ])
                  break
                case 1:
                  return h(
                    'span',
                    {
                      on: {
                        click: event => {
                          this.alterUserUpdateEnableds(0, params.row.userId)
                          params.row.enabled = 0
                        }
                      },
                    }, [
                      h('Icon', {
                        style:{
                          fontSize: '16px',
                          padding: '5px 13px',
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          color:'#EE2337'
                        },
                        attrs: {
                          type: !this.operateStatus ? 'ios-play' : 'ios-pause'
                        }
                      })
                    ])
                  break
              }
            }
          },
          {title: '邮箱', key: 'email'},
          {title: '上次登录时间', key: 'lastTimes'},
          {
            title: '操作',
            render: (h, params) => {
              return h('span', {
                on: {
                  click: event => {
                    this.confirm(params.row.userId, params.index)
                  }
                }
              }, [h('Icon', {
                style: {
                  color: '#F04134',
                  cursor: 'pointer',
                  fontSize: '20px',
                  padding: '7px 20px',
                  background: '#F2F2F2',
                  borderRadius: '4px'
                },
                attrs: {
                  type: 'trash-a'
                }
              })])
            }
          }
        ],
        accountData: [],
        pageSize: 10,
        pageIndex: 1,
        pageTotal: 0,
        userName: '',
        operateStatus: true
      }
    },
    methods: {
      confirm (userId, index) {
        this.$Modal.confirm({
          content: '<p>是否确定删除该用户</p>',
          onOk: () => {
            userDelete({
              userId: userId,
              token: getCookie('token')
            }).then(response => {
              switch (response.data.respCode) {
                case '0':
                  this.accountData.splice(index,1)
                  this.$Message.success('删除成功')
                  break
                case '204':
                  this.$Message.success('参数异常')
                  break
              }
            })
          }
//          onCancel: () => {
//            this.$Message.info('Clicked cancel')
//          }
        })
      },
      initUserList () {
        userList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          userName: this.userName,
          token: getCookie('token')
        }).then(response => {
          if(response.data.respCode==='205'){
            this.$router.push('/401')
            return false
          }
          if (response.data.data !== null || response.data.data.length !== 0) {
            this.pageTotal = response.data.data.recordCount
            this.accountData = response.data.data.result
          } else {
            this.accountData = []
          }
        })
      },
      deleteUser (userId, index) {

      },
      alterUserUpdateEnableds (enabled, userId) {
        userUpdateEnableds({
          enabled: enabled,
          userId: userId,
          token: getCookie('token')
        }).then(response => {
          if (response.data.respCode === '0') {
            this.$Message.success('状态修改成功')
          }
        })
      },
      handleSearch () {
        this.pageIndex = 1
        this.initUserList()
      },
      handlePage (pageIndex) {
        this.pageIndex = pageIndex
        this.initUserList()
      },
      handleAdd () {
        this.$router.push('/alterUser/add')
      }
    },
    created () {
      this.initUserList()
    }
  }
</script>
<style lang="stylus">
  // 公共函数
  taskWrapper(top, right, bottom, left)
    padding top right bottom left
    background-color #fff
  .account
    &-name
      margin-bottom 20px
      taskWrapper 30px 20px 30px 20px
      .explain
        color #323232
        font-size 14px
      .typeIn
        margin-right 30px
        margin-left 4px
      .ivu-btn
        padding 6px 23px
        font-size 14px
        &:last-child
          margin-left 10px
    &-minute
      taskWrapper 20px 20px 20px 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
</style>
