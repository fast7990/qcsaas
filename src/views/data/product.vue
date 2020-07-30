<template>
  <div class="product">
    <div class="display">
      <ul>
        <li>
          <p>1654</p>
          <span>商品数量</span>
        </li>
        <li>
          <p>1654</p>
          <span>商品数量</span>
        </li>
        <li>
          <p>1654</p>
          <span>商品数量</span>
        </li>
        <li>
          <p>1654</p>
          <span>商品数量</span>
        </li>
        <li>
          <p>1654</p>
          <span>商品数量xxxxxx</span>
          <b class="update" @click="replenishment">补货</b>
        </li>
      </ul>
    </div>
    <div class="frame">
      <Statistics :statisticsList="statisticsList"></Statistics>
      <div id="main" style="width: 100%;height:400px;"></div>
    </div>
    <Ranking></Ranking>
  </div>
</template>

<script>
import Ranking from "./components/ranking";
import Statistics from "./components/statistics";
export default {
  name: "product",
  components: {
    Ranking,
    Statistics,
  },
  data() {
    return {
      statisticsList: [],
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    replenishment() {
      this.$router.push({
        path: "/product/product",
      });
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FFD56E",
                  },
                  {
                    offset: 0.5,
                    color: "#fff",
                  },
                  {
                    offset: 1,
                    color: "#FFD56E",
                  },
                ],
                global: false,
              },
            },
          },
        },
        legend: {
          right: 20,
          top: 0,
          itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
          itemWidth: 30, // 图例图形宽度
          itemHeight: 10, // 图例图形高度
          textStyle: {
            color: "red",
            fontWeight: "normal",
            fontSize: 14,
          },
        },
        grid: {
          top: "5%",
          left: "3%",
          right: "1%",
          bottom: "8%",
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
            ],
            axisTick: {
              show: false, // 是否显示坐标轴轴线
            },
            axisLabel: {
              color: "#282828",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。
              show: true,
              inside: false,
              lineStyle: {
                color: "#000",
              },
            },
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            splitNumber: 4,
            splitLine: { show: true },
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              show: true,
              textStyle: {
                color: "#737373",
              },
            },
            axisLine: {
              show: true,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "rgba(131,101,101,0.2)",
                type: "dashed",
              },
            },
            show: true,
          },
        ],
        series: [
          {
            type: "bar",
            barMaxWidth: 20,
            zlevel: 10,
            // barGap: '100%',
            data: [40, 79, 50, 40, 79, 50, 40],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#FF9A22",
                    },
                    {
                      offset: 1,
                      color: "#FFD56E",
                    },
                  ],
                },
                barBorderRadius: [30, 30, 0, 0],
              },
            },
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            silent: true,
            barWidth: 30,
            barGap: "-125%",
            data: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.display {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  ul {
    width: 90%;
    display: flex;
    li {
      padding: 0 20px;
      height: 100%;
      span {
        display: block;
        width: 200px;
      }
    }
    li:last-child {
      position: relative;
    }
  }
}
.update {
  font-size: 12px;
  color: #2d8cf0;
  position: absolute;
  right: 0px;
  bottom: 2px;
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.product {
  padding: 15px;
}
.frame {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>