<template>
  <div class="details">
    <ul class="tabs">
      <li>
        <el-button type="primary">基本信息</el-button>
      </li>
      <li>
        <el-button>消费明细</el-button>
      </li>
      <li>
        <el-button>积分明细</el-button>
      </li>
      <li>
        <el-button>储蓄明细</el-button>
      </li>
      <li>
        <el-button>优惠券明细</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id
    };
  },
  mounted() {
      this.getTabs()
  },
  methods:{
      getTabs(){
         
      }
  }
};
</script>

<style lang="scss">
.details {
  padding: 10px 20px;
}
.tabs {
  display: flex;
  li {
    font-size: 12px;
    height: 40px;
  }
  li:nth-child(1) {
    .el-button {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
  }
  li:last-child {
    .el-button {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
}
</style>