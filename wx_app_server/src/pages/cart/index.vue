<template>
  <view class="container">
    <!-- 空白页 -->
    <view v-if="empty === true" class="empty">
      <image src="../../static/common/message_none.png" mode="aspectFit" />
      <view class="empty-tips">购物车空</view>
    </view>
    <view v-else style="width:100%;">
      <!-- 列表 -->
      <view class="goods-section">
        <!-- 商品列表 -->
        <view class="g-item-box flex" v-for="(item, index) in cartList" :key="index">
          <view class="g-item">
            <view class="flex flex--justify-content--center--align-items--center checked-box">
              <view style="overflow: hidden;" @click="check('item', index)">
                <text
                  class="cuIcon-roundcheck"
                  v-if="item.checked"
                  style="font-size: 34rpx;color: #F94141;"
                ></text>
                <text class="cuIcon-round" style="font-size: 34rpx;" v-else></text>
              </view>
            </view>
            <image :src="item.img ? item.img : ''" :lazy-load="true" @click="targetPage(item)" />
            <view class="right flex flex--row flex--justify-content--space-between">
              <view>
                <text class="title">{{ item.title}}</text>
              </view>
              <view class="price-box flex flex--justify-content--space-between">
                <text style="color: #D8150A;">¥{{ item.price | toDecimal2M }}</text>
                <uniNumberBox
                  @change="changeBuyNumber($event, index)"
                  @click="hideTabbar"
                  @focus="hideTabbar"
                  @blur="showTabbar"
                  :min="1"
                  :max="item.num >= item.stock ? item.num : 9999"
                  :value="item.num"
                  :readonly="true"
                ></uniNumberBox>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部菜单栏 -->
      <view class="footer-submit-box">
        <view class="flex checked-all flex--align-items--center" @click="check('all')">
          <view style="overflow: hidden;">
            <text
              class="cuIcon-roundcheck"
              v-if="allChecked"
              style="font-size: 34rpx;color: #F94141;"
            ></text>
            <text class="cuIcon-round" style="font-size: 34rpx;" v-else></text>
          </view>
          <text>全选</text>
        </view>
        <view
          class="right flex flex--justify-content--space-between flex--align-items--center"
          v-if="editModeShow"
        >
          <view class="price-content"></view>
          <text class="submit" @click="deleteCartItems">删除</text>
        </view>
        <view
          class="right flex flex--justify-content--space-between flex--align-items--center"
          v-else
        >
          <view class="price-content">
            <text>总金额:</text>
            <text class="price-tip">￥</text>
            <text class="price">{{ totalPrice | toDecimal2M }}</text>
          </view>
          <text class="submit" @click="createOrder">提交订单</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
