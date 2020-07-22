<template>
  <div class="members">
    <el-row>
      <el-button type="primary">编辑会员等级</el-button>
    </el-row>
    <div class="member_type">
      <div class="type_one">
        <div>
          <span>会员卡</span>
          <b>132135132131</b>
        </div>
        <h3>LV.1</h3>
        <p>当前成长值500</p>
      </div>
      <div class="type_two">xxxxxx</div>
      <div class="type_three">zzzzzzzzz</div>
    </div>
    <div class="member_list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#f2f2f2' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="客户信息" width="350px">
          <template slot-scope="scope" width="350px">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="分类" width="350px"></el-table-column>
        <el-table-column prop="name" label="消费金额" sortable width="350px"></el-table-column>
        <el-table-column prop="name" label="消费次数" sortable width="350px"></el-table-column>
        <el-table-column prop="name" label="操作" show-overflow-tooltip width="350px"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.members {
  padding: 10px 20px;
  background: #ffffff;
}
.member_type {
  box-sizing: border-box ;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  & > div {
    height: 157px;
    border: 1px solid red;
    background: #f6f6f6;
    border-radius: 3px;
  }
  .type_one {
    width: 466px;
    padding-left: 18px;
    margin-top: 20px;
    div {
      display: flex;
      align-items: flex-end;
      margin-top: 14px;
      span {
        font-size: 18px;
        font-family: "微软雅黑", "微软雅黑"-400;
        font-weight: 400;
      }
      b {
        font-size: 12px;
        font-family: "微软雅黑", "微软雅黑"-400;
        font-weight: 400;
        color: #666666;
      }
    }
    h3 {
      width: 187px;
      margin: 0;
      margin-top: 14px;
      font-size: 28px;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
    }
    p {
      margin: 0;
      margin-top: 30px;
      font-size: 12px;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
      color: #666666;
    }
  }

  .type_two {
    width: 522px;
  }
  .type_three {
    width: 710px;
  }
}
</style>
