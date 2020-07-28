<template>
  <div class="details">
    <div class="head">
      <p>订单编号：{{orderDetails.order_number}}</p>
      <span>下单时间：{{orderDetails.created_at}}</span>
      <b>普通订单</b>
    </div>
    <div class="order_status">
      <div class="status_left">
        <h3>等待商户发货</h3>
        <p>请尽快处理发货，若无法发货请及时联系退款</p>
        <div>
          <button>发货</button>
          <button>整单退款</button>
        </div>
      </div>
      <div class="status_right">
        <ul>
          <li>买家下单</li>
          <li>买家付款</li>
          <li>商户发货</li>
          <li>交易完成</li>
        </ul>
        <el-steps :active="active" process-status="finish" align-center space="450px">
          <el-step title="步骤 1" icon="el-icon-success" description></el-step>
          <el-step title="步骤 2" icon="el-icon-success" description></el-step>
          <el-step title="步骤 3" icon="el-icon-success" description></el-step>
          <el-step title="步骤 4" icon="el-icon-success" description></el-step>
        </el-steps>
      </div>
    </div>
    <div class="information">
      <div class="information_left">
        <div>
          <i>收货信息</i>
          <a href="javascript:;">修改</a>
        </div>
        <p>收货人：蔡徐坤</p>
        <span>联系电话：15925656566</span>
        <b>收货地址：上海市 浦东新区 东方明珠塔11F</b>
      </div>
      <div class="information_cent">
        <div>
          <i>付款信息</i>
        </div>
        <span>付款金额：¥10050.00</span>
        <span>付款方式：微信付款</span>
        <b>付款方式：2019-09-23 09:48:53</b>
      </div>
      <div class="information_right">
        <div>
          <i>付款信息</i>
        </div>
        <span>配送方式：物流快递</span>
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
import { getOrderDetail } from "@/api/order";
export default {
  name: "order_details",
  data() {
    return {
      active: -1,
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
      order_number: this.$route.query.order_number,
      orderDetails: {
        order_number: "AF123456789",
        created_at: "2020-07-01 10:00:04",
        pay_type: "1",
        status: "3",
        remark: "请不要备注说里面有绿茶",
        logistics_company: "龙门镖局",
        logistics_name: "王富贵",
        logistics_mobile: "18999999999",
        logistics_address: "那个镇那个村",
        logistics_fee: "1000",
        amount: "25800",
        pay_at: "2020-07-01 10:10:04",
        delivery_at: "2020-07-02 10:10:04",
        receive_at: "2020-07-08 10:10:04",
        products: [
          {
            id: "1890002321",
            thumb:
              "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
            name: "茶壶",
            spec: "紫砂壶",
            num: "1",
            orig_price: "11800",
            total_amount: "11800",
            pay_amount: "11800",
            product_id: "100123012",
          },
          {
            id: "1890002322",
            thumb:
              "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
            name: "绿茶",
            spec: "100g",
            num: "1",
            orig_price: "8000",
            total_amount: "16000",
            pay_amount: "14000",
            product_id: "100124112",
          },
        ],
      }, // 列表详情
    };
  },
  created() {
    this.getOrderDetails();
  },
  methods: {
    async getOrderDetails() {
      // var token = document.cookie.split(";")[0].split("=")[1];
      // var data = {
      //   access_token: token,
      //   order_number: this.order_number
      // }
      // var res = await getOrderDetail(data);
      // this.orderDetails = res.request_data.items;
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
        width: 25%;
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
  height: 250px;
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
      a {
        font-size: 14px;
        color: #2d8cf0;
        margin-left: 15px;
      }
    }
    p {
      margin: 0;
      margin-left: 154px;
      margin-top: 35px;
    }
    span {
      display: block;
      margin-left: 140px;
      margin-top: 35px;
    }
    b {
      display: block;
      font-weight: 100;
      margin-left: 140px;
      margin-top: 35px;
    }
  }
  .information_cent {
    @extend .information_left;
  }
  .information_right {
    @extend .information_left;
  }
}
</style>