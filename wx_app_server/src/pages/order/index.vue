<template>
  <view class="container order-detail">
    <view class style="position: fixed;width: 100%;z-index: 10;">
      <wuc-tab
        id="wucTabBox"
        :textFlex="true"
        :tab-list="tabList"
        :tabCur.sync="TabCur"
        @change="tabChange"
        :selectClass="selectClass"
      ></wuc-tab>
    </view>
    <view class style="height: 90rpx;width: 100%;"></view>
    <view class="bgcolorE"></view>
    <swiper
      :current="TabCur"
      duration="300"
      @change="swiperChange"
      class="swiper flex"
      id="swiperBox"
      :style="{ height: swiperHeight + 'px' }"
    >
      <swiper-item v-for="(item, index) in good_class_list" :key="index">
        <order-box-view
          :classBoxViewData="item.list_data ? item.list_data : []"
          :height="swiperHeight"
          :TabCur="TabCur"
          :open_type="1"
          @onChangeOrderBtn="onChangeOrderBtn"
          @onScrolltolower="onScrolltolower"
        ></order-box-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { mapState } from "vuex";
import WucTab from "@/components/wuc-tab/wuc-tab.vue";
import orderBoxView from "@/components/class-box-view/order-box-view.vue";
export default {
  name: "order-detail",
  components: { WucTab, orderBoxView },
  computed: {
    ...mapState({})
  },
  data() {
    return {
      id: "",
      swiperHeight: 900,
      selectClass: "select-class",
      search_value: "",
      TabCur: 0,
      specClass: "none",
      cancelText: "",
      course_list_parmes: { status: "", pay_status: "", page: 1, type: 1 },
      curr_order_number: "",
      tabList: [
        {
          name: "全部",
          status: "",
          pay_status: "",
          logistics_status: "",
          evaluate_status: ""
        },
        {
          name: "待付款",
          status: 1,
          pay_status: 1,
          logistics_status: "",
          evaluate_status: ""
        },
        {
          name: "待发货",
          status: 1,
          pay_status: 2,
          logistics_status: 1,
          evaluate_status: ""
        },
        {
          name: "已发货",
          status: "",
          pay_status: 2,
          logistics_status: 2,
          evaluate_status: 1
        },
        {
          name: "已完成",
          status: "",
          pay_status: "",
          logistics_status: 3,
          evaluate_status: ""
        }
      ],
      count: 0,
      good_class_list: [
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] }
      ],
      classBoxViewData: []
    };
  },
  onLoad(options) {
    let title = options.title;
    this.TabCur = options.type ? Number(options.type) : 0;
    if (title) {
      mpvue.setNavigationBarTitle({
        title: title
      });
    }
    this.initData(this.TabCur);
  },
  onPullDownRefresh() {
    setTimeout(() => {
      this.initData();
      mpvue.stopPullDownRefresh();
    }, 500);
  },
  onShow() {
    // this.reloadCurrentPage();
  },
  onReady() {
    //获取屏幕高度及比例
    let that = this;
    var winInfo = mpvue.getSystemInfo({
      success: function(res) {
        var windowHeight = res.windowHeight;
        //获取底部标题高度
        var dom = mpvue.createSelectorQuery().select("#wucTabBox");
        dom
          .fields({ size: true }, res2 => {
            if (!res2) {
              return;
            }
            //计算得出滚动区域的高度
            that.swiperHeight = windowHeight - 50;
          })
          .exec();
      }
    });
  },
  methods: {
    async initData() {
      //获取订单列表
      this.course_list_parmes.status = "";
      this.course_list_parmes.pay_status = "";
      this.course_list_parmes.page = 1;
      this.good_class_list = [
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] },
        { page: 1, count: 0, list_data: [] }
      ];
      this.swiperChange({ target: { current: this.TabCur } });
    },
    async getDataApi(parmes) {
      this.id = this.tabList[this.TabCur].id;
      let data = await this.$http.post("/orders/orders/lists", parmes);
      let [...good_class_list] = this.good_class_list;
      if (data.response_data) {
        let result = data.response_data;
        return result;
      } else {
        return {};
      }
    },
    stopPrevent() {
      //阻止默认事件
      return;
    },
    //规格弹窗开关
    toggleSpec() {
      if (this.specClass === "show") {
        this.specClass = "hide";
        setTimeout(() => {
          this.specClass = "none";
        }, 250);
      } else if (this.specClass === "none") {
        this.specClass = "show";
      }
    },
    tabChange(index) {
      //tab切换
      this.TabCur = index;
    },
    swiperChange(e) {
      //滑动切换
      let { current } = e.target;
      this.TabCur = current;
      this.course_list_parmes.status = this.tabList[this.TabCur].status;
      this.course_list_parmes.pay_status = this.tabList[this.TabCur].pay_status;
      this.course_list_parmes.logistics_status = this.tabList[
        this.TabCur
      ].logistics_status;
      this.course_list_parmes.evaluate_status = this.tabList[
        this.TabCur
      ].evaluate_status;
      if (this.good_class_list[this.TabCur].list_data.length == 0) {
        this.setGoodClassList();
      }
    },
    setGoodClassList() {
      //第一次请求数据
      this.course_list_parmes.page = this.good_class_list[this.TabCur].page;
      this.getDataApi(this.course_list_parmes).then(data => {
        let [...goodList] = this.good_class_list;
        goodList[this.TabCur].list_data = data.lists ? data.lists : [];
        goodList[this.TabCur].count = data.count;
        this.good_class_list = goodList;
      });
    },
    onScrolltolower(flg) {
      //上拉到底部
      if (flg) {
        console.log(this.good_class_list, "---");
        let num = Math.ceil(this.good_class_list[this.TabCur].count / 20);
        this.good_class_list[this.TabCur].page =
          this.good_class_list[this.TabCur].page + 1;
        this.course_list_parmes.page = this.good_class_list[this.TabCur].page;
        if (
          this.course_list_parmes.page > 1 &&
          this.course_list_parmes.page <= num
        ) {
          let [...goodList] = this.good_class_list;
          this.getDataApi(this.course_list_parmes).then(res => {
            if (res.lists.length > 0) {
              goodList[this.TabCur].list_data = goodList[
                this.TabCur
              ].list_data.concat(res.lists);
              goodList[this.TabCur].count = res.count;
              this.good_class_list = goodList;
            }
          });
        }
      }
    },
    onChangeOrderBtn(data) {
      //操作订单
      let { order_number, type, item } = data;
      console.log(data);
      switch (type) {
        case 1:
          //取消订单
          this.curr_order_number = order_number;
          mpvue.showModal({
            title: "提示",
            content: "确定要取消订单吗？",
            success: e => {
              if (e.confirm) {
                this.cancelCroductOrder(this.curr_order_number);
              }
            }
          });
          break;
        case 2:
          //待付款
          mpvue.navigateTo({
            url: "/pages/min/order/detail?order_number=" + order_number
          });
          break;
        case 3:
          //待发货
          mpvue.navigateTo({
            url: "/pages/min/order/detail?order_number=" + order_number
          });
          break;
        case 4:
          //待收货
          mpvue.showModal({
            content: "确定要收货吗?",
            success: res => {
              if (res.confirm) {
                this.setOrderStatus(order_number);
              }
            }
          });
          break;
        case 5:
          //物流跟踪
          break;
        case 6:
          //待评价
          break;
        case 7:
          //已评价
          break;
        case 8:
          //已取消
          break;
        case 9:
          //已取消
          break;
        case 10:
          //已取消
          break;
        case 11:
          //申请售后
          break;
        case 12:
          //退款
          break;
        default:
          break;
      }
    },
    reloadCurrentPage() {
      if (this.good_class_list[this.TabCur].page) {
        this.good_class_list[this.TabCur] = {};
        this.good_class_list[this.TabCur].page = 1;
        this.course_list_parmes.page = 1;
        this.setGoodClassList();
      }
    },
    payTypeBox() {},
    setOrderStatus(order_number) {
      this.$api.order_confirm({ order_number: order_number }).then(res => {
        console.log(res);
        if (res.error_code) {
          mpvue.showToast({
            icon: "none",
            title: res.error_msg
          });
        } else {
          mpvue.showToast({
            icon: "none",
            title: "收货成功",
            success: () => {
              this.reloadCurrentPage();
            }
          });
        }
      });
    },
    confirmCelOrder() {
      //确认取消订单
      this.toggleSpec();
      this.cancelCroductOrder(this.curr_order_number);
      this.curr_order_number = "";
    },
    cancelCelOrder() {
      //取消取消订单
      this.toggleSpec();
      for (let j = 0; j < this.cancel_list.length; j++) {
        this.cancel_list[j].checked = false;
      }
      this.cancelType = 0;
    },
    changeOrderCancelState(i) {
      for (let j = 0; j < this.cancel_list.length; j++) {
        this.cancel_list[j].checked = false;
      }
      this.cancelType = this.cancel_list[i].id;
      this.cancelText = this.cancel_list[i].text;
      this.cancel_list[i].checked = true;
    },
    cancelCroductOrder(order_number) {
      //取消订单
      this.$api.order_cancel({ order_number: order_number }).then(res => {
        if (res.error_msg) {
          mpvue.showToast({
            icon: "none",
            title: res.error_msg
          });
        } else {
          mpvue.showToast({
            icon: "none",
            title: "操作成功",
            success: () => {
              this.reloadCurrentPage();
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.order-detail {
  .uni-navbar-header {
    .center {
      input {
        background: #f1f1f1;
      }
    }
    .right {
      image {
        width: 54rpx;
        height: 50rpx;
      }
      text {
        font-size: 22rpx;
      }
    }
  }
  .swiper {
    min-height: 1000rpx;
    flex: 1;
    height: 1112rpx;
    width: 100%;
  }
  .select-class {
    color: #fdb400;
  }
  .wuc-tab-item.cur .border {
    background: #fdb400;
    height: 4rpx;
    width: 50rpx;
    margin: 0 auto;
  }
}
.cancel-order {
  .layer {
    padding: 20rpx;
  }
  .t1 {
    text {
      font-size: 28rpx;
      color: #333333;
    }
  }
  .t2 {
    padding: 20rpx 0 50rpx;
    text {
      font-size: 24rpx;
      color: #666666;
    }
  }
  .t3 {
    text {
      font-size: 26rpx;
      color: #666666;
    }
    .radio {
      width: 32rpx;
      height: 32rpx;
    }
    .null {
      background: url(../../../static/common/radionull.png) no-repeat;
      background-size: cover;
    }
    .curr {
      background: url(../../../static/common/radiochecked.png) no-repeat;
      background-size: cover;
    }
  }
  .bt {
    font-size: 28rpx;
    width: 308rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 8rpx 0rpx 0rpx 8rpx;
    border: 1rpx solid rgba(208, 208, 208, 1);
    margin: 0;
  }
  .bt.right {
    background: rgba(237, 122, 119, 1);
    border-radius: 0rpx 8rpx 8rpx 0rpx;
    color: #ffffff;
  }
}
/*  弹出层 */
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  &.show {
    display: block;

    .mask {
      animation: showPopup 0.2s linear both;
    }

    .layer {
      box-sizing: border-box;
      animation: showLayer 0.2s linear both;
    }
  }

  &.hide {
    .mask {
      animation: hidePopup 0.2s linear both;
    }

    .layer {
      animation: hideLayer 0.2s linear both;
    }
  }

  &.none {
    display: none;
  }

  .mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .layer {
    position: fixed;
    z-index: 99;
    bottom: 0;
    width: 100%;
    min-height: 40vh;
    border-radius: 10rpx 10rpx 0 0;
    background-color: #fff;

    .btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      margin: 0;
      height: 97rpx;
      line-height: 97rpx;
      font-size: 28rpx;
      color: #fff;
    }
    &.center {
      top: 50%;
      height: 470rpx;
      margin-top: -235rpx;
      margin-left: 5%;
      margin-right: 5%;
      width: 90%;
      border-radius: 0;
      .list-item {
        position: relative;
        .label {
          position: absolute;
          background: #14ca8d;
          color: #ffffff;
          padding: 5rpx 10rpx;
          border-radius: 20rpx;
          left: -20rpx;
        }
      }
    }
  }

  @keyframes showPopup {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes hidePopup {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes showLayer {
    0% {
      transform: translateY(120%);
    }

    100% {
      transform: translateY(0%);
    }
  }

  @keyframes hideLayer {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(120%);
    }
  }
}
</style>
