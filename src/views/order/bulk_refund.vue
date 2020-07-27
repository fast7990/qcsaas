<template>
  <div class="page-container">
    <div class="head">
      <el-button type="success">下载模板</el-button>
      <el-button type="primary">导入退款订单</el-button>
    </div>
    <div class="con">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <template slot="empty">
          <div>
            暂无商品记录，请
            <el-button @click="importProduct(1)" type="text">导入退款订单</el-button>
          </div>
        </template>
      </el-table>
    </div>
    <div class="delete">
      <div class="left">
        <el-button>移除记录</el-button>
        <p>移除勾选的退款记录，将不纳入批量退款处理</p>
      </div>
      <div class="block">
        <span class="demonstration">显示总数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
    <div class="foot"> 
      <el-button>确认退款</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BulkRefund",
  data(){
    return{
      tableData:[],
      currentPage: 1 
    }
  },
  methods:{
    handleSelectionChange(){

    },
    handleSizeChange(){},
    handleCurrentChange(){}
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  margin: 0 30px;
}
.delete{
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #ccc;
  display: flex;  
  justify-content: space-between;
  align-items: center;
  .left{
    display: flex;
    font-size: 12px;
    p{
      margin-left: 10px
    }
  }
  .block{
    .demonstration{
      font-size: 12px;
    }
  }
}
.foot{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>

