<template lang="pug">
  section
    aside.public-name
      span.explain 页面模型名称 :
      Input(v-model='pageModelName', placeholder='请输入页面模型', style="width: 20%;max-width:300px").typeIn
      Button(type="primary", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.public-minute
      header.public-site
        template(v-for="(item,index) of siteList")
          span(:class="{'task-site-active':activeIndex===index}", :key="item.number", @click="handleCut(index,item.siteId)") {{item.siteName}}
            i(v-if='item.siteName!=="全部"') ({{item.number}})
      section.public-mission
        Table(:columns="pageModelColumns", :data="pageModelData", border)
        Page(:total="pageTotal", :current="pageIndex", :page-size="pageSize", show-elevator, show-total, @on-change="handlePage")
</template>
<script>
  import { siteNum, pageModelList, pageModelDelete } from '../../config/getData'
  import { getCookie } from '../../utils/cookie'

  export default {
    name: 'PageModel',
    data () {
      return {
        activeIndex: 0,
        pageModelName: '',
        siteList: [
          {
            siteName: '全部',
            siteId: ''
          }
        ],
        pageModelColumns: [
          {
            title: 'ID',
            width: 70,
            align: 'center',
            key: 'modelId'
          },
          {
            title: '模型名称',
            render: (h, params) => {
              return h(
                'router-link',
                {
                  attrs: {
                    to: {
                      path: '/pageManager/alter',
                      query: {
                        modelId: `${params.row.modelId}`,
                        checkType: `${params.row.checkType}`,
                        updatePersonId: `${params.row.updatePersonId}`
                      }
                    }
                  }
                },
                params.row.modelName
              )
            }
          },
          {
            title: '站点',
            align: 'center',
            width: 100,
            key: 'siteName'
          },
          {
            title: '创建时间',
            align: 'center',
            width: 100,
            key: 'createTimes'
          },
          {
            title: '创建人',
            align: 'center',
            width: 150,
            key: 'createName'
          },
          {
            title: '签出状态',
            width: 150,
            align: 'center',
            key: 'checkType',
            render: (h, params) => {
              switch (params.row.checkType) {
                case 0:
                  return h('span', {class: {signInTab: true}}, '已签入')
                  break
                case 1:
                  return h(
                    'span',
                    {class: {signOutTab: true}},
                    `已签出（${params.row.updateName}）`
                  )
                  break
              }
            }
          },
          {
            title: '签出时间',
            align: 'center',
            width: 100,
            key: 'updateTimes'
          },
          {
            title: '操作',
            width: 90,
            align: 'center',
            render: (h, params) => {
              return h(
                'span',
                {
                  on: {
                    click: event => {
                      this.confirm(params.row.modelId, params.index)
                    }
                  }
                },
                [
                  h('Icon', {
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
                  })
                ]
              )
            }
          }
        ],
        pageModelData: [],
        // 模型列表
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 10,
        siteId: ''
      }
    },
    methods: {
      confirm (modelId, index) {
        this.$Modal.confirm({
          content: '<p>是否确定删除该模型</p>',
          onOk: () => {
            this.initPageModelDelete(modelId, index)
          }
        })
      },
      handleSearch () {
        this.pageIndex = 1
        this.initPageModelList()
      },
      handleAdd () {
        this.$router.push('/pageManager/add')
      },
      handleCut (subscript, siteId) {
        this.activeIndex = subscript
        this.siteId = siteId
        this.pageIndex = 1
        this.initPageModelList()
      },
      handlePage (pageIndex) {
        this.pageIndex = pageIndex
        this.initPageModelList()
      },
      async initSite () {
        try {
          let res = await siteNum({typeId: 1, token: getCookie('token')})
          this.siteList = [...this.siteList, ...res.data.data]
        } catch (error) {
          this.$Message.error(error.match(/([^\[\]]+)(?=\])/g)[0])
        }
      },
      async initPageModelList () {
        try {
          let res = await pageModelList({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            siteId: this.siteId,
            modelName: this.pageModelName,
            token: getCookie('token')
          })
          this.pageTotal = res.data.data.recordCount
          this.pageModelData = res.data.data.result
        } catch (error) {
          this.$Message.warning(error.match(/([^\[\]]+)(?=\])/g)[0])
          this.pageModelData = []
        }
      },
      async initPageModelDelete (modelId, index) {
        try {
          await pageModelDelete({modelId: modelId, token: getCookie('token')})
          this.pageModelData.splice(index, 1)
          this.pageTotal = this.pageTotal-1
          this.$Message.success('删除成功')
        } catch (error) {
          this.$Message.error(error.match(/([^\[\]]+)(?=\])/g)[0])
        }
      }
    },
    created () {
      this.initSite()
      this.initPageModelList()
    }
  }
</script>
<style lang="stylus" scoped>
  // 公共函数
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
      padding-bottom 10px
      border-bottom 1px dashed #B7B7B7
      margin-bottom 20px
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
    &-mission
    .ivu-page
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
</style>
