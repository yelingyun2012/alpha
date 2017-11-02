<template lang="pug">
  section
    aside.site-name
      span.explain 站点名称 :
      Input(placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="success") 查询
      Button(@click="handleAdd") 新增
    aside.site-minute
      Table(:columns="siteColumns", :data="siteData")
      Page(:total="100", show-elevator, show-total)
    Modal(v-model="test", :title="modalTitle", :mask-closable="false")
      Form(label-position="top")
        FormItem(label="站点名称")
          Input(placeholder='请输入站点名称')
        FormItem(label="域名")
          Input(placeholder='请输入域名')
      div(slot="footer")
        p(v-if='btnVisible')
          Button(type='primary') 确定
          Button(@click="handleCancel") 取消
        p(v-else)
          Button(type='primary') 签出
          Button(type='primary') 签入
          Button(@click="handleCancel") 取消
</template>
<script>
  export default {
    name: 'SiteManager',
    data () {
      return {
        test: false,
        modalTitle: '修改站点',
        btnVisible: true,
        siteColumns: [
          {title: 'ID', key: 'id'},
          {
            title: '站点名称',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
                on: {
                  click: (event) => {
                    this.test = true
                    this.modalTitle = '修改站点'
                    this.btnVisible = false
                  }
                }
              }, params.row.name)
            }
          },
          {title: '域名', key: 'domainName'},
          {title: '创建时间', key: 'createTime'},
          {title: '创建人', key: 'createMan'},
          {title: '签出状态', key: 'status'},
          {title: '签出时间', key: 'checkOutTime'},
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    color: '#2d8cf0',
                    cursor: 'pointer'
                  }
                }, '删除'),

                h('Poptip', {
                  props:{
                    placement:'top-start',
                    trigger:'hover'
                  }
                }, [
                  h('span',{
                    style: {
                      color: '#2d8cf0',
                      cursor: 'pointer'
                    }
                  },'高级'),
                  h('div',{
                    slot:'content'
                  },[
                    h('p',{
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer',
                        borderBottom:'1px solid #e9eaec',
                        padding:'5px 0'
                      }
                    },'cookies自动配置'),
                    h('p',{
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer',
                        padding:'5px 0'
                      }
                    },'cookies手动配置')
                  ])
                ])
              ])
            }
          }
        ],
        siteData: [
          {
            id: 123,
            name: '汇通财经日历',
            domainName: 'www.baidu.com',
            createTime: '2017-05-06',
            createMan: '2017-06-04',
            status: true,
            checkOutTime: '2017-08-09'
          }
        ]
      }
    },
    methods: {
      handleAdd () {
        this.modalTitle = '添加站点'
        this.test = true
        this.btnVisible = true
      },
      handleCancel () {
        this.test = false
      }
    }
  }
</script>
<style lang="stylus">
  // 公共函数
  taskWrapper(top, right, bottom, left)
    background-color #fff
    padding top right bottom left
  .site
    &-name
      taskWrapper 30px 20px 30px 20px
      margin-bottom 20px
      .explain
        font-size 14px
        color #323232
      .typeIn
        margin-right 30px
        margin-left 4px
      .ivu-btn
        padding 4px 23px
        font-size 14px
        &-success
          background-color rgba(23, 187, 156, 1)
          &:hover
            background-color rgba(23, 187, 156, 0.8)
        &:last-child
          margin-left 10px
          color #17BB9C
          border-color #17BB9C
          &:hover
            color #57a3f3
            border-color #57a3f3

    &-minute
      taskWrapper 20px 20px 20px 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
  .ivu-poptip-body
    padding 8px 12px
</style>
