<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-13 13:22:42
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-30 10:05:17
 * @Description 组合连接组件
-->

<template>
  <div class="zuhelianjie" data-name="basecomp_zuhelianjie" @click="onclick"></div>
</template>

<script>
export default {
  name: "BasecompZuhelianjie",
  props: ["options"],
  data() {
    return {
      isShowDesc: {
        default: true,
      },
      items: "",
    };
  },
  watch: {
    options: {
      handler: function () {
        console.log(this.options);
        this.items = this.options.data;
        this.isShowDesc = this.options.isShowDesc;
      },
      deep: true,
    },
  },
  methods: {
    onclick() {
      this.$emit("onclick");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
