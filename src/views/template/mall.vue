<!--
 * @Author: [hsp]
 * @Date: 2020-07-21 13:53:36
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-21 16:21:33
 * @Description: 商城页面
--> 
<template>
  <div class="pages white-bg">
    <el-form ref="form" :model="form" label-width="120px">
      <!-- line -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="页面名称:">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="页面分类:">
            <el-select v-model="form.type" placeholder="请选择">
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
          <el-form-item label="页面状态:">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in product_type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="medium" @click="topBtnClick(4)">筛选</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="cell-top">
      <el-row :gutter="20">
        <el-col>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="topBtnClick(1)">新增页面</el-button>
          <el-button type="success" size="medium" @click="topBtnClick(2)">批量发布</el-button>
          <el-button type="danger" size="medium" @click="topBtnClick(3)">批量删除</el-button>
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
        <el-table-column prop="name" label=" 页面名称"></el-table-column>
        <el-table-column prop="type" label="商品分类"></el-table-column>
        <el-table-column prop="status" label="页面状态"></el-table-column>
        <el-table-column prop="updated_at" label="最后修改时间"></el-table-column>
        <el-table-column prop="id" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,1)" type="text">编辑</el-button>
            <el-button @click="handleClick(scope.row,2)" type="text">发布</el-button>
            <el-button @click="handleClick(scope.row,3)" type="text">预览</el-button>
            <el-button @click="handleClick(scope.row,4)" type="text">删除</el-button>
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

export default {
  name: "product",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      total_num: 100,
      form: {
        name: "",
        type: "",
        status: ""
      },
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
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      product_type_options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "使用中"
        },
        {
          value: "2",
          label: "未发布"
        }
      ],
      state_options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "功能页面"
        },
        {
          value: "2",
          label: "自定义页面"
        }
      ],
      multipleSelection: ""
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      this.getPageList();
    },
    getPageList() {
      this.$http({
        url: "/mall/page/list",
        method: "post",
        data: {
          name: this.form.name, //	是	string	页面名称
          type: this.form.title, //	是	string	分类
          status: this.form.tpl_id //	否	int	状态
        }
      }).then(res => {
        if (res.status == 1) {
          this.tableData = res.response_data.items;
        }
        console.log(res);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeSortTable(e) {
      console.log(e);
    },
    handleClick(row, op) {
      console.log(row);
      if (op === 1) {
        this.$router.push({ path: "/template/template" });
      }
    },
    topBtnClick(type) {
      if (type == 1) {
        this.$router.push({ path: "/template/addMallPage" });
      } else if (type == 4) {
        this.getPageList();
      }
    }
  }
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
