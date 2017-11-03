<template lang="pug">
  section.page
    aside.page-typeIn
      Input(placeholder="请输入测试的URL")
      Button(type="primary", @click="handleTest") 测试
    aside.structure
      .action-group
      Button(type="success", @click="handleShow") 添加属性/属性组  显示
    Modal(title="属性/属性组", v-model="addTheModule", @on-ok="handleAdd", @on-cancel="handleCancel")
      aside
        RadioGroup(v-model="moduleLabel")
          Radio(label="属性")
          Radio(label="属性组")
        Form.page-form
          FormItem(label="归属属性")
            Select(v-model="pageNode")
              Option(v-for="item of property", :value="item.value", :key="item.value") {{item.label}}
          FormItem(label="名称")
            Input(placeholder="名称", v-model="designation")
</template>
<script>
  import { fetch } from '../../config/fetch'
  import { getCookie } from '../../utils/cookie'
  import $ from 'jquery'

  export default {
    name: 'PageModel',
    data () {
      return {
        addTheModule: false,
        // modal
        moduleLabel: '属性',
        designation: '',  // 名称
        pageNode: '顶级',
        property: [
          {
            value: '顶级',
            label: '顶级'
          }
        ],
        verificationMode: []
      }
    },
    methods: {
      handleTest () {
        console.log(1234)
      },
      handleShow () {
        this.addTheModule = true
      },
      handleAdd () {
        let [optionTemplate, uuid] = [[],]
        this.verificationMode.map(item => {  // 遍历生成 option
          optionTemplate.push(`<option value="${item.itemType}">${item.itemName}</option>`)
        })
        // 是否添加uuid
        if (this.moduleLabel === '属性组') {
          uuid = 'data-uuid="123"'
        } else if (this.moduleLabel === '属性') {
          uuid = ''
        }
        // 模板
        let property = `
            <div data-name="${this.designation}" class="property-item" ${uuid}>
              <div class="property-top">
                <label>${this.moduleLabel} ${this.designation}</label>
                <select>${optionTemplate}</select>
                <input type="text">
                <select>
                  <option value="0">不为URL抽取</option>
                  <option value="1">URL抽取</option>
                </select>
                <button>删除</button>
              </div>
            </div>`
        let propertyChild = `
          <div data-name="${this.designation}" class="property-child">
            <label>${this.moduleLabel} ${this.designation}</label>
            <select>${optionTemplate}</select>
            <input type="text">
            <select>
              <option value="0">不为URL抽取</option>
              <option value="1">URL抽取</option>
            </select>
            <button>删除</button>
          </div>
        `
        if (this.pageNode === '顶级') {
          $('.action-group').append(property)
          if (this.moduleLabel === '属性组') {
            this.property.push({value: this.designation, label: this.designation})
          }
        }else{
          let elementNodes = $('.action-group div')
          elementNodes.each(item => {
            let sign = elementNodes.eq(item).attr('data-name')
            if (sign === this.pageNode) {
              $('.action-group div[data-name=' + sign + ']').append(propertyChild)
              if(this.moduleLabel === '属性组'){
                this.property.push({value: this.designation, label: this.designation})
              }
            }
          })
        }
      },
      handleCancel () {
        this.designation = ''
      }
    },
    created () {
      fetch('pagemodel/listParseRuleType', {
        method: 'post',
        data: {
          token: getCookie('token')
        }
      }).then(response => {
        this.verificationMode = response.data.data
      })
    }
  }
</script>
<style lang="stylus">
  .page
    background-color #ffffff
    padding 20px
    .structure
      margin-top: 20px
    &-typeIn
      > .ivu-input-wrapper
        width 20%
        max-width 300px
      .ivu-btn
        margin-left 10px
    &-form
      margin-top 5px
      .ivu-form-item
        margin-bottom 0
    .property
      &-child
        margin-left 20px
</style>