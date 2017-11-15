let a = [
  {
    modelId: "127",
    modelName: "tutui",
    siteDomainName: "http:www.iu.com"
  },
  {
    modelId: "132",
    modelName: "opi",
    siteDomainName: "http:www.iu.com"
  },
  {
    modelId: "133",
    modelName: "wowowq",
    siteDomainName: "http:www.iu.com"
  }
]
a.filter(item => {
  console.log(item.siteDomainName)
  // if(a.includes(item.siteDomainName)){
  //   console.log('包含')
  // }
})
