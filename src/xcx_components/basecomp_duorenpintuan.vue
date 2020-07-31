<!--
 * @Author: [hsp]
 * @Date: 2020-07-09 14:50:59
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-31 11:48:08
 * @Description: x
-->
<template>
  <div class="shousuolan" @click.stop="onclick($event)" :style="{background:options.bg_color}">
    <div
      class="content-box"
      :class="'style'+(options.curr_1?options.curr_1:0)"
      :style="{background:options.comp_color}"
    >
      <van-icon name="search" class="search-icon ml10" />
      <span class="places ml10">{{options.placeholder?options.placeholder:''}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          curr_1: 0,
          comp_color: "#ffffff",
          bg_color: "#ffffff",
          placeholder: "",
        };
      },
    },
  },
  data() {
    return {
      set_options: {
        curr_1: 0,
        comp_color: "#ffffff",
        bg_color: "#ffffff",
        placeholder: "",
      },
    };
  },
  methods: {
    showStyleClass(key) {
      switch (key) {
        case 0:
          break;
          return "style1";
        case 1:
          break;
          return "style2";
        case 2:
          break;
          return "style3";
        case 3:
          break;
          return "style4";
        default:
          break;
      }
    },
    onclick(e) {
      this.$emit("onclick", e);
    },
  },
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
.shousuolan .content-box.style0 {
  border-radius: 5px;
  background: #ffffff;
}
.shousuolan .content-box.style1 {
  border-radius: 50px;
  background: #ffffff;
}
.shousuolan .content-box.style2 {
  border-radius: 5px;
  background: #d3d3d3;
}
.shousuolan .content-box.style3 {
  border-radius: 50px;
  background: #d3d3d3;
}
.shousuolan .content-box .places {
  color: #999999;
}
.ml10 {
  margin-left: 10px;
}
</style>