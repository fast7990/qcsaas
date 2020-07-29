<template>
  <div class="users">
    <div class="users_container">
      <el-form ref="label_form" :model="label_form">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="newLoabel">新增标签</el-button>
            <el-dialog title="标签编辑" :visible.sync="newLoabelVisible" width="500px">
              <el-form status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item label="*标签名称:" class="flex" style="margin-top: 15px">
                  <el-input v-model="user" type="text" placeholder="请输入内容" class="input-box" />
                </el-form-item>
                <el-form-item label="标签说明:" class="flex" style="margin-left: 7px;margin-top: 15px">
                  <textarea
                    v-model="explain"
                    placeholder="请输入内容"
                    class="input-box"
                    style="border: 1px solid #ccc; padding-left: 15px;padding-top: 0"
                  ></textarea>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="newLoabelVisible = false">取 消</el-button>
                <el-button type="primary" @click="getNewLoabelVisible">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="6">
            <div class="search">
              <input type="text" placeholder="请输入标签名称"/>
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
        <el-table-column label="标签名称" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="客户数量" align="center"></el-table-column>
        <el-table-column prop="name" label="标签说明" align="center"></el-table-column>
        <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="name" label="操作" align="center"></el-table-column>
        <template slot="empty">
          <div>
            暂无商品记录，请
            <el-button @click="importProduct(1)" type="text">导入商品</el-button>
          </div>
        </template>
      </el-table>
      <div class="delete">
        <el-button type="danger" @click="labelDelete">删除标签</el-button>
        <p>删除勾选的标签，且移除客户与该标签关系</p>
        <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customer_label",
  data() {
    return {
      labelList: [],
      value1: "",
      total_num: 100,
      tableData: [],
      label_form: {},
      newLoabelVisible: false,
      explain: "",
      user: "",
    };
  },
  methods: {
    handleSelectionChange(e) {
      this.labelList = e;
    },
    // 新增标签
    newLoabel() {
      this.newLoabelVisible = true;
    },
    // 标签标签确认按钮
    getNewLoabelVisible() {
      if (this.explain === "" && this.user === "") {
        this.$message({
          message: "请填写必要信息",
          type: "error",
        });
      } else {
        this.$message({
          message: "标签添加成功",
          type: "success",
        });
      }
    },
    labelDelete() {
      if (this.labelList.length > 0) {
        this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }else{
        this.$message({
          message: "请勾选后重试",
          type: "warning",
        })
      }
    },
  },
};
</script>

<style lang="scss">
.users {
  padding: 10px 20px;
  background: #ffffff;
}
.labelDelete {
  margin: 0;
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
