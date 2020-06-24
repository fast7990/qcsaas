<template>
  <div>
    <span>asdasd</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "data",
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style scoped>
</style>
