<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-21 11:02:31
 * @LastEditors weipeng
 * @LastEditTime 2020-07-21 11:35:02
 * @Description 图片广告组件
-->

<template>
  <div class="tupianguanggao" data-name="currcomp_tupianguanggao" @click="onclick">
    <img :src="items.img" alt="">
  </div>
</template>

<script>
export default {
  name: 'CurrcompTupianguanggao',
  props: ['options'],
  data() {
    return {
      items: {
        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=537246731,475669258&fm=26&gp=0.jpg',
        link: ''
      }
    }
  },
  watch: {
    options: {
      handler: function() {
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
.tupianguanggao{
  height: 60px;
  margin-bottom: 10px;
  overflow: hidden;
  background: #fff;
  img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
