<template>
  <div class="page_value">
    <div class="day_sales">
      <div class="exhibition">
        <div class="title">
          <p>当日销售</p>
          <span>统计时间：2019-10-08 13:00</span>
        </div>
        <ul class="sales">
          <li>
            <p>
              <span>￥</span>
              <i>32654.00</i>
            </p>
            <b>付款金额（元）</b>
          </li>
          <li>
            <p>
              <i>105</i>
            </p>
            <b>付款订单</b>
          </li>
          <li>
            <p>
              <span>￥</span>
              <i>324.25</i>
            </p>
            <b>客单价（元）</b>
          </li>
          <li>
            <p>
              <i>0.23</i>
            </p>
            <b>转化率（%）</b>
          </li>
        </ul>
      </div>
      <div class="sales_chart"></div>
    </div>
    <div class="day_passenger">
      <div class="exhibition">
        <div class="title">
          <p>当日客流</p>
          <span>统计时间：2019-10-08 13:00</span>
        </div>
        <ul class="sales">
          <li>
            <p>
              <i>5423</i>
            </p>
            <b>浏览量（次）</b>
          </li>
          <li>
            <p>
              <i>1268</i>
            </p>
            <b>访客量（人）</b>
          </li>
          <li>
            <p>
              <i>62</i>
            </p>
            <b>获客量</b>
          </li>
        </ul>
      </div>
    </div>
    <Ranking></Ranking>
  </div>
</template>

<script>
import Ranking from "./components/ranking"
export default {
  name: "pageValue",
  components:{
    Ranking
  }
};
</script>

<style lang="scss" scoped>
.page_value {
  padding: 15px;
}
.title {
  height: 20px;
  display: flex;
  align-items: center;
  margin-top: 18px;
  p {
    margin: 0;
    margin: 0 18px;
    font-size: 16px;
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑",
      "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑"-700;
    font-weight: bold;
  }
  span {
    font-size: 12px;
    color: #999;
  }
}
</style>

<style lang="scss" scoped>
// 当日销售
.day_sales {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  .exhibition {
    width: 100%;
    height: 124px;
    border-bottom: 1px solid #ccc;
    .sales {
      display: flex;
      width: 100%;
      height: 80px;
      margin-top: 10px;
      li {
        padding: 0 58px;
        p {
          height: 30px;
          font-weight: bold;
          margin: 0;
          display: flex;
          align-items: flex-end;
          margin-top: 10px;
          span {
            font-size: 14px;
          }
          i {
            display: block;
            font-size: 28px;
            font-style: normal;
          }
        }
        b {
          display: block;
          font-weight: 100;
          font-size: 14px;
          margin-top: 15px;
          color: #999;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
// 当日客流
.day_passenger {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  .exhibition {
    width: 100%;
    height: 124px;
    border-bottom: 1px solid #ccc;
    .sales {
      display: flex;
      width: 100%;
      height: 80px;
      margin-top: 10px;
      li {
        padding: 0 58px;
        p {
          height: 30px;
          font-weight: bold;
          margin: 0;
          display: flex;
          align-items: flex-end;
          margin-top: 10px;
          span {
            font-size: 14px;
          }
          i {
            display: block;
            font-size: 28px;
            font-style: normal;
          }
        }
        b {
          display: block;
          font-weight: 100;
          font-size: 14px;
          margin-top: 15px;
          color: #999;
        }
      }
    }
  }
}
</style>
