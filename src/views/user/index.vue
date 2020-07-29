
<template>
  <div class="users">
    <div class="users_container">
      <el-form ref="label_form" class="demo-form-inline">
        <el-row>
          <el-col :span="5">
            <el-form-item label="微信昵称:" label-width="auto" class="flex">
              <el-input type="text" placeholder="请输入内容" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="手机号:" label-width="auto" class="flex">
              <el-input type="text" placeholder="请输入内容" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分类:" label-width="auto" class="flex">
              <el-select v-model="value" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分类:" label-width="auto" class="flex">
              <el-select v-model="value" placeholder="请选择" size="small">
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

        <el-row style="margin-top: 20px;">
          <el-col :span="8">
            <el-form-item label="最近消费日期:" label-width="auto" class="flex">
              <el-date-picker
                v-model="value1"
                type="daterange"
                size="small"
                editable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="获客日期:" label-width="auto" class="flex">
              <el-date-picker
                v-model="value1"
                type="daterange"
                size="small"
                editable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="flex" label-width="auto">
              <el-button type="primary" size="small">筛选</el-button>
              <el-button size="small">EXCEL导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="bg">
          <el-row>
            <el-col>
              <el-button
                type="primary"
                size="medium"
                icon="el-icon-plus"
                @click="dialogFormVisible=true"
              >新增客户</el-button>
              <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
                <el-form status-icon :rules="rules" class="demo-ruleForm">
                  <el-form-item label="*手机号:" class="flex" style="margin-top: 15px">
                    <el-input v-model="mobile" type="text" placeholder="请输入内容" class="input-box" />
                  </el-form-item>
                  <el-form-item label="*姓名:" class="flex" style="margin-left: 15px;margin-top: 15px">
                    <el-input v-model="name" type="text" placeholder="请输入内容" class="input-box" />
                  </el-form-item>
                  <el-form-item label="微信号:" class="flex" style="margin-left: 5px;margin-top: 15px">
                    <el-input v-model="wechat" type="text" placeholder="请输入内容" class="input-box" />
                  </el-form-item>
                  <el-form-item label="会员等级:" class="flex" style="margin-top: 15px">
                    <el-select v-model="value" placeholder="无">
                      <el-option
                        v-for="item in grade"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
              <el-button plain style="margin-left: 10px" @click="labelClick">打标签</el-button>
              <el-dialog title="选择标签" :visible.sync="dialogTableVisible" width="600px">
                <el-form>
                  <el-form-item label="*手机号:" class="flex" style="margin-top: 15px">
                    <el-input placeholder="请输入标签名称" v-model="label" style="width: 250px"></el-input>
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      style="margin-left: 15px"
                      @click="getSearch"
                    >搜索</el-button>
                  </el-form-item>
                </el-form>
                <el-table :data="gridData" @selection-change="choiceTableChange">
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column property="name" label="标签名称" align="center"></el-table-column>
                  <el-table-column property="address" label="标签说明" align="center"></el-table-column>
                </el-table>
                <el-pagination
                  :page-size="10"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="10"
                  style="text-align: right"
                ></el-pagination>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                  <el-button type="primary" @click="getLabelChoice">选 择</el-button>
                  <el-button @click="dialogTableVisible= false">取 消</el-button>
                </div>
              </el-dialog>
              <el-button plain style="margin-left: 10px" @click="modifyIntegral">修改积分</el-button>
              <el-dialog title="修改积分" :visible.sync="modifyIntegralVisible" width="500px">
                <el-form status-icon>
                  <el-form-item label="*积分处理:" class="flex" style="margin-left: 15px;margin-top: 15px" >
                    <el-radio-group v-model="resource">
                      <el-radio label="扣除积分"></el-radio>
                      <el-radio label="增加积分"></el-radio>
                      <el-radio label="清空积分"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div>
                    <div class="jifen" v-if="resource=='清空积分'">
                      <span>将所有积分清空为0，请谨慎使用</span>
                    </div>
                    <div class="flex jifen" v-else>
                      <p v-if="resource=='扣除积分'">减</p>
                      <p v-if="resource=='增加积分'">加</p>
                      <el-input
                        size="mini"
                        placeholder="请输入调整积分"
                        v-model="integral"
                        style="width: 200px"
                      ></el-input>
                    </div>
                  </div>
                  <el-form-item label="备注说明:" style="margin-left: 22px">
                    <el-input
                      v-model="wechat"
                      type="text"
                      placeholder="请输入内容"
                      class="input-box"
                      style="margin:0"
                    />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                  <el-button @click="modifyIntegralVisible = false">取 消</el-button>
                  <el-button type="primary" @click="getModifyIntegralVisible">确 定</el-button>
                </div>
              </el-dialog>
              <el-button plain style="margin-left: 10px" @click="couponDelivery">送券</el-button>
              <el-dialog title="选择优惠券" :visible.sync="couponDeliveryVisible" width="1400px">
                <el-form class="demo-form-inline">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="状态:" style="margin-left: 22px; margin-top:15px">
                        <el-select v-model="couponState" placeholder="请选择">
                          <el-option
                            v-for="item in couponStateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="优惠券名称:" style="margin-left: 22px;margin-top:15px">
                        <el-input
                          v-model="couponNane"
                          type="text"
                          placeholder="请输入内容"
                          class="input-box"
                          style="margin:0"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-button
                        type="primary"
                        icon="el-icon-search"
                        style="margin: 15px 0 15px 15px"
                        @click="getCouponSearch"
                      >搜索</el-button>
                    </el-col>
                  </el-row>
                </el-form>
                <el-table
                  ref="multipleTable"
                  :data="couponData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :header-cell-style="{ background: '#f2f2f2' }"
                  @selection-change="getCouponChanges"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="卡券名称" width="240">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column property="name" label="状态" width="220" style="height: 50px"></el-table-column>
                  <el-table-column property="name" label="有效期" width="180"></el-table-column>
                  <el-table-column property="name" label="领取数量" width="380"></el-table-column>
                  <el-table-column property="name" label="使用数量" width="220"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                  <el-button @click="couponDeliveryVisible = false">取 消</el-button>
                  <el-button type="primary" @click="getCouponDeliveryVisible">确 定</el-button>
                </div>
              </el-dialog>
              <el-button plain style="margin-left: 10px" @click="shortMessage">发短信</el-button>
              <el-dialog title="发短信" :visible.sync="shortMessageVisible" width="500px">
                <p style="margin:0">
                  已选择1000个客户，可用短信条数300条，请及时
                  <a href="javascript:;" style="color: #0066FF">短信充值</a>
                </p>
                <el-form>
                  <el-input
                    type="textarea"
                    v-model="message"
                    style="width: 460px"
                    placeholder="请输入短信内容,标签默认为[FREESTYLE商城]"
                  ></el-input>
                </el-form>
                <div class="linkage">当前已输入10个字（含标签），单条短信上限为70个字，超过按多条计算</div>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                  <el-button @click="shortMessageVisible = false">取 消</el-button>
                  <el-button type="primary" @click="getShortMessageVisible">发 货</el-button>
                </div>
              </el-dialog>
              <el-button plain style="margin-left: 10px" @click="open">加入黑名单</el-button>
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
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <p style="color: #0066FF;cursor:pointer" @click="customerDetails(scope.row.id)">详情</p>
          </template>
        </el-table-column>
        <template slot="empty">
          <div>
            暂无商品记录，请
            <el-button @click="importProduct(1)" type="text">导入商品</el-button>
          </div>
        </template>
      </el-table>
      <div class="flex flex--justify-content--end" style="padding-top:10px;">
        <el-pagination background layout="prev, pager, next" :total="total_num"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { userList, userAddBlackList } from "@/api/user";
