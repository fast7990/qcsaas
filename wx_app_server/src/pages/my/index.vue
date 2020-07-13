<template>
  <div>
    <div class="fixIphonex">
      <div class="member-index">
        <div class="flex-v-center user-info-header header-false-membership flex">
          <div
            class="header-bg"
            style="background-image: url(https://stc.weimob.cn/saas/retail/image/user/member/member-default_bg3.jpg);"
          ></div>
          <div>
            <div>
              <div class="flex1 flex flex-v-center">
                <div class="member-pic">
                  <img
                    src="https://image-c.weimobwmc.com/saas-wxbiz/8c0829ce5c1f4397bff043b6ed9099f8.png?imageView2/2/w/260/q/80/interlace/1"
                    class="member-photo"
                  />
                </div>
                <span class="member-nick-name span-line-1">匿名</span>
                <span class="iconfont icon-qrcode member-icon-qrcode"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="user-center-order">
          <div class="order-head cell-item arrows">
            <span class="order-head-name">订单信息</span>
            <a class="order-head-btn">查看全部订单</a>
          </div>
          <div class="order-content">
            <div class="order-item">
              <a class="order-content-box">
                <div
                  class="sprite-payment"
                  style="background-image: url('https://stc.weimob.cn/saas/retail/image/user/member/member-icon_all3x.png?v5');"
                ></div>
                <div class="order-content-t">待付款</div>
              </a>
            </div>
            <div class="order-item">
              <a href="/pages/home/main" class="order-content-box" open-type="switchTab">
                <div
                  class="sprite-sendout"
                  style="background-image: url(https://stc.weimob.cn/saas/retail/image/user/member/member-icon_all3x.png?v5);"
                ></div>
                <div class="order-content-t">待发货</div>
              </a>
            </div>
            <div class="order-item">
              <a class="order-content-box">
                <div
                  class="sprite-receiving"
                  style="background-image: url(https://stc.weimob.cn/saas/retail/image/user/member/member-icon_all3x.png?v5);"
                ></div>
                <div class="order-content-t">待收货</div>
              </a>
            </div>
            <div class="order-item">
              <a class="order-content-box">
                <div
                  class="sprite-evaluate"
                  style="background-image: url(https://stc.weimob.cn/saas/retail/image/user/member/member-icon_all3x.png?v5);"
                ></div>
                <div class="order-content-t">待评价</div>
              </a>
            </div>
            <div class="order-item">
              <a
                class="order-content-box"
                href="/saas/retail/100000956995/2142182995/order/rights/index?isComment=1"
              >
                <div
                  class="sprite-refund"
                  style="background-image: url(https://stc.weimob.cn/saas/retail/image/user/member/member-icon_all3x.png?v5);"
                ></div>
                <div class="order-content-t">退款/售后</div>
              </a>
            </div>
          </div>
        </div>
        <div class="user-center-menu">
          <a href="/pages/home/main" class="menu-cell cell-item arrows">
            <div class="menu-cell-left flex">
              <div class="flex flex1 flex-v-center">
                <img
                  class="menu-cell-left-img"
                  src="https://image-c.weimobwmc.com/saas-wxbiz/8c0829ce5c1f4397bff043b6ed9099f8.png?imageView2/2/w/260/q/80/interlace/1"
                  alt
                />
                <span class="menu-cell-title text-line-1 lines1">分销中心</span>
              </div>
            </div>
            <div class="menu-cell-content">
              <div></div>
            </div>
          </a>
          <a href="/pages/home/main" class="menu-cell cell-item arrows">
            <div class="menu-cell-left flex">
              <div class="flex flex1 flex-v-center">
                <img
                  class="menu-cell-left-img"
                  src="https://image-c.weimobwmc.com/saas-wxbiz/8c0829ce5c1f4397bff043b6ed9099f8.png?imageView2/2/w/260/q/80/interlace/1"
                  alt
                />
                <span class="menu-cell-title text-line-1 lines1">拼团</span>
              </div>
            </div>
            <div class="menu-cell-content">
              <div></div>
            </div>
          </a>
          <a class="menu-cell cell-item arrows">
            <div class="menu-cell-left flex">
              <div class="flex flex1 flex-v-center">
                <img
                  class="menu-cell-left-img"
                  src="https://image-c.weimobwmc.com/saas-wxbiz/8c0829ce5c1f4397bff043b6ed9099f8.png?imageView2/2/w/260/q/80/interlace/1"
                  alt
                />
                <span class="menu-cell-title text-line-1 lines1">砍价</span>
              </div>
            </div>
            <div class="menu-cell-content">
              <div></div>
            </div>
          </a>
          <a class="menu-cell cell-item arrows">
            <div class="menu-cell-left flex">
              <div class="flex flex1 flex-v-center">
                <img
                  class="menu-cell-left-img"
                  src="https://image-c.weimobwmc.com/saas-wxbiz/8c0829ce5c1f4397bff043b6ed9099f8.png?imageView2/2/w/260/q/80/interlace/1"
                  alt
                />
                <span class="menu-cell-title text-line-1 lines1">推荐</span>
              </div>
            </div>
            <div class="menu-cell-content">
              <div></div>
            </div>
          </a>
          <a class="menu-cell cell-item arrows">
            <div class="menu-cell-left flex">
              <div class="flex flex1 flex-v-center">
                <img
                  class="menu-cell-left-img"
                  src="https://image-c.weimobwmc.com/saas-wxbiz/8c0829ce5c1f4397bff043b6ed9099f8.png?imageView2/2/w/260/q/80/interlace/1"
                  alt
                />
                <span class="menu-cell-title text-line-1 lines1">账户与安全</span>
              </div>
            </div>
            <div class="menu-cell-content">
              <div></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      motto: "Hello miniprograme"
    };
  },

  components: {},
  mounted() {},
  onPullDownRefresh() {
    setTimeout(() => {
      //todo
      wx.stopPullDownRefresh();
    }, 500);
  },
  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>