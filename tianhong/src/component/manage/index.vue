<template lang="pug">
    .page-wrapper
        .page-content
            .manage-link-wrapper
                Button(type="success",@click="addUser") 添加用户
            .manage-message
                Table(:columns="columns",:data="tabdata",border,:no-data-text="dataText")
            .pagination-wrapper
                Button(@click="pageGoto",style="margin:20px 0;float:right;margin-left:15px") 转到
                Page(ref="goto",:total='pageTotal',:page-size='pageSize',:current="pageCurrent",show-elevator,show-total,@on-change="getPage")
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import moment from 'moment'
  import { getToken } from '../../utils/token'
  import { query, rStatic } from '../../api/actions'

  export default {
    name: 'manage',
    data () {
      return {
        pageTotal: 1,  // 分页总数
        pageSize: 10,   // 每页显示条数
        pageCurrent: 1,  // 当前页码
        tabdata: [],
        dataText: '数据加载中...',

        columns: [
          {
            title: 'ID',
            width: '5%',
            type: 'index',
            align: 'center'
          },
          {
            title: '用户名',
            align: 'center',
            ellipsis: true,
            key: 'USER_NAME'
          },
          {
            title: '公司名称',
            align: 'center',
            key: 'COMPANY',
            render: (h, params) => {
              if (params.row.COMPANY != null && params.row.COMPANY != '') {
                return params.row.COMPANY
              } else {
                return '—'
              }
            }
          },
          {
            title: '联系人',
            align: 'center',
            ellipsis: true,
            key: 'CONTACT_MAN'
          },
          {
            title: '联系方式',
            width: '9%',
            align: 'center',
            ellipsis: true,
            key: 'TELEPHONE'
          },
          {
            title: '电子邮箱',
            width: '12%',
            align: 'center',
            render: (h, params) => {
              if (params.row.EMAIL != null && params.row.EMAIL != '') {
                return params.row.EMAIL
              } else {
                return '—'
              }
            }
          },
          {
            title: '账户到期时间',
            width: '9%',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              if (params.row.EFFECTIVE_TIME != null && params.row.EFFECTIVE_TIME != '') {
                return moment(params.row.EFFECTIVE_TIME).format('YYYY-MM-DD')
              } else {
                return '—'
              }
            }
          },
          {
            title: '用户状态',
            width: '6%',
            align: 'center',
            ellipsis: true,
            key: 'USER_STATE',
            render: (h, params) => {
              switch (params.row.USER_STATE) {
                case 0:
                  return '禁用'
                  break
                case 1:
                  return '正常'
                  break
                case 2:
                  return '过期'
                  break
                default:
                  return ''
              }
            }
          },
          {
            title: '注册时间',
            width: '8%',
            align: 'center',
            ellipsis: true,
            key: 'REGISTER_TIME',
            render: (h, params) => {
              if (params.row.REGISTER_TIME != null && params.row.REGISTER_TIME != '') {
                return moment(params.row.REGISTER_TIME).format('YYYY-MM-DD')
              } else {
                return '—'
              }
            }
          },
          {
            title: '最后登录时间',
            width: '9%',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              if (params.row.LAST_LOGIN_TIME != null && params.row.LAST_LOGIN_TIME != '') {
                return moment(params.row.LAST_LOGIN_TIME).format('YYYY-MM-DD')
              } else {
                return '—'
              }
            }
          },
          {
            title: '操作选项',
            width: '7%',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return h('div', [
                h('router-link', {
                  style: {
                    display: 'block'
                  },
                  attrs: {
                    to: {path: `addUser/${params.row.ID}`, query: {plan: 'password'}}
                  }
                }, '修改密码'),
                h('router-link', {
                  style: {
                    display: 'block'
                  },
                  attrs: {
                    to: {path: `addUser/${params.row.ID}`, query: {plan: 'message'}}
                  }
                }, '修改信息'),
                h('a', {
                  on: {
                    click: (event) => {
                      let data = Qs.stringify({
                        Id: `${params.row.ID}`,
                        token: getToken('Token'),
                        Static: `${event.target.innerHTML === '禁用' ? 0 : 1}`,
                        method: 'rStatic'
                      })
                      rStatic(data).then(response => {
                        if (response.data.Status) {
                          event.target.innerHTML === '禁用' ? event.target.innerHTML = '启用' : event.target.innerHTML = '禁用'
                          event.target.innerHTML === '启用' ? params.row.USER_STATE = 0 : params.row.USER_STATE = 1
                        } else {
                          this.$Message.error(response.data.Msg)
                        }
                      })
//                      axios.post(Url, data).then(response => {
//                        if (response.data.Status) {
//                          event.target.innerHTML === '禁用' ? event.target.innerHTML = '启用' : event.target.innerHTML = '禁用'
//                          event.target.innerHTML === '启用' ? params.row.USER_STATE = 0 : params.row.USER_STATE = 1
//                        } else {
//                          this.$Message.error(response.data.Msg)
//                        }
//                      })
                    }
                  }
                }, params.row.USER_STATE === 0 ? '启用' : '禁用')
              ])
            }
          }
        ]
      }
    },
    methods: {
      pageGoto () {
        let val = parseInt(document.querySelector('.ivu-page-options-elevator input[type="text"]').value)
        const page = this.$refs.goto.allPages
        if (val > page) {
          this.pageCurrent = page
        } else if (val <= 0) {
          this.pageCurrent = 1
        } else {
          this.pageCurrent = val
        }
        this.askData()
      },
      askData () {
        let data = Qs.stringify({
          CountPage: this.pageSize,
          token: getToken('Token'),
          CurrentPage: this.pageCurrent,
          method: 'query'
        })

        query(data).then(response => {
          if (response.data.Status) {
            if (response.data.Data.length === 0) {
              this.dataText = '暂无数据'
            }
            this.tabdata = response.data.Data
            this.pageTotal = response.data.Count
          } else {
            this.dataText = '暂无数据'
            this.tabdata = []
          }
        })
//        axios.post(Url, data).then(response => {
//          if (response.data.Status) {
//            if (response.data.Data.length === 0) {
//              this.dataText = '暂无数据'
//            }
//            this.tabdata = response.data.Data
//            this.pageTotal = response.data.Count
//          } else {
//            this.dataText = '暂无数据'
//            this.tabdata = []
//          }
//        })
      },
      getPage (page) {
        this.pageCurrent = page
        this.askData()
      },
      addUser () {
        this.$router.push({path: 'addUser/add'})
      }
    },
    created () {
      this.askData()
    }
  }
</script>
<style lang="scss" scoped>
    .manage {
        &-link {
            &-wrapper {
                border-bottom: 1px solid #00B27A;
                padding: 20px 20px 10px;
            }
        }
        &-message {
            padding: 10px 20px 20px;
        }
    }

    .pagination-wrapper {
        padding: 0 20px 20px;
    }
</style>
