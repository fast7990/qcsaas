<template>
  <div>
    <view class="VerticalBox" v-if="pagesconfig.category.list_prope==1">
      <scroll-view
        class="VerticalNav nav"
        scroll-y
        scroll-with-animation
        :scroll-top="verticalNavTop"
        style="height:calc(100vh)"
      >
        <view
          class="cu-item"
          :class="index==tabCur?'text-green cur':''"
          v-for="(item,index) in category_list"
          :key="index"
          @tap="TabSelect"
          :data-id="index"
        >Tab-{{item.name}}</view>
      </scroll-view>
      <scroll-view
        class="VerticalMain"
        scroll-y
        scroll-with-animation
        style="height:calc(100vh)"
        :scroll-into-view="'main-'+mainCur"
        @scroll="VerticalMain"
      >
        <view
          class="padding-top padding-lr"
          v-for="(item,index) in category_list"
          :key="index"
          :id="'main-'+index"
        >
          <view class="cu-bar solid-bottom bg-white">
            <view class="action">
              <text class="cuIcon-title text-green"></text>
              Tab-{{item.name}}
            </view>
          </view>
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <view
                class="cu-avatar round lg"
                style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);"
              >
                <view class="cu-tag badge">99+</view>
              </view>
              <view class="content">
                <view class="text-grey">
                  <text class="text-cut">瓦洛兰之盾-塔里克</text>
                  <view class="cu-tag round bg-orange sm">战士</view>
                </view>
                <view class="text-gray text-sm flex">
                  <text
                    class="text-cut"
                  >塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。</text>
                </view>
              </view>
              <view class="action">
                <view class="text-grey text-xs">22:20</view>
                <view class="cuIcon-notice_forbid_fill text-gray"></view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="VerticalBox box" v-if="pagesconfig.category.list_prope==2">
      <view class>
        <view class="fellei-list" v-for="(items,indexs) in 5" :key="indexs">
          <view class="fenlei-title">数码影音</view>
          <view class="fellei-item flex flex--wrap">
            <view
              class="tile-item flex flex--row flex--align-items--center"
              v-for="(item,index) in 8"
              :key="index"
            >
              <view class="label">
                <image
                  class="img"
                  src="https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=4053319248,3228581158&fm=202&mola=new&crop=v1"
                  mode="aspectFill"
                />
              </view>
              <view class="title">数码影音</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import pagesconfig from "../../pagesconfig.json";
export default {
  data() {
    return {
      category_list: [],
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true,
      pagesconfig: pagesconfig
    };
  },
  components: {},
  onLoad() {
    console.log(this.pagesconfig.category.list_prope);
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    let category_list = [{}];
    for (let i = 0; i < 26; i++) {
      category_list[i] = {};
      category_list[i].name = String.fromCharCode(65 + i);
      category_list[i].id = i;
    }
    this.category_list = category_list;
  },
  onReady() {
    wx.hideLoading();
  },
  methods: {
    TabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id;
      this.mainCur = e.currentTarget.dataset.id;
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
    },
    VerticalMain(e) {
      console.log(e);
      let that = this;
      let tabHeight = 0;
      if (this.load) {
        for (let i = 0; i < this.category_list.length; i++) {
          let view = wx
            .createSelectorQuery()
            .select("#main-" + this.category_list[i].id);
          view
            .fields(
              {
                size: true
              },
              data => {
                this.category_list[i].top = tabHeight;
                tabHeight = tabHeight + data.height;
                this.category_list[i].bottom = tabHeight;
              }
            )
            .exec();
        }
        this.load = false;
      }
      let scrollTop = e.mp.detail.scrollTop + 10;
      for (let i = 0; i < this.category_list.length; i++) {
        if (
          scrollTop > this.category_list[i].top &&
          scrollTop < this.category_list[i].bottom
        ) {
          this.verticalNavTop = (this.category_list[i].id - 1) * 50;
          this.tabCur = this.category_list[i].id;
          console.log(scrollTop);
          return false;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.VerticalNav.nav {
  width: 200rpx;
  white-space: initial;
  padding-bottom: 10rpx;
}

.VerticalNav.nav .cu-item {
  width: 100%;
  text-align: center;
  background-color: #f1f1f1;
  margin: 0;
  border: none;
  height: 50px;
  position: relative;
}

.VerticalNav.nav .cu-item.cur {
  background-color: #ffffff;
}

.VerticalNav.nav .cu-item.cur::after {
  content: "";
  width: 8rpx;
  height: 30rpx;
  border-radius: 10rpx 0 0 10rpx;
  position: absolute;
  background-color: currentColor;
  top: 0;
  right: 0rpx;
  bottom: 0;
  margin: auto;
}

.VerticalBox.box {
  background: #f1f1f1;
}
.VerticalBox {
  display: flex;
  .tile-item {
    width: 33.3%;
    .title {
      font-size: 30rpx;
      padding-bottom: 30rpx;
    }
    .label {
      .img {
        width: 150rpx;
        height: 150rpx;
      }
    }
  }
  .fellei-item{
    padding-top: 20rpx;
  }
  .fenlei-title {
    font-weight: 600;
    font-size: 36rpx;
    padding: 20rpx 0;
    text-align: center;
    border-bottom: 2rpx solid #f1f1f1;
  }
  .fellei-list {
    background: #ffffff;
    margin-top: 10rpx;
  }
}
.VerticalMain {
  background-color: #ffffff;
  flex: 1;
  padding-bottom: 10rpx;
}
</style>