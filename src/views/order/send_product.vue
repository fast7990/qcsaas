<!--
 * @Author: [hsp]
 * @Date: 2020-06-24 16:09:50
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-24 17:29:19
 * @Description: 
--> 
<template>
  <div class="page-container">
    <div>asdsad</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "send_product",
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.page {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
