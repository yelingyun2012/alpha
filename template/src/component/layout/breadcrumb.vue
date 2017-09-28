<template lang="pug">
    aside.app-breadcrumb
        Breadcrumb(separator="/")
            BreadcrumbItem(href="/") Home
            BreadcrumbItem(href="/components/breadcrumb") Components
            BreadcrumbItem Breadcrumb
</template>
<script>
    export default {
      name:''
    }
</script>
<style lang="scss" scoped>
    .app{
        &-breadcrumb{
            z-index:99;
            margin-left: 200px;
            /*width: 100%;*/
            height: 46px;
            padding: 12px 16px;
            border-bottom: 1px solid #cfd8dc;
        }
    }
</style>