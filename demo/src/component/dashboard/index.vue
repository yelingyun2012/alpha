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
                Form(ref="formDynamic", :model="formDynamic", :label-width="80")
                    FormItem(v-for="(item, index) in formDynamic.items", :key="index", :label="item.type + item.name")
                        Row
                            Col(span="18")
                                Input(type="text", v-model="item.value", placeholder="请输入...")
                Button(type="primary", @click="addElement") 添加属性或属性组
                Modal(title="属性/属性组", v-model="showModal")
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
                        Button(type="primary", @click="pushElement('formValidate')") 测试
                        Button(type="primary") 取消
</template>
<script>
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
        this.formValidate.propertyGroup = '1'
        this.formValidate.name = ''
      },
      pushElement (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal = false
            this.formDynamic.items.push({type: this.property, value: '', name: this.formValidate.name})
            if (this.property = '属性组') {
              this.properList.push({value: this.formValidate.name, label: this.formValidate.name})
            }
          } else {
            this.showModal = true
            this.$Message.error('表单验证失败!')
          }
        })
      }
    },
    created () {

    }
  }
</script>