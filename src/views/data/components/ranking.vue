<template>
  <div class="day_popular_goods">
    <div class="title">
      <p>当日畅销商品</p>
    </div>
    <div class="content">
      <div class="left">
        <ul class="head">
          <li>商品</li>
          <li>销售数量（件）</li>
          <li>付款金额（元）</li>
        </ul>
        <ol class="value">
          <li class="li1">
            <div class="list">
              <p>1</p>
              <span>中华硬盒香烟</span>
            </div>
            <div class="list">
              <p>3</p>
              <span>中华硬盒香烟</span>
            </div>
          </li>
          <li class="li2">
            <p>263</p>
            <p>263</p>
          </li>
          <li class="li2">
            <p>¥263</p>
            <p>¥263</p>
          </li>
        </ol>
      </div>
      <div class="right">
        <ul class="head">
          <li>商品</li>
          <li>销售数量（件）</li>
          <li>付款金额（元）</li>
        </ul>
        <ol class="value">
          <li class="li1">
            <div class="list">
              <p>2</p>
              <span>中华硬盒香烟</span>
            </div>
            <div class="list">
              <p>4</p>
              <span>中华硬盒香烟</span>
            </div>
          </li>
          <li class="li2">
            <p>263</p>
            <p>263</p>
          </li>
          <li class="li2">
            <p>¥263</p>
            <p>¥263</p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
.day_popular_goods {
  width: 100%;
  border: 1px solid #ccc;
  .content {
    width: 100%;
    display: flex;
    .left,
    .right {
      width: 50%;
      .head {
        height: 40px;
        margin-top: 10px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        li {
          width: 33.33%;
          margin-left: 20px;
          color: #999;
          font-size: 14px;
        }
      }
      .value {
        display: flex;
        align-items: center;
        li {
          width: 33.33%;
          height: 100%;
        }
        .li1 {
          .list {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            p {
              margin: 0;
              width: 30px;
              height: 30px;
              line-height: 30px;
              background: #2d8cf0;
              text-align: center;
              color: #fff;
              font-size: 22px;
              font-weight: bold;
              margin-left: 15px;
            }
            span {
              display: block;
              width: 180px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-left: 15px;
              font-size: 14px;
            }
          }
        }
        .li2 {
          p {
            height: 60px;
            line-height: 60px;
            margin: 0;
            margin-left: 20px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>