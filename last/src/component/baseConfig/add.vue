<template lang="pug">
    .login-container
        .sitename
            p.sitename44  当前位置：基本配置 > 页面模型 >
                a.guanli  基本属性
            p.sitename3
                p.sitename2
                    span.buttonalls
                        Input(type="text" v-model="pagename",:disabled="dis" placeholder="请输入页面名称"  style="width:22%;height:36px")
                        Button(type="success",@click='checkOut',style="margin-left: 20%;")  签出
                        Button(type="success",@click='checkIn',style="margin-left: 17px;")  签入
                        Button(type="text"  style="border:1px solid  #17BB9C ;color: #fff;background: #2D8CF0;",@click="back") 返回
                p.sitename5
                    Tabs(type="card")
                        TabPane(label="归属站点")
                            RadioGroup(v-model="vertical", vertical )
                                Radio(v-for="list of items", :label="list.siteId", :disabled="dis", :key="list.siteId")
                                    span {{list.siteName}}
                        TabPane(label="基本属性")
                            p.BaseAttribute(style="font-size: 14px;color: #323232;")
                                span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  模型类型： &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                                    Select(v-model="modelvalue",:disabled="dis" style="width:200px")
                                        Option(v-for="item in  modelType", :value="item.value", :key="item.value") {{ item.label }}
                                span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")   内容提供方式：
                                    Select(v-model="Contentvalue",:disabled="dis" style="width:200px")
                                        Option(v-for="item in Contentmode " ,:value="item.value" ,:key="item.value") {{ item.label }}


                            p.BaseAttribute2(style="font-size: 14px;color: #323232;width:80%;height:120px;padding-left: 10px;")   模型正则表达式：
                                Input(v-model="regular",:disabled="dis" type="textarea"  )
                            p.BaseAttribute2(style="font-size: 14px;color: #323232;width:80%;height:120px;padding-left: 10px;")  允许爬行的URL：
                                Input(v-model="Allowscraw",:disabled="dis" type="textarea"  )
                            p.BaseAttribute2(style="font-size: 14px;color: #323232;width:80%;height:120px;padding-left: 10px;")   不允许爬行的URL：
                                Input(v-model="NotAllowscraw" ,:disabled="dis" type="textarea"  )

                            p.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")
                                <!--Checkbox(v-model="single" ,:disabled="dis",style="font-size: 14px")  是否抽取URL属性-->
                                span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  是否抽取URL
                                    Select(v-model="extractvalue" ,:disabled="dis" style="width:150px")
                                        Option(v-for="item in  Listrule" , :value="item.value" , :key="item.value")  {{ item.label }}
                                    Input(type="text" v-model=" urlattributes" ,:disabled="dis" style="width:53.9%;height:36px;margin-top: 2px;margin-left: 14px;")
                            <!--p.BaseAttribute2(style="font-size: 14px;color: #323232;width:50%;height:70px;padding-left: 10px;")-->
                                <!--span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  是否浏览器采集-->
                                    <!--Checkbox(v-model="single")-->
                            <!--p.BaseAttribute2(style="font-size: 14px;color: #323232;width:50%;height:70px;padding-left: 10px;")-->
                                <!--span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")  是否需要刷新-->
                                    <!--Checkbox(v-model="singles")-->
                            <!--p.BaseAttribute2(style="font-size: 14px;color: #323232;width:50%;height:70px;padding-left: 10px;")-->
                                <!--span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")   刷新方式-->




                        TabPane(label="模型属性")
                            p.Modelattributes(style="font-size: 14px;color: #323232;padding:10px")
                                <!--Input(type="text" v-model="measurement"  ,:disabled="dis" style="width:80%;height:36px")-->
                                <!--Button(style="background:rgb(32, 137, 203);color:#fff;margin-bottom: 5px;margin-left: -1px;padding: 8px 25px;")  测试-->
                                <!--span.buttonalls-->
                                <!--Button(type="success",@click='checkOut',style="margin-left: 20%;") 签出&ndash;&gt;-->
                                <!--Button(type="success",@click='checkIn',style="margin-left: 17px;") 签入&ndash;&gt;-->
                                <!--Button(type="text"  style="border:1px solid  #17BB9C ;color: #fff;background: #2D8CF0;",@click="back") 返回&ndash;&gt;-->
                            section(v-for="(item,index) of test" v-if="index!=0")
                                span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px")   {{item.label}}
                                    Icon(type="navicon-round")
                                    Select(v-model="item.mode1" style="width:200px")
                                        Option(v-for="item1 in item.Codedformats", :value="item1.value", :key="item1.value") {{ item1.label }}
                                    Input(type="text" v-model="item.name" style="width:59%;height:36px;margin-left: 15px;margin-top: 1px;")
                                    Button(type="ghost",@click="handleRemove(index)",style="border-radius:0;margin-top: -5px;") 删除
                                    p.Modelattributes(style="font-size: 14px;color: #323232;padding:5px")
                                        span.BaseAttribute(style="font-size: 14px;color: #323232;padding:10px;margin-left: 17px;" v-for="(item2,index) in item.propery")  {{item2.name }}：
                                            Icon(type="ionic")
                                            Select(v-model="item2.values" style="width:150px")
                                                Option(v-for="items in item2.cityList", :value="items.value" ,:key="items.value") {{ items.label }}
                                            Input(type="text" v-model="item2.names"  style="width:59%;height:36px;margin-left:22px;margin-top: 1px;")
                                            Button(type="ghost", @click="handleRemove(index)",style="border-radius:0;margin-top: -5px;")  删除
                            .action-group

                            Button(type="success", @click="addElement")  +添加属性/属性组

                            Modal(title="属性/属性组", :mask-closable="false", v-model="showModal")
                                RadioGroup(v-model="property")
                                    Radio(label="属性")
                                    Radio(label="属性组")
                                Form(ref="formValidate", :model="formValidate", :label-width="80", :rules="ruleValidate").form-group

                                    FormItem(label="归属属性")
                                        Select(v-model="formValidate.propertyGroup")
                                            Option(v-for="item of properList", :value="item.value", :key="item.value") {{ item.label }}

                                    FormItem(label="名称", prop="name")
                                        Input(placeholder="名称", v-model="formValidate.name", ref="beyebeTest")
                                    FormItem(label="parentId", prop="name")
                                        Input(placeholder="parentId", v-model="formValidate.parentId", ref="beyebeTest")

                                div(slot="footer")
                                    Button(type="primary", @click="pushElement('formValidate')") 添加
                                    Button(@click="cancel") 取消
