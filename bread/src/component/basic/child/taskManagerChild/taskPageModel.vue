<template lang="pug">
  section.task-manager-page
    Form(:label-width="120")
      Row
        Col(span="16")
          FormItem(label='站点：')
            Select(style="width:300px", v-model='siteVal')
              Option(v-for="site in siteData", :value="site.siteId", :key="site.siteId") {{site.siteName}}
          FormItem(label='采集起始地址：')
            Input(style='width:300px', v-model="startAddressVal",:maxlength="500")
            Button(type='primary', @click="handleMate").mate 匹配
          FormItem(label='更多起始地址：')
            Input(type="textarea", :rows="6", style='width:600px', v-model="moreStartAddressVal",:maxlength="20000")
        Col(span="8")
          aside(v-if='addressData.length !== 0')
            span 匹配模型：
            ul
              li(v-for='item in addressData') {{item.modelName}}
</template>
<script>
import { listSiteName, matchingModel } from "../../../../config/getData";
import { getCookie } from "../../../../utils/cookie";

export default {
  name: "TaskPageModel",
  data() {
    return {
      siteData: [],
      siteVal: "",
      startAddressVal: "",
      moreStartAddressVal: "",
      addressData: []
    };
  },
  methods: {
    handleMate() {
      if (this.startAddressVal === "") {
        this.$Message.warning("采集起始地址不能为空");
        return false;
      }
      matchingModel({
        siteId: this.siteVal,
        modelurl: this.startAddressVal,
        token: getCookie("token")
      }).then(response => {
        if (response.data.data.length === 0) {
          this.$Message.info("匹配页面模型为空");
        }
        this.addressData = response.data.data;
      });
    }
  },
  created() {
    listSiteName({ token: getCookie("token") }).then(response => {
      this.siteData = response.data.data;
      if (this.$route.params.id !== "alter") {
        this.siteVal = this.siteData[0].siteId;
      }
    });
  }
};
</script>
<style lang="stylus">
.task
  &-manager
    &-page
      margin-top -16px
      padding 20px
      .mate
        margin-left 15px
.ivu-form .ivu-form-item-label
  color #323232
  font-size 14px
</style>

