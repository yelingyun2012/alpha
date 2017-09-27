<style lang="scss" scoped>
    @import "scss/index";
</style>
<style lang="scss">
    html, body {
        background-color: #e9edf2;
    }
    .test {
        margin-left: 10px;
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
                ul.action-group(ref="test")
                Button(type="primary", @click="addElement") 添加属性或属性组
                Button(@click="handleSubmit", style="margin-left:50px") 提交
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
        rank: 1,
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        },
        properList: [
          {
            value: '顶级',
            rank: 1,
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
      handleSubmit(){
        console.log('123')
      },
      pushElement (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal = false
            // html 模板
            let propertyTemplate = `
                <div data-name="${this.formValidate.name}">
                    属性${this.formValidate.name}
                    <select name="" id="">
                        <option value="xpath">xpath</option>
                        <option value="正则表达式">正则表达式</option>
                        <option value="css">css</option>
                    </select>
                    <input type="text">
                </div>`.trim(),

              propertyGroupTemplate = `
                <div data-name="${this.formValidate.name}">
                    属性组${this.formValidate.name}
                    <select name="" id="">
                        <option value="xpath">xpath</option>
                        <option value="正则表达式">正则表达式</option>
                        <option value="css">css</option>
                    </select>
                    <input type="text">
                </div>`.trim(),

              property = `
                <div data-name="${this.formValidate.name}" class="test">
                    属性${this.formValidate.name}
                    <select name="" id="">
                        <option value="xpath">xpath</option>
                        <option value="正则表达式">正则表达式</option>
                        <option value="css">css</option>
                    </select>
                    <input type="text">
                </div>`.trim(),
              propertyGroup = `
                <div data-name="${this.formValidate.name}" class="test">
                   属性组${this.formValidate.name}
                   <select name="" id="">
                        <option value="xpath">xpath</option>
                        <option value="正则表达式">正则表达式</option>
                        <option value="css">css</option>
                    </select>
                    <input type="text">
               </div>`.trim()

            if (this.formValidate.propertyGroup === '顶级') {
              if (this.property === '属性') {
                $('.action-group').append(propertyTemplate)
              } else {
                this.properList.push({value: this.formValidate.name, label: this.formValidate.name})
                $('.action-group').append(propertyGroupTemplate)
              }
            } else {
              let a = $('.action-group div')
              a.each(item => {
                let b = a.eq(item).attr('data-name')
                if (b === this.formValidate.propertyGroup) {
                  if (this.property === '属性') {
                    $('.action-group div[data-name=' + b + ']').append(property)
                  } else {
                    this.properList.push({value: this.formValidate.name, label: this.formValidate.name})
                    $('.action-group div[data-name=' + b + ']').append(propertyGroup)
                  }
                }
              })
            }
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