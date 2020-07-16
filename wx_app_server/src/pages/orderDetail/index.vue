<template>
  <div class="container order">
    <div class="zhuangtai">
      <span class="text">dasd</span>
    </div>
    <div class="address flex flex--align-items--center">
      <div>
        <div class="address-text">收货人：前潮网络</div>
        <div class="address-text">收货地址：北京市 朝阳区人民法院 505室</div>
      </div>
      <div>
        <span class="cuIcon-right"></span>
      </div>
    </div>
    <div class="product-item flex flex--align-items--center flex--justify-content--space-between">
      <img
        src="https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=138126325,1485620701&fm=85&app=92&f=JPEG?w=121&h=75&s=7FAB2EC3909A35D01E299C1A030010D2"
        alt
        style="width:180rpx;height:180rpx;"
      />
      <div class="right flex flex--row flex--justify-content--space-between">
        <div>
          <div>浅蓝色棉天丝易烫府绸衬衫</div>
          <div>尺寸：xx</div>
        </div>
        <div class="flex flex--align-items--center flex--justify-content--space-between">
          <span>12.6</span>
          <span style="color:#5C5C5C;">x1</span>
        </div>
      </div>
    </div>
    <div style="width:100%;padding:20rpx;">
      <div class="cell-item flex flex--align-items--center flex--justify-content--space-between">
        <span>商品合计</span>
        <span>¥ 398.00</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "orderDetail",
  components: {},
  computed: {
    ...mapState({})
  },
  data() {
    return {
      payType: 0,
      show_type: 1,
      order_number: "",
      orderDetail: {},
      goodsList: [],
      productFee: 0,
      cancelType: 0,
      providerList: [],
      cancelText: "",
      count_down_time: 0,
      should_buy: true
    };
  },
  watch: {},
  onLoad(options) {
    //接收传值
    let order_number = options.order_number;
    if (order_number) {
      this.order_number = order_number;
      this.initData(this.order_number);
    }
    if (options.show_type) {
      this.show_type = options.show_type;
    }
  },
  onShow() {},
  methods: {
    initData() {
      //获取订单列表
      let parmes = {
        order_number: this.order_number
      };
      this.getDataApi(parmes);
    },
    getDataApi(parmes) {},
    countDownTime(time) {
      console.log(time);
      let settime = 24 * 3600 - (parseInt(new Date().getTime() / 1000) - time);
      if (settime > 0) {
        let times = this.$utils.countDownTime.start(settime);
        this.count_down_time =
          "剩余" + times.hour + "时" + times.minute + "分钟关闭订单";
        this.should_buy = true;
        console.log(times);
      } else {
        this.count_down_time = "订单已关闭";
        this.should_buy = false;
      }
    },
    openBtnType(type) {
      switch (type) {
        case 1:
          //取消订单
          uni.showModal({
            title: "提示",
            content: "确定要取消订单吗？",
            success: e => {
              if (e.confirm) {
                this.cancelCroductOrder(this.order_number);
              }
            }
          });
          break;
        case 2:
          //待付款
          this.payTypeBox();
          break;
        case 3:
          //待发货
          break;
        case 4:
          //待收货
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
        case 12:
          //退款

          break;
        default:
          break;
      }
    },
    showOrderStatus(item) {
      if (item.status == 1) {
        if (item.pay_status == 1) {
          //1未支付 2已支付
          return "未支付";
        } else if (item.pay_status == 2) {
          if (item.logistics_status == 1) {
            //1未发货 2已发货 3确认收货
            return "未发货";
          } else if (item.logistics_status == 2) {
            return "已发货";
          } else if (item.logistics_status == 3) {
            if (item.evaluate_status == 1) {
              //评价状态 1未评价 2已评价
              return "未评价";
            } else if (item.evaluate_status == 2) {
              return "已评价";
            } else {
              return "已收货";
            }
          } else {
            return "已付款";
          }
        }
      } else if (item.status == 2) {
        if (item.logistics_status == 1) {
          //1未发货 2已发货 3确认收货
          return "未发货";
        } else if (item.logistics_status == 2) {
          return "已发货";
        } else if (item.logistics_status == 3) {
          if (item.evaluate_status == 1) {
            //评价状态 1未评价 2已评价
            return "未评价";
          } else if (item.evaluate_status == 2) {
            return "已评价";
          } else {
            return "已收货";
          }
        } else {
          return "订单已完成";
        }
      } else if (item.status == 3) {
        if (item.refund_status == 2) {
          return "申请售后中";
        } else if (item.refund_status == 3) {
          return "已退款";
        } else if (item.refund_status == 3) {
          return "申请售后已驳回";
        } else {
          return "订单取消";
        }
      }
    },
    setOrderStatus() {
      this.$api
        .order_confirm({
          order_number: this.order_number
        })
        .then(res => {
          console.log(res);
          if (res.error_msg) {
            uni.showToast({
              icon: "none",
              title: res.error_msg
            });
          } else {
            uni.showToast({
              icon: "none",
              title: "收货成功",
              success: () => {
                this.initData(this.order_number);
              }
            });
          }
        });
    },
    stopPrevent() {
      //阻止默认事件
      return;
    },
    cancelCroductOrder() {
      //取消订单
      this.$api
        .order_cancel({
          order_number: this.orderDetail.order_number
        })
        .then(res => {
          if (res.error_msg) {
            uni.showToast({
              icon: "none",
              title: res.error_msg
            });
          } else {
            uni.showToast({
              icon: "none",
              title: "操作成功",
              success: () => {
                uni.navigateBack({
                  delta: 1
                });
              }
            });
          }
        });
    },
    computedProductFee() {
      //计算总价
      let coupon = this.orderDetail.coupon;
      let total_fee = 0;
      try {
        if (coupon.length > 0) {
          total_fee =
            Number(this.orderDetail.amount) + Number(coupon.amount[0]);
        }
      } catch (e) {
        //TODO handle the exception
      }
      return total_fee ? total_fee : 0;
    }
  }
};
</script>

<style lang="scss">
.zhuangtai {
  width: 100%;
  height: 150rpx;
  background: #e91538;
  display: flex;
  align-items: center;
  .text {
    color: #ffffff;
    font-size: 36rpx;
    margin-left: 20rpx;
  }
}
.address {
  width: 100%;
  padding: 40rpx 20rpx;
  justify-content: space-between;
  .address-text {
    color: #081425;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
.product-item {
  padding: 0 20rpx;
  width: 100%;
  .right {
    height: 180rpx;
    padding-left: 20rpx;
    flex: 1;
  }
}

.footer-submit-box {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 995;
  width: 100%;
  font-size: 30rpx;
  z-index: 98;
  color: #000000;
  background: #ffffff;

  .btn-box {
    flex: 1;
    margin: 0 20rpx;
    width: 100%;

    .btn {
      width: 170rpx;
      height: 60rpx;
      border-radius: 4rpx;
      border: 1rpx solid #d8dadd;
      color: #333333;
      text-align: center;
      line-height: 60rpx;
      margin-left: 20rpx;
      border-radius: 30rpx;
      margin-bottom: 10rpx;
    }

    .t2 {
      color: #ffffff;
      background: #3048ff;
      border-color: #3048ff;
    }
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
