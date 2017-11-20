<template lang="pug">
  section
    aside.site-name
      span.explain 站点名称 :
      Input(placeholder='请输入任务名称', style="width: 20%;max-width:300px").typeIn
      Button(type="success", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.site-minute
      Table(:columns="siteColumns", :data="siteData")
      Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @click="handlePage")
    Modal(v-model="siteModal", :title="modalTitle", :mask-closable="false")
      Form(label-position="top")
        FormItem(label="站点名称")
          Input(placeholder='请输入站点名称')
        FormItem(label="域名")
          Input(placeholder='请输入域名')
      div(slot="footer")
        p(v-if='siteModalBtnVisible')
          Button(type='primary') 确定
          Button(@click="handleCancel") 取消
        p(v-else)
          Button(type='primary') 签出
          Button(type='primary') 签入
          Button(@click="handleCancel") 取消
</template>
<script>
  import { siteList } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'SiteManager',
    data () {
      return {
        siteModal: false,
        modalTitle: '修改站点',
        siteModalBtnVisible: true,
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0,
        siteName: '',
        siteData: [],
        siteColumns: [
          {title: 'ID', key: 'siteId'},
          {
            title: '站点名称',
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
                      this.test = true
                      this.modalTitle = '修改站点'
                      this.btnVisible = false
                    }
                  }
                },
                params.row.siteName
              )
            }
          },
          {title: '域名', key: 'siteDomainName'},
          {title: '创建时间', key: 'createTimes'},
          {title: '创建人', key: 'creatorName'},
          {title: '签出状态', key: 'checkType'},
          {title: '签出时间', key: 'updateTimes'},
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  {
                    style: {
                      color: '#2d8cf0',
                      cursor: 'pointer'
                    }
                  },
                  '删除'
                ),

                h(
                  'Poptip',
                  {
                    props: {
                      placement: 'top-start',
                      trigger: 'hover'
                    }
                  },
                  [
                    h(
                      'span',
                      {
                        style: {
                          color: '#2d8cf0',
                          cursor: 'pointer'
                        }
                      },
                      '高级'
                    ),
                    h(
                      'div',
                      {
                        slot: 'content'
                      },
                      [
                        h(
                          'p',
                          {
                            style: {
                              color: '#2d8cf0',
                              cursor: 'pointer',
                              borderBottom: '1px solid #e9eaec',
                              padding: '5px 0'
                            }
                          },
                          'cookies自动配置'
                        ),
                        h(
                          'p',
                          {
                            style: {
                              color: '#2d8cf0',
                              cursor: 'pointer',
                              padding: '5px 0'
                            }
                          },
                          'cookies手动配置'
                        )
                      ]
                    )
                  ]
                )
              ])
            }
          }
        ]
      }
    },
    mounted () {
      this.initSiteList()
    },
    methods: {
      handleAdd () {
        this.modalTitle = '添加站点'
        this.siteModal = true
        this.siteModalBtnVisible = true
      },
      handleCancel () {
        this.siteModal = false
      },
      handleSearch () {
        this.pageIndex = 1
        this.initSiteList()
      },
      handlePage (pageIndex) {
        this.pageIndex = pageIndex
        this.initSiteList()
      },
      async initSiteList () {
        let res = await siteList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          siteName: this.siteName,
          token: getCookie('token')
        })
        if (res.data.data.length !== null && res.data.data.length !== 0) {
          this.siteData = res.data.data.result
        }
      }
    }
  }
</script>

<style lang="stylus">
  // 公共函数
  taskWrapper(top, right, bottom, left)
    padding top right bottom left
    background-color #fff
  .site
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
        padding 4px 23px
        font-size 14px
        &-success
          background-color rgba(23, 187, 156, 1)
          &:hover
            background-color rgba(23, 187, 156, .8)
        &:last-child
          margin-left 10px
          border-color #17BB9C
          color #17BB9C
          &:hover
            border-color #57a3f3
            color #57a3f3
    &-minute
      taskWrapper 20px 20px 20px 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
  .ivu-poptip-body
    padding 8px 12px
</style>
