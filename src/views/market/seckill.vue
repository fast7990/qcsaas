<!--
 * @Author: [hsp]
 * @Date: 2020-06-28 10:28:01
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-28 10:28:17
 * @Description: 
--> 
<template>
  <div>
    <span>asdasd</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "seckill",
  computed: {
    ...mapGetters(["name"])
  }
}
</script>

<style scoped>
</style>
