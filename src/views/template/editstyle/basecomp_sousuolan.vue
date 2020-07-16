<!--
 * @Author: [hsp]
 * @Date: 2020-07-09 14:50:59
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-13 18:17:02
 * @Description: x
-->
<template>
  <div class="shousuolan edit-style" @click.stop="onclick($event)">
    <div class="title">搜索栏样式：</div>
    <div class="img-list">
      <div
        class="img-box"
        :class="curr_1==index?'curr_img':''"
        v-for="(item,index) in img_1"
        :key="index"
        @click="chengeCurr(index,1)"
      >
        <img class="img" :src="item.icon" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curr_1: 0,
      curr_2: 0,
      img_1: [
        {
          icon: require("../../../assets/sosuolan_style_img/u91.png")
        },
        {
          icon: require("../../../assets/sosuolan_style_img/u97.png")
        },
        {
          icon: require("../../../assets/sosuolan_style_img/u101.png")
        },
        {
          icon: require("../../../assets/sosuolan_style_img/u105.png")
        }
      ],
      img_2: [
        {
          icon: require("../../../assets/swiper_style_img/1.png")
        },
        {
          icon: require("../../../assets/swiper_style_img/2.png")
        },
        {
          icon: require("../../../assets/swiper_style_img/3.png")
        },
        {
          icon: require("../../../assets/swiper_style_img/4.png")
        }
      ]
    };
  },
  methods: {
    chengeCurr(index, type) {
      if (type == 1) {
        this.curr_1 = index;
      } else if (type == 2) {
        this.curr_2 = index;
      }
    },
    onclick(e) {
      this.$emit("onclick", e);
    }
  }
};
</script>
<style lang="scss">
.title {
  margin-top: 20px;
  margin-bottom: 10px;
}
.img-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95px;
    height: 95px;
    margin-right: 5px;
    .img {
      width: 95px;
      height: 25px;
    }
  }
  .curr_img {
    border: 2px solid rgb(194, 98, 98);
  }
}
</style>