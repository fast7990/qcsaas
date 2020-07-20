<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-13 13:22:42
 * @LastEditors weipeng
 * @LastEditTime 2020-07-16 15:21:44
 * @Description 组合连接组件
-->

<template>
  <div class="zuhelianjie" data-name="basecomp_zuhelianjie" @click="onclick">
    <div v-for="(item, index) in items" :key="index" class="item">
      <p>{{ item.title }}</p>
      <span v-if="isShowDesc">{{ item.desc }}</span>
      <div class="img">
        <img :src="item.img" alt>
      </div>
    </div>
  </div>
</template>

<script>
const defaultItms = [
  {
    id: 1,
    title: '今日上新',
    desc: '爆款新品首发',
    img: 'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  },
  {
    id: 1,
    title: '优质品牌',
    desc: '爆款新品首发',
    img: 'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  },
  {
    id: 1,
    title: '冬季必入',
    desc: '爆款新品首发',
    img: 'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  },
  {
    id: 1,
    title: '1元购',
    desc: '爆款新品首发',
    img: 'https://dss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch2/png/hotlist1.png'
  }
]
export default {
  name: 'BasecompZuhelianjie',
  props: ['options'],
  data() {
    return {
      isShowDesc: {
        default: true
      },
      items: defaultItms
    }
  },
  watch: {
    'options': {
      handler: function() {
        console.log(this.options)
        this.items = this.options.data
        this.isShowDesc = this.options.isShowDesc
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
.zuhelianjie {
  display: flex;
  background: #fff;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 10px;
  .item {
    flex-grow: 1;
    p{
      font-size: 14px;
      color: #000;
      margin: 0 auto 10px auto;
    }
    span{
      display: block;
      font-size: 11px;
      color: #999;
      margin-bottom: 5px;
    }
    .img {
      width: 75px;
      height: 75px;
      overflow: hidden;
      margin: auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
