<template lang="pug">
    section.app-main
        .header-wrapper
            HeaderView
        router-view
</template>
<script>
  import Header from './header.vue'
  export default {
    name: 'AppMain',
    components: {
      HeaderView: Header
    }
  }
</script>
<style lang="scss" scoped>
    .header-wrapper {
        background: #3E4A58;
        width: 100%;
        z-index: 10000;
    }
    .app-main {
        background-color: #E9EDF2;
    }
</style>
<style lang="scss">
    /*更新时间*/
    .updateTime-wrapper {
        background-color: #FFF5E6;
        padding: 10px 20px;
        margin: 7px -20px 20px;
        font-size: 14px;
        color: #323232;
    }
    /*页面布局*/
    .page {
        &-wrapper {
            margin-left: 180px;
            padding: 7px 20px 20px;
        }
        &-content {
            background: #fff;
            margin-top: 20px;
            min-height: 500px;
            clear: both;
            overflow: hidden;
            box-shadow: 0 0 8px 0 rgba(147, 147, 147, 0.50);
        }
    }
    /*类别树*/
    .navTree {
        float: left;
        width: 150px;
    }
    .tree {
        &-title {
            background-color: #00B27A;
            color: #ffffff;
            padding: 10px 10px;
            font-size: 14px;
            .ivu-icon-navicon {
                font-size: 20px;
                margin-right: 5px;
                vertical-align: top;
            }
        }
        &-list {
            border: 1px solid #00B27A;
            box-shadow: 0 0 8px 0 #B9B9B9;
            padding: 0 8px 10px 8px;
        }
    }
    /*导出按钮*/
    .derive {
        &-wrapper {
            padding: 20px 0 5px 0;
            text-align: right;
            border-bottom: 1px solid #00B27A;
        }
    }
    /*分页按钮*/
    .pagination-wrapper {
        &::after {
            clear: both;
            display: block;
            overflow: hidden;
            height: 0;
            content: "\0020";
        }
        .ivu-page {
            float: right;
            padding: 20px 0;
        }
    }
    /*表格th 背景色*/
    .ivu {
        &-table {
            th {
                background-color: #F0F0F2;
            }
        }
    }
    .ivu-table-cell {
        padding: 5px !important;
    }
    .table td {
        border-bottom: 1px solid #ccc !important;
        border-right: 1px solid #ccc !important;
    }
</style>