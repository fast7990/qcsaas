<template>
  <div class="pages white-bg">
    <div class="cell-top">
      <el-row :gutter="20">
        <el-col>
          <el-button type="success" size="medium">下载模板</el-button>
          <el-button type="primary" size="medium" @click="importProduct(2)">导入商品</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        :border="false"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="changeSortTable"
        :header-cell-style="{background:'#f2f2f2'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="商品" width="200"></el-table-column>
        <el-table-column prop="name" label="商品分类"></el-table-column>
        <el-table-column prop="address" label="售价" sortable></el-table-column>
        <el-table-column prop="address" label="市场价"></el-table-column>
        <el-table-column prop="address" label="库存" sortable></el-table-column>
        <el-table-column prop="address" label="SKU数量" sortable></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">添加图片</el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div>
            暂无商品记录，请
            <el-button @click="importProduct(1)" type="text">导入商品</el-button>
          </div>
        </template>
      </el-table>
      <div class="flex flex--justify-content--space-between" style="padding-top:10px;">
        <div>
          <el-button type="danger" size="small">移除商品</el-button>
          <span style="color:#999999;margin-left:10px;">移除勾选的商品，将不被导入商品库</span>
        </div>
        <div class="flex flex--align-items--center">
          <span style="color:#999999">共3条，每页显示10条</span>
          <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="批量导入" :visible.sync="show_dialog_visible" width="30%">
      <div>
        <div class="flex flex--align-items--center">
          <p style="width:80px;">上传模版：</p>
          <input type="file" />
        </div>
        <div class="flex flex--align-items--center">
          <p style="width:80px;"></p>
          <p>最多可导入N条数据，文件大小不可超过2M，若未下载模板请下载批量导入模板</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importProduct(4)">取 消</el-button>
        <el-button type="primary" @click="importProduct(3)">导 入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "product",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      show_dialog_visible: false,
      total_num: 100,
      tableData: [
        {
          selection: "1123",
          date: "2020-09-01",
          name: "茶叶树",
          address: "xxxx",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeSortTable(e) {
      console.log(e);
    },
    handleClick(row) {
      console.log(row);
    },
    importProduct(type) {
      if (type == 1) {
        this.show_dialog_visible = true;
      } else if (type == 2) {
        this.show_dialog_visible = true;
      } else if (type == 3) {
        this.show_dialog_visible = false;
      } else if (type == 4) {
        this.show_dialog_visible = false;
      }
    },
    handleClose(done) {
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
.pages {
  padding: 10px 20px;
  background: #ffffff;
}
.cell-top {
  padding: 10px;
}
</style>
