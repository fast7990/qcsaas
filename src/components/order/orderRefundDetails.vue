<template>
  <div class="details">
    <div class="head">
      <p>退款编号：{{orderDetails.refund_number}}</p>
      <span>申请时间：{{orderDetails.created_at}}</span>
      <b>退款申请</b>
    </div>
    <div class="order_status">
      <div class="status_left">
        <h3>等待处理退款申请</h3>
        <p>请在6天12小时34分钟56秒内处理完成，超时自动同意</p>
        <div>
          <button>同意退款</button>
          <button>拒绝退款</button>
        </div>
      </div>
      <div class="status_right">
        <ul>
          <li>买家申请退款</li>
          <li>商户审核</li>
          <li>退款完成</li>
        </ul>
        <el-steps :active="active" process-status="finish" align-center space="450px">
          <el-step title="步骤 1" icon="el-icon-success" description></el-step>
          <el-step title="步骤 2" icon="el-icon-success" description></el-step>
          <el-step title="步骤 3" icon="el-icon-success" description></el-step>
        </el-steps>
      </div>
    </div>
    <div class="information">
      <div class="information_left">
        <div>
          <i>退款信息</i>
        </div>
        <span>售后类型：退款</span>
        <span>
          退款原因：其他
          <a href="javascript:;" class="Adetails color">详情</a>
        </span>
        <span>退款金额：¥10000.00</span>
        <span>申请时间：2019-09-24 12:41:12</span>
        <span>超时时间：2019-09-24 12:41:12</span>
      </div>
      <div class="information_cent">
        <div>
          <i>支付信息</i>
        </div>
        <b>订单编号：2019092309485700000001</b>
        <b>付款时间：2019-09-23 09:48:53</b>
        <b>活动优惠：¥0.00</b>
        <b style="margin-left: 168px">运费：¥0.00</b>
        <b>付款金额：¥10000.00</b>
      </div>
      <div class="information_right">
        <div>
          <i>买家信息</i>
        </div>
        <span>买家昵称：蔡徐坤</span>
        <span>联系电话：15925656566</span>
      </div>
    </div>
    <div class="table">
      <el-table
        ref="singleTable"
        :data="tableData"
        :header-cell-style="{background:'#f2f2f2'}"
        style="width: 100%;margin-top: 20px;"
      >
        <el-table-column property="date" label="商品" width="720">
          <div>ssssssssssss</div>
        </el-table-column>
        <el-table-column property="date" label="价格" width="280"></el-table-column>
        <el-table-column property="name" label="数量" width="280"></el-table-column>
        <el-table-column property="name" label="商品状态"></el-table-column>
        <el-table-column label="地址" align="center">
          <a href="javascript:;" class="color">{{xx==null?"-":"退款"}}</a>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrderRefundDetail } from "@/api/order";
export default {
  name: "order_refund_details",
  data() {
    return {
      active: -1,
      refund_number: this.$route.query.refund_number,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      xx: "",
      orderDetails: {
        refund_number: "TK423456789",
        refund_reason: "漏水",
        created_at: "2020-07-01 10:00:04",
        ship_expire_at: "2020-07-10 10:00:04",
        type: "1",
        status: "1",
        refund_amount: "25800",
        logistics_company: "龙门镖局",
        logistics_number: "LMBJ25732",
        logistics_status: "1",
        order: {
          order_number: "AF123456789",
          pay_at: "2020-07-01 10:10:04",
          discount_amount: "100",
          logistics_fee: "1000",
          amount: "25800",
          logistics_name: "王富贵",
          logistics_mobile: "18999999999",
        },
        products: [
          {
            id: "1890002321",
            thumb:
              "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
            name: "茶壶",
            spec: "紫砂壶",
            num: "1",
            refund_amount: "11800",
            product_id: "100123012",
          },
          {
            id: "1890002322",
            thumb:
              "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
            name: "绿茶",
            spec: "100g",
            num: "1",
            refund_amount: "14000",
            product_id: "100124112",
          },
        ],
      }, // 列表详情
    };
  },
  created() {
    this.getOrderRefundDetails();
  },
  methods: {
    async getOrderRefundDetails() {
      //   var token = document.cookie.split(";")[0].split("=")[1];
      //   var data = {
      //     access_token: token,
      //     refund_number: this.order_number
      //   }
      //   var res = await getOrderRefundDetail(data);
      //   this.orderDetails = res.request_data.items;
    },
  },
};
</script>

<style lang="scss" >
.cursor {
  cursor: pointer;
}
.color {
  color: #0066ff;
}
.Adetails {
  margin-left: 10px;
}
.details {
  padding: 0 20px;
}
.head {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #666;
  p {
    margin: 0;
    float: left;
  }
  span {
    float: left;
    margin-left: 25px;
  }
  b {
    margin-left: 25px;
    float: left;
    font-weight: 100;
  }
}
.order_status {
  width: 100%;
  height: 250px;
  border: 1px solid #ccc;
  .status_left {
    width: 30%;
    height: 100%;
    border-right: 1px solid #ccc;
    overflow: hidden;
    float: left;
    h3 {
      margin: 0;
      text-align: center;
      font-size: 28px;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
      margin-top: 46px;
    }
    p {
      margin: 0;
      text-align: center;
      font-family: "微软雅黑", "微软雅黑"-400;
      font-weight: 400;
      color: #999999;
      font-size: 12px;
      margin-top: 30px;
    }
    div {
      margin: 0 auto;
      text-align: center;
      margin-top: 30px;
      button {
        padding: 10px 15px;
        border: none;
        cursor: pointer;
      }
      button:nth-child(1) {
        background: #2d8cf0;
        border-radius: 2px;
        font-size: 12px;
        font-family: "Microsoft YaHei UI", "Microsoft YaHei UI"-400;
        font-weight: 400;
        color: #ffffff;
      }
      button:nth-child(2) {
        background: #ed4014;
        border: 0px solid #dddee1;
        border-radius: 2px;
        font-size: 12px;
        font-family: "Microsoft YaHei UI", "Microsoft YaHei UI"-400;
        font-weight: 400;
        color: #ffffff;
        margin-left: 12px;
      }
      button:hover {
        opacity: 0.7;
      }
    }
  }
  .status_right {
    float: left;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ul {
      display: flex;
      width: 78%;
      margin-top: 60px;
      li {
        width: 33.33%;
        text-align: center;
      }
    }
    .el-steps {
      width: 78%;
      margin-top: 24px;
      .el-step__description {
        color: #ccc;
      }
    }
  }
}
.information {
  width: 100%;
  height: 270px;
  border: 1px solid #ccc;
  margin-top: 10px;
  color: #666;
  & > div {
    width: 33.33%;
    height: 100%;
    border-right: 1px dotted #ccc;
    float: left;
  }
  .information_left {
    font-size: 14px;
    div {
      display: flex;
      align-items: center;
      margin-left: 140px;
      margin-top: 36px;
      i {
        font-size: 16px;
        font-style: normal;
      }
    }
    span {
      display: block;
      margin-left: 140px;
      margin-top: 20px;
    }
    b {
      display: block;
      font-weight: 100;
      margin-left: 140px;
      margin-top: 20px;
    }
  }
  .information_cent {
    @extend .information_left;
    b {
      display: block;
      font-weight: 100;
      margin-left: 140px;
      margin-top: 20px;
    }
  }
  .information_right {
    @extend .information_left;
  }
}
</style>