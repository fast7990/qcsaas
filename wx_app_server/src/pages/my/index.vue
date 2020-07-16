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
            <a class="order-head-btn" @click="openPage(2)">查看全部订单</a>
          </div>
          <div class="order-content">
            <div class="order-item">
              <a class="order-content-box" @click="openPage(3)">
                <div class="sprite-payment">
                  <img class="img" src="/static/images/a1.png" alt />
                </div>
                <div class="order-content-t">待付款</div>
              </a>
            </div>
            <div class="order-item">
              <a class="order-content-box" @click="openPage(4)">
                <div class="sprite-payment">
                  <img class="img" src="/static/images/a2.png" alt />
                </div>
                <div class="order-content-t">待发货</div>
              </a>
            </div>
            <div class="order-item">
              <a class="order-content-box" @click="openPage(5)">
                <div class="sprite-payment">
                  <img class="img" src="/static/images/a3.png" alt />
                </div>
                <div class="order-content-t">待收货</div>
              </a>
            </div>
            <div class="order-item">
              <a class="order-content-box" @click="openPage(6)">
                <div class="sprite-payment">
                  <img class="img" src="/static/images/a4.png" alt />
                </div>
                <div class="order-content-t">待评价</div>
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
    return {};
  },

  components: {},
  onLoad(options) {},
  onPullDownRefresh() {
    setTimeout(() => {
      //todo
      mpvue.stopPullDownRefresh();
    }, 500);
  },
  methods: {
    openPage(type) {
      switch (Number(type)) {
        case 1:
          break;
        case 2:
          mpvue.navigateTo({ url: "/pages/order/main?type=0" });
          break;
        case 3:
          mpvue.navigateTo({ url: "/pages/order/main?type=1" });
          break;
        case 4:
          mpvue.navigateTo({ url: "/pages/order/main?type=2" });
          break;
        case 5:
          mpvue.navigateTo({ url: "/pages/order/main?type=3" });
          break;
        case 6:
          mpvue.navigateTo({ url: "/pages/order/main?type=4" });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>