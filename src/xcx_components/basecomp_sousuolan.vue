<!--
 * @Author: [hsp]
 * @Date: 2020-07-09 14:50:59
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-09 15:31:53
 * @Description: x
-->
<template>
  <div class="shousuolan" @click.stop="onclick($event)">
    <div class="content-box">
      <van-icon name="search" class="search-icon ml10" />
      <span class="places ml10">asdasd</span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onclick(e) {
      this.$emit("onclick", e);
    }
  }
};
</script>
<style lang="css">
.shousuolan {
  width: 100%;
  height: 50px;
  padding: 10px;
}
.shousuolan .content-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(228, 228, 228, 1);
  border-radius: 3px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.shousuolan .content-box .places {
  color: #999999;
}
.ml10 {
  margin-left: 10px;
}
</style>