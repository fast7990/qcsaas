<!--
 * @Author: [hsp]
 * @Date: 2020-06-28 10:58:24
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-28 10:58:25
 * @Description: 
-->
<template>
  <div class="users">
    <div class="users_container">
      <el-form ref="label_form" :model="label_form">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-button type="primary" size="medium" icon="el-icon-plus">新增标签</el-button>
          </el-col>
          <el-col :span="6">
            <div class="search">
              <input type="text" />
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        :header-cell-style="{ background: '#f2f2f2' }"
        @selection-change="handleSelectionChange"
        
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="标签名称"  align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="客户数量" align="center"></el-table-column>
        <el-table-column prop="name" label="标签说明" align="center"></el-table-column>
        <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="name" label="操作"  align="center"></el-table-column>
      </el-table>
      <div class="delete">
        <el-button>删除标签</el-button>
        <p>删除勾选的标签，且移除客户与该标签关系</p>
        <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "customer_label",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      value1: "",
      total_num: 100,
      tableData: [],
      label_form: {}
    };
  },
  methods: {
    handleSelectionChange(){}
  }
};
</script>

<style lang="scss">
.users {
  padding: 10px 20px;
  background: #ffffff;
}
.input-box {
  width: 300px;
}
.bg {
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
}
.data {
  margin-top: 20px;
}
.search {
  display: flex;
  input {
    width: 200px;
    height: 36px;
    border: none;
    border: 1px solid #409eff;
  }
  .el-button {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.delete {
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  position: relative;
  p {
    height: 20px;
    font-family: "微软雅黑", "微软雅黑"-400;
    font-weight: 400;
    color: #999999;
    margin-left: 12px;
  }
  .el-pagination {
    position: absolute;
    right: 0;
  }
}
</style>  
