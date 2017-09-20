<template lang="pug">
    section
        .error-http404
            .pic-404
                img(src="../../assets/images/404.png")
            .bullshit
                .bullshit__oops OOPS!
                .bullshit__info 版权所有
                    a.link-type(href="www.beyebe.com",target="_black") 比一比网络科技有限公司
                .bullshit__headline {{ message }}
                .bullshit__info 请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
                a(href="/").bullshit__return-home 返回首页
</template>
<script>
  export default {
    name: 'error',
    data () {
      return {
        message: '页面发生未知错误......'
      }
    }
  }
</script>
<style lang="scss" scoped>
    .error-http404 {
        position: relative;
        width: 1200px;
        padding: 0 100px;
        margin: 0 auto;
        overflow: hidden;
    }

    .pic-404 {
        position: relative;
        float: left;
        width: 600px;
        padding: 150px 0;
        overflow: hidden;
        img {
            width: 96%;
        }
    }

    .bullshit {
        position: relative;
        float: left;
        width: 300px;
        padding: 150px 0;
        overflow: hidden;
        &__oops {
            font-size: 32px;
            font-weight: bold;
            line-height: 40px;
            color: #1482f0;
            opacity: 0;
            margin-bottom: 20px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }
        &__headline {
            font-size: 20px;
            line-height: 24px;
            color: #1482f0;
            opacity: 0;
            margin-bottom: 10px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.1s;
            animation-fill-mode: forwards;
        }
        &__info {
            font-size: 13px;
            line-height: 21px;
            color: grey;
            opacity: 0;
            margin-bottom: 30px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.2s;
            animation-fill-mode: forwards;
        }
        &__return-home {
            display: block;
            float: left;
            width: 110px;
            height: 36px;
            background: #1482f0;
            border-radius: 100px;
            text-align: center;
            color: #ffffff;
            opacity: 0;
            font-size: 14px;
            line-height: 36px;
            cursor: pointer;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.3s;
            animation-fill-mode: forwards;
        }
        @keyframes slideUp {
            0% {
                transform: translateY(60px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    }
</style>