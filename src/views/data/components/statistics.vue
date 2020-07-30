<template>
  <div class="title">
    <p>{{title}}</p>
    <ul>
      <li v-for="item in statisticsList" :key="item.title">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            default:"整体销售统计"
        },
        statisticsList:{
            type: Array,
            default:[]
        }
    }
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  background: #f6f6f6;
  p {
    float: left;
    font-size: 18px;
    font-weight: bold;
    line-height: 60px;
    margin: 0;
    margin-left: 15px;
  }
  ul {
    height: 100%;
    line-height: 60px;
    float: right;
    li {
      width: 180px !important;
      float: left;
    }
  }
}
</style>