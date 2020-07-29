<template>
  <div class="members">
    <el-row>
      <el-button type="primary" @click="editMember">编辑会员等级</el-button>
    </el-row>
    <div class="member_type">
      <div class="type_one">
        <div>
          <span>会员卡</span>
          <b>132135132131</b>
        </div>
        <h3>LV.1</h3>
        <p>当前成长值500</p>
      </div>
      <div class="type_two">
        <h3>会员卡</h3>
        <ul>
          <li>
            <p>卡号</p>
            <span>系统自动生成</span>
          </li>
          <li>
            <p>开卡条件</p>
            <span>成为客户</span>
          </li>
          <li>
            <p>开卡方式</p>
            <span>自动发卡</span>
          </li>
        </ul>
      </div>
      <div class="type_three">
        <div>
          <span>成长值</span>
          <b @click="getGrowth">设置</b>
        </div>
        <ul>
          <li>
            <h3>访问商城1次获5成长</h3>
            <p>上限：100成长/周</p>
          </li>
          <li>
            <h3>分享商城1次获5成长</h3>
            <p>上限：100成长/周</p>
          </li>
          <li>
            <h3>消费1元获5成长</h3>
            <p>上限：-</p>
          </li>
          <li>
            <h3>充值1元获5成长</h3>
            <p>上限：-</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="member_list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#f2f2f2' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="会员等级" width="350px">
          <template slot-scope="scope" width="350px">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="等级名称" width="350px"></el-table-column>
        <el-table-column prop="name" label="成长值" sortable width="350px"></el-table-column>
        <el-table-column prop="name" label="会员权益" sortable width="350px"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="350px">
          <p style="color: #0066FF;cursor:pointer" @click="rightsAndInterests">权益设置</p>
        </el-table-column>
        <template slot="empty">
          <div>
            暂无商品记录，请
            <el-button @click="importProduct(1)" type="text">导入商品</el-button>
          </div>
        </template>
      </el-table>
      <!-- 权益设置 -->
      <el-dialog title="选择标签" :visible.sync="rightsAndInterestsVisible" width="400px">
        <el-form>
          <el-form-item class="flex">
            <el-checkbox-group v-model="checkList1">
              <el-checkbox label="消费折扣"></el-checkbox>
              <el-checkbox label="订单包邮"></el-checkbox>
              <el-checkbox label="售后秒退"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="rightsInput">
          <div>
            <p>折扣额度：</p>
            <input type="text" placeholder="请输入折扣" v-model="discount" />
            <button>折</button>
          </div>
          <span>商品购买享受优惠折扣，活动商品除外</span>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="getRightsAndInterestsVisible">选 择</el-button>
          <el-button @click="rightsAndInterestsVisible= false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 成长值设置 -->
      <el-dialog title="成长值设置" :visible.sync="growthVisible" width="1000px">
        <el-checkbox-group v-model="checkList2">
          <div style="margin-top: 20px">
            <el-checkbox label="商城访问"></el-checkbox>
            <el-form style="margin: 15px 0">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="*每访问1次获得:" class="flex rel">
                    <el-input placeholder="请输入标签名称" v-model="growthData.visit" style="width: 300px"></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="每周最多获得:" class="flex rel">
                    <el-input placeholder="请输入标签名称" v-model="growthData.most1" style="width: 300px"></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox label="商城分享"></el-checkbox>
            <el-form style="margin: 15px 0">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="*每分享1次获得:" class="flex rel">
                    <el-input placeholder="请输入标签名称" v-model="growthData.share" style="width: 300px"></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="每周最多获得:" class="flex rel">
                    <el-input placeholder="请输入标签名称" v-model="growthData.most2" style="width: 300px"></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox label="商城消费"></el-checkbox>
            <el-form style="margin: 15px 0">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="*每消费1元获得:" class="flex rel">
                    <el-input
                      placeholder="请输入标签名称"
                      v-model="growthData.consumption"
                      style="width: 300px"
                    ></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="每周最多获得:" class="flex rel">
                    <el-input placeholder="请输入标签名称" v-model="growthData.most3" style="width: 300px"></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div style="margin-top: 20px">
            <el-checkbox label="商城充值"></el-checkbox>
            <el-form style="margin: 15px 0">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="*每充值1元获得:" class="flex rel">
                    <el-input
                      placeholder="请输入标签名称"
                      v-model="growthData.recharge"
                      style="width: 300px"
                    ></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="每周最多获得:" class="flex rel">
                    <el-input placeholder="请输入标签名称" v-model="growthData.most4" style="width: 300px"></el-input>
                    <button class="but">成长值</button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="getGrowthVisible">选 择</el-button>
          <el-button @click="growthVisible= false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      rightsAndInterestsVisible: false,
      checkList1: [],
      checkList2: [],
      discount: "",
      growthVisible: false,
      growthData: {
        visit: "", // 访问
        share: "", // 分享
        consumption: "", // 消费
        recharge: "", // 充值
        most1: "", // 最多
        most2: "", // 最多
        most3: "", // 最多
        most4: "", // 最多
      },
    };
  },
  methods: {
    handleSelectionChange() {},
    // 权益设置
    rightsAndInterests() {
      this.rightsAndInterestsVisible = true;
    },
    // 权益设置里的确认按钮
    getRightsAndInterestsVisible() {
      if (this.discount == "") {
        this.$message({
          message: "请填写必要信息",
          type: "error",
        });
      } else {
        this.$message({
          message: "权益设置成功",
          type: "success",
        });
        this.rightsAndInterestsVisible = false;
      }
    },
    // 编辑会员等级
    editMember() {
      this.$router.push({
        path: "member/editMember",
      });
    },
    // 成长值设置
    getGrowth() {
      this.growthVisible = true;
    },
    getGrowthVisible() {
      if (
        (this.growthData.visit,
        this.growthData.share,
        this.growthData.consumption,
        this.growthData.recharge
        )
      ) {
        // 有值
        this.$message({
          message: "积分修改成功",
          type: "success",
        });
        this.growthVisible = false;
      } else {
        // 某一项没有值
        this.$message({
          message: "请填写必要信息",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.rel {
  margin-top: 15px;
  position: relative;
}
.but {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  border: none;
  border: 1px solid #ccc;
}
.el-form-item {
  margin: 0;
  justify-content: center;
}
.el-dialog__body {
  padding: 0 20px;
}
.el-dialog {
  margin-top: 200px;
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
.rightsInput {
  width: 100%;
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 14px;
      margin: 0;
    }
    input {
      width: 150px;
      height: 30px;
      border: none;
      border: 1px solid #ccc;
      font-size: 12px;
      padding-left: 10px;
    }
    button {
      width: 30px;
      height: 30px;
      border: none;
      border: 1px solid #ccc;
      border-left: none;
    }
  }
  span {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-top: 15px;
  }
}
.members {
  padding: 10px 20px;
  background: #ffffff;
}
.member_type {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  & > div {
    height: 157px;
    border: 1px solid #ccc;
    background: #f6f6f6;
    border-radius: 3px;
  }
  .type_one {
    width: 466px;
    padding-left: 18px;
    div {
      display: flex;
      align-items: flex-end;
      margin-top: 14px;
      span {
        font-size: 18px;
        font-family: "微软雅黑", "微软雅黑"-400;
        font-weight: 400;
      }
      b {
        font-size: 12px;
        font-family: "微软雅黑", "微软雅黑"-400;
        font-weight: 400;
        color: #666666;
      }
    }
    h3 {
      width: 187px;
      margin: 0;
      margin-top: 14px;
      font-size: 28px;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
    }
    p {
      margin: 0;
      margin-top: 30px;
      font-size: 12px;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
      color: #666666;
    }
  }

  .type_two {
    width: 522px;
    padding-left: 29px;
    h3 {
      font-size: 18px;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
    }
    ul {
      width: 250px;
      li {
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          width: 100px;
          font-size: 12px;
          font-family: "微软雅黑", "微软雅黑"-400;
          font-weight: 400;
          color: #666666;
        }
        span {
          width: 100px;
          font-size: 12px;
          font-family: "微软雅黑", "微软雅黑"-400;
          font-weight: 400;
          color: #666666;
        }
      }
    }
  }
  .type_three {
    width: 710px;
    padding-left: 18px;
    div {
      display: flex;
      align-items: flex-end;
      margin-top: 14px;
      span {
        font-size: 18px;
        font-family: "微软雅黑", "微软雅黑"-400;
        font-weight: 400;
      }
      b {
        font-size: 12px;
        font-family: "微软雅黑", "微软雅黑"-400;
        font-weight: 400;
        margin-left: 10px;
        cursor: pointer;
        color: #0066ff;
      }
    }
    ul {
      width: 350px;
      margin-top: 15px;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 25px;
        h3 {
          width: 120px;
          font-size: 12px;
          font-family: "微软雅黑", "微软雅黑"-400;
          font-weight: 400;
          color: #666666;
        }
        p {
          width: 120px;
          font-size: 12px;
          font-family: "微软雅黑", "微软雅黑"-400;
          font-weight: 400;
          color: #666666;
        }
      }
    }
  }
}
.member_list {
  margin-top: 20px;
}
</style>