export default {
  data() {
    return {
      totalPrice: 0, //总价格
      allChecked: false, //全选状态  true|false
      empty: false, //空白页现实  true|false
      cartList: [
        {
          checked: true,
          price: 10,
          title: "123123213",
          img:
            "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3505427175,4049330184&fm=26&gp=0.jpg"
        }
      ],
      editModeShow: false,
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#F94141"
          }
        }
      ]
    };
  },
  watch: {
    //显示空白页
    cartList(e) {
      let empty = e.length === 0 ? true : false;
      if (this.empty !== empty) {
        this.empty = empty;
      }
    }
  },
  components: { uniNumberBox },
  mounted() {},
  onPullDownRefresh() {
    setTimeout(() => {
      //todo
      wx.stopPullDownRefresh();
    }, 500);
  },
  methods: {
    //请求数据
    async loadData() {
      /* 购物车 */
      let list = await this.$api.cart_list({});
      if (list.response_data.lists) {
        let cartList = list.response_data.lists.map(item => {
          item.checked = false;
          return item;
        });
        this.cartList = cartList;
        this.calcTotal(); //计算总价
      }
    },
    targetPage(item) {
      wx.navigateTo({
        url:
          "/pages/shop/components/class-detail/class-detail?product_id=" +
          item.id
      });
    },
    //监听image加载完成
    onImageLoad(key, index) {
      this.$set(this[key][index], "loaded", "loaded");
    },
    //监听image加载失败
    onImageError(key, index) {
      this[key][index].image = "/static/errorImage.jpg";
    },
    navToLogin() {
      wx.navigateTo({
        url: "/pages/public/login"
      });
    },
    //选中状态处理
    check(type, index) {
      if (type === "item") {
        this.cartList[index].checked = !this.cartList[index].checked;
      } else {
        const checked = !this.allChecked;
        const list = this.cartList;
        list.forEach(item => {
          item.checked = checked;
        });
        this.allChecked = checked;
      }
      this.calcTotal(type);
    },
    //数量
    changeBuyNumber(e, i) {
      console.log(e, i);
      this.cartList[i].num = e;
      this.calcTotal();
    },
    //删除
    deleteCartItem(index) {
      wx.showModal({
        title: "提示",
        content: "确定要删除商品吗?",
        success: res => {
          if (res.confirm) {
            let id = this.cartList[index].id;
            let selectId = [];
            selectId.push(id);
            this.cartDelete(selectId.join(",")).then(res => {
              if (res) {
                this.cartList.splice(index, 1);
              }
            });
          }
          wx.hideLoading();
        }
      });
    },
    //删除多个
    deleteCartItems() {
      wx.showModal({
        title: "提示",
        content: "确定要删除商品吗?",
        success: res => {
          if (res.confirm) {
            let [...list] = this.cartList;
            let selectId = [];
            let selectIndex = [];
            let checked = true;
            list.forEach((item, index) => {
              if (item.checked === true) {
                selectId.push(item.id);
              } else if (checked === true) {
                checked = false;
              }
            });
            this.cartDelete(selectId.join(",")).then(res => {
              if (res) {
                this.loadData();
              }
            });
          }
          wx.hideLoading();
        }
      });
    },
    //清空
    clearCart() {
      wx.showModal({
        content: "清空购物车？",
        success: e => {
          if (e.confirm) {
            this.cartList = [];
          }
        }
      });
    },
    //计算总价
    calcTotal() {
      let list = this.cartList;
      if (list.length === 0) {
        this.empty = true;
        return;
      }
      console.log(list);
      let total = 0;
      let checked = true;
      list.forEach(item => {
        if (item.checked === true) {
          total += item.price * item.num;
        } else if (checked === true) {
          checked = false;
        }
      });
      this.allChecked = checked;
      this.totalPrice = Number(total);
    },
    //删除购物车商品
    cartDelete(del_cart_order) {
      return new Promise((resovle, reject) => {
        if (del_cart_order) {
          this.$api.cart_delete({ product_id: del_cart_order }).then(res => {
            if (res.response_data) {
              resovle(true);
              wx.showToast({
                icon: "none",
                title: "删除成功!"
              });
            } else {
              resovle(false);
              wx.showToast({
                icon: "none",
                title: "删除失败!" + res.error_msg
              });
            }
          });
        } else {
          resovle(false);
        }
      });
    },
    //创建购物车订单
    createOrder() {
      let list = this.cartList;
      let creditOrderData = [];
      list.forEach(item => {
        item.buy_num = item.num;
        if (item.checked) {
          creditOrderData.push(item);
        }
      });
      if (creditOrderData.length > 0) {
        console.log(creditOrderData);
        // return;
        wx.setStorageSync("creditOrderData", creditOrderData);
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/shop/components/order/create-order"
          });
        }, 300);
      } else {
        wx.showToast({
          icon: "none",
          title: "您未选择商品"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.img-box {
  .img-lab {
    width: 180rpx;
    height: 180rpx;
  }
}
.container {
  padding: 0;
  /* 空白页 */
  .empty {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-bottom: 100rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;
    image {
      width: 222rpx;
      height: 306rpx;
      margin-bottom: 30rpx;
    }
    .empty-tips {
      display: flex;
      font-size: 24rpx + 2rpx;
      color: #c0c4cc;
      .navigator {
        color: #333333;
        margin-left: 16rpx;
      }
    }
  }
}
.goods-section {
  margin-top: 16rpx;
  background: #f4f4f4;
  padding-bottom: 1px;

  .g-header {
    display: flex;
    align-items: center;
    height: 84rpx;
    padding: 0 30rpx;
    position: relative;
  }

  .logo {
    display: block;
    width: 50rpx;
    height: 50rpx;
    border-radius: 100px;
  }

  .name {
    font-size: 30rpx;
    color: #333333;
    margin-left: 24rpx;
  }
  .g-item-box {
    margin: 0rpx 0rpx 10rpx;
  }
  .g-item {
    display: flex;
    padding: 40rpx 30rpx;
    background: #ffffff;
    width: 100%;
    image {
      flex-shrink: 0;
      display: block;
      width: 220rpx;
      height: 162rpx;
      border-radius: 4rpx;
    }

    .right {
      flex: 1;
      padding-left: 24rpx;
      overflow: hidden;
    }

    .title {
      font-size: 30rpx;
      color: #303133;
    }

    .spec {
      font-size: 26rpx;
      color: #909399;
    }

    .price-box {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      color: #303133;
      padding-top: 10rpx;

      .price {
        margin-bottom: 4rpx;
      }
      .number {
        font-size: 26rpx;
        color: #333333;
        margin-left: 20rpx;
      }
    }

    .step-box {
      position: relative;
    }
    .checked-box {
      padding-right: 28rpx;
    }
  }
}
.footer-submit-box {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 995;
  display: flex;
  align-items: center;
  width: 100%;
  height: 98rpx;
  justify-content: space-between;
  font-size: 30rpx;
  background-color: #fff;
  z-index: 998;
  color: #333333;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  .price-content {
    padding-left: 30rpx;
  }
  .price-tip {
    color: #333333;
    margin-left: 8rpx;
  }
  .price {
    font-size: 36rpx;
    color: #333333;
  }
  .right {
    flex: 1;
    height: 100%;
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280rpx;
    height: 100%;
    color: #fff;
    font-size: 32rpx;
    background-color: #333333;
  }
}

/* 购物车列表项 */
.cart-item {
  display: flex;
  position: relative;
  padding: 30rpx 40rpx;
  .image-wrapper {
    width: 230rpx;
    height: 230rpx;
    flex-shrink: 0;
    position: relative;
    image {
      border-radius: 8rpx;
    }
  }
  .checkbox {
    position: absolute;
    left: -16rpx;
    top: -16rpx;
    z-index: 8;
    font-size: 44rpx;
    line-height: 1;
    padding: 4rpx;
    color: #c0c4cc;
    background: #fff;
    border-radius: 50px;
  }
  .item-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    position: relative;
    padding-left: 30rpx;
    .title,
    .price {
      font-size: 28rpx + 2rpx;
      color: #303133;
      height: 40rpx;
      line-height: 40rpx;
    }
    .attr {
      font-size: 24rpx + 2rpx;
      color: #909399;
      height: 50rpx;
      line-height: 50rpx;
    }
    .price {
      height: 50rpx;
      line-height: 50rpx;
    }
  }
  .del-btn {
    padding: 4rpx 10rpx;
    font-size: 34rpx;
    height: 50rpx;
    color: #909399;
  }
}
/* 底部栏 */
.action-section {
  /* #ifdef H5 */
  margin-bottom: 100rpx;
  /* #endif */
  position: fixed;
  left: 30rpx;
  bottom: 30rpx;
  z-index: 95;
  display: flex;
  align-items: center;
  width: 690rpx;
  height: 100rpx;
  padding: 0 30rpx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
  border-radius: 16rpx;
  .checkbox {
    height: 52rpx;
    position: relative;
    image {
      width: 52rpx;
      height: 100%;
      position: relative;
      z-index: 5;
    }
  }
  .clear-btn {
    position: absolute;
    left: 26rpx;
    top: 0;
    z-index: 4;
    width: 0;
    height: 52rpx;
    line-height: 52rpx;
    padding-left: 38rpx;
    font-size: 28rpx;
    color: #fff;
    background: #c0c4cc;
    border-radius: 0 50px 50px 0;
    opacity: 0;
    transition: 0.2s;
    &.show {
      opacity: 1;
      width: 120rpx;
    }
  }
  .total-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
    padding-right: 40rpx;
    .price {
      font-size: 32rpx;
      color: #303133;
    }
    .coupon {
      font-size: 24rpx;
      color: #909399;
      text {
        color: #303133;
      }
    }
  }
  .confirm-btn {
    padding: 0 38rpx;
    margin: 0;
    border-radius: 100px;
    height: 76rpx;
    line-height: 76rpx;
    font-size: 28rpx + 2rpx;
    background: #333333;
    box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
  }
}
.checked-all {
  margin-left: 30rpx;
  font-size: 28rpx;
}
/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
  color: #333333;
}
</style>