export default {
  name: "user",
  data() {
    return {
      // 新增客户--------
      mobile: "", // 手机号
      name: "", // 用户名
      wechat: "", // 微信号
      grade: [
        {
          value: "选项1",
          label: "无",
        },
        {
          value: "选项2",
          label: "倔强青铜",
        },
        {
          value: "选项3",
          label: "无畏白银",
        },
        {
          value: "选项4",
          label: "永恒钻石",
        },
        {
          value: "选项5",
          label: "最强王者",
        },
      ],
      // 打标签-------
      gridData: [
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      choiceList: [],
      label: "",
      // 修改积分-------------
      modifyIntegralVisible: false,
      resource: "扣除积分", // 单选框
      integral: "",
      // 送券----------
      couponDeliveryVisible: false,
      couponState: "",
      couponStateList: [
        {
          value: "1",
          label: "123",
        },
      ],
      couponNane: "",
      couponData: [],
      coupon: [], // change选中的存放的
      // 发短信------------------------------------
      shortMessageVisible: false,
      message: "",
      // ----------------------------------
      value1: "",
      value2: "",
      rules: "",
      // dialog
      dialogFormVisible: false,
      dialogTableVisible: false,
      total_num: 100,
      tableData: [],
      order_type_list: [],
      label_form: {},
      selects: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableDatas: [
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
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      value: "",
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleSelectionChange(e) {
      this.selects = e;
    },
    async getUserList() {
      var getToken = document.cookie.split(";")[0].split("=")[1];
      var token = getToken;
      var res = await userList({ access_token: token });
      this.tableData = res.response_data.items;
    },
    open() {
      if (this.selects.length == 0) {
        this.$message({
          message: "请勾选客户",
          type: "warning",
        });
      } else {
        this.$confirm(
          "确认将" +
            this.selects.length +
            "个客户加入黑名单？加入黑名单后请去黑名单模块管理",
          "加入黑名单确认",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "加入黑名单成功",
            });
            this.getAddBlackList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消加入",
            });
          });
      }
    },
    // 获取列表数据
    async getAddBlackList() {
      var ids = [];
      if (this.selects.length > 0) {
        this.selects.forEach((v) => {
          ids.push(v.id);
        });
      }
      var data = {
        access_token: document.cookie.split(";")[0].split("=")[1],
        ids: ids,
      };
      var res = await userAddBlackList(data);
      this.getUserList();
    },
    // 打标签------------------------------------------------------------------------------------
    labelClick() {
      if (this.selects.length > 0) {
        this.dialogTableVisible = true;
      } else {
        this.$message({
          message: "请勾选后重试",
          type: "warning",
        });
      }
    },
    choiceTableChange(e) {
      this.choiceList = e;
    },
    // 打标签下的搜索
    getSearch() {
      console.log(this.label);
    },
    // 打标签下的选择
    getLabelChoice() {
      if (this.choiceList.length > 0) {
        this.$message({
          message: "添加标签成功",
          type: "success",
        });
        this.dialogTableVisible = false;
      } else {
        this.$message({
          message: "请勾选后重试",
          type: "warning",
        });
      }
    },
    // 修改标签----------------------------------------------------------------------------------
    modifyIntegral() {
      if (this.selects.length > 0) {
        this.modifyIntegralVisible = true;
      } else {
        this.$message({
          message: "请勾选后重试",
          type: "warning",
        });
      }
    },
    // 修改下的确定
    getModifyIntegralVisible() {
      if (this.integral == "") {
        this.$message({
          message: "请填写必要信息",
          type: "error",
        });
      } else {
        this.$message({
          message: "积分修改成功",
          type: "success",
        });
        this.modifyIntegralVisible = false;
      }
    },
    // 送券----------------------------------------------------
    couponDelivery() {
      if (this.selects.length > 0) {
        this.couponDeliveryVisible = true;
      } else {
        this.$message({
          message: "请勾选后重试",
          type: "warning",
        });
      }
    },
    // 送券下表格多选框的change事件
    getCouponChanges(e) {
      this.coupon = e;
    },
    // 送券下的确定
    getCouponDeliveryVisible() {
      if (this.coupon.length > 0) {
        this.$message({
          message: "积分修改成功",
          type: "success",
        });
        this.couponDeliveryVisible = false;
      } else {
        this.$message({
          message: "请勾选优惠券",
          type: "warning",
        });
      }
    },
    // 送券下的搜索
    getCouponSearch() {},
    // 发短信----------
    shortMessage() {
      this.shortMessageVisible = true;
    },
    // 发短信下的确定
    getShortMessageVisible() {
      if (this.message == "") {
        this.$message({
          message: "请填写必要信息",
          type: "error",
        });
      } else {
        this.$message({
          message: "短信发送成功",
          type: "success",
        });
        this.shortMessageVisible = false;
      }
    },
    customerDetails(id) {
      console.log(id);
      this.$router.push({
        path: "/user/details",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.el-form-item {
  margin: 0;
}
.el-dialog__body {
  padding: 0 20px;
}
.el-dialog {
  margin-top: 250px !important;
}
.el-dialog__header {
  height: 40px;
  background: #f2f2f2;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}
.el-icon-close:before {
  position: absolute;
  top: -8px;
}
.el-dialog__title {
  font-size: 14px;
  margin-left: 20px;
}
.linkage {
  font-size: 12px;
  color: #999;
}
.jifen {
  height: 50px;
  align-items: center;
  margin-left: 95px;
  p {
    width: 28px;
    height: 28px;
    background: #ccc;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 12px;
  }
}
.users {
  padding: 10px 20px;
  background: #ffffff;
}
.input-box {
  width: 300px;
  margin-left: 10px;
}
.bg {
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  margin-top: 20px;
}
.data {
  margin-top: 20px;
}
</style>  
