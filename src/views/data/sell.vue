<template>
  <div class="passenger">
    <Tabs></Tabs>
    <div class="whole">
      <Statistics :statisticsList="statisticsList"></Statistics>
    </div>
    <div class="Stored">
      <Statistics :statisticsList="statisticsList"></Statistics>
    </div>
    <div class="sale">
      <Statistics :statisticsList="statisticsList"></Statistics>
    </div>
  </div>
</template>

<script>
import Tabs from "./components/tabs";
import Statistics from "./components/statistics";
export default {
  name: "passenger",
  components: {
    Tabs,
    Statistics,
  },
  data() {
    return {
      statisticsList: [{
        title: "客单价: 123",
      } ]
    };
  },
};
</script>

<style scoped>
.passenger {
  padding: 15px;
}
</style>

<style lang="scss" scoped>
.whole,
.Stored,
.sale {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
