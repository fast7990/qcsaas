<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-17 15:41:00
 * @LastEditors weipeng
 * @LastEditTime 2020-07-17 18:20:15
 * @Description 文本
-->

<template>
  <div class="wenben" data-name="currcomp_wenben" @click="onclick">
    <div
      class="show-type"
      :style="{fontSize:fontSize+'px', textAlign:alignment, fontWeight:bold, fontStyle:italic, textDecoration: underline, whiteSpace: isSingle}"
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
      fontStyle: [],
      fontSize: 14,
      alignment: '',
      bold: '',
      italic: '',
      underline: '',
      text: '示例文本'
    }
  },
  watch: {
    options: {
      handler: function() {
        this.text = this.options.text
        this.fontStyle = this.options.fontStyle
        this.fontSize = this.options.fontSize
        if (this.options.alignment === '1') {
          this.alignment = 'left'
        } else if (this.options.alignment === '2') {
          this.alignment = 'center'
        } else if (this.options.alignment === '3') {
          this.alignment = 'right'
        }

        if (this.options.single === '1') {
          this.isSingle = 'nowrap'
        } else {
          this.isSingle = ''
        }

        if (this.options.fontSize.indexOf(1)) {
          this.bold = 'bold'
        }
        if (this.options.fontSize.indexOf(2)) {
          this.italic = 'italic'
        }
        if (this.options.fontSize.indexOf(3)) {
          this.underline = 'underline'
        }
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
.wenben {
  padding: 10px;
  background-color: #fff;
}
</style>
