<template>
  <div class="integral">
    <ul>
      <li>
        <div>
          <span>*</span>
          <p>可用人群 :</p>
        </div>
        <el-radio v-model="radio" label="1">客户</el-radio>
        <el-radio v-model="radio" label="2">会员</el-radio>
      </li>
      <li>
        <div>
          <span>*</span>
          <p>积分有效期 :</p>
        </div>
        <el-row style="margin: 10px">
          <el-radio v-model="radio" label="1">永久生效</el-radio>
        </el-row>
        <el-row style="margin: 10px">
          <el-radio v-model="radio" label="2">到期失效</el-radio>
        </el-row>
        <el-row style="margin-left: 30px">
          <el-date-picker type="dates"  placeholder="请选择日期"></el-date-picker>
          <p style="margin-left: 20px;font-size: 12px;">到期积分清零</p>
        </el-row>
      </li>
      <li>
        <div>
          <span>*</span>
          <p>积分抵扣 :</p>
        </div>
        <el-switch v-model="value"></el-switch>
      </li>
      <li>
        <div>
          <span>*</span>
          <p>抵扣规则 :</p>
        </div>
        <div>
          <div>
            <input type="text" />
            <p>积分</p>
          </div>
          <span>抵扣￥1.00</span>
        </div>
      </li>
      <li>
        <div>
          <span>*</span>
          <p>积分获取 :</p>
        </div>
        <div>
          <div>
            <input type="text" placeholder="请输入抵扣积分" />
            <p>元</p>
          </div>
          <span>获取1积分</span>
        </div>
        <p class="obtain">获取上限：</p>
        <div class="get_obtain">
          <h3>每天最多获取</h3>
          <div>
            <input type="text" placeholder="请输入积分上限" />
            <p>积分</p>
          </div>
        </div>
      </li>
      <li>
          <el-button type="primary">保存</el-button>
      </li>
    </ul>
    <el-button  round></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.integral {
  padding: 10px 20px;
  ul {
    li {
      font-size: 14px;
      div {
        display: flex;
        align-items: center;
        & > span {
          color: red;
          margin-right: 5px;
        }
        p {
          margin-right: 10px;
          font-size: 14px;
        }
      }
    }
    li:nth-child(1) {
      height: 30px;
      display: flex;
      align-items: center;
    }
    li:nth-child(3) {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
    }
    li:nth-child(4) {
      & > div:nth-child(2) {
        display: flex;
        margin-left: 10px;
        margin-top: 5px;
        div {
          width: 200px;
          background: #f1f1f1;
          border: 1px solid #ccc;
          input {
            width: 150px;
            height: 30px;
            border: none;
          }
          p {
            margin: 0;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            float: right;
          }
        }
        & > span {
          color: #666;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
    li:nth-child(5) {
      @extend :nth-child(4);
      .obtain {
        margin-left: 12px;
      }
      .get_obtain {
        display: flex;
        align-items: center;
        height: 50px;
        margin-top: -10px;  
        h3 {
          font-size: 14px;
          margin-left: 15px;
          margin-right: 10px;
          font-family: "微软雅黑", "微软雅黑"-400;
          font-weight: 400;
        }
        div {
          width: 200px;
          background: #f1f1f1;
          border: 1px solid #ccc;
          input {
            width: 150px;
            height: 30px;
            border: none;
          }
          p {
            margin: 0;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            float: right;
          }
        }
      }
    }
    li:nth-child(6){
        margin: 20px 0 0 10px;
    }
  }
}
</style>
