<template lang="pug">
  section
    aside.account-name
      span.explain 用户名称:
      Input(placeholder="请输入用户名称", style="width: 20%;max-width:300px").typeIn
      Button(type='primary') 查询
    aside.account-minute
      Table(:columns="accountColumns", :data="accountData")
      Page(:total="100", show-elevator, show-total)
</template>
<script>
  export default {
    name: 'AccountManager',
    data () {
      return {
        accountColumns: [
          {title: '用户ID', key: 'id'},
          {title: '用户名', key: 'name'},
          {title: '用户类型', key: 'userType'},
          {title: '在线状态', key: 'status'},
          {title: '联系方式', key: 'phone'},
          {title: '创建时间', key: 'createTime'},
          {title: '启用状态', key: 'initiateMode'},
          {title: '有效时间', key: 'theEffectiveTime'},
          {title: '上次登录时间', key: 'lastLoginTime'},
          {
            title: '操作',
            render: (h, params) => {
              return h(
                'span',
                {
                  style: {
                    color: '#2d8cf0',
                    cursor: 'pointer'
                  },
                  on: {
                    click: event => {
                      console.log(123)
                    }
                  }
                },
                '删除'
              )
            }
          }
        ],
        accountData: [
          {
            id: 123,
            name: 'admin',
            userType: '普通用户',
            status: '未登录',
            phone: '15748956587',
            createTime: '2018-05-06',
            initiateMode: true,
            theEffectiveTime: '2019-06-07',
            lastLoginTime: '2014-07-06'
          }
        ]
      }
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
    &-minute
      taskWrapper 20px 20px 20px 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
</style>
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
    &-minute
      taskWrapper 20px 20px 20px 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
</style>
