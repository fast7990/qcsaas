<template>
        <div>
        <basecomplunbotu />
        <div>npc</div>
        </div>
      </template>
      <script>
      import basecomplunbotu from "@/components/basecomp_lunbotu/basecomp_lunbotu.vue";
  export default {
    data() {
      return {
        apps_body: [],
        openList: [],
        openListValue: []
      };
    },
    components: { basecomplunbotu },
    onPullDownRefresh() {
      setTimeout(() => {
        //todo
        mpvue.stopPullDownRefresh();
      }, 500);
    },
    onShow() { },
    onLoad() { },
    created() {
      this.getList();
    },
    methods: {
      getList() { },
      onClick() { }
    }
  };
      </script >
  <style scoped></style>