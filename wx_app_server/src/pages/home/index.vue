<template>
  <div>
    <div @click="open">asd</div>
  </div>
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
  created() {
    // let app = getApp()
  },
  onShow() {
    console.log(1212);
  },
  onPullDownRefresh() {
    setTimeout(() => {
      //todo
      wx.stopPullDownRefresh();
    }, 500);
  },
  methods: {
    open() {
      wx.switchTab({
        url: "/pages/my/main"
      });
    }
  }
};
</script>

<style scoped></style>