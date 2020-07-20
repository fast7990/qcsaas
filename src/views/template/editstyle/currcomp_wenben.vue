<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-17 15:46:34
 * @LastEditors weipeng
 * @LastEditTime 2020-07-17 16:30:45
 * @Description 文本组件配置
-->

<template>
  <div>
    <div class="item">
      <b>文本样式</b>
      <div class="item-item">
        <el-radio-group v-model="single" size="medium">
          <el-radio-button label="1">多行</el-radio-button>
          <el-radio-button label="2">单行</el-radio-button>
        </el-radio-group>
      </div>
      <span class="tips">文本超出自动换行</span>
    </div>
    <div class="item">
      <b>内容编辑</b>
    </div>
    <div class="item">
      <el-form
        ref="form"
        class="form-item"
        :model="form"
        :rules="rules"
        label-position="left"
      >
        <el-form-item prop="text">
          <el-input
            v-model="form.text"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="item">
      <b>字体设置</b>
      <div class="item-item">
        <el-select v-model="fontSize" placeholder="请选择">
          <el-option
            v-for="item in fontSizes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="item-item">
        <el-checkbox-group v-model="fontStyle" size="medium">
          <el-checkbox-button label="1">加粗</el-checkbox-button>
          <el-checkbox-button label="2">斜体</el-checkbox-button>
          <el-checkbox-button label="3">下划线</el-checkbox-button>
        </el-checkbox-group>
      </div>

    </div>
    <div class="item">
      <b>文本对齐</b>
      <div class="item-item">
        <el-radio-group v-model="alignment" size="medium">
          <el-radio-button label="1">左对齐</el-radio-button>
          <el-radio-button label="2">居中</el-radio-button>
          <el-radio-button label="3">右对齐</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-button type="primary" @click="submitForm">立即创建</el-button>
  </div>
</template>

<script>
const rules = {
  text: [{ required: true, message: '请填写内容', trigger: 'blur' }]
}
export default {
  name: 'CurrcompWenben',
  data() {
    return {
      single: 1,
      alignment: 1,
      fontStyle: [],
      fontSizes: [{
        value: '20',
        label: '20号'
      }, {
        value: '18',
        label: '18号'
      }, {
        value: '16',
        label: '16号'
      }, {
        value: '14',
        label: '14号'
      }, {
        value: '12',
        label: '12号'
      }],
      fontSize: '',
      form: {
        text: ''
      },
      rules
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('editStyleOption', {
            text: this.form.text,
            isSingle: this.single,
            fontStyle: this.fontStyle,
            fontSize: this.fontSize,
            alignment: this.alignment
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
    margin-bottom: 20px;
    b {
      padding-right: 15px;
    }
  }
  .item-item{
    margin-top: 15px;
  }
  .tips {
    color: rgb(153, 153, 153);
    font-size: 12px;
    margin-top: 10px;
  }
</style>
