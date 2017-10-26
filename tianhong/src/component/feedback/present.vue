<template lang="pug">
    .page-wrapper
        .page-content
            .feedback-title 建议反馈
            .feedback-content
                p 如遇紧急问题，请联系:0755-88321616
                    span(style='margin-left:20px',v-if="businessContacts!==''") {{businessContacts}}：{{businessPhone}}
                Input(v-model="content" type="textarea",:rows="18",placeholder="请输入...")
                Button(type='success',@click="refer") 提交
</template>
<script>
  import Qs from 'qs'
  import { mapGetters } from 'vuex'

  import { getToken } from '../../utils/token'
  import { AddFeedback } from '../../api/actions'

  export default {
    name: 'feedback',
    data () {
      return {
        content: ''
      }
    },
    methods: {
      refer () {
        if (this.content === '') {
          this.$Modal.warning({
            content: '反馈内容不能为空',
            width: '350px',
          })
        } else {
          let data = Qs.stringify({
            Id: this.userId,
            token: getToken('Token'),
            Content: this.content,
            method: 'Add'
          })
          AddFeedback(data).then(response => {
            if (response.data.Status) {
              this.$Modal.success({
                content: '感谢您的反馈，我们将尽快处理！',
                width: '350px',
              })
              this.content = ''
            } else {
              this.$Modal.error({
                content: '出了点无法解决的问题，请等待我们为你解决！',
                width: '350px',
              })
            }
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        userId: 'user/ID',
        businessContacts: 'user/linkman_contacts',
        businessPhone: 'user/business_phone'
      })
    }
  }
</script>
<style lang="scss" scoped>
    .feedback {
        &-title {
            font-size: 16px;
            color: #323232;
            background: #E5E5E5;
            text-align: center;
            padding: 7.5px 0;
        }
        &-content {
            margin: 20px auto 0;
            padding-bottom: 50px;
            width: 900px;
            font-size: 14px;
            color: #323232;
            text-align: center;
            p {
                text-align: left;
                margin-bottom: 8px;
            }
            .ivu-input-wrapper {
                margin-bottom: 20px;
            }
        }
    }
</style>