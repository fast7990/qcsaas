<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-21 13:42:13
 * @LastEditors weipeng
 * @LastEditTime 2020-07-22 11:55:44
 * @Description 商品详情编辑
-->

<template>
  <div>
    <div class="item">
      <b>图片页码样式</b>
    </div>
    <div class="item">
      <b>商品信息展示</b>
      <div class="item-item">
        <div class="show-order-info">
          <van-checkbox v-model="isShowSummary" shape="square">商品简介</van-checkbox>
          <van-checkbox v-model="isShowDiscount" shape="square">折扣标识</van-checkbox>
          <van-checkbox v-model="isShowOriginal" shape="square">商品原价</van-checkbox>
          <van-checkbox v-model="isShowSales" shape="square">商品促销</van-checkbox>
          <van-checkbox v-model="isShowStock" shape="square">商品库存</van-checkbox>
          <van-checkbox v-model="isShowMateriel" shape="square">物流运费</van-checkbox>
        </div>
      </div>
    </div>
    <div class="item">
      <b>领券链接</b>
      <van-switch v-model="isShowTicketLink" size="24px" />
    </div>
    <div class="item">
      <b>促销连接</b>
      <van-switch v-model="isShowSalesLink" size="24px" />
    </div>

    <el-button type="primary" @click="submitForm">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'CurrcompShangpinxiangqing',
  data() {
    return {
      isShowTicketLink: true, // 领券链接
      isShowSalesLink: true, // 促销链接
      isShowSummary: true, // 商品简介
      isShowDiscount: true, // 折扣标识
      isShowOriginal: true, // 商品原价
      isShowSales: true, // 商品促销
      isShowStock: true, // 商品库存
      isShowMateriel: true // 物流运费
    }
  },
  methods: {
    submitForm() {
      this.$emit('editStyleOption', {
        isShowTicketLink: this.isShowTicketLink,
        isShowSalesLink: this.isShowSalesLink,
        isShowSummary: this.isShowSummary,
        isShowDiscount: this.isShowDiscount,
        isShowOriginal: this.isShowOriginal,
        isShowSales: this.isShowSales,
        isShowStock: this.isShowStock,
        isShowMateriel: this.isShowMateriel
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
  b {
    padding-right: 15px;
  }
}
.item-item {
  margin-top: 15px;
}
.show-order-info{
  display: flex;
  flex-wrap: wrap;
  &>div{
    width: 33.333333%;
    min-width: 33.333333%;
    margin: 5px 0;
  }
}
</style>
