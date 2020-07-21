<!--
 * @Author: [hsp]
 * @Date: 2020-07-08 18:33:51
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-20 16:11:18
 * @Description: 
--> 
<template>
  <div @click.stop="onclick($event)">
    <swiper
      class="my-swipe"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="5000"
      duration="500"
    >
      <swiper-item v-for="(item,index) in 5" :key="index">{{item}}</swiper-item>
    </swiper>
  </div>
</template>
<script>
export default {
  props: ["options"],
  watch: {
    options(e) {
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