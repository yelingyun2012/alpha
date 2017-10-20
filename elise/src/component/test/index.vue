<template lang="pug">
    Button(type="primary", @click="test") 测试
</template>
<script>
  import axios from 'axios'
  import Qs from 'qs'

  export default {
    name: 'test',
    methods: {
      test () {
        let pageModelResult=Qs.stringify({
          modelName: 1,//页面模型名称
          contentType: 1,//内容提供方式
          modelType: 1, //模型类型
          siteId: 1,//-----siteID
          modelRegularExpression: 1,//模型正则表达式
          urlsAllowCrawlRegex: 1,//允许爬行的URLs
          urlsNotAllowCrawlRegex: 1,//不允许爬行的URLs
          urlExtractable: 1,//是否抽取URL（1和0）
          urlExtractRuleType: 1,//UrL规则类型（三种）
          urlExtractRule: 1,//抽取url规则（正则）
          pageTurningable: 0,//表示是否翻页()
          browserType: 1,//浏览器类型默认1
        })
        let pageModelPropertyResult=Qs.stringify({
          propertyName: 1,//页面模型名
          urlPropertyExtract: 1,
          parentId: 1,
          modelId: 1,
          groupType: 1,//http://192.168.10.151:8181/pagemodel/add
          parseType: 1,
          matchExpression: 1,
        })
        let tokens=Qs.stringify({
          token:'1'
        })
//        let params = Qs.stringify({
//          pageModelResult: {
//            modelName: 1,//页面模型名称
//            contentType: 1,//内容提供方式
//            modelType: 1, //模型类型
//            siteId: 1,//-----siteID
//            modelRegularExpression: 1,//模型正则表达式
//            urlsAllowCrawlRegex: 1,//允许爬行的URLs
//            urlsNotAllowCrawlRegex: 1,//不允许爬行的URLs
//            urlExtractable: 1,//是否抽取URL（1和0）
//            urlExtractRuleType: 1,//UrL规则类型（三种）
//            urlExtractRule: 1,//抽取url规则（正则）
//            pageTurningable: 0,//表示是否翻页()
//            browserType: 1,//浏览器类型默认1
//          },
//          pageModelPropertyResult: {
//            propertyName: 1,//页面模型名
//            urlPropertyExtract: 1,
//            parentId: 1,
//            modelId: 1,
//            groupType: 1,//http://192.168.10.151:8181/pagemodel/add
//            parseType: 1,
//            matchExpression: 1,
//          },
//          token: '1'
//        })
        axios.post('http://192.168.10.151:8181/pagemodel/add', a).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>