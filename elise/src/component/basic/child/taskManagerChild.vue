<template lang="pug">
  p taskManage
</template>
<script>
  export default {
    name: 'TaskManagerChild',
    created () {
      console.log(this.$route.params.id)
    }
  }
</script>