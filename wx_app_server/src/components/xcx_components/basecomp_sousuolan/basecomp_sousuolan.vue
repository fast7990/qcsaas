<!--
 * @Author: [hsp]
 * @Date: 2020-07-09 14:50:59
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-20 16:44:17
 * @Description: x
-->
<template>
  <div class="shousuolan" @click.stop="onclick($event)">
    <div class="content-box">
      <label class="cuIcon-search"></label>
      <input type="text" :placeholder="placeholder" v-model="searchval" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchval: "",
      placeholder: "请输入搜索内容"
    };
  },
  methods: {
    onclick(e) {
      this.$emit("onclick", e);
    }
  }
};
</script>
<style lang="scss">
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