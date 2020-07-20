<template>
  <div>
    <basecomplunbotu />
    <basecompsousuolan />
  </div>
</template>
      <script>
import basecomplunbotu from "@/components/basecomp_lunbotu/basecomp_lunbotu.vue";
import basecompsousuolan from "@/components/basecomp_sousuolan/basecomp_sousuolan.vue";
export default {
  data() {
    return {
      apps_body: [],
      openList: [],
      openListValue: []
    };
  },
  components: { basecomplunbotu, basecompsousuolan },
  onPullDownRefresh() {
    setTimeout(() => {
      //todo
      mpvue.stopPullDownRefresh();
    }, 500);
  },
  onShow() {},
  onLoad() {},
  created() {
    this.getList();
  },
  methods: {
    getList() {},
    onClick() {}
  }
};
</script>
    <style scoped></style>