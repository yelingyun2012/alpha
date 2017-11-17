<template lang="pug">
	section
		<RadioGroup v-model="siteId">
			<Radio v-for="site in siteData" :label="site.siteId" :key="site.siteId">{{site.siteName}}</Radio>
		</RadioGroup>
</template>

<script>
import { listSiteName } from "../../../config/getData";
import { getCookie } from "../../../utils/cookie";

export default {
  name: "pageSite",
  data() {
    return {
			siteData: [],
			siteId:1
    };
  },
  mounted() {
		this.getData();
	},
  methods: {
    //获取列表
    getData() {
      listSiteName({ token: getCookie("token") }).then(response => {
        this.siteData = response.data.data;
        this.siteId = this.siteData[0].siteId;
      });
    },
    //提交
    pageSiteSubmit(){
      this.$emit("siteData",this.siteId);
    }
  }
};
</script>