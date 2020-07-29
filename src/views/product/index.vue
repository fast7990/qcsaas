<template>
  <div class="pages white-bg">
    <el-form>
      <!-- line -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="商品名称/编码:">
            <el-input v-model="tradeName" style="width: 200px" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态:">
            <el-select v-model="state" placeholder="请选择">
              <el-option
                v-for="item in state_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品分类:">
            <el-select v-model="shopClassification" placeholder="请选择">
              <el-option
                v-for="item in classification_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品类型:">
            <el-select v-model="shopType" placeholder="请选择">
              <el-option
                v-for="item in shopType_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- line2 -->
      <el-row>
        <el-col :span="7">
          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="establishDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="价格:">
            <el-row :gutter="12">
              <el-col :span="4">
                <el-input v-model="priceOne" style="width: 100px" type="text" />
              </el-col>
              <el-col :span="3" style="text-align: center;margin-left: 30px">
                <span>-</span>
              </el-col>
              <el-col :span="4">
                <el-input v-model="priceTwo" style="width: 100px" type="text" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="价格:">
            <el-button type="primary" size="medium">筛选</el-button>
            <el-button size="medium">Excel导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="cell-top">
      <el-row :gutter="20">
        <el-col>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="topBtnClick(1)">添加商品</el-button>
          <el-button type="success" size="medium" @click="topBtnClick(2)">上架</el-button>
          <el-button type="danger" size="medium" @click="topBtnClick(3)">下架</el-button>
          <el-button type="warning" size="medium" @click="topBtnClick(4)">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-box" style="margin-top:10px;">
      <el-table
        :data="tableData"
        height="600"
        :border="false"
        style="width: 100%"
        :header-cell-style="{ background: '#f2f2f2' }"
        @selection-change="handleSelectionChange"
        @sort-change="changeSortTable"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="商品" width="200"></el-table-column>
        <el-table-column prop="name" label="商品分类"></el-table-column>
        <el-table-column prop="price" label="价格" sortable></el-table-column>
        <el-table-column prop="status" label="状态" :formatter="judgeStatus"></el-table-column>
        <el-table-column prop="status" label="销量" sortable></el-table-column>
        <el-table-column prop="status" label="库存" sortable></el-table-column>
        <el-table-column prop="name" label="商品类型"></el-table-column>
        <el-table-column prop="address" label="操作" width="60">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex flex--justify-content--end" style="padding-top:10px;">
        <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getProductList,
  getProductOnShelf,
  getProductOffShelf,
} from "@/api/product";
import { status } from "nprogress";
export default {
  name: "product",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      total_num: 10,
      tradeName: "", // 商品名称
      state: "", // 状态
      shopClassification: "", // 商品分类

      establishDate: "", // 创建时间
      priceOne:"", // 价格1
      priceTwo:"", // 价格2
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      shopType_options: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "普通商品",
        },
        {
          value: "2",
          label: "预售商品",
        },
      ], // 商品类型选择器数据
      state_options: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "上架",
        },
      ], // 状态选择器数据
      classification_options: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "上架",
        },
      ], // 商品分类选择器数据
      multipleSelection: "",
    };
  },
  created() {
    this.getProductLists();
  },
  computed: {
    judgeStatus(e) {
      e.tableData.forEach((v) => {
        if (v.status == 0) {
          v.status = "下架";
        } else {
          v.status = "上架";
        }
      });
    },
  },
  methods: {
    // 获取全部商品
    async getProductLists() {
      var token = document.cookie.split(";")[0].split("=")[1];
      var res = await getProductList({
        access_token: token,
      });
      this.tableData = res.response_data.items;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeSortTable(e) {
      console.log(e);
    },
    // 编辑
    handleClick(row) {
      this.$router.push({
        path: "/product/add_product",
        query: {
          details: row,
        },
      });
    },
    topBtnClick(type) {
      if (type == 1) {
        this.$router.push({ path: "/product/add_product" });
      } else if (type == 2) {
        this.getProductOnShelfs();
      } else if (type == 3) {
        this.getProductOffShelfs();
      }
    },
    // 上架
    getProductOnShelfs() {
      var mult = this.multipleSelection;
      if (mult.length) {
        var token = document.cookie.split(";")[0].split("=")[1];
        var ids = [];
        mult.forEach((v, i) => {
          ids.push(v.id);
          if (v.status == "下架") {
            var res = getProductOnShelf({
              access_token: token,
              ids: ids,
            });
            this.$message({
              message: "商品上架成功",
              type: "success",
            });
            this.getProductLists();
          } else {
            this.$message({
              message: "商品已经上架了",
              type: "warning",
            });
          }
        });
      } else {
        this.$message({
          message: "请勾选后重试",
          type: "warning",
        });
      }
    },
    // 下架
    getProductOffShelfs() {
      var mult = this.multipleSelection;
      if (mult.length) {
        var token = document.cookie.split(";")[0].split("=")[1];
        var ids = [];
        mult.forEach((v, i) => {
          ids.push(v.id);
          if (v.status == "上架") {
            var res = getProductOffShelf({
              access_token: token,
              ids: ids,
            });
            this.$message({
              message: "商品下架成功",
              type: "success",
            });
            this.getProductLists();
          } else {
            this.$message({
              message: "商品已经下架了",
              type: "warning",
            });
          }
        });
      } else {
        this.$message({
          message: "请勾选后重试",
          type: "warning",
        });
      }
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
  background: #f2f2f2;
  padding: 10px;
}
</style>
