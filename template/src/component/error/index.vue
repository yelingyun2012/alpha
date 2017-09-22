<style lang="scss" scoped>
    .error {
        &-container {
            text-align: center;
            img {
                margin-top: 50px;
            }
        }
        &-state {
            color: #999;
            font-size: 28px;
        }
        &-msg {
            display: inline-block;
            font-size: 16px;
            color: #1482f0;
            margin-top: 20px;
        }
    }
</style>
<template lang="pug">
    section
        aside.error-container
            img(src="../../assets/images/errorBg.png")
            p.error-state 页面发生未知错误
            router-link(to="/").error-msg  稍后回来刷新看看吧
</template>
<script>
  export default {
    name: 'RequestError'
  }
</script>