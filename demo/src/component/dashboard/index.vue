<style lang="scss" scoped>
    @import "scss/index";
</style>
<style lang="scss">
    html, body {
        background-color: #e9edf2;
    }
</style>
<template lang="pug">
    section
        header.title 测试
        aside
            header.test-area
                Input(placeholder="测试", v-model="testValue", style="width:80%")
                Button(type="primary", @click="modal = true") 测试
            section.test-action
                .action-group
                    div(data-name='属性') 属性1
                    div(data-name='属性组') 属性组1
                Button(type="primary", @click="addElement") 添加属性或属性组
                Modal(title="属性/属性组", v-model="showModal", :mask-closable="false")
                    RadioGroup(v-model="property")
                        Radio(label="属性")
                        Radio(label="属性组")
                    Form(ref="formValidate", :model="formValidate", :label-width="60", :rules="ruleValidate").form-group
                        FormItem(label="归属属性")
                            Select(v-model="formValidate.propertyGroup")
                                Option(v-for="item of properList", :value="item.value", :key="item.value") {{ item.label }}
                        FormItem(label="名称", prop="name")
                            Input(placeholder="名称", v-model="formValidate.name")
                    div(slot="footer")
                        Button(type="primary", @click="pushElement('formValidate')") 添加
                        Button(@click="cancel") 取消
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'dashboard',
    data () {
      return {
        testValue: '',
        showModal: false,
        property: '属性',
        formValidate: {
          propertyGroup: '顶级',
          name: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        },
        properList: [
          {
            value: '顶级',
            label: '顶级'
          }
        ],
        formDynamic: {
          items: [
            {
              type: '属性',
              value: '',
              name: ''
            }
          ]
        }
      }
    },
    methods: {
      addElement () {
        this.showModal = true
        this.property = '属性'
        this.formValidate.propertyGroup = '顶级'
        this.formValidate.name = ''
      },
      pushElement (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal = false
            let property = `<div data-name='${this.formValidate.name}'>属性${this.formValidate.name}</div>`,
              propertyGroup = `<div data-name='${this.formValidate.name}'>属性组${this.formValidate.name}</div>`
            if (this.property === '属性') {
              $('.action-group').append(property)
            } else {
              this.properList.push({value: this.formValidate.name, label: this.formValidate.name})
              if (this.formValidate.propertyGroup === '顶级') {
                $('.action-group').append(propertyGroup)
              } else {
                alert(this.formValidate.propertyGroup)
                let a = $('.action-group div')
                a.each(item => {
                  let b = a.eq(item).attr('data-name')
                  if (b === this.formValidate.name) {

                  }
                })
              }
            }

//            let a = $('.action-group')
//            if (this.property === '属性') {
//              a.append(property)
//            } else {
//              this.properList.push({value: this.formValidate.name, label: this.formValidate.name})
//              if (this.formValidate.propertyGroup === '顶级') {
//                a.append(propertyGroup)
//              } else {
//                let a = $('.action-group div')
//                a.each(item => {
//                  let b = a.eq(item).attr('data-name')
//                  if (b === this.formValidate.propertyGroup) {
//                    if(this.property === '属性'){
//                      $('.action-group div[data-name="b"]').append(property)
//                    }else{
//                      $('.action-group div[data-name="b"]').append(propertyGroup)
//                    }
//                  }
//                })
//              }
//            }
          } else {
            this.showModal = true
            this.$Message.error('表单验证失败!')
          }
        })
      },
      cancel () {
        this.showModal = false
      }
    }
  }
</script>