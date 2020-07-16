<template>
  <div>
    <basecompLunbotu></basecompLunbotu>
  </div>
</template>

<script>
import { openModules } from "@/config/index";
import basecompLunbotu from "@/components/basecomp_lunbotu/basecomp_lunbotu.vue";
export default {
  data() {
    return {
      apps_body: [],
      openList: [],
      openListValue: []
    };
  },
  components: { basecompLunbotu },
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