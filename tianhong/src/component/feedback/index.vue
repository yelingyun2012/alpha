<template lang="pug">
    .page-wrapper
        .page-content
            .form-group
                .form-list
                    label 用户名：
                    Input(v-model='userName',placeholder="用户名...",style="width:77%")
                .form-list
                    label 关键词：
                    Input(v-model='KeyWord',placeholder="关键词...",style="width:77%")
                .form-list
                    label 提交日期：
                    Row
                        Col(span='8')
                            Date-picker(type="datetime",placeholder="选择日期",style="width: 160px",@on-change="getOpenTime",@on-open-change="setAttr")
                        Col(span='8')
                            Date-picker(type="datetime",placeholder="选择日期",style="width: 160px",@on-change="getEndTime",@on-open-change="setAttr")
                Button(type='success',@click="Search") 搜索
            .page-message
                Table(:columns="columns",:data="tabData",border,:no-data-text="dataText")
                .pagination-wrapper
                    Button(@click="pageGoto",style="margin:20px 0;float:right;margin-left:15px") 转到
                    Page(ref="goto",:total='pageTotal',:page-size='pageSize',:current="pageCurrent",show-elevator,show-total,@on-change="getPage")
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import moment from 'moment'
  import { getToken } from '../../utils/token'
  import { Feedback } from '../../api/actions'

  export default {
    name: 'feedback',
    data () {
      return {
        pageTotal: 1,  // 分页总数
        pageSize: 10,   // 每页显示条数
        pageCurrent: 1,  // 当前页码
        dataText: '数据加载中...',

        userName: '', // 用户名
        KeyWord: '',  // 关键词
        OpenTime: '', // 开始时间
        EndTime: '', // 结束时间
        tabData: [], //表格数据
        columns: [
          {
            title: 'ID',
            width: '4%',
            align: 'center',
            key: 'Number'
          },
          {
            title: '反馈内容',
            key: 'Content'
          },
          {
            title: '用户名',
            width: '8%',
            align: 'center',
            ellipsis: true,
            key: 'Name'
          },
          {
            title: '公司名称',
            width: '10%',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return params.row.Company === '' ? '—' : params.row.Company
            }
          },
          {
            title: '联系人',
            width: '8%',
            align: 'center',
            ellipsis: true,
            key: 'People'
          },
          {
            title: '联系方式',
            width: '8%',
            align: 'center',
            ellipsis: true,
            key: 'Tel'
          },
          {
            title: '提交时间',
            width: 120,
            align: 'center',
            ellipsis: true,
            key: 'Time',
            render: (h, params) => {
              return moment(params.row.Time).format('YYYY-MM-DD')
            }
          }
        ]
      }
    },
    methods: {
      setAttr () {
        document.querySelectorAll('.ivu-input')[2].setAttribute('readonly', true)
        document.querySelectorAll('.ivu-input')[3].setAttribute('readonly', true)
      },
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
      askParams ({
                   Name = this.userName,
                   KeyWord = this.KeyWord,
                   OpenTime = this.OpenTime,
                   EndTime = this.EndTime,
                   CountPage = this.pageSize,
                   CurrentPage = this.pageCurrent
                 }) {
        let askUrl = `http://121.9.245.185:1188/Ajax/Feedback.ashx`,
          params = Qs.stringify({
            method: 'All',
            Name: Name,
            KeyWord: KeyWord,
            OpenTime: OpenTime,
            EndTime: EndTime,
            CountPage: CountPage,
            CurrentPage: CurrentPage
          })
        return [askUrl, params]
      },
      askData () {
        let data = Qs.stringify({
          method: 'All',
          token: getToken('Token'),
          Name: this.userName,
          KeyWord: this.KeyWord,
          OpenTime: this.OpenTime,
          EndTime: this.EndTime,
          CountPage: this.pageSize,
          CurrentPage: this.pageCurrent
        })
        Feedback(data).then(response => {
          if (response.data.Status) {
            if (response.data.Data.length === 0) {
              this.dataText = '暂无数据'
            }
            this.tabData = response.data.Data
            this.pageTotal = response.data.Count
          } else {
            this.dataText = '暂无数据'
            this.tabData = []
            this.pageTotal = 1
          }
        })
//        axios.post(Params[0], Params[1]).then(response => {
//          if (response.data.Status) {
//            if (response.data.Data.length === 0) {
//              this.dataText = '暂无数据'
//            }
//            this.tabData = response.data.Data
//            this.pageTotal = response.data.Count
//          } else {
//            this.dataText = '暂无数据'
//            this.tabData = []
//            this.pageTotal = 1
//          }
//        })
      },
      getOpenTime (date) {
        this.OpenTime = date
      },
      getEndTime (date) {
        this.EndTime = date
      },
      getPage (page) {
        this.pageCurrent = page
        this.askData()
      },
      Search () {
        this.askData()
      }
    },
    created () {
      this.askData()
    }
  }
</script>
<style lang="scss" scoped>
    .page-message {
        padding: 20px;
        min-height: 500px;
    }

    .form {
        &-group {
            padding: 30px 20px;
            border-bottom: 1px solid #00B27A;
        }
        &-list {
            display: inline-block;
            margin-right: 30px;
        }
    }

    .ivu {
        &-row {
            display: inline-block;
            vertical-align: middle
        }
        &-col-span-8 {
            display: table;
            &:nth-child(2) {
                margin-left: 10px;
            }
        }
    }
</style>