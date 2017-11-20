<template>
  <div class="pageModelBasicTree">
    <ul>
      <div style="padding:20px 0;">
        <span @click.stop="toggle(item.propertyId)" v-show="toggleId !== item.propertyId" class="w100">{{item.propertyName}}</span>
        <span @click.stop v-show="toggleId === item.propertyId"><Input v-model="item.propertyName" class="w100"></Input></span>
        <Select v-model="item.parseType" style="width: 100px;text-align:left;">
          <Option v-for="(val,index) in httpCon" :key="index" :value="val.itemType">{{val.itemName}}</Option>
        </Select>
        <Input v-model="item.matchExpression" style="width: 300px"></Input>
        是否为URL属性：
        <RadioGroup v-model="item.urlPropertyExtract">
          <Radio :label="1">是</Radio>
          <Radio :label="0">否</Radio>
        </RadioGroup>
        <Button type="error" @click.stop="$emit('remove')">删除</Button>
      </div>
      <ul v-if="isFolder">
        <pageModelBasicTree v-for="(val, index) in item.children" :key="index" :item="val" @remove="delItem(index)"></pageModelBasicTree>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: "pageModelBasicTree",
  props: {
    item: Object
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.$store.dispatch("setToggleId", "-1")
      }
    })
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length
    },
    toggleId() {
      return this.$store.getters.getToggleId
    },
    httpCon() {
      return this.$store.getters.getHttpCon
    }
  },
  methods: {
    toggle(id) {
      this.$store.dispatch("setToggleId", id)
    },
    //删除
    delItem(index) {
      this.item["children"].splice(index, 1)
    }
  }
}
</script>

<style lang='stylus' scoped>
ul
  padding-left 20px
.w100
  display inline-block
  width 100px
  text-align right
</style>
