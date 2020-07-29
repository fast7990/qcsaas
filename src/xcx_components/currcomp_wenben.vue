<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-17 15:41:00
 * @LastEditors weipeng
 * @LastEditTime 2020-07-20 19:48:45
 * @Description 文本
-->

<template>
  <div
    class="wenben"
    :class="{fixedHeight: isSingleBool}"
    data-name="currcomp_wenben"
    @click="onclick"
  >
    <div
      ref="sss"
      :class="{scroll: isSingleBool}"
      :style="{fontSize:fontSize+'px', textAlign:alignment, fontWeight:isBold, fontStyle:isItalic, textDecoration: isUnderline, whiteSpace: isSingle}"
    >{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'CurrcompWenben',
  props: ['options'],
  data() {
    return {
      isSingle: '',
      isSingleBool: false,
      fontStyle: [],
      fontSize: 14,
      alignment: '',
      isBold: '',
      isItalic: '',
      isUnderline: '',
      text: '示例文本'
    }
  },
  watch: {
    options: {
      handler: function() {
        this.text = this.options.text
        this.fontSize = this.options.fontSize
        if (this.options.alignment === '1') {
          this.alignment = 'left'
        } else if (this.options.alignment === '2') {
          this.alignment = 'center'
        } else if (this.options.alignment === '3') {
          this.alignment = 'right'
        }

        console.log(this.options.fontStyle)

        if (this.options.isSingle === '2') {
          this.isSingle = 'nowrap'
          this.isSingleBool = true
        } else {
          this.isSingle = ''
          this.isSingleBool = false
        }

        if (this.options.fontStyle.indexOf('1') !== -1) {
          this.isBold = 'bold'
        } else {
          this.isBold = ''
        }
        if (this.options.fontStyle.indexOf('2') !== -1) {
          this.isItalic = 'italic'
        } else {
          this.isItalic = ''
        }
        if (this.options.fontStyle.indexOf('3') !== -1) {
          this.isUnderline = 'underline'
        } else {
          this.isUnderline = ''
        }
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.$refs.sss)
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
.wenben {
  position: relative;
  background-color: #fff;
  overflow: hidden;
  padding: 10px;
  .scroll {
    position: absolute;
    top: 0;
    animation: rotaryBlockFirst 5s linear infinite;
  }
}
.fixedHeight {
  position: absolute;
  height: 40px;
  line-height: 40px;
}
@keyframes rotaryBlockFirst {
  0% {
    left: 0;
  }

  100% {
    left: -300px;
  }
}
</style>
