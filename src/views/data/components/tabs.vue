<template>
  <div class="tab">
    <div @click="getButMonth" id="btn">
      <button class="buttonActive">按日</button>
      <button>按月</button>
    </div>
    <div class="block" v-if="type==0">
      <el-date-picker
        v-model="day"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
    <div class="month" v-if="type==1">
      <el-date-picker v-model="month1" type="month" placeholder="选择月"></el-date-picker>
      <span>至</span>
      <el-date-picker v-model="month2" type="month" placeholder="选择月"></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      type: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      day: "",
      month1: "",
      month2: "",
    };
  },
  mounted() {
    var btn = document.querySelector("#btn");
    var button = btn.querySelectorAll("button");
    // var index;
    var that = this;
    for (var i = 0; i < button.length; i++) {
      //按钮数组
      button[i].index = i; //i是按钮数组的下标,把i赋值给index,这样通过index就知道点击的是哪个按钮
      button[i].onclick = function () {
        for (var j = 0; j < button.length; j++) {
          //通过点击按钮的时候再次循环按钮，是为了清空active类
          button[j].className = ""; //清空active类
        }
        that.type = this.index;
        button[this.index].className = "buttonActive"; //点击哪个按钮就哪个按钮加active类
      };
    }
    console.log(this.type);
  },
  methods: {
    getButMonth() {},
  },
};
</script>

<style lang="scss">
.tab {
  width: 100%;
  height: 60px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  button {
    padding: 8px 20px;
    border: none;
    border: 1px solid #ccc;
    font-size: 12px;
  }
  button:nth-child(1) {
    margin-left: 15px;
  }
  button:hover {
    border-color: #0099ff;
    color: #0099ff;
  }
  .buttonActive {
    background: #2d8cf0;
    color: #fff;
  }
  .buttonActive:hover {
    opacity: 0.7;
    color: #fff;
  }
  .block {
    margin-left: 100px;
  }
  .month {
    display: flex;
    align-items: center;
    margin-left: 100px;
    span {
      display: block;
      width: 100px;
      text-align: center;
      .el-input__icon {
        position: absolute;
        left: 0;
      }
    }
  }
}
</style>