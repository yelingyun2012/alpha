<template lang="pug">
    .page-wrapper
        .page-content
            .user-title
                span {{pageTitle}}
            .form-group
                p.form-group-list
                    label 用户名:
                        span.required *
                    Input(v-model="Name",placeholder="用户名",style="width:300px",:disabled='state',:maxlength="20")
                p.form-group-list(v-if='this.$route.query.plan!=="message"')
                    label 密码:
                        span.required *
                    Input(v-model="PassWord",placeholder="密码",style="width:300px",:maxlength="20",type='password')
                p.form-group-list(v-if='this.$route.query.plan!=="message"')
                    label 确认密码:
                        span.required *
                    Input(v-model="OkPassWord",placeholder="确认密码",style="width:300px",:maxlength="20",type='password')
                p.form-group-list
                    label 公司名称:
                    Input(v-model="CompanyName",placeholder="公司名称",style="width:300px",:disabled="state",:maxlength="20")
                p.form-group-list
                    label 联系人:
                        span.required *
                    Input(v-model="CustomerName",placeholder="联系人",style="width:300px",:disabled="state",:maxlength="20")
                p.form-group-list
                    label 联系方式:
                        span.required *
                    Input(v-model="CustomerTel",placeholder="联系方式",style="width:300px",:disabled="state",:maxlength="20")
                p.form-group-list
                    label 电子邮箱:
                    Input(v-model="CustomerMailbox",placeholder="电子邮箱",style="width:300px",:disabled="state",:maxlength="30")
                p.form-group-list(v-if="accountStatus")
                    label 账户状态:
                    Select(v-model="Static",style="width:300px",:disabled="state")
                        Option(v-for="(item,index) in stateList",:value="item.value",:key='index') {{item.label}}
                p.form-group-list.form-group-date
                    label 账户有效期:
                        span.required *
                    Row()
                        Col(span="8")
                            Date-picker(:value="OpenTime",format="yyyy-MM-dd",type="date",placeholder="选择日期",style="width:145px",:disabled="state",@on-change="getStartDate",@on-clear="clearStart")
                        Col(span="8")
                            Date-picker(:value="EndTime",format="yyyy-MM-dd",type="date",placeholder="选择日期",style="width:145px",:disabled="state",@on-change="getEndDate",@on-clear="clearEnd")
                p.form-group-list
                    label 业务对接人:
                    Input(v-model="AbutmentName",placeholder="业务对接人",style="width:300px",:disabled="state",:maxlength="20")
                p.form-group-list
                    label 联系方式:
                    Input(v-model="AbutmentTel",placeholder="联系方式",style="width:300px",:disabled="state",:maxlength="20")
            .btn-group
                Button(type='success',@click="save") 保存
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import moment from 'moment'

  import { getToken } from '../../utils/token'
  import { qId, rStatic } from '../../api/actions'

  export default {
    name: 'addUser',
    data () {
      return {
        startDate: '',
        endDate: '',
        state: false,
        accountStatus: true,
        pageTitle: '',
        Id: this.$route.params.id,

        Name: '',
        PassWord: '',
        OkPassWord: '',
        CompanyName: '',
        CustomerName: '',
        CustomerTel: '',
        CustomerMailbox: '',
        Static: '',
        OpenTime: '',
        EndTime: '',
        AbutmentName: '',
        AbutmentTel: '',

        stateList: [
          {
            value: 1,
            label: '正常'
          },
          {
            value: 0,
            label: '禁用'
          }
        ]
      }
    },
    methods: {
      askParams ({
                   Id = this.Id,
                   Name = this.Name,
                   PassWord = this.PassWord,
                   OkPassWord = this.OkPassWord,
                   CompanyName = this.CompanyName,
                   CustomerName = this.CustomerName,
                   CustomerTel = this.CustomerTel,
                   CustomerMailbox = this.CustomerMailbox,
                   Static = this.Static,
                   OpenTime = this.OpenTime,
                   EndTime = this.EndTime,
                   AbutmentName = this.AbutmentName,
                   AbutmentTel = this.AbutmentTel,
                 }) {
        let data = [`http://121.9.245.185:1188/Ajax/User.ashx`,]
        switch (this.$route.query.plan) {
          case 'password':
            data = Qs.stringify({
              Id: Id,
              PassWord: PassWord,
              token: getToken('Token'),
              OkPassWord: OkPassWord,
              method: 'rPassword'
            })
            break
          case 'message':
            data = Qs.stringify({
              Id: Id,
              Name: Name,
              token: getToken('Token'),
              CompanyName: CompanyName,
              CustomerName: CustomerName,
              CustomerTel: CustomerTel,
              CustomerMailbox: CustomerMailbox,
              Static: Static,
              OpenTime: OpenTime,
              EndTime: EndTime,
              AbutmentName: AbutmentName,
              AbutmentTel: AbutmentTel,
              method: 'rInfo'
            })
            break
          default:
            data = Qs.stringify({
              Name: Name,
              PassWord: PassWord,
              token: getToken('Token'),
              OkPassWord: OkPassWord,
              CompanyName: CompanyName,
              CustomerName: CustomerName,
              CustomerTel: CustomerTel,
              CustomerMailbox: CustomerMailbox,
              OpenTime: OpenTime,
              EndTime: EndTime,
              AbutmentName: AbutmentName,
              AbutmentTel: AbutmentTel,
              method: 'add'
            })
        }
        return data
      },
      save () {
        if (this.Name === '') {
          this.$Modal.warning({
            content: '用户名不能为空',
            width: '350px',
          })
          return
        } else if (this.$route.query.plan !== 'message') {
          if (this.PassWord === '' || this.OkPassWord === '') {
            this.$Modal.warning({
              content: '密码不能为空',
              width: '350px',
            })
            return
          }
        } else if (this.CustomerName === '') {
          this.$Modal.warning({
            content: '联系人信息不能为空',
            width: '350px',
          })
          return
        }

        let data = this.askParams({})
        qId(data).then(response => {
          if (response.data.Status) {
            this.$Modal.success({
              content: response.data.Msg,
              width: '350px',
            })
            this.$router.push({path: '/manage/index'})
          } else {
            this.$Modal.warning({
              content: response.data.Msg,
              width: '350px',
            })
          }
        })
//        axios.post(Url, data).then(response => {
//          if (response.data.Status) {
//            this.$Modal.success({
//              content: response.data.Msg,
//              width: '350px',
//            })
//            this.$router.push({path: '/manage/index'})
//          } else {
//            this.$Modal.warning({
//              content: response.data.Msg,
//              width: '350px',
//            })
//          }
//        })
      },
      getStartDate (date) {
        this.OpenTime = date
      },
      getEndDate (date) {
        this.EndTime = date
      },
      clearStart () {
        this.OpenTime = ''
      },
      clearEnd () {
        this.EndTime = ''
      },
      info (msg) {
        this.$Message.info(msg)
      }
    },
    created () {
      if (this.$route.params.id === 'add') {
        this.pageTitle = '添加用户'
        this.accountStatus = false
      } else {
        this.pageTitle = '修改用户'
        let data = Qs.stringify({
          Id: this.$route.params.id,
          token: getToken('Token'),
          method: 'qId'
        })
        qId(data).then(response => {
          this.Name = response.data.Data[0].USER_NAME
          this.CompanyName = response.data.Data[0].COMPANY
          this.CustomerName = response.data.Data[0].CONTACT_MAN
          this.CustomerTel = response.data.Data[0].TELEPHONE
          this.CustomerMailbox = response.data.Data[0].EMAIL
          this.Static = response.data.Data[0].USER_STATE
          this.OpenTime = response.data.Data[0].START_TIME
          this.EndTime = response.data.Data[0].EFFECTIVE_TIME
          this.AbutmentName = response.data.Data[0].BUSINESS_CONTACTER
          this.AbutmentTel = response.data.Data[0].BUSINESS_PHONE

          this.startDate = response.data.Data[0].START_TIME
          this.endDate = response.data.Data[0].EFFECTIVE_TIME
        })
//        axios.post(Url, data).then(response => {
//          this.Name = response.data.Data[0].USER_NAME
//          this.CompanyName = response.data.Data[0].COMPANY
//          this.CustomerName = response.data.Data[0].CONTACT_MAN
//          this.CustomerTel = response.data.Data[0].TELEPHONE
//          this.CustomerMailbox = response.data.Data[0].EMAIL
//          this.Static = response.data.Data[0].USER_STATE
//          this.OpenTime = response.data.Data[0].START_TIME
//          this.EndTime = response.data.Data[0].EFFECTIVE_TIME
//          this.AbutmentName = response.data.Data[0].BUSINESS_CONTACTER
//          this.AbutmentTel = response.data.Data[0].BUSINESS_PHONE
//
//          this.startDate = response.data.Data[0].START_TIME
//          this.endDate = response.data.Data[0].EFFECTIVE_TIME
//        })
      }
      if (this.$route.query.plan === 'password') {
        this.state = true
        this.accountStatus = false
      }
    }
  }
</script>
<style lang="scss" scoped>
    .user {
        &-title {
            padding: 12px 20px;
            font-size: 16px;
            color: #00B27A;
            border-bottom: 1px solid #00B27A;
        }
    }

    .form {
        &-group {
            margin-left: 80px;
            margin-top: 20px;
            &-list {
                margin-bottom: 15px;
                label {
                    width: 80px;
                    display: inline-block;
                    font-size: 14px;
                }
            }
        }
    }

    .ivu-row {
        display: inline-block;
        vertical-align: middle;
    }

    .btn-group {
        .ivu-btn-success {
            margin: 10px 0 50px;
            margin-left: 260px;
        }
    }

    .page-content {
        min-height: 800px;
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

    .required {
        color: red;
    }
</style>