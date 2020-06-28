<!--
 * @Author: [hsp]
 * @Date: 2020-06-28 10:31:54
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-28 10:32:06
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
  name: "group",
  computed: {
    ...mapGetters(["name"])
  }
}
</script>

<style scoped>
</style>
