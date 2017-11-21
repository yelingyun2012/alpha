<template lang="pug">
  section
    aside.site-name
      span.explain 站点名称 :
      Input(placeholder='请输入任务名称', style="width: 20%;max-width:300px", v-model="siteName").typeIn
      Button(type="success", @click="handleSearch") 查询
      Button(@click="handleSwitchState") 新增
    aside.site-minute
      Table(:columns="siteColumns", :data="siteData")
      Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
    Modal(v-model="siteModal", :title="modalTitle", :mask-closable="false")
      Form(label-position="top")
        FormItem(label="站点名称")
          Input(placeholder='请输入站点名称', v-model="siteAddName")
        FormItem(label="域名")
          Input(placeholder='请输入域名', v-model="siteAddDomainName")
      div(slot="footer")
        p(v-if='siteModalBtnVisible')
          Button(type='primary', @click="handleAdd") 确定
          Button(@click="handleCancel") 取消
        p(v-else)
          Button(type='success', :disabled="signStatus", @click="initCheckOut") 签出
          Button(type='success', :disabled="!signStatus", @click="initCheckIn") 签入
          Button(@click="handleCancel") 取消
</template>
<script>
  import { siteList, siteAdd, siteDelete, siteCheckOut, siteCheckIn } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'SiteManager',
    data () {
      return {
        siteModal: false,
        signStatus: false,
        modalTitle: '修改站点',
        siteModalBtnVisible: true,
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0,
        siteName: '',
        siteData: [],
        siteAddName: '',
        siteAddDomainName: '',
        detailsOnTheSite: {},
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
                      this.siteModal = true
                      this.modalTitle = '修改站点'
                      this.siteModalBtnVisible = false
                      params.row.checkType === 0 ? this.signStatus = false : this.signStatus = true
                      this.siteAddName = params.row.siteName
                      this.siteAddDomainName = params.row.siteDomainName
                      this.detailsOnTheSite = {
                        siteId: params.row.siteId,
                        siteName: params.row.siteName,
                        siteDomainName: params.row.siteDomainName
                      }
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
          {
            title: '签出状态', key: 'checkType',
            render: (h, params) => {
              switch (params.row.checkType) {
                case 0:
                  return h(
                    'span',
                    {
                      'class':{
                        signIn:true
                      }}, '已签入')
                  break
                case 1:
                  return h(
                    'span',
                    {
                      'class':{
                        signOut:true
                      }}, `已签出${params.row.updatePersonName}`)
                  break
              }
            }
          },
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
                    },
                    on: {
                      click: event => {
                        this.confirm(params.row.siteId, params.index)
                      }
                    }
                  }, '删除'),

                h('Poptip',
                  {
                    props: {
                      placement: 'top-start',
                      trigger: 'hover'
                    }
                  },
                  [
                    h('span',
                      {
                        style: {
                          color: '#2d8cf0',
                          cursor: 'pointer'
                        }
                      }, '高级'),
                    h('div',
                      {
                        slot: 'content'
                      },
                      [
                        h('p',
                          {
                            style: {
                              color: '#2d8cf0',
                              cursor: 'pointer',
                              borderBottom: '1px solid #e9eaec',
                              padding: '5px 0'
                            }
                          }, 'cookies自动配置'),
                        h('p',
                          {
                            style: {
                              color: '#2d8cf0',
                              cursor: 'pointer',
                              padding: '5px 0'
                            }
                          }, 'cookies手动配置')
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
      confirm (siteId, index) {
        this.$Modal.confirm({
          content: '<p>是否确定删除该站点</p>',
          onOk: () => {
            this.initSiteDelete(siteId, index)
          }
        })
      },
      handleSwitchState () {
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
      handleAdd () {
        this.initSiteAdd()
      },
      async initCheckOut () {
        try {
          let {siteId} = this.detailsOnTheSite
          await siteCheckOut({siteId: siteId, token: getCookie('token')})
          this.signStatus = !this.signStatus
        } catch (error) {
          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
        }

      },
      async initCheckIn () {
        try {
          let {siteId} = this.detailsOnTheSite
          await siteCheckIn({
            siteId: siteId,
            siteName: this.siteAddName,
            siteDomainName: this.siteAddDomainName,
            token: getCookie('token')
          })
          this.signStatus = !this.signStatus
          this.siteModal = false
          this.initSiteList()
        } catch (error) {
          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
        }
      },
      async initSiteList () {
        try {
          let res = await siteList({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            siteName: this.siteName,
            token: getCookie('token')
          })
          this.pageTotal = res.data.data.recordCount
          this.siteData = res.data.data.result
        } catch (error) {
          this.siteData = []
          this.$Message.info(error.match(/([^\[\]]+)(?=\])/g)[0])
        }
      },
      async initSiteAdd () {
        try {
          await siteAdd({
            siteName: this.siteAddName,
            siteDomainName: this.siteAddDomainName,
            token: getCookie('token')
          })
          this.$Message.success('添加站点成功')
          this.siteModal = false
          this.siteAddName = this.siteAddDomainName = ''
          this.initSiteList()
        } catch (error) {
          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
        }
      },
      async initSiteDelete (siteId, index) {
        try {
          await siteDelete({
            siteId: siteId,
            token: getCookie('token')
          })
          this.siteData.splice(index, 1)
          this.$Message.success('删除成功')
        } catch (error) {
          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
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
  .signIn
    color #646464
    display inline-block
    padding 4px 10px
    opacity 0.7
    background #EBF8F2
    border 1px solid #A7E1C4
    border-radius: 2px
  .signOut
    color #646464
    display inline-block
    padding 4px 10px
    opacity 0.7
    background #EBF8F2
    border 1px solid #FABEB9
    borderRadius 2px
</style>
