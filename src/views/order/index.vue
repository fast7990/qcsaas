<!--
 * @Author: [hsp]
 * @Date: 2020-06-24 16:09:50
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-06 11:27:41
 * @Description: 
--> 
<template>
  <div class="pages">
    <div class="page-container">
      <el-form ref="label_form" :model="label_form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="订单编号:" class="flex">
              <el-input
                v-model="label_form.name"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型:" class="flex">
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
          <el-col :span="12">
            <el-form-item label="下单时间:" class="flex">
              <el-date-picker
                v-model="label_form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="收货姓名:" class="flex">
              <el-input
                v-model="label_form.name"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货手机:" class="flex">
              <el-input
                v-model="label_form.name"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品名称:" class="flex">
              <el-input v-model="label_form.name" type="text" class="input-box" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label class="flex">
              <el-button type="primary" size="small">筛选</el-button>
              <el-button size="small">EXCEL导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class>
          <el-button-group>
            <el-button class="cell-btn left-circle">全部</el-button>
            <el-button class="cell-btn">待付款</el-button>
            <el-button class="cell-btn">待发货</el-button>
            <el-button class="cell-btn">已发货</el-button>
            <el-button class="cell-btn">已完成</el-button>
            <el-button class="cell-btn right-circle">已关闭</el-button>
          </el-button-group>
        </div>
      </el-form>
      <div class="table-box">
        <div class="thead">
          <p>商品</p>
          <p>价格</p>
          <p>数量</p>
          <p>收货人/手机</p>
          <p>付款金额</p>
          <p>物流方式</p>
          <p>订单状态</p>
          <p>操作</p>
        </div>
        <ul class="content">
          <li v-for="item in orderList" :key="item.order_number">
            <div class="user_top">
              <i>订单编号：{{item.order_number}}</i>
              <p>下单时间：{{item.created_at}}</p>
              <b>付款方式：{{item.pay_type==1?"微信":"余额"}}付款</b>
              <span class="color cursor" @click="routerDetails(item.order_number)">查看详情</span>
            </div>
            <div class="lower">
              <div class="shop">
                <div class="list" v-for="msg in item.products" :key="msg.id">
                  <img :src="msg.thumb" />
                  <p>{{msg.name}}</p>
                  <span>￥{{msg.total_amount}}.00</span>
                  <b>{{msg.num}}</b>
                </div>
              </div>
              <div class="consignee">
                <p>{{item.logistics_name}}</p>
                <span>{{item.logistics_mobile}}</span>
              </div>
              <div class="money">
                <p>¥{{item.amount}}.00</p>
                <span>（含运费：¥{{item.logistics_fee}}.00）</span>
              </div>
              <div class="logistics">
                <p>{{item.logistics_company}}</p>
              </div>
              <div class="states">
                <p v-if="item.status==0">待付款</p>
                <p v-if="item.status==1">待发货</p>
                <p v-if="item.status==2">已发货</p>
                <p v-if="item.status==3">已完成</p>
                <p v-if="item.status==4">已关闭</p>
              </div>
              <div class="operation">
                <p class="color cursor" v-if="item.status==0">取消订单</p>
                <p class="color cursor" v-if="item.status==1">发货</p>
                <p class="color cursor" v-if="item.status==2">查看物流</p>
                <p class="color cursor" v-if="item.status==3">查看物流</p>
                <p class="color cursor" v-if="item.status==4"></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from "@/api/order";
