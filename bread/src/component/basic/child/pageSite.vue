<template lang="pug">
	section
		<RadioGroup v-model="siteVal">
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
			siteVal:1
    };
  },
  mounted() {
		this.getData();
	},
  methods: {
    getData() {
      listSiteName({ token: getCookie("token") }).then(response => {
        this.siteData = response.data.data;
        this.siteVal = this.siteData[0].siteId;
      });
    }
  }
};
</script>