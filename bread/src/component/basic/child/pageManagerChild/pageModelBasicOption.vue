<template>
  <div class="pageModelBasicOption">
    <Option :value="item.propertyId">{{item.propertyName}}</Option>
    <template v-if="isFolder">
      <pageModelBasicOption v-for="(val, index) in item.children" :key="index" :item="val" v-if="val.children">{{val.propertyName}}</pageModelBasicOption>
    </template>
  </div>
</template>

<script>
export default {
  name: "pageModelBasicOption",
  props: {
    item: Object
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    }
  }
};
</script>
