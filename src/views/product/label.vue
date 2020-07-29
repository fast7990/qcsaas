<!--
 * @Author: [hsp]
 * @Date: 2020-06-24 16:09:50
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-03 11:26:57
 * @Description: 
--> 
<template>
  <div class="pages">
    <div class="page-container">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addLabelBtn">新增标签</el-button>
        </el-col>
        <el-col :span="8" :offset="10">
          <el-input
            placeholder="请输入内容"
            v-model="search_val"
            style="width: 450px"
            class="input-with-select"
          >
            <el-button
              style="background:#2D8CF0;color:#ffffff;"
              slot="append"
              icon="el-icon-search"
            >搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
      <div class="table-box" style="margin-top:10px;">
        <el-table
          :data="tableDataLabelList"
          :border="false"
          style="width: 100%"
          :header-cell-style="{ background: '#f2f2f2' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="tag" label="标签名称" width="200"></el-table-column>
          <el-table-column prop="user_num" label="商品数量"></el-table-column>
          <el-table-column prop="remark" label="标签说明"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,1)" type="text">编辑</el-button>
              <el-button @click="handleClick(scope.row,2)" type="text">设置商品</el-button>
              <el-button type="text" size="small" @click="removeTableItem(scope.row)">删除标签</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex flex--justify-content--space-between" style="padding-top:10px;">
          <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
        </div>
      </div>
    </div>
    <!-- 查看编辑商品 -->
    <el-dialog :title="curr_type==1?'查看商品':'选择商品'" :visible.sync="dialogTableVisible" width="70%">
      <div v-if="curr_type==1">
        <div class="table-box" style="margin-top:10px;">
          <el-row :gutter="20" style="margin-bottom:30px;">
            <el-col :span="7" class="flex flex--align-items--stretch">
              <label class="el-form-item__label" style="width: 120px;">商品分类:</label>
              <el-cascader :options="product_type_options" clearable @change="changeCascader" />
            </el-col>
            <el-col :span="7" class="flex flex--align-items--stretch">
              <label class="el-form-item__label" style="width: 120px;">状态:</label>
              <el-select v-model="edit.status" placeholder="请选择">
                <el-option label="全部" value="1"></el-option>
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
                <el-option label="草稿" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-input placeholder="请输入内容" v-model="edit.search_val" class="input-with-select">
                <el-button
                  style="background:#2D8CF0;color:#ffffff;"
                  slot="append"
                  icon="el-icon-search"
                >搜索</el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-table
            :data="tableDataProduct"
            height="400"
            :border="false"
            style="width: 100%"
            :header-cell-style="{ background: '#f2f2f2' }"
            @selection-change="handleSelectionChangeProduct"
            @sort-change="changeSortTable"
          >
            <el-table-column prop="name" label="商品" width="200"></el-table-column>
            <el-table-column prop="name" label="分类"></el-table-column>
            <el-table-column prop="address" label="状态"></el-table-column>
            <el-table-column prop="address" label="价格"></el-table-column>
            <el-table-column prop="address" label="库存"></el-table-column>
            <el-table-column prop="address" label="销量" sortable></el-table-column>
            <el-table-column prop="address" label="商品类型"></el-table-column>
            <el-table-column prop="address" label="操作" width="60">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row,3)" type="text">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex flex--justify-content--end" style="padding-top:10px;">
            <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
          </div>
        </div>
      </div>
      <!-- table2 -->
      <div v-if="curr_type==2">
        <div class="table-box" style="margin-top:10px;">
          <el-row :gutter="20" style="margin-bottom:30px;">
            <el-col :span="7" class="flex flex--align-items--stretch">
              <label class="el-form-item__label" style="width: 120px;">商品分类:</label>
              <el-cascader :options="product_type_options" clearable @change="changeCascader" />
            </el-col>
            <el-col :span="7" class="flex flex--align-items--stretch">
              <label class="el-form-item__label" style="width: 120px;">状态:</label>
              <el-select v-model="edit.status" placeholder="请选择">
                <el-option label="全部" value="1"></el-option>
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="2"></el-option>
                <el-option label="草稿" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-input placeholder="请输入内容" v-model="edit.search_val" class="input-with-select">
                <el-button
                  style="background:#2D8CF0;color:#ffffff;"
                  slot="append"
                  icon="el-icon-search"
                >搜索</el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-table
            :data="tableDataProduct"
            height="400"
            :border="false"
            style="width: 100%"
            :header-cell-style="{ background: '#f2f2f2' }"
            @selection-change="handleSelectionChangeProduct"
            @sort-change="changeSortTable"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="商品" width="200"></el-table-column>
            <el-table-column prop="name" label="分类"></el-table-column>
            <el-table-column prop="address" label="标签"></el-table-column>
            <el-table-column prop="address" label="价格"></el-table-column>
            <el-table-column prop="address" label="库存"></el-table-column>
            <el-table-column prop="address" label="销量" sortable></el-table-column>
          </el-table>
          <div class="flex flex--justify-content--end" style="padding-top:10px;">
            <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogBtn(1)">取 消</el-button>
            <el-button type="primary" @click="dialogBtn(2)">选 择</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 查看编辑商品 -->
    <el-dialog title="标签编辑" :visible.sync="dialogAddLabelVisible" width="30%">
      <el-form ref="label_form" :model="label_form">
        <el-form-item label="标签名称:" class="flex">
          <el-input v-model="label_form.name" type="text" style="width:250px;" />
        </el-form-item>
        <el-form-item label="标签说明:" class="flex">
          <el-input v-model="label_form.desc" type="textarea" style="width:250px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBtn(3)">取 消</el-button>
        <el-button type="primary" @click="dialogBtn(4)">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getProductTagList,
  getProductTagCreate,
  getProductTagDelete,
} from "@/api/product";

