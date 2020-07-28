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
          <li v-for="item in commentList" :key="item.id">
            <div class="upper">
              <p>
                商品信息:
                <em>{{item.product.name}}</em>
              </p>
              <p>
                订单编号：
                <em>{{item.order.order_number}}</em>
              </p>
            </div>
            <ul class="lower">
              <li class="wid8 content">
                <div>
                  <p>{{item.content}}</p>
                  <a href="javascript:;" @click="getComment(item.content,item.product.thumb)">详情</a>
                </div>
                <img :src="item.product.thumb" />
              </li>
              <li class="wid2 date">
                <p>{{item.reply_at}}</p>
              </li>
              <li class="wid2 buyer">
                <h3>{{item.order.logistics_name}}</h3>
                <p>{{item.order.logistics_mobile}}</p>
              </li>
              <li class="wid4 reply">
                <p @click="getContentClick(item.id)">回复</p>
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
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total "
        ></el-pagination>
      </div>
    </div>
    <!-- 评价详情 -->
    <el-dialog :visible.sync="dialogDetail" width="30%">
      <p>{{content}}</p>
      <img :src="src" width="100px"/>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogBtn">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 回复 -->
    <el-dialog title="标签编辑" :visible.sync="dialogItem" width="30%">
      <el-form>
        <el-form-item label="标签名称:" class="flex">
          <el-input type="textarea" v-model="nameContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogItemBtn(1)">取 消</el-button>
        <el-button type="primary" @click="dialogItemBtn(2)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderCommentList, getOrderCommentReply } from "@/api/order";
export default {
  name: "comment",
  data() {
    return {
      dialogDetail: false,
      content: "",
      src: "",
      id: 0,
      dialogItem: false,
      nameContent: "",
      label_form: {},
      ss: "123",
      tableDataProduct: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      currentPage: 0,
      commentList: [
        {
          id: "1890002321",
          content: "茶壶不隔热，烫手还烫嘴",
          reply: "烫手肯定烫嘴啊",
          reply_at: "2020-07-03 10:00:04",
          created_at: "2020-07-01 10:00:04",
          product: {
            thumb:
              "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
            name: "茶壶",
            spec: "紫砂壶",
          },
          order: {
            order_number: "AF123456789",
            logistics_name: "王富贵",
            logistics_mobile: "18999999999",
          },
        },
      ],
      total: 123,
    };
  },
  created() {
    this.getOrderCommentLists();
    this.getOrderCommentReplys();
  },
  methods: {
    async getOrderCommentLists() {
      // var token = document.cookie.split(";")[0].split("=")[1];
      // var data = {
      //   access_token: token,
      // };
      // var res = await getOrderCommentList(data);
      // this.commentList = res.response_data.items;
      // this.commentTotal = res.response_data.total;
    },
    async getOrderCommentReplys() {
      // var token = document.cookie.split(";")[0].split("=")[1];
      // var data = {
      //   access_token: token,
      //   id: this.id,
      //   reply: this.nameContent,
      // };
      // var res = await getOrderCommentReply(data);
      // this.getOrderCommentLists();
    },
    getComment(c, i) {
      this.dialogDetail = true;
      this.content = c;
      this.src = i;
    },
    dialogBtn() {
      this.dialogDetail = false;
    },
    getContentClick(id) {
      this.id = id
      this.dialogItem = true;
    },
    dialogItemBtn(type) {
      if (type == 1) {
        this.dialogItem = false;
      } else {
        if(this.nameContent){
          this.getOrderCommentReplys();
          this.dialogItem = false;
        }else{
          this.$message.error('内容不能为空');
        }
      }
    },
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
.block {
  width: 100%;
  margin-top: 15px;
  .el-pagination {
    width: 500px;
    float: right;
  }
}
</style>

