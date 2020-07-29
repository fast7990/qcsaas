<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-21 11:02:05
 * @LastEditors weipeng
 * @LastEditTime 2020-07-21 11:44:32
 * @Description 图片广告
-->

<template>
  <div>
    <div class="item">
      <b>导航样式</b>
    </div>

    <el-form
      ref="items"
      class="form-item"
      :model="items"
      :rules="rules"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="选择图片" prop="img">
        <el-upload
          class="uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="items.img" :src="items.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <span>最佳尺寸:750*120</span>
      </el-form-item>
      <el-form-item label="广告连接" prop="link">
        <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
          <el-col :span="8">
            <el-popover placement="bottom" width="400" trigger="click">
              <el-cascader-panel
                ref="select_link_panel"
                :options="panel_options"
                @change="changeSelectLink"
              />
              <el-button slot="reference">选择链接</el-button>
            </el-popover>
          </el-col>
          <el-col :span="16">
            <el-input v-model="items.link" placeholder="请输入内容" />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm">保存</el-button>
  </div>
</template>

<script>
const rules = {
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}

const panel_options = [
  {
    value: 'gongnengyemian',
    label: '功能页面',
    children: [
      {
        value: 'quanbudingdan',
        label: '全部订单'
      },
      {
        value: 'youhuiquanlingqu',
        label: '优惠券'
      },
      {
        value: 'fenleiyemian',
        label: '分类页面'
      }
    ]
  },
  {
    value: 'yingxiaohuodong',
    label: '营销活动',
    children: [
      {
        value: 'xianshimiaosha',
        label: '限时秒杀'
      },
      {
        value: 'duorenpintuan',
        label: '多人拼团'
      },
      {
        value: 'haoyoukanjia',
        label: '好友砍价'
      },
      {
        value: 'manjianmanzhe',
        label: '满减满折'
      }
    ]
  },
  {
    value: 'shangpinbiaoqian',
    label: '商品标签',
    children: [
      {
        value: 'xinpin',
        label: '新品'
      },
      {
        value: 'cuxiaoshangpin',
        label: '促销商品'
      }
    ]
  },
  {
    value: 'shangpinxiangqing',
    label: '商品详情'
  },
  {
    value: 'shangpinfenlei',
    label: '商品分类'
  },
  {
    value: 'zhekouzhuanchang',
    label: '折扣专场'
  }
]
export default {
  name: 'CurrcompTupianguanggao',
  data() {
    return {
      panel_options,
      rules,
      items: {
        img: '',
        link: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.items.validate(valid => {
        if (valid) {
          this.$emit('editStyleOption', {
            items: this.items
          })
        } else {
          return false
        }
      })
    },

    // 选择地址
    changeSelectLink(e) {
      const label = this.$refs.select_link_panel.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items.link = label[0].pathLabels.join('-')
      }
    },

    // 上传图片
    handleAvatarSuccess(res, file) {
      this.items.img = URL.createObjectURL(file.raw)
    },

    // 上传前检测图片是否合规
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('请上传正确的图片格式')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  width: 75px;
  height: 75px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader:hover {
  border-color: #409eff;
}
</style>

<style lang="scss">
.uploader {
  .el-upload--text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