export default {
  name: "import",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      total_num: 10,
      multipleSelection: [],
      search_val: "", // 搜索
      dialogAddLabelVisible: false,
      dialogTableVisible: false,
      curr_type: 1,
      edit: {
        edit: "",
        status: "",
        search_val: "",
      },
      label_form: {
        name: "",
        desc: "",
      },
      product_type_options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
            },
            {
              value: "cexiangdaohang",
              label: "侧向导航",
            },
            {
              value: "dingbudaohang",
              label: "顶部导航",
            },
          ],
        },
      ],
      tableDataLabelList: [],
      ceshiList: [],
      tableDataProduct: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  created() {
    this.getProductTagLists();
  },
  methods: {
    async getProductTagLists() {
      var token = document.cookie.split(";")[0].split("=")[1];
      var res = await getProductTagList({
        access_token: token,
        q: this.search_val || "",
      });
      this.tableDataLabelList = res.response_data.items;
    },
    async getProductTagCreates() {
      var token = document.cookie.split(";")[0].split("=")[1];
      var res = await getProductTagCreate({
        access_token: token,
        tag: this.label_form.name,
        remark: this.label_form.desc,
      });
      this.getProductTagLists();
    },
    async getProductTagDeletes(id) {
      var token = document.cookie.split(";")[0].split("=")[1];
      var res = await getProductTagDelete({
        access_token: token,
        id: id,
      });
      this.getProductTagLists();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row, type) {
      console.log(row, type);
      if (type == 1 || type == 2) {
        this.curr_type = type;
        this.dialogTableVisible = true;
      } else if (type == 3) {
      }
    },
    addLabelBtn() {
      // 新增标签
      this.dialogAddLabelVisible = true;
    },
    changeCascader(e) {
      // 下拉选择
      console.log(e);
    },
    handleSelectionChangeProduct(val) {
      console.log(val);
    },
    changeSortTable(e) {
      // 表格排序
      console.log(e);
    },
    dialogBtn(type) {
      // 弹框确定取消按钮
      if (type == 1) {
        this.dialogTableVisible = false;
      } else if (type == 2) {
        this.dialogTableVisible = false;
      } else if (type == 3) {
        this.dialogAddLabelVisible = false;
      } else if (type == 4) {
        // this.addLabelTableItem();
        this.getProductTagCreates();
        this.dialogAddLabelVisible = false;
      }
    },
    removeTableItem(d) {
      this.$confirm("此操作将永久删除该标签, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getProductTagDeletes(d.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  watch: {
    search_val: {
      handler() {
        Object.assign(this.ceshiList, this.tableDataLabelList);

        if (timer) {
          clearTimeout(timer);
        }
        if (!this.search_val) {
          this.tableDataLabelList = this.ceshiList;
          return;
        }
        var timer = setTimeout(() => {
          var arr = [];
          this.tableDataLabelList.forEach((val) => {
            if (val.tag.indexOf(this.search_val) > -1) {
              arr.push(val);
            }
          });
          this.tableDataLabelList = arr;
        }, 100);
        console.log(this.tableDataLabelList);
      },
    },
  },
};
</script>

<style lang="scss">
.pages {
  padding: 10px 20px;
  background: #ffffff;
}
</style>