export default {
  name: "order",
  data() {
    return {
      order_type_list: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      label_form: {},
      tableDataProduct: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      tableDataProducts: [
        [
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
        ],
      ],
      orderList: [
        {
          order_number: "AF123456789",
          created_at: "2020-07-01 10:00:04",
          pay_type: "1",
          status: "1",
          logistics_company: "龙门镖局",
          logistics_name: "王富贵",
          logistics_mobile: "18999999999",
          logistics_fee: "1000",
          amount: "25800",
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
              num: "2",
              orig_price: "8000",
              total_amount: "16000",
              pay_amount: "14000",
              product_id: "100124112",
            },
          ],
        },
        {
          order_number: "AF323454789",
          created_at: "2020-07-01 10:00:04",
          pay_type: "1",
          status: "1",
          logistics_company: "神风快运",
          logistics_name: "张桂花",
          logistics_mobile: "13333333333",
          logistics_fee: "0",
          amount: "1200",
          products: [
            {
              id: "1890002456",
              thumb:
                "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
              name: "牙刷",
              spec: "3支装",
              num: "1",
              orig_price: "1000",
              total_amount: "1000",
              pay_amount: "1000",
              product_id: "200123012",
            },
            {
              id: "1890002967",
              thumb:
                "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
              name: "铅笔",
              spec: "2B",
              num: "2",
              orig_price: "100",
              total_amount: "200",
              pay_amount: "200",
              product_id: "300124112",
            },
          ],
        },
      ], // 放的是请求过来的订单数据,
      total: 0, // 订单总条数
    };
  },
  created() {
    this.getOrderLists(); // 调用订单列表
  },
  methods: {
    // 请求订单列表数据
    async getOrderLists() {
      // var token = document.cookie.split(";")[0].split("=")[1];
      // var data = {
      //   access_token: token
      // };
      // var res = await getOrderList(data);
      // this.orderList = res.response_data.items;
      // this.total = res.response_data.total;
    },
    routerDetails(order){
      this.$router.push({
        path:"order/details",
        query:{
          order_number:order
        }
      })
    },
    arraySpanMethodSubTable({ row, column, rowIndex, columnIndex }) {},
    handleSelectionChangeProduct(val) {
      console.log(val);
    },
    changeSortTable(e) {
      // 表格排序
      console.log(e);
    },
  },
};
</script>

<style lang="scss" >
.cursor {
  cursor: pointer;
}
.color {
  color: #0066ff !important;
}
.pages {
  padding: 10px 20px;
  background: #ffffff;
}
.input-box {
  width: 200px;
}
.cell-btn {
  width: 85px;
  height: 36px;
  line-height: 36px;
  padding: 0;
}
.cell-btn.left-circle {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
.cell-btn.right-circle {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
.el-button:focus,
.el-button:hover {
  background-color: #409eff;
  color: #ffffff;
}
.table-box {
  padding-top: 30px;
  .thead {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f2f2f2;
    p {
      margin: 0;
      width: 12.5%;
      float: left;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    p:nth-child(2) {
      padding-left: 150px;
    }
  }
  .content {
    width: 100%;
    li {
      width: 100%;
      margin-top: 10px;
      border: 1px solid #ccc;
      .user_top {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        i {
          display: block;
          font-style: normal;
          width: 280px;
          margin-left: 15px;
          float: left;
        }
        p {
          width: 280px;
          margin: 0;
          float: left;
        }
        b {
          display: block;
          font-weight: 100;
          float: left;
          text-align: center;
          margin-left: 300px;
        }
        span {
          display: block;
          float: right;
          width: 12.5%;
          text-align: center;
        }
      }
      .lower {
        width: 100%;
        display: flex;
        .shop {
          width: 641px;
          // height: auto;
          border-right: 1px solid #ccc;
          .list {
            width: 100%;
            height: 100px;
            border-bottom: 1px solid #ccc;
            display: flex;
            img {
              width: 60px;
              height: 60px;
              margin-left: 20px;
              margin-top: 18px;
            }
            p {
              margin: 0;
              font-size: 14px;
              width: 180px;
              line-height: 20px;
              margin-left: 20px;
              margin-top: 18px;
            }
            span {
              display: block;
              width: 200px;
              text-align: center;
              margin-left: 16px;
              margin-top: 18px;
              font-size: 12px;
            }
            b {
              width: 85px;
              text-align: center;
              margin-top: 18px;
              font-size: 12px;
              font-weight: 100;
            }
          }
          div.list:last-child {
            border-bottom: none;
          }
        }
        .consignee {
          width: 220px;
          border-right: 1px solid #ccc;
          padding: 0 20px;
          font-size: 12px;
          color: #666;
          p {
            margin: 0;
            margin-top: 20px;
          }
          span {
            display: block;
            margin-top: 10px;
          }
        }
        .money {
          width: 220px;
          border-right: 1px solid #ccc;
          font-size: 12px;
          color: #666;
          p {
            margin: 0;
            margin-top: 20px;
            margin-left: 30px;
          }
          span {
            display: block;
            margin-top: 10px;
            margin-left: 20px;
          }
        }
        .logistics {
          width: 220px;
          border-right: 1px solid #ccc;
          font-size: 12px;
          color: #666;
          p {
            margin: 0;
            margin-top: 20px;
            margin-left: 30px;
          }
        }
        .states {
          @extend .logistics;
        }
        .operation {
          @extend .logistics;
          p {
            text-align: center;
            margin: 0;
            margin-top: 20px;
          }
          border-right: none;
        }
      }
    }
  }
}
</style>
