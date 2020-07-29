<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-21 13:42:38
 * @LastEditors weipeng
 * @LastEditTime 2020-07-22 13:37:00
 * @Description 商品详情组件
-->

<template>
  <div
    class="shangpinxiangqing"
    data-name="currcomp_shangpinxiangqing"
    @click="onclick"
  >
    <van-swipe class="banner" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in detail.images" :key="index">
        <img :src="item" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- title -->
    <div class="header">
      <p class="title">{{ detail.name }}</p>
      <p v-show="filter.isShowSummary" class="desc">{{ detail.summary }}</p>
    </div>

    <!-- 价格 -->
    <div class="price">
      <span v-show="filter.isShowDiscount" class="discount">0.5折</span>
      <div class="nowPrice">
        <small class="small">￥</small>{{ detail.price }}
      </div>
      <span v-show="filter.isShowOriginal" class="oldPrice">￥{{ detail.orig_price }}</span>
    </div>

    <!-- 统计 -->
    <div class="total">
      <span v-show="filter.isShowMateriel">运费：免费</span>
      <span v-show="filter.isShowSales">销量：6000</span>
      <span v-show="filter.isShowStock">库存：59</span>
    </div>

    <!-- 选项 -->
    <div v-show="filter.isShowTicketLink" class="select-group">
      <div class="label">领券</div>
      <div class="item-group">
        <span>满200减30</span>
        <span>满100减10</span>
      </div>
      <div><van-icon name="arrow" /></div>
    </div>

    <div v-show="filter.isShowSalesLink" class="select-group">
      <div class="label">促销</div>
      <div class="item-group">
        <span>满500打5折</span>
      </div>
      <div><van-icon name="arrow" /></div>
    </div>

    <div class="select-group">
      <div class="label">请选择</div>
      <div class="item-group">
        1件
      </div>
      <div><van-icon name="arrow" /></div>
    </div>

    <div class="details">
      <p>商品详情区</p>
      <p>固定模板样式展示</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CurrcompShangpinxiangqing',
  props: ['options'],
  data() {
    return {
      detail: {
        images: [
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=229856565,3491375936&fm=26&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=229856565,3491375936&fm=26&gp=0.jpg'
        ],
        name: '标题标题标题标题标题标题',
        summary:
          '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        price: 3000,
        orig_price: 60000
      },
      filter: {
        isShowTicketLink: true, // 领券链接
        isShowSalesLink: true, // 促销链接
        isShowSummary: true, // 商品简介
        isShowDiscount: true, // 折扣标识
        isShowOriginal: true, // 商品原价
        isShowSales: true, // 商品促销
        isShowStock: true, // 商品库存
        isShowMateriel: true // 物流运费
      }
    }
  },
  watch: {
    options: {
      handler: function() {
        this.filter = this.options
      },
      deep: true
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
.shangpinxiangqing {
  & > div {
    position: relative;
    z-index: 1;
  }
}
.banner {
  height: 180px;
  overflow: hidden;
  background: #fff;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.header {
  padding: 10px;
  .title {
    font-size: 14px;
    margin: 0;
  }
  .desc {
    font-size: 11px;
    color: #999999;
    margin-bottom: 0;
  }
}
.price{
  display: flex;
  align-items: center;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid #eee;
  .discount{
    font-size: 11px;
    color: #fff;
    padding: 2px 5px;
    background-color: #E64340;
    margin-right: 10px;
    border-radius: 3px;
  }
  .nowPrice{
    color: #E64340;
    font-size: 20px;
    margin-right: 10px;
    .small{
      font-size: 12px;
    }
  }
  .oldPrice{
    font-size: 12px;
    color: #999999;
    text-decoration:line-through;
  }
}
.total{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666666;
  &>span{
    padding: 10px;
  }
}
.select-group{
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 12px;
  border-top: 1px solid #eee;
  .label{
    color: #666666;
    width: 50px;
  }
  .item-group{
    width: calc(100% - 50px);
    color: #999;
    span{
      color: #E64340;
      padding: 2px 4px;
      border: 1px solid #E64340;
      background-color: rgba(240,72,68,0.1);
      margin-right: 5px;
    }
  }
}
.details{
  text-align: center;
  padding: 30px;
  font-size: 14px;
  border-top: 1px solid #eee;
}
</style>
