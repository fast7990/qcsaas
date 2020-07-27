<!--
 * @Author: [hsp]
 * @Date: 2020-06-24 16:09:50
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-06 11:27:41
 * @Description: 
--> 
<template>
  <div class="pages">
    <div class="page-container">
      <el-form ref="label_form" :model="label_form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="订单编号:" class="flex">
              <el-input
                v-model="label_form.name"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型:" class="flex">
              <el-select v-model="label_form.type" placeholder="请选择">
                <el-option
                  v-for="item in order_type_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单时间:" class="flex">
              <el-date-picker
                v-model="label_form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="收货姓名:" class="flex">
              <el-input
                v-model="label_form.name"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货手机:" class="flex">
              <el-input
                v-model="label_form.name"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品名称:" class="flex">
              <el-input v-model="label_form.name" type="text" class="input-box" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label class="flex">
              <el-button type="primary" size="small">筛选</el-button>
              <el-button size="small">EXCEL导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class>
          <el-button-group>
            <el-button class="cell-btn left-circle">全部</el-button>
            <el-button class="cell-btn">待付款</el-button>
            <el-button class="cell-btn">待发货</el-button>
            <el-button class="cell-btn">已发货</el-button>
            <el-button class="cell-btn">已完成</el-button>
            <el-button class="cell-btn right-circle">已关闭</el-button>
          </el-button-group>
        </div>
      </el-form>
      <div class="table-box">
        <el-table
          :data="tableDataProduct"
          style="width: 100%"
          height="600"
          :header-cell-style="{ background: '#f2f2f2' }"
          :span-method="arraySpanMethod"
        >
          <el-table-column label="商品">
            <el-row style="padding:10px 0;background:#f2f2f2">
              <el-col :span="6">订单编号：2019092309485700000001</el-col>
              <el-col :span="6">下单时间：2019-09-23 09:48:57</el-col>
              <el-col :span="8">付款方式：微信付款</el-col>
              <el-col :span="3">查看详情</el-col>
            </el-row>
            <el-table
              :data="tableDataProduct"
              :border="true"
              :show-header="false"
              :span-method="arraySpanMethodSubTable"
              @selection-change="handleSelectionChangeProduct"
              @sort-change="changeSortTable"
            >
              <el-table-column prop="date" width="300px"></el-table-column>
              <el-table-column prop="name" width="200px"></el-table-column>
              <el-table-column prop="name" width="200px"></el-table-column>
              <el-table-column prop="address" width="200px"></el-table-column>
              <el-table-column prop="address" width="200px"></el-table-column>
              <el-table-column prop="address" width="120px"></el-table-column>
              <el-table-column prop="address" width="120px"></el-table-column>
              <el-table-column prop="address"></el-table-column>
            </el-table>
          </el-table-column>
          <el-table-column label="价格" width="200px"></el-table-column>
          <el-table-column label="数量" width="200px"></el-table-column>
          <el-table-column label="收货人/手机" width="200px"></el-table-column>
          <el-table-column label="付款金额" sortable width="200px"></el-table-column>
          <el-table-column label="物流方式" width="120px"></el-table-column>
          <el-table-column label="订单状态" width="120px"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "order",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      order_type_list: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      label_form: {},
      tableDataProduct: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return [1, 9];
    },
    arraySpanMethodSubTable({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 9];
      //   }
      // }
    },
    handleSelectionChangeProduct(val) {
      console.log(val);
    },
    changeSortTable(e) {
      // 表格排序
      console.log(e);
    }
  }
};
</script>

<style lang="scss" >
.pages {
  padding: 10px 20px;
  background: #ffffff;
}
.input-box {
  width: 200px;
}
.cell-btn {
  width: 85px;
  height: 36px;
  line-height: 36px;
  padding: 0;
}
.cell-btn.left-circle {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
.cell-btn.right-circle {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
.el-button:focus,
.el-button:hover {
  background-color: #409eff;
  color: #ffffff;
}
.table-box {
  padding-top: 30px;
  thead {
    th {
      padding: 5px;
    }
  }
}
</style>
