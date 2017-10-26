<template lang="pug">
    .page-wrapper
        .page-content
            .upload-list
                span {{pageTitle}}
            .upload-inc
                label 选择excel文件:
                Input(v-model="value",placeholder="请上传Excel文件...",style="width: 150px")
                div(@click="handleClick").ivu-upload
                    input(type='file',name="file",ref="input",@change="handleChange",accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel").ivu-upload-input
                    Button(type="success",:disabled="status") 浏览
                    Button(type="text",:loading="loadingStatus") {{ loadingStatus ? '文件上传中...' : '' }}
                p(style='margin-top:20px;margin-left:105px')
                    Button(type="success",@click="handleUpload",style="margin-right:20px",:disabled="status") 导入
                    Button(@click="handleClean",:disabled="status") 取消
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'
  import { UpLoad } from '../../api/actions'
  import { getToken } from '../../utils/token'

  export default {
    name: 'upload',
    data () {
      return {
        pageTitle: '批量导入',
        value: '',
        formData: '',
        loadingStatus: false,
        status: false
      }
    },
    methods: {
      handleClick () {
        this.$refs.input.click()
      },
      handleChange (event) {
        let formData = new FormData()
        let files = event.target.files
        if (!files) {
          return
        }
        this.value = files[0].name
        formData.append('File', files[0])
        this.formData = formData
      },
      handleUpload () {
        this.status = true
        if (this.formData != '') {
          this.loadingStatus = true
//          let Url = `http://121.9.245.185:1188/Ajax/UpLoad.ashx?method=UploadExcel&UserId=${this.$store.state.user.ID}`
          UpLoad(`UpLoad.ashx?method=UploadExcel&UserId=${this.$store.state.user.ID}&token=${getToken('Token')}`, this.formData).then(response => {
            if (response.data.Status) {
              this.loadingStatus = false
              this.status = false
              this.$Modal.success({
                content: '预计一天内数据会更新到商品比价数据内，请耐心等待！',
                width: '350px',
              })
            } else {
              this.status = false
              this.loadingStatus = false
              this.$Modal.warning({
                content: response.data.Msg,
                width: '350px',
              })
            }
          })
//          axios.post(Url, this.formData).then(response => {
//            if (response.data.Status) {
//              this.loadingStatus = false
//              this.status = false
//              this.$Modal.success({
//                content: '预计一天内数据会更新到商品比价数据内，请耐心等待！',
//                width: '350px',
//              })
//            } else {
//              this.status = false
//              this.loadingStatus = false
//              this.$Modal.warning({
//                content: response.data.Msg,
//                width: '350px',
//              })
//            }
//          })
        } else {
          this.$Modal.warning({
            content: '请选择上传文件！',
            width: '350px',
          })
          this.status = false
        }
      },
      handleClean () {
        this.value = ''
        this.formData = ''
      }
    }
  }
</script>
<style lang="scss" scoped>
    .upload {
        &-list {
            border-bottom: 1px solid #00B27A;
            padding: 15px 20px;
            font-size: 16px;
            color: #323232;
        }
        &-inc {
            padding: 30px 20px 50px;
            label {
                font-size: 16px;
                color: #323232;
                margin-right: 5px;
            }
        }
    }

    .ivu-upload-input {
        display: none;
    }

    .ivu-upload {
        display: inline-block;
    }

    .ivu-btn-loading {
        font-size: 14px;
    }

    .ivu-btn-success {
        margin-left: 8px;
    }
</style>
<style lang="scss">
    .ivu-message-notice-content {
        padding: 16px;
    }

    .ivu-icon-load-c {
        color: #2d8cf0;
    }

    .ivu-modal-confirm-body {
        div:last-child {
            font-size: 16px;
            margin-top: -4px;
        }
    }
</style>