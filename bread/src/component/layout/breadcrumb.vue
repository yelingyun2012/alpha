<template lang="pug">
  Breadcrumb
    BreadcrumbItem(v-for="item in currentPath", :href="item.path", :key="item.name") {{item.title}}
</template>
<script>
  export default {
    name: 'BreadCrumb',
    props: {
      currentPath: Array
    }
  }
</script>
