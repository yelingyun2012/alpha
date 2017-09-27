<style lang="scss" scoped>
    @import "scss/index";
</style>
<style lang="scss">
    html,
    body {
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
                .action-group(ref="test")
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
        },
        treeData: [],
        treeData1: []
      }
    },
    methods: {
      addElement () {
        this.showModal = true
        this.property = '属性'
        this.formValidate.propertyGroup = '顶级'
        this.formValidate.name = ''
      },
      handleSubmit () {
        let a = $('.action-group .property-item')
        a.each(item => {
          let b = a.eq(item).children('.property-top')
          this.treeData.push({
            name: b.find('label').text(),
            select: b.find('select').val(),
            input: b.find('input').val()
          })
          let c = a.eq(item).children('.property-children')
          if (c.length !== 0) {
            c.map(item => {
              this.treeData1.push({
                name: c.eq(item).children('label').text(),
                select: c.eq(item).children('select').val(),
                input: c.eq(item).children('input').val()
              })
            })
          } else {
            console.log('2')
          }
        })
        console.log(this.treeData)
        console.log(this.treeData1)
      },
      pushElement (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal = false
            // html 模板
            let propertyTemplate = `
              <div data-id="${this.formValidate.name}" class="property-item">
                  <div class="property-top">
                    <label>属性${this.formValidate.name}</label>
                    <select>
                      <option value="xpath">xpath</option>
                      <option value="正则表达式">正则表达式</option>
                    </select>
                    <input type="text">
                  </div>
              </div>`

            let propertyGroupTemplate = `
             <div data-id="${this.formValidate.name}" class="property-item">
                  <div class="property-top">
                    <label>属性组${this.formValidate.name}</label>
                    <select>
                      <option value="xpath">xpath</option>
                      <option value="正则表达式">正则表达式</option>
                    </select>
                    <input type="text">
                  </div>
              </div>`

            let property = `
               <div class="property-children test" data-id="${this.formValidate.name}">
                    <label>属性${this.formValidate.name}</label>
                    <select>
                      <option value="xpath">xpath</option>
                      <option value="正则表达式">正则表达式</option>
                    </select>
                    <input type="text">
                </div>`

            let propertyGroup = `
                <div class="property-children test" data-id="${this.formValidate.name}">
                      <label>属性组${this.formValidate.name}</label>
                      <select>
                        <option value="xpath">xpath</option>
                        <option value="正则表达式">正则表达式</option>
                      </select>
                      <input type="text">
                </div>`

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
                let b = a.eq(item).attr('data-id')
                if (b === this.formValidate.propertyGroup) {
                  if (this.property === '属性') {
                    $('.action-group div[data-id=' + b + ']').append(property)
                  } else {
                    this.properList.push({value: this.formValidate.name, label: this.formValidate.name})
                    $('.action-group div[data-id=' + b + ']').append(propertyGroup)
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