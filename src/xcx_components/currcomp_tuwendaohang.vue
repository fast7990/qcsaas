<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-16 14:54:02
 * @LastEditors weipeng
 * @LastEditTime 2020-07-17 11:34:34
 * @Description 图文导航
-->

<template>
  <div class="tuwendaohang" data-name="currcomp_tuwendaohang" @click="onclick">
    <div v-for="(item, index) in items" :key="index">
      <div class="img">
        <img :src="item.img" alt>
      </div>
      <p v-show="isShowTitle" :style="{color: fontColor}">{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
const defaultItms = [
  {
    id: 1,
    text: '美食酒水',
    link: '',
    img:
      'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  },
  {
    id: 2,
    text: '服饰鞋包',
    link: '',
    img:
      'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  },
  {
    id: 3,
    text: '家居生活',
    link: '',
    img:
      'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  },
  {
    id: 4,
    text: '数码科技',
    link: '',
    img:
      'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  },
  {
    id: 5,
    text: '运动旅行',
    link: '',
    img:
      'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  }
]
export default {
  name: 'CurrcompTuwendaohang',
  props: ['options'],
  data() {
    return {
      isShowTitle: {
        default: true
      },
      fontColor: '#000',
      items: defaultItms
    }
  },
  watch: {
    options: {
      handler: function() {
        this.isShowTitle = this.options.isShowTitle
        this.fontColor = this.options.fontColor
        this.items = this.options.items
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
.tuwendaohang {
  display: flex;
  padding: 10px 0;
  text-align: center;
  background-color: #fff;
  margin-bottom: 10px;
  & > div {
    flex-grow: 1;
  }
  .img {
    width: 75px;
    min-width: 75px;
    max-width: 75px;
    height: 75px;
    min-height: 75px;
    max-height: 75px;
    margin: auto;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p {
    font-size: 14px;
    margin: 5px auto 0 auto;
  }
}
</style>
