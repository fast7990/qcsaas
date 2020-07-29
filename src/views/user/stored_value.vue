<template>
  <div class="stored">
    <el-form>
      <div class="population">
        <div>
          <span>*</span>可用人群 :
        </div>
        <el-radio v-model="radio" label="1">客户</el-radio>
        <el-radio v-model="radio" label="2">会员</el-radio>
      </div>
      <div class="fixed_amount">
        <div>固定金额 :</div>
        <div>
          <ul>
            <li>
              <h3>10元</h3>
              <p>x</p>
            </li>
            <li>
              <h3>1000元</h3>
              <p>x</p>
            </li>
            <li>
              <h3>100元</h3>
              <p>x</p>
            </li>
          </ul>
          <p @click="getAdd">添加</p>
        </div>
      </div>
      <div class="csustom_amount">
        <div>
          <p>自定义金额 :</p>
          <el-switch v-model="show"></el-switch>
        </div>
        <div style="width: 280px">
          <p>最低充值</p>
          <el-input placeholder="请输入内容" size="mini" v-model="recharge"></el-input>
          <el-button size="mini">元</el-button>
        </div>
      </div>
      <div class="preservation">
        <el-button type="primary" @click="preservation">保存</el-button>
      </div>
    </el-form>
    <el-dialog title="新增固定金额" :visible.sync="newFixedAmountVisible" width="500px">
      <div class="one">
        <label>* 固定金额:</label>
        <el-input placeholder="请输入内容" style="width: 220px;margin-left: 7px" v-model="fixed"></el-input>
        <el-button>元</el-button>
      </div>
      <div class="two">
        <div class="two_donation_amount">
          <label>* 固定金额:</label>
        </div>
        <div class="two_bonus_points">
          <el-radio-group v-model="amount" size="small">
            <div>
              <el-radio label="1">备选项1</el-radio>
              <el-input placeholder="请输入内容" style="width: 260px" v-model="money"></el-input>
              <el-button style="padding-right: 30px">元</el-button>
            </div>
            <div>
              <el-radio label="2">备选项1</el-radio>
              <el-input placeholder="请输入内容" style="width: 260px" v-model="integral"></el-input>
              <el-button style="top: 26px;padding-right: 45px">积分</el-button>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="getNewFixedAmountVisible">确 定</el-button>
        <el-button @click="newFixedAmountVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1", // 可用人群
      checked: false,
      show: false, // 自定义金额
      recharge: "", // 最低充值
      newFixedAmountVisible: false,
      amount: "", // 充值赠送
      fixed: "", // 固定金额
      money: "", // 赠送金额
      integral: "", // 赠送积分
    };
  },
  methods: {
    // 保存
    preservation() {
      if ((this.radio, this.checked, this.show, this.recharge)) {
        this.$message({
          message: "积分设置保存成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "必填项不能为空",
          type: "error",
        });
      }
    },
    getAdd() {
      this.newFixedAmountVisible = true;
    },
    getNewFixedAmountVisible() {
      if (this.fixed === "") {
        this.$message({
          message: "固定金额不能为空",
          type: "error",
        });
      } else {
        this.$message({
          message: "固定金额添加成功",
          type: "success",
        });
        this.newFixedAmountVisible = false
      }
    },
  },
};
</script>

<style lang="scss">
.el-form-item {
  margin: 0;
  margin: 0 auto;
}
.el-dialog__body {
  padding: 0 20px;
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
.one {
  display: flex;
  align-items: center;
  margin-top: 20px;
  input {
    margin-left: 12px;
  }
}
.two {
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  overflow: hidden;
  .two_donation_amount {
    margin-top: 10px;
  }
  .two_bonus_points {
    margin-left: 20px;
    .el-radio-group {
      div {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        position: relative;
        button {
          width: 37px;
          height: 39px;
          position: absolute;
          right: 0;
          top: 27px;
        }
      }
    }
  }
}
.stored {
  padding: 10px 20px;
}
.population {
  display: flex;
  div {
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑",
      "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑"-500;
    font-weight: 500;
    font-size: 14px;
    margin-right: 20px;
    span {
      color: red;
      margin-right: 5px;
    }
  }
}
.fixed_amount {
  margin-top: 20px;
  div {
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑",
      "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑"-500;
    font-weight: 500;
    font-size: 14px;
    margin-left: 10px;
  }
  div:nth-child(2) {
    display: flex;
    margin-top: 10px;
    ul {
      display: flex;
      li {
        display: flex;
        align-items: center;
        margin-right: 15px;
        h3 {
          margin: 0;
          height: 30px;
          line-height: 30px;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          border: none;
          font-size: 12px;
          padding: 0 15px;
          border: 1px solid #ccc;
          background: #eee;
          font-weight: 100;
          color: #222;
        }
        p {
          margin: 0;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border: 1px solid #ccc;
          border-left: none;
          background: #eee;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    & > p {
      font-size: 14px;
      color: #2b85e4;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
      cursor: pointer;
    }
  }
}
.csustom_amount {
  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    p {
      font-size: 14px;
      margin-right: 10px;
    }
  }
  div:nth-child(2) {
    display: flex;
    margin: 0 0 0 10px;
    p {
      margin: 0;
      width: 100px;
      font-size: 12px;
    }
  }
}
.preservation {
  margin: 30px 0 0 10px;
}
</style>