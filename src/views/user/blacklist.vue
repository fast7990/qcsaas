<!--
 * @Author: [hsp]
 * @Date: 2020-06-28 10:58:24
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-28 10:58:25
 * @Description: 
--> 
<template>
  <div class="blacks">
    <div class="blacks_container">
      <el-form ref="label_form" :model="label_form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="微信昵称:" class="flex">
              <el-input type="text" placeholder="请输入内容" class="input-box" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号:" class="flex">
              <el-input type="text" placeholder="请输入内容" class="input-box" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分类:" class="flex">
              <el-select placeholder="请选择">
                <el-option
                  v-for="item in order_type_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="拉黑日期:" class="flex">
              <el-input placeholder="请选择日期">
                <i slot="suffix" class="el-input__icon el-icon-date"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="获客日期:" class="flex">
              <el-input placeholder="请选择日期" v-model="input3">
                <i slot="suffix" class="el-input__icon el-icon-date"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label class="flex">
              <el-button type="primary" size="small">筛选</el-button>
              <el-button size="small">EXCEL导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="bg">
          <el-row :gutter="20">
            <el-col>
              <el-button type="primary" size="medium" icon="el-icon-plus">批量恢复</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="data">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#f2f2f2' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="客户信息" width="193">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="分类" width="165"></el-table-column>
        <el-table-column prop="name" label="消费金额" sortable width="165"></el-table-column>
        <el-table-column prop="name" label="消费次数" sortable width="165"></el-table-column>
        <el-table-column prop="name" label="订单均价" sortable width="165"></el-table-column>
        <el-table-column prop="name" label="当前余额" sortable width="165"></el-table-column>
        <el-table-column prop="name" label="当前积分" sortable width="165"></el-table-column>
        <el-table-column prop="name" label="最近消费时间" width="165"></el-table-column>
        <el-table-column prop="name" label="获客时间" width="165"></el-table-column>
        <el-table-column prop="name" label="操作" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="flex flex--justify-content--end" style="padding-top:10px;">
        <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blacklist",
  data() {
    return {
      total_num: 10,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      order_type_list: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.blacks {
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
</style>  
