<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-14 14:57:31
 * @LastEditors weipeng
 * @LastEditTime 2020-07-14 17:44:01
 * @Description in
-->

<template>
  <div>
    <div class="item">
      <b>模块样式</b>
    </div>
    <div class="item">
      <b>模块标题</b>
      <el-switch v-model="isShowTitle" active-color="#13ce66" inactive-color="#ff4949" />
      <el-input
        v-model="title"
        class="item-item"
        type="text"
        placeholder="请输入标题"
        maxlength="8"
        show-word-limit
      />
    </div>

    <div class="item">
      <b>商品展示</b>
      <div class="item-item">
        <el-checkbox v-model="isShowSales">商品销量</el-checkbox>
        <el-checkbox v-model="isShowOriginal">商品原价</el-checkbox>
        <el-checkbox v-model="isShowCartBtn">购物车按键</el-checkbox>
      </div>
      <div class="item-item">
        <el-radio-group v-model="type" size="mini">
          <el-radio-button label="自定义添加" />
          <el-radio-button label="分组类别添加" />
        </el-radio-group>
      </div>
      <div class="item-item">
        <el-button plain size="small">添加商品</el-button>
      </div>
      <div class="mini-box">
        <div v-for="(item, index) in 10" :key="index" class="order-item">
          <div class="img"><img src="" alt=""></div>
          <div class="info">
            <p>经典网红爆款黑粉绝版保时捷设计手账</p>
            <b>￥1000</b>
            <del>￥1200</del>
          </div>
          <el-button type="text">删除</el-button>
        </div>
      </div>
    </div>

    <el-button type="primary" @click="submitForm">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'CurrcompShangpinliebiao',
  data() {
    return {
      isShowTitle: true,
      isShowSales: true,
      isShowOriginal: true,
      isShowCartBtn: true,
      orderList: [],
      title: '商品推荐',
      type: '自定义添加'
    }
  },
  methods: {
    submitForm() {
      this.$emit('editStyleOption', {
        isShowTitle: this.isShowTitle,
        isShowSales: this.isShowSales,
        isShowOriginal: this.isShowOriginal,
        isShowCartBtn: this.isShowCartBtn,
        title: this.title,
        orderList: this.orderList
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
.item-item{
  margin-top: 15px;
}
.mini-box{
  max-height: 400px;
  margin-top: 10px;
  overflow-y: auto;
}
.order-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: $border-radius-base;
  border: 1px solid $border-color-base;
  .img{
    width: 60px;
    min-width: 60px;
    height: 60px;
    background: #f9f9f9;
    overflow: hidden;
  }
  .info{
    width: 80%;
    padding: 0 15px;
    overflow: hidden;
    p{
      margin: 0 auto 10px auto;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    b{
      color: #FF0033;
      font-size: 13px;
    }
    del{
      font-size: 13px;
      color: #BCBCBC;
    }
  }
  button{
    min-width: 50px;
  }
}
</style>
