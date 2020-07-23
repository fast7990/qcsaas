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
          <p>添加</p>
        </div>
      </div>
      <div class="csustom_amount">
        <div>
          <p>自定义金额 :</p>
          <el-switch v-model="show"></el-switch>
        </div>
        <div style="width: 280px">
            <p>最低充值</p>
            <el-input placeholder="请输入内容" size="mini"></el-input>
            <el-button size="mini">元</el-button>
        </div>
      </div>
      <div class="preservation">
        <el-button type="primary">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      checked: false,
      show: true
    };
  }
};
</script>

<style lang="scss">
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
    }
  }
}
.csustom_amount {
  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    p{
        font-size: 14px;
        margin-right: 10px;
    }
  }
  div:nth-child(2){
      display: flex;
      margin: 0 0 0 10px;
      p{
          margin: 0;
          width: 100px;
          font-size: 12px;
      }
  }
}
.preservation{
    margin: 30px 0 0 10px;
}
</style>