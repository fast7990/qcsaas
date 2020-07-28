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
          <el-col :span="6">
            <el-form-item label="订单类型:" class="flex">
              <el-date-picker v-model="label_form.date" type="date" placeholder="请选择时间"></el-date-picker>
            </el-form-item>
          </el-col>
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
            <el-form-item label class="flex">
              <el-button type="primary" size="small">筛选</el-button>
              <el-button size="small">EXCEL导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
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
      <div></div>
      <div class="content">
        <ul>
          <li>商品</li>
          <li>退款状态</li>
          <li>退款金额</li>
          <li>申请时间</li>
          <li>操作</li>
        </ul>
        <ol>
          <li v-for="item in refundLists" :key="item.refund_number">
            <div class="upper">
              <p>退款编号：{{item.refund_number}}</p>
              <span>
                订单编号：
                <em>{{item.refund_number}}</em>
              </span>
              <button>退款</button>
              <a href="javascript:;" @click="orderRefundDetails(item.refund_number)">查看详情</a>
            </div>
            <div class="lower">
              <div class="commodity">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595846019198&di=6216fab3f6a0c73657ad6c8b4c7f0a18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3Dbbba1da0d60735fa91a546bdab612385%2F9825bc315c6034a84e7d073ac9134954082376e9.jpg"
                />
                <p>
                  <b>锦鲤每日腰果 175克</b>
                  <span>黑色/M</span>
                </p>
              </div>
              <div class="state">
                <span></span>
                <p>{{states}}</p>
              </div>
              <div class="price">
                <p>¥{{item.amount}}.00</p>
              </div>
              <div class="date">
                <p>{{item.created_at}}</p>
              </div>
              <div class="operation">
                <p>同意退款</p>
                <a href="javascript:;">拒绝退款</a>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderRefundList } from "@/api/order";
export default {
  name: "refund_manage",
  data() {
    return {
      currentPage: 1,
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
      tableDataProduct: [],
      refundLists: [
        {
          order_number: "AF123456789",
          refund_number: "TK423456789",
          created_at: "2020-07-01 10:00:04",
          type: "1",
          status: "1",
          amount: "25800",
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
        },
        {
          order_number: "AF323454789",
          refund_number: "TK8923454789",
          created_at: "2020-07-01 10:00:04",
          type: "1",
          status: "1",
          amount: "1200",
          products: [
            {
              id: "1890002456",
              thumb:
                "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
              name: "牙刷",
              spec: "3支装",
              num: "1",
              refund_amount: "1000",
              product_id: "200123012",
            },
            {
              id: "1890002967",
              thumb:
                "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
              name: "铅笔",
              spec: "2B",
              num: "2",
              refund_amount: "200",
              product_id: "300124112",
            },
          ],
        },
      ],
      total: 1,
    };
  },
  created() {
    this.getOrderRefundLists();
  },
  computed: {
    states() {
      var statesTit = "";
      if (this.total == 0) {
        statesTit = "待处理";
      } else if (this.total === 1) {
        statesTit = "退货中";
      } else if (this.total === 2) {
        statesTit = "退款中";
      } else if (this.total === 3) {
        statesTit = "已退款";
      } else if (this.total === 4) {
        statesTit = "已取消";
      } else if (this.total === 5) {
        statesTit = "已拒绝";
      }
      return statesTit;
    },
  },
  methods: {
    async getOrderRefundLists() {
      var token = document.cookie.split(";")[0].split("=")[1];
      var data = {
        access_token: token,
      };
      var res = await getOrderRefundList(data);
      console.log(res.response_data);
      this.total = res.response_data.total;
      // this.refundLists = res.response_data.items;
    },
    orderRefundDetails(msg) {
      this.$router.push({
        path: "order/refundDetails",
        query: {
          refund_number: msg,
        },
      });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return [1, 9];
    },
    arraySpanMethodSubTable({ row, column, rowIndex, columnIndex }) {},
    handleSelectionChangeProduct(val) {
      // console.log(val);
    },
    changeSortTable(e) {
      // 表格排序
      // console.log(e);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" >
.pages {
  padding: 10px 20px;
  background: #ffffff;
}
.input-box {
  width: 200px;
}
.el-button:focus,
.el-button:hover {
  background-color: #409eff;
  color: #ffffff;
}

.content {
  width: 100%;
  margin-top: 15px;
  ul {
    width: 100%;
    height: 50px;
    background: red;
    display: flex;
    background: #f2f2f2;
    li {
      width: 20%;
      height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
    }
  }
  ol {
    width: 100%;
    li {
      width: 100%;
      height: 100px;
      border: 1px solid #ccc;
      margin-top: 10px;

      .upper {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        font-size: 12px;
        background: #f2f2f2;
        position: relative;
        p,
        span {
          width: 230px;
          margin-left: 15px;
        }
        & > span {
          em {
            color: #0066ff;
            font-style: normal;
          }
        }
        button {
          margin-left: 100px;
          height: 25px;
          padding: 0 10px;
          border: none;
          background: #409eff;
          color: #fff;
        }
        a {
          flex: 1;
          width: 20%;
          text-align: center;
          position: absolute;
          right: 0;
          top: 0;
          margin-top: 8px;
          color: #0066ff;
        }
      }
      .lower {
        width: 100%;
        height: 70px;
        display: flex;
        div {
          width: 20%;
          height: 100%;
          p {
            margin: 0;
            font-size: 12px;
            color: #333;
            width: 0;
          }
        }
        .commodity {
          display: flex;
          align-items: center;
          justify-content: space-around;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          p {
            width: 60%;
            height: 70px;
            b {
              height: 50%;
              display: block;
              margin-top: 12px;
              font-weight: 100;
            }
          }
        }
        .state {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            display: block;
            width: 10px;
            height: 10px;
            background: red;
            border-radius: 50%;
          }
          p {
            width: 50px;
            height: 30px;
            text-align: center;
            line-height: 30px;
          }
        }
        .price {
          p {
            width: 100%;
            line-height: 70px;
            text-align: center;
          }
        }
        .date {
          p {
            width: 100%;
            line-height: 70px;
            text-align: center;
          }
        }
        .operation {
          p {
            width: 100%;
            height: 20px;
            text-align: center;
            color: #0066ff;
            margin-top: 20px;
          }
          a {
            display: block;
            font-size: 12px;
            width: 100%;
            height: 30px;
            text-align: center;
            color: #0066ff;
          }
        }
      }
    }
  }
}
.block {
  width: 100%;
  margin-top: 15px;
  .el-pagination {
    width: 500px;
    float: right;
  }
}
</style>


