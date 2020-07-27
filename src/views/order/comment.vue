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
            <el-form-item label="商品名称:" class="flex">
              <el-input
                v-model="label_form.name"
                type="text"
                placeholder="请输入内容"
                class="input-box"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单时间:" class="flex">
              <el-date-picker v-model="label_form.date" type="date" placeholder="请选择时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6">
            <el-form-item label class="flex">
              <el-button type="primary" size="small">筛选</el-button>
              <el-button size="small">EXCEL导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table-box">
        <ol>
          <li class="wid8">内容</li>
          <li class="wid2">评价时间</li>
          <li class="wid2">买家</li>
          <li class="wid4">商家回复</li>
        </ol>
        <ul>
          <li>
            <div class="upper">
              <p>
                退款编号：
                <em>2019092309485700000001</em>
              </p>
              <p>
                订单编号：
                <em>2019092309485700000001</em>
              </p>
            </div>
            <ul class="lower">
              <li class="wid8 content">
                <div>
                  <p>好啊!好啊!好啊!好啊!好啊!好啊!好啊!好啊!好啊!好啊!好啊!好啊!</p>
                  <a href="javascript:;">详情</a>
                </div>
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595846019198&di=6216fab3f6a0c73657ad6c8b4c7f0a18&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3Dbbba1da0d60735fa91a546bdab612385%2F9825bc315c6034a84e7d073ac9134954082376e9.jpg"
                />
              </li>
              <li class="wid2 date">
                <p>2019-09-24 12:41:12</p>
              </li>
              <li class="wid2 buyer">
                <h3>蔡徐坤</h3>
                <p>1569373434343</p>
              </li>
              <li class="wid4 reply">
                <p>回复</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "comment",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      label_form: {},
      ss: "123",
      tableDataProduct: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return [1, 9];
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
p {
  margin: 0;
}
.wid8 {
  width: 800px;
  padding: 0 20px;
}
.wid2 {
  width: 250px;
  padding: 0 20px;
}
.wid4 {
  width: 450px;
  text-align: right;
  padding: 0 20px;
}
.table-box {
  padding-top: 30px;
  ol {
    width: 100%;
    height: 50px;
    background: #f2f2f2;
    display: flex;

    li {
      line-height: 50px;
      font-size: 14px;
    }
  }
  & > ul {
    & > li {
      width: 100%;
      height: 200px;
      border: 1px solid #ccc;
      margin-top: 10px;
      .upper {
        width: 100%;
        height: 50px;
        background: #f2f2f2;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        p {
          margin-left: 20px;
          font-size: 12px;
          em {
            font-style: normal;
            color: #0066ff;
          }
        }
      }
      .lower {
        width: 100%;
        height: 150px;
        display: flex;
        & > li > p {
          color: #666666;
          font-family: "微软雅黑", "微软雅黑"-400;
          font-weight: 400;
          font-size: 12px;
          text-align: center;
        }
        .content {
          border-right: 1px solid #ccc;
          div {
            width: 100%;
            height: 20px;
            display: flex;
            font-size: 12px;
            justify-content: space-between;
            margin-top: 20px;
            color: #666;
            a {
              color: #0066ff;
              margin-right: 20px;
            }
          }
          img {
            width: 80px;
            height: 80px;
            margin-top: 15px;
          }
        }
        .date {
          border-right: 1px solid #ccc;
          p {
            margin-top: 20px;
          }
        }
        .buyer {
          border-right: 1px solid #ccc;
          h3 {
            margin: 0;
            margin-top: 20px;

            color: #666666;
            font-family: "微软雅黑", "微软雅黑"-400;
            font-weight: 400;
            font-size: 12px;
          }
          p {
            text-align: left;
            margin-top: 10px;
          }
        }
        .reply {
          p {
            margin-top: 50px;
            text-align: right;
            color: #0066ff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.block{
  width: 100%;
  margin-top: 15px;
  .el-pagination{
    width: 500px;
    float: right;
  }
}
</style>

