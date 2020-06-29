<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <p class="statistical-time">实时统计</p>
      <span class="time">统计时间:2019-10-08 11:43:52</span>
      <div class="flex flex--justify-content--space-between">
        <!--  -->
        <div class="right flex flex flex--justify-content--space-around">
          <div class="left flex--row flex flex--justify-content--center">
            <span class="num">105</span>
            <span class="title">付款订单</span>
          </div>
          <div class="left line flex flex--row">
            <span class="num">￥3654.00</span>
            <span class="title">付款金额(元)</span>
          </div>
        </div>
        <div class="right flex flex flex--justify-content--space-around">
          <div class="left flex--row flex">
            <span class="num">7568</span>
            <span class="title">浏览量</span>
          </div>
          <div class="left flex flex--row">
            <span class="num">453</span>
            <span class="title">访客量</span>
          </div>
        </div>
      </div>
      <div class="flex flex--justify-content--space-between">
        <!--  -->
        <div class="right flex flex flex--justify-content--space-around">
          <div class="left flex--row flex">
            <span class="num">0.23</span>
            <span class="title">转化率(%)</span>
          </div>
          <div class="left line flex flex--row">
            <span class="num">￥324.25</span>
            <span class="title">客单价(元)</span>
          </div>
        </div>
        <div class="right flex flex flex--justify-content--space-around">
          <div class="left flex--row flex">
            <span class="num">105</span>
            <span class="title">获客数量</span>
          </div>
          <div class="left flex flex--row">
            <span class="num">2136301</span>
            <span class="title">客户总量</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 待办事项 -->
    <div class="wait">
      <p class="dealt">待办事项</p>
      <div>
        <ul class="number-list flex flex flex--justify-content--space-around">
          <li>10</li>
          <li>7</li>
          <li>12</li>
          <li>56</li>
          <li>127</li>
        </ul>
      </div>
      <div>
        <ul class="user-text flex flex flex--justify-content--space-around">
          <li>待处理订单</li>
          <li>待处理维权</li>
          <li>库存不足商品</li>
          <li>未上架商品</li>
          <li>失活客户</li>
        </ul>
        <ul class="user-wait flex flex flex--justify-content--space-around">
          <li>处理</li>
          <li>处理</li>
          <li>处理</li>
          <li>处理</li>
          <li>处理</li>
        </ul>
      </div>
    </div>
    <!-- 常用功能 -->
    <div class="wait">
      <p class="dealt">常用功能</p>
      <div class="flex flex--justify-content--space-between flex--justify-content--space-around">
        <!--  -->
        <div class="flex flex--row">
          <div class="good flex flex--justify-content--center flex--align-items--center">
            <img src="../../assets/images/u34.png" alt />
          </div>
          <div class="tex">商品发布</div>
        </div>
        <div class="flex flex--row">
          <div class="good flex flex--justify-content--center flex--align-items--center">
            <img src="../../assets/images/u38.png" alt />
          </div>
          <div class="tex">发货处理</div>
        </div>
        <div class="flex flex--row">
          <div class="good flex flex--justify-content--center flex--align-items--center">
            <img src="../../assets/images/u54.png" alt />
          </div>
          <div class="tex">售后处理</div>
        </div>
        <div class="flex flex--row">
          <div class="good-list flex flex--justify-content--center flex--align-items--center">
            <img src="../../assets/images/u43.png" alt />
          </div>
          <div class="tex">多人拼团</div>
        </div>
        <div class="flex flex--row">
          <div class="good-list flex flex--justify-content--center flex--align-items--center">
            <img src="../../assets/images/u46.png" alt />
          </div>
          <div class="tex">好友砍价</div>
        </div>
        <div class="flex flex--row">
          <div class="good-list flex flex--justify-content--center flex--align-items--center">
            <img src="../../assets/images/u50.png" alt />
          </div>
          <div class="tex">优惠券</div>
        </div>
        <div class="flex flex--row">
          <div class="good-list flex flex--justify-content--center flex--align-items--center">
            <img src="../../assets/images/u60.png" alt />
          </div>
          <div class="tex">限时秒杀</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  background: #f2f2f2;
  height: 100vh;
  padding-top: 20px;
}
.dashboard-text {
  background: white;
  height: 300px;
  border: 1px solid #ffffff;
  padding: 20px 30px 0;
  margin: 0 auto;
}
.statistical-time {
  font-size: 20px;
  margin-left: 17px;
  display: inline;
}
.time {
  font-size: 12px;
  color: #a4a4a4;
  margin-left: 17px;
}
// 统计
.left {
  width: 50%;
  text-align: center;
  color: #000000;
}
.line {
  border-right: 1px solid #f1f1f1;
}
.right {
  width: 50%;
  margin-top: 46px;
}
.num {
  color: #000000;
  font-size: 28px;
}
.title {
  color: #666666;
  font-size: 16px;
  margin-top: 10px;
}
// 待办事项
.wait {
  padding: 0 30px;
  background: white;
  height: 200px;
  border: 1px solid #ffffff;
  margin: 0 auto;
  margin-top: 15px;
}
.dealt {
  font-size: 20px;
  margin-left: 10px;
}
li {
  list-style: none;
}
.number-list {
  font-size: 28px;
  color: #000000;
}
.user-text {
  color: #666666;
  font-size: 16px;
}
.user-wait {
  font-size: 16px;
  color: #096dd9;
}
.big {
  margin-left: 50px;
}
.good {
  width: 65px;
  height: 65px;
  background: #0099ff;
}
.good img {
  width: 30px;
  height: 30px;
  margin: 0 auto;
}
.good-list {
  width: 65px;
  height: 65px;
  background: #e46e62;
}
.good-list img {
  width: 30px;
  height: 30px;
  // margin: 0 auto;
}
.tex {
  color: #333333;
  font-size: 16px;
  margin-top: 15px;
}
</style>
