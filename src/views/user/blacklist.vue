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
      <el-form>
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
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
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
              <el-input placeholder="请选择日期">
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
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="getRecovery">批量恢复</el-button>
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
          <template slot-scope="scope">
            <p>{{ scope.row.nick }}</p>
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="分类" width="165"></el-table-column>
        <el-table-column prop="created_at" label="消费金额" sortable width="165"></el-table-column>
        <el-table-column prop="created_at" label="消费次数" sortable width="165"></el-table-column>
        <el-table-column prop="created_at" label="订单均价" sortable width="165"></el-table-column>
        <el-table-column prop="created_at" label="当前余额" sortable width="165"></el-table-column>
        <el-table-column prop="created_at" label="当前积分" sortable width="165"></el-table-column>
        <el-table-column prop="created_at" label="最近消费时间" width="165"></el-table-column>
        <el-table-column prop="created_at" label="获客时间" width="165"></el-table-column>
        <el-table-column prop="created_at" label="操作" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="flex flex--justify-content--end" style="padding-top:10px;">
        <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { blackLists, userRemoveBlackList } from "@/api/user";
export default {
  name: "blacklist",
  data() {
    return {
      total_num: 10,
      tableData: [],
      order_type_list: [],
      selects: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  created() {
    this.getblackList();
  },
  methods: {
    async getblackList() {
      var res = await blackLists({
        access_token: "5uhrsn61mikgobhtdlpp8ek67c"
      });
      this.tableData = res.response_data.items;
    },
    handleSelectionChange(e) {
      this.selects = e;
    },
    getRecovery() {
      if (this.selects.length == 0) {
        this.$message({
          message: "请勾选客户",
          type: "warning"
        });
      } else {
        this.$confirm(
          "确认恢复" +
            this.selects.length +
            "个黑名单客户？恢复后该用户将享受正常权益",
          "恢复确认",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "成功恢复" + this.selects.length + "位客户"
            });
            this.getRemoveBlackList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消恢复"
            });
          });
      }
    },
    async getRemoveBlackList() {
      var ids = [];
      if (this.selects.length > 0) {
        this.selects.forEach(v => {
          ids.push(v.id);
        });
      }
      var data = {
        access_token: "5uhrsn61mikgobhtdlpp8ek67c",
        ids: ids
      };
      var res = await userRemoveBlackList(data);
      this.getblackList();
    }
  }
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
