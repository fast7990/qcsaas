<template>
  <div>打开了asdasdasd</div>
</template>

<script>
export default {
  data() {
    return {
      motto: "Hello miniprograme"
    };
  },

  components: {},
  mounted() {},
  onPullDownRefresh() {
    setTimeout(() => {
      //todo
      wx.stopPullDownRefresh();
    }, 500);
  },
  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style lang='scss' scoped>
  @import "./main.scss";

</style>