<template>
  <div class="pageModelBasicTree">
    <ul>
      <div class="ulBlock">
        <span @click.stop="toggle(item.propertyId)" v-show="toggleId !== item.propertyId"
              class="w100">{{item.propertyName}}</span>
        <span @click.stop v-show="toggleId === item.propertyId"><Input v-model="item.propertyName" class="w100"></Input></span>
        <Icon :type="item.groupType === 0 ? 'document-text' : 'navicon-round'" style="font-size: 24px;vertical-align: middle;"></Icon>
        <Select v-model="item.parseType" style="width: 100px;text-align:left;">
          <Option v-for="(val,index) in httpCon" :key="index" :value="val.itemType">{{val.itemName}}</Option>
        </Select>
        <Input v-model="item.matchExpression" style="width: 200px"></Input>
        <span>URL属性：</span>
        <RadioGroup v-model="item.urlPropertyExtract">
          <Radio :label="1">是</Radio>
          <Radio :label="0">否</Radio>
        </RadioGroup>
        <Button type="error" @click.stop="$emit('remove')">删除</Button>
      </div>
      <ul v-if="isFolder">
        <pageModelBasicTree v-for="(val, index) in item.children" :key="index" :item="val"
                            @remove="delItem(index)"></pageModelBasicTree>
      </ul>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions } from 'vuex'

  export default {
    name: 'pageModelBasicTree',
    props: {
      item: Object
    },
    mounted () {
      document.addEventListener('click', e => {
        if (!this.$el.contains(e.target)) {
          this.setToggleId('-1')
        }
      })
    },
    computed: {
      ...mapGetters({
        getToggleId:'pageModel/getToggleId',
        getHttpCon:'pageModel/getHttpCon',
      }),
      isFolder () {
        return this.item.children && this.item.children.length
      },
      toggleId () {
        return this.getToggleId
      },
      httpCon () {
        return this.getHttpCon
      }
    },
    methods: {
      ...mapActions({
        setToggleId:'pageModel/setToggleId'
      }),
      toggle (id) {
        this.setToggleId(id)
      },
      //删除
      delItem (index) {
        this.item['children'].splice(index, 1)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  ul
    padding-left 20px
    .ulBlock
      position relative
      padding 20px 0
  .w100
    display inline-block
    width 100px
    text-align right
</style>
