<!--
 * @Author: [hsp]
 * @Date: 2020-07-08 18:33:51
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-30 11:57:16
 * @Description: 
--> 
<template>
  <div @click.stop="onclick($event)">
    <van-swipe
      class="my-swipe"
      :autoplay="t_options.duration"
      :duration="t_options.duration"
      indicator-color="white"
    >
      <van-swipe-item>1</van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  props: ["options"],
  watch: {
    options(e) {
      console.log(e, "====");
      this.t_options = e;
    }
  },
  data() {
    return {
      t_options: { duration: 2000 }
    };
  },
  mounted() {
    console.log(this.popdata);
  },
  methods: {
    onclick(e) {
      this.$emit("onclick", e);
    }
  }
};
</script>
<style lang="css">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>