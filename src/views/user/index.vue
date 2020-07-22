
<template>
  <div class="users">
    <div class="users_container">
      <el-form ref="label_form" :model="label_form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="微信昵称:"  class="flex">
              <el-input
                v-model="value1"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号:" class="flex">
              <el-input
                v-model="value2"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分类:" class="flex">
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
          <el-col :span="5">
            <el-form-item label="分类:" class="flex">
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
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="最近消费日期:" class="flex">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="获客日期:" class="flex">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
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
              <el-button
                type="primary"
                size="medium"
                icon="el-icon-plus"
                @click="dialogFormVisible=true"
              >新增客户</el-button>
              <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
                <el-form
                  ref="label_form"
                  :model="ruleForm"
                  status-icon
                  :rules="rules"
                  class="demo-ruleForm"
                >
                  <el-form-item label="微信昵称:" class="flex">
                    <el-input
                      v-model="label_form.name"
                      type="text"
                      placeholder="请输入内容"
                      class="input-box"
                    />
                  </el-form-item>
                  <el-form-item label="微信昵s称:" class="flex">
                    <el-input
                      v-model="label_form.name"
                      type="text"
                      placeholder="请输入内容"
                      class="input-box"
                    />
                  </el-form-item>
                  <el-form-item label="微信昵称:" class="flex">
                    <el-input
                      v-model="label_form.name"
                      type="text"
                      placeholder="请输入内容"
                      class="input-box"
                    />
                  </el-form-item>
                  <el-form-item label="微信昵称:" class="flex">
                    <el-input
                      v-model="label_form.name"
                      type="text"
                      placeholder="请输入内容"
                      class="input-box"
                    />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
              <el-button plain>打标签</el-button>
              <el-button plain>修改积分</el-button>
              <el-button plain>送券</el-button>
              <el-button plain>发短信</el-button>
              <el-button plain>加入黑名单</el-button>
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
import { mapGetters } from "vuex";
import {userList} from "@/api/user.js";
export default {
  name: "user",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      value1:"",
      value2:"",
      total_num: 100,
      tableData: [],
      order_type_list: [],
      label_form: {}
    };
  },
 created() {
   console.log(11111111)
    var data = {
      nick: "ss",
      mobile: "18234368477",
      reg_start:"1594656000000",
      reg_end:"1594828800000",
      page: 1,
      page_size: 10
    };
    userList(data).then(res=>{});
    console.log(res)
  },
  methods: {
    
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
</style>  
