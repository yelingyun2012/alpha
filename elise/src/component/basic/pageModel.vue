<template lang="pug">
  section
    aside.page-name
      span.explain 页面模型名称 :
      Input(v-model='pageModelName', placeholder='请输入页面模型', style="width: 20%;max-width:300px").typeIn
      Button(type="success", @click="handleSearch") 查询
      Button(@click="handleAdd") 新增
    aside.page-minute
      header.page-site
        template(v-for="(item,index) of siteList")
          span(:class="{'task-site-active':activeIndex===index}", :key="item.number", @click="handleCut(index,item.siteId)") {{item.siteName}}
            i(v-if='item.siteName!=="全部"') ({{item.number}})
      section.page-mission
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
            key: 'siteName'
          },
          {
            title: '创建时间',
            key: 'createTimes'
          },
          {
            title: '创建人',
            key: 'createName'
          },
          {
            title: '签出状态',
            key: 'checkType',
            render: (h, params) => {
              switch (params.row.checkType) {
                case 0:
                  return h(
                    'span',
                    {
                      style: {
                        color: '#646464',
                        display: 'inline-block',
                        padding: '4px 10px',
                        opacity: '0.7',
                        background: '#EBF8F2',
                        border: '1px solid #A7E1C4',
                        borderRadius: '2px'
                      }
                    },
                    '未签出'
                  )
                  break
                case 1:
                  return h(
                    'span',
                    {
                      style: {
                        color: '#646464',
                        display: 'inline-block',
                        padding: '4px 10px',
                        opacity: '0.7',
                        background: '#EBF8F2',
                        border: '1px solid #FABEB9',
                        borderRadius: '2px'
                      }
                    },
                    `已签出${params.row.updateName}`
                  )
              }
            }
          },
          {
            title: '签出时间',
            key: 'updateTimes'
          },
          {
            title: '操作',
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
<style lang="stylus">
  // 公共函数
  taskWrapper(top, right, bottom, left)
    padding top right bottom left
    background-color #fff
  .page
    &-name
      margin-bottom 20px
      taskWrapper 30px 20px 30px 20px
      .ivu-input
        padding 7px 7px
        height auto
        font-size 14px
      .explain
        color #323232
        font-size 14px
      .typeIn
        margin-right 30px
        margin-left 4px
      .ivu-btn
        padding 6px 23px
        font-size 16px
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
    &-minute // 任务详细
      taskWrapper 20px 20px 20px 20px
    &-site
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
    &-mission
      margin-top 20px
      .ivu-page
        margin-top 20px
        margin-right 20px
        text-align right
</style>