</template>
<script>
  import axios from '../../api/http'
  import Qs from 'qs'
  import { getToken } from '../../utils/token'
  import $ from 'jquery'

  export default {
    name: 'addPage',
    data () {
      return {
        pagename: '',
        dis: false,
        // 基本属性
        modelvalue: '',
        modelType: [],
        Contentvalue: '',
        Contentmode: [],
        regular: '',
        Allowscraw: '',
        NotAllowscraw: '',
        single: '',
        singles: '',
        Listrule: [
          {
            value: '0',
            label: '否',
          },
          {
            value: '1',
            label: '是',
          }
        ],
        extractvalue: '',

        urlattributes: '',

        // radio
        vertical: '',
        items: [],
        measurement: '',
        test: '',
        property: '属性',
        showModal: false,
        formValidate: {
          propertyGroup: '顶级|0',
          name: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        },
        properList: [
          {
            value: '顶级|0',
            rank: 1,
            label: '顶级'
          }
        ],

        quit: this.$route.query.plan,
        testArr: [],
        testItem: [],

        BeyebeTest: ['567']
      }
    },
    methods: {
      handleTraverseTree () {
        let _this = this
        let propertyItem = $('.action-group .property-item')
        propertyItem.each(item => {
          traverseTree(propertyItem.eq(item))
        })

        function traverseTree (node) {
          let top = node.children('.property-top'),
            child = node.children('.property-children')

          if (top.length !== 0) {
            _this.testArr.push({
              name: top.children('label').text(),
              select: top.children('select').val(),
              input: top.children('input').val(),
              modelId: this.$route.query.plan
            })
          }
          if (child.length !== 0) {
            child.each(item => {
              _this.testArr.push({
                name: child.eq(item).children('label').text(),
                select: child.eq(item).children('select').val(),
                input: child.eq(item).children('input').val(),
                modelId: this.$route.query.plan
              })
              traverseTree(child.eq(item))
            })
          }

        }
      },
      addElement () {
        this.showModal = true
        this.property = '属性'
        this.formValidate.propertyGroup = '顶级|0'
        this.formValidate.name = ''
      },
      pushElement (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {


            console.log(this.formValidate.propertyGroup)

            this.showModal = false


            let aeTest = []

            this.BeyebeTest.map(item => {
              aeTest.push(`<option value="${item.itemType}">${item.itemName}</option>`)
            })

            let beTest = `
                <select>
                    ${aeTest}
                </select>
            `

            let propertyTemplate = `
              <div data-id="${this.formValidate.name}" class="property-item">
                  <div class="property-top">
                    <label>属性 ${this.formValidate.name}</label>
                    <select>
                        ${aeTest}
                    </select>
                    <input type="text">

                    <select name="" id="qs">
                         <option value="0"> 抽取</option>
                         <option value="1">不抽取</option>
                     </select>
                  </div>
              </div>`

            let propertyGroupTemplate = `
             <div data-id="${this.formValidate.name}" class="property-item" data-uuid="${this.uuid()}">
                  <div class="property-top">
                    <label>属性组 ${this.formValidate.name}</label>

                    <select  style=" height: 35px">
                     ${aeTest}
                    </select>

                    <input type="text" style=" height: 35px; width: 500px"  >

                    <select name="" id="qs">

                         <option value="0"> 抽取</option>
                         <option value="1">不抽取</option>
                     </select>

                  </div>
              </div>`
            let property = `
                <div class="property-children test" data-id="${this.formValidate.name}">
                    <label>属性 ${this.formValidate.name}</label>

                    <select>
                      ${aeTest}
                    </select>

                    <input type="text" >
                     <select name="" id="qs">
                         <option value="0"> 抽取</option>
                         <option value="1">不抽取</option>
                     </select>

                </div>`

            let propertyGroup = `
                <div class="property-children test" data-id="${this.formValidate.name}",data-uuid="${this.uuid()}">
                      <label>属性组 ${this.formValidate.name}</label>

                      <select style="height: 30px ;margin-top: 15px">
                        ${aeTest}
                      </select>

                      <input type="text" style=" height: 35px; width: 500px" >

                      <select name="" id="qs">
                         <option value="0"> 抽取</option>
                         <option value="1">不抽取</option>
                     </select>
                </div>`

            if (this.formValidate.propertyGroup.split('|')[0] === '顶级') {
              if (this.property === '属性') {
                $('.action-group').append(propertyTemplate)
              }
              else {
                this.properList.push({value: this.formValidate.name, label: this.formValidate.name})
                $('.action-group').append(propertyGroupTemplate)
              }
            }
            else {
              let a = $('.action-group div')
              a.each(item => {
                let b = a.eq(item).attr('data-id')
                if (b === this.formValidate.propertyGroup) {
                  if (this.property === '属性') {
                    $('.action-group div[data-id=' + b + ']').append(property)
                  }
                  else {
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
      uuid(){
        let s = []
        let hexDigits = '0123456789abcdef'
        for (let i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }
        s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-'

        let uuid = s.join('')
        return uuid
      },

      checkIn () {
        if (this.$route.query.active === 'update') {
          console.log('更新')//更新---------------------------------
          let _this = this
          let propertyItem = $('.action-group .property-item')
          if (propertyItem.length === 0) {

          } else {
            propertyItem.each(item => {
              traverseTree(propertyItem.eq(item))
            })
            function traverseTree (node) {
              let top = node.children('.property-top'),
                child = node.children('.property-children')
//              function uuid () {
//                var s = []
//                var hexDigits = '0123456789abcdef'
//                for (var i = 0; i < 36; i++) {
//                  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
//                }
//                s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
//                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
//                s[8] = s[13] = s[18] = s[23] = '-'
//
//                var uuid = s.join('')
//                return uuid
//              }
              let typeData = ''
              if (top.children('label').text()=== '属性') {
                typeData = 0
              } else {
                typeData = 1
              }
              if (top.length !== 0) {
                _this.testArr.push({
//                  propertyId:_this.uuid(),
//                  propertyName: top.children('label').text().split(' ')[1],
//                  groupType: typeData,
//                  urlPropertyExtract: top.children('select#qs').val(),
//                  modelId: _this.$route.query.plan,
//                  parentId: _this.uuid(),
////                  matchExpression: _this.measurement,
//                  matchExpression:  top.children('input').val(),
                  parseType: top.children('select').val(),
                  matchExpression:  top.children('input').val(),
                  groupType:typeData,
                  urlPropertyExtract:top.children('select#qs').val(),
                  propertyName:top.children('label').text().split('')[1],
                  parentId:0,
                  propertyId:top.parent().attr('data-uuid')!==''?top.parent().attr('data-uuid'):_this.uuid(),
//                  name: top.children('label').text(),
//                  select: top.children('select').val(),
//                  input: top.children('input').val(),
//                  propertyId:top.parent().attr('data-uuid')!==''?child.parent().attr('data-uuid'):0,
                  modelId: _this.$route.query.plan
                })
              }
              if (child.length !== 0) {
                child.each(item => {
                  _this.testArr.push({
//                    propertyId:_this.uuid(),
//                    propertyName: child.eq(item).children('label').text().split(' ')[1],
//                    groupType: typeData,
//                    urlPropertyExtract: child.eq(item).children('select#qs').val(),
//                    modeId: _this.$route.query.plan,
//                    parentId: _this.uuid(),
//                    parseType: child.eq(item).children('select').val(),
//                    matchExpression:  top.children('input').val(),
                    matchExpression:  top.children('input').val(),
                    groupType:typeData,
                    parseType: top.children('select').val(),
                    urlPropertyExtract:top.children('select#qs').val(),
                    propertyName:top.children('label').text().split('')[1],
                    parentId:top.parent().attr('data-uuid')!==''?child.parent().attr('data-uuid'):0,
                    propertyId:_this.uuid(),
//                    parentId:_this.uuid(),
//                    name: child.eq(item).children('label').text(),
//                    select: child.eq(item).children('select').val(),
//                    input: child.eq(item).children('input').val(),
//                    name: top.children('label').text(),
//                    select: top.children('select').val(),
//                    input: top.children('input').val(),

//                    propertyId:top.parent().attr('data-uuid')!==''?child.parent().attr('data-uuid'):0,
                    modelId: _this.$route.query.plan

                  })
                  traverseTree(child.eq(item))
                })
              }
            }
            console.log(this.testArr)
          }
//          var quit = this.$route.query.plan
          let pageModelResult = {
            modelId: this.$route.query.plan,
            modelName: this.pagename,//页面模型名称
            contentType: this.modelvalue,//内容提供方式
            modelType: this.Contentvalue,//模型类型
            siteId: this.vertical,
            modelRegularExpression: this.regular,//模型正则表达式,
            urlsAllowCrawlRegex: this.Allowscraw,//允许爬行的URLs,
            urlsNotAllowCrawlRegex: this.NotAllowscraw,//不允许爬行的URLs,
            urlExtractable: 1,//是否抽取URL（1和0）
            urlExtractRuleType: this.extractvalue,//UrL规则类型（三种）,
            urlExtractRule: this.urlattributes,//抽取url规则（正则）,
            pageTurningable: 0,//表示是否翻页(),
            browserType: 1,//浏览器类型默认1
          }
          let pageModelPropertyResult = JSON.stringify(this.testArr)
          axios.get('pagemodel/checkin', {
            params: {
              pageModelResult: pageModelResult,
              pageModelPropertyResult: pageModelPropertyResult,
              token: getToken('Token')
            }
          }).then(response => {
            console.log(response)
            this.testArr = []
          })
        } else {
          console.log('add')//------------------------------ 添加----------------------------------
          let _this = this
          let propertyItem = $('.action-group .property-item')
          if (propertyItem.length === 0) {

          } else {
            propertyItem.each(item => {
              traverseTree(propertyItem.eq(item))
            })
            function traverseTree (node) {
              let top = node.children('.property-top'),
                child = node.children('.property-children')
//              function uuid () {
//                var s = []
//                var hexDigits = '0123456789abcdef'
//                for (var i = 0; i < 36; i++) {
//                  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
//                }
//                s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
//                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
//                s[8] = s[13] = s[18] = s[23] = '-'
//
//                var uuid = s.join('')
//                return uuid
//              }
              let typeData = ''
              if (top.children('label').text().split(' ')[0] === '属性') {
                typeData = 0
              } else {
                typeData = 1
              }

              if (top.length !== 0) {
                _this.testArr.push({
//                  propertyName: top.children('label').text().split(' ')[1],
//                  groupType: typeData,
                  urlPropertyExtract:top.children('select#qs').val(),
//                  modelId: _this.$route.query.plan,
//                  parentId: _this.uuid(),
//                  parseType: top.children('select').val(),
                  matchExpression:  top.children('input').val(),
                  groupType:typeData,
                  parseType: top.children('select').val(),
                  propertyName:top.children('label').text().split('')[1],
                  parentId:top.parent().attr('data-uuid')!==''?child.parent().attr('data-uuid'):0,
                  propertyId:_this.uuid(),
//                  parentId:_this.uuid(),
//                  name: child.eq(item).children('label').text(),
//                  select: child.eq(item).children('select').val(),
//                  input: child.eq(item).children('input').val(),

//                  name: top.children('label').text(),
//                  select: top.children('select').val(),
//                  input: top.children('input').val(),

//                  propertyId:top.parent().attr('data-uuid')!==''?child.parent().attr('data-uuid'):0,
                  modelId: _this.$route.query.plan
                })
              }
              if (child.length !== 0) {
                child.each(item => {
                  _this.testArr.push({
//                    propertyName: child.eq(item).children('label').text().split(' ')[1],
//                    groupType: typeData,
                    urlPropertyExtract: child.eq(item).children('select#qs').val(),
//                    modelId: _this.$route.query.plan,
//                    parentId: _this.uuid(),
//                    parseType: child.eq(item).children('select').val(),
//                    matchExpression: top.children('input').val(),
                    matchExpression:  top.children('input').val(),
                    groupType:typeData,
                    parseType: top.children('select').val(),
                    propertyName:top.children('label').text().split('')[1],
                    parentId:top.parent().attr('data-uuid')!==''?child.parent().attr('data-uuid'):0,
                    propertyId:_this.uuid(),
//                    parentId:_this.uuid(),
//                    name: child.eq(item).children('label').text(),
//                    select: child.eq(item).children('select').val(),
//                    input: child.eq(item).children('input').val(),

//                    name: top.children('label').text(),
//                    select: top.children('select').val(),
//                    input: top.children('input').val(),

//                    propertyId:top.parent().attr('data-uuid')!==''?child.parent().attr('data-uuid'):0,
                    modelId: _this.$route.query.plan
                  })
                  traverseTree(child.eq(item))
                })
              }
            }
            console.log(this.testArr)
          }
          let pageModelResult = {  //  这是添加的页面模型名称
            modelName: this.pagename,//页面模型名称
            contentType: this.modelvalue,//内容提供方式
            modelType: this.Contentvalue,//模型类型
            siteId: this.vertical,
            modelRegularExpression: this.regular,//模型正则表达式,
            urlsAllowCrawlRegex: this.Allowscraw,//允许爬行的URLs,
            urlsNotAllowCrawlRegex: this.NotAllowscraw,//不允许爬行的URLs,
            urlExtractable: 1,//是否抽取URL（1和0）
            urlExtractRuleType: this.extractvalue,//UrL规则类型（三种）,
            urlExtractRule: this.urlattributes,//抽取url规则（正则）,
            pageTurningable: 0,//表示是否翻页(),
            browserType: 1,//浏览器类型默认1
          }
          let pageModelPropertyResult = JSON.stringify(this.testArr)
          axios.get('pagemodel/add', {
            params: {
              pageModelResult: pageModelResult,
              pageModelPropertyResult: pageModelPropertyResult,
              token: getToken('Token')
            }
          }).then(response => {
            console.log(response)
            this.testArr = []
          })
        }
      },
      cancel () {
        this.showModal = false
      },
      back () { this.$router.push({path: '/base/siteManagement'})},
      checkOut () {
        this.dis = false
        var quit = this.$route.query.plan
        let params = Qs.stringify({
          modelId: quit,
          token: getToken('Token')//token验证
        })
        var that = this
        axios.post('pagemodel/checkout', params).then(response => {
          console.log(response)
        })
      },
      additive () {
        this.modal10 = true
      },
      addlist () {
        if (this.animal == '属性组') {
          /*test数组里的子集*/
          var obj = {
            value: this.attribute.length,
            label: this.value17,
            propery: [],
            name: '',
            Codedformats: [
              {
                value: '1',
                label: 'xpath'
              },
              {
                value: '2',
                label: '正则表达式'
              },
              {
                value: '3',
                label: 'css'
              },

            ]
          }
          this.attribute.push(obj)
          console.log(this.attribute)
          this.test = this.attribute


          return false
        }
        if (this.animal == '属性') {
          var that = this
          if (that.model7 == 0) {
            var obj = {
              value: this.attribute.length,
              label: this.value17,
              propery: [],
              name: '',
              Codedformats: [
                {
                  value: '1',
                  label: 'xpath'
                },
                {
                  value: '2',
                  label: '正则表达式'
                },
                {
                  value: '3',
                  label: 'css'
                },

              ]
            }
            this.attribute.push(obj)
            console.log(this.attribute)
            this.test = this.attribute
//            this.attribute.push(obj)

            console.log('test')
            console.log(this.test)
          } else {
            console.log('选择属性')

            console.log(this.model7)
            var lists = this.attribute[this.model7]
            console.log(lists)
            var properyArr = {
              name: this.value17,
              values: '',
              names: '',
              cityList: [
                {
                  value: '1',
                  label: 'xpath'
                },
                {
                  value: '2',
                  label: '正则表达式'
                },
                {
                  value: '3',
                  label: 'css'
                },

              ]
            }
            console.log('zhiqian')
            console.log(this.test)
            this.test[this.model7].propery.push(properyArr)
            console.log('zhihou')
            console.log(this.test)
          }
          return false
        }
        if (this.animal == '' || this.model7 == '') {
          that.error('请选择属性/属性组')
        }
      },
      success (msg) {
        this.$Message.success(msg)
      },
      error (msg) {
        this.$Message.error(msg)
      },
      listSiteName () {
        axios.post('site/listsitename',
          Qs.stringify({token: getToken('Token')})
        ).then(response => {
          response.data.data.map(item => {
            this.items.push({siteName: item.siteName, siteId: item.siteId})

          })
        })
      }
    },
    created () {
      axios.post('pagemodel/listParseRuleType', Qs.stringify({token: getToken('Token')})).then(response => {
        this.BeyebeTest = response.data.data
      })
      this.listSiteName()//---------------------listsitename
      if (this.$route.query.active === 'update') {
        this.dis = true
      } else {
        this.dis = false
      }
      let FANGSHI = Qs.stringify({
        token: getToken('Token'),
      })
      axios.post('pagemodel/contentType', FANGSHI).then(response => {    // 内容提供方式
        response.data.data.map(item2 => {
          this.Contentmode.push({
            value: item2.itemType,
            label: item2.itemName
          })
        })
      })
      let ss = Qs.stringify({
        token: getToken('Token'),
      })
      axios.post('pagemodel/queryModelType', ss).then(response => {    // 模型类型
        response.data.data.map(item2 => {
          this.modelType.push({
            value: item2.itemType,
            label: item2.itemName
          })
        })
      })
      if (this.quit) {
        let params = Qs.stringify({
          modelId: this.quit,
          token: getToken('Token')
        })
        axios.post('pagemodel/query', params).then(response => {
          let data = response.data.data
          console.log(response)
          this.pagename = data.modelName
          this.modelvalue = data.modelType
          this.Contentvalue = data.contentType
          this.vertical = data.sIteId
          this.urlattributes = data.urlExtractable
          this.extractvalue= data.listParseRuleType
          this.regular = data.modelRegularExpression


        })
      } else {
        console.log('2')
      }
    }
  }
</script>
<style lang="scss" scoped>

    .login-container {
        min-height: 100%;
        height: 100vh;
        top: -114px;
        left: -262px;
        .form-group {
            width: 100%;
            height: 70px;
            background: #2B3D4F;
            .form-group-img {
                padding-top: 10px;
            }
            .form-group-text {
                position: absolute;
                padding-top: 5px;

            }
            .form-group-text2 {
                float: right;
                color: #fff;
                font-size: 16px;
                padding-top: 10px;
                padding-right: 46px;

            }
            &-text {
                color: #fff;
                font-size: 22px;
                text-align: center;

            }

        }
        //form-group
        .menus {
            width: 230px;
            height: 930px;
            background: #2B3D4F;
            margin-top: 19px;
            margin-left: 20px;
            float: left;
        }
        .top {
            background: #35414F;
            height: 50px;
            color: #EFF2F7;
            border-bottom: 1px solid #FFFFFF;
            p {
                font-size: 16px;
                text-align: center;
                padding-top: 13px;

            }

        }
        .down {
            background: #2B3D4F;
            p {
                font-size: 14px;
                padding-left: 53px;
                color: #CCCCCC;

            }

        }
        .list-left {
            padding-top: 10px;
            a {
                font-size: 14px;
                color: #FFFFFF;
                padding-left: 69px;

            }
            li {
                height: 29px;
            }
        }
        .lacation {
            float: left;
            padding-left: 40px;
            padding-top: 17px;
            .nowlacation {
                a {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #323232;
                    a:last-child {
                        color: #0B0000;

                    }
                }
            }
        }
        //...........
        .sitename {
            background: #FFFFFF;
            width: 80%;
            height: 96px;
            position: absolute;
            top: 113px;
            left: 283px;
            .sitename2 {
                font-size: 14px;
                color: #323232;
                padding-top: 37px;
                padding-bottom: 27px;
                padding-left: 21px;
                .ivu-btn-success {
                    font-size: 14px;
                    width: 76px;
                }
                .ivu-btn-text {
                    font-size: 14px;
                    margin-left: 20px;
                    width: 76px;
                }
            }

        }
        .formlist {
            width: 1630px;
            height: 827px;
            background: #FFFFFF;
            position: absolute;
            top: 229px;
            left: 281px;
            .tabletr {
                ont-family: MicrosoftYaHei;
                font-size: 14px;
                color: #000000;
                padding-left: 15px;
            }

        }
        .ivu-btn-success {
            color: #fff;
            background: #17BB9C;
            border-radius: 3px;
            font-size: 14px;

        }

    }
</style>
<style lang="scss">
    .test {
        margin-left: 10px;
    }

    html, body {
        height: 100vh;
        min-height: 100%;
        background: #EBEFF0;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .ivu-modal-header {
        background: #2B3D4F;
        border-radius: 3px;
        border-bottom: 1px solid #CCCCCC;
    }

    .ivu-modal-header-inner {
        text-align: center;
        font-size: 16px;
        border-radius: 3px;
        color: #fff;
    }

    .ivu-modal-footer > button:first-child {
        background: #EBEFF0;
        color: #323232;
        border: 1px solid #CCCCCC;
    }

    .ivu-modal-footer > button:last-child {
        background: #17BB9C;
        color: #fff;
    }

    .qq > :hover {
        display: block;
    }

    .ivu-input {
        border-radius: 0px;
    }

    textarea.ivu-input {
        height: 99px;
    }

    .ivu-tabs {
        margin-left: 20px;
    }

    .ivu-page {
        padding-top: 20px;
        padding-right: 65px;
        position: relative;
    }

    .ivu-table-wrapper {
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;
    }

    .sitename5 {
        background: #fff;
        position: absolute;
        width: 100%;
        height: 900px;
    }

    .guanli {
        color: #17BB9C;
    }

    p.sitename44 {
        margin-top: -25px;
        font-size: 14px;
    }

    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        background: #17BB9C;
    }

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }


</style>