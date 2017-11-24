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
<style src="../../assets/css/common.styl" lang="stylus" scoped></style>
