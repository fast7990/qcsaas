<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-14 14:57:11
 * @LastEditors weipeng
 * @LastEditTime 2020-07-16 14:56:31
 * @Description 商品列表组件
-->

<template>
  <div class="shangpinliebiao" data-name="currcomp_shangpinliebiao" @click="onclick">
    <div v-show="isShowTitle" class="header">
      <b>{{ title }}</b>
      <span>查看全部</span>
    </div>

    <div class="list">
      <div v-for="(item, index) in orderList" :key="index" class="item">
        <div class="img">
          <img :src="item.img" alt="">
        </div>
        <p class="title">{{ item.title }}</p>
        <div class="price">
          <div>
            <b>￥<big>{{ item.price }}</big></b>
            <del v-show="isShowOriginal">￥{{ item.rebate }}</del>
          </div>
          <img v-show="isShowCartBtn" src="@/assets/icons/template/shopping_cart.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const orderList = [
  {
    img: 'https://tk.ismcdn.jp/mwimgs/d/5/-/img_d5bfd632a7de6421c5f9706497487c35436241.jpg',
    title: '经典网红爆款黑粉绝版保时捷设计手账',
    price: 1000,
    rebate: 1200
  }, {
    img: 'https://tk.ismcdn.jp/mwimgs/d/5/-/img_d5bfd632a7de6421c5f9706497487c35436241.jpg',
    title: '经典网红爆款黑粉',
    price: 1000,
    rebate: 1200
  }, {
    img: 'https://tk.ismcdn.jp/mwimgs/d/5/-/img_d5bfd632a7de6421c5f9706497487c35436241.jpg',
    title: '经典网红爆款黑粉绝版保时捷设计手账',
    price: 1000,
    rebate: 1200
  }, {
    img: 'https://tk.ismcdn.jp/mwimgs/d/5/-/img_d5bfd632a7de6421c5f9706497487c35436241.jpg',
    title: '经典网红爆款黑粉绝版保时捷设计手账',
    price: 1000,
    rebate: 1200
  }, {
    img: 'https://tk.ismcdn.jp/mwimgs/d/5/-/img_d5bfd632a7de6421c5f9706497487c35436241.jpg',
    title: '经典网红爆款黑粉绝版保时捷设计手账',
    price: 1000,
    rebate: 1200
  }
]
export default {
  name: 'CurrcompShangpinliebiao',
  props: ['options'],
  data() {
    return {
      title: '商品推荐',
      orderList,
      isShowTitle: {
        default: true
      },
      isShowSales: {
        default: true
      },
      isShowOriginal: {
        default: true
      },
      isShowCartBtn: {
        default: true
      }
    }
  },
  watch: {
    'options': {
      handler: function() {
        console.log(this.options)
        this.isShowTitle = this.options.isShowTitle
        this.isShowSales = this.options.isShowSales
        this.isShowOriginal = this.options.isShowOriginal
        this.isShowCartBtn = this.options.isShowCartBtn
        this.title = this.options.title
        this.orderList = this.options.orderList
      },
      deep: true
    }
  },
  methods: {
    onclick(item) {
      console.log(this.options)
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
.shangpinliebiao{
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    span{
      font-size: 12px;
      color: #999999;
    }
  }
  .list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .item{
      width: calc(50% - 5px);
      min-width: calc(50% - 5px);
      margin-bottom: 10px;
      &:nth-child(2n + 2){
        margin-left: 10px;
      }
    }
    .img{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 170px;
      background: #f9f9f9;
    }
    p{
      font-size: 14px;
      line-height: 18px;
      height: 36px;
      margin: 8px 0;
    }
    .price{
      display: flex;
      align-items: center;
      justify-content: space-between;
      b{
        color: #FF0033;
        font-size: 13px;
      }
      del{
        font-size: 13px;
        color: #BCBCBC;
        margin-left: 10px;
      }
      img{
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
