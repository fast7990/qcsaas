<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-13 14:07:34
 * @LastEditors weipeng
 * @LastEditTime 2020-07-14 11:21:51
 * @Description 组合链接组件配置设置
-->

<template>
  <div class="zuhelianjie">
    <div class="item">
      <b>导航样式</b>
    </div>
    <div class="item">
      <b>导航样式</b>
      <el-switch v-model="isShowDesc" active-color="#13ce66" inactive-color="#ff4949" />
    </div>
    <div class="item">
      <el-form
        ref="items1"
        class="form-item"
        :model="items1"
        :rules="rules1"
        label-position="left"
        label-width="80px"
      >
        <div class="bar">连接1</div>
        <el-form-item label="选择图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="items1.img" :src="items1.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="标题名称" prop="title">
          <el-input v-model="items1.title" maxlength="4" show-word-limit />
        </el-form-item>
        <el-form-item label="辅助标题" prop="desc">
          <el-input v-model="items1.desc" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
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
              <el-input v-model="items1.link" placeholder="请输入内容" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 2 -->
      <el-form
        ref="items2"
        class="form-item"
        :model="items2"
        :rules="rules2"
        label-position="left"
        label-width="80px"
      >
        <div class="bar">连接2</div>
        <el-form-item label="选择图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="items2.img" :src="items2.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="标题名称" prop="title">
          <el-input v-model="items2.title" maxlength="4" show-word-limit />
        </el-form-item>
        <el-form-item label="辅助标题" prop="desc">
          <el-input v-model="items2.desc" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel2"
                  :options="panel_options"
                  @change="changeSelectLink2"
                />
                <el-button slot="reference">选择链接</el-button>
              </el-popover>
            </el-col>
            <el-col :span="16">
              <el-input v-model="items2.link" placeholder="请输入内容" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 3 -->
      <el-form
        ref="items3"
        class="form-item"
        :model="items3"
        :rules="rules3"
        label-position="left"
        label-width="80px"
      >
        <div class="bar">连接3</div>
        <el-form-item label="选择图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="items3.img" :src="items3.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="标题名称" prop="title">
          <el-input v-model="items3.title" maxlength="4" show-word-limit />
        </el-form-item>
        <el-form-item label="辅助标题" prop="desc">
          <el-input v-model="items3.desc" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel3"
                  :options="panel_options"
                  @change="changeSelectLink3"
                />
                <el-button slot="reference">选择链接</el-button>
              </el-popover>
            </el-col>
            <el-col :span="16">
              <el-input v-model="items3.link" placeholder="请输入内容" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 4 -->
      <el-form
        ref="items4"
        class="form-item"
        :model="items4"
        :rules="rules4"
        label-position="left"
        label-width="80px"
      >
        <div class="bar">连接4</div>
        <el-form-item label="选择图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess4"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="items4.img" :src="items4.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="标题名称" prop="title">
          <el-input v-model="items4.title" maxlength="4" show-word-limit />
        </el-form-item>
        <el-form-item label="辅助标题" prop="desc">
          <el-input v-model="items4.desc" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel4"
                  :options="panel_options"
                  @change="changeSelectLink4"
                />
                <el-button slot="reference">选择链接</el-button>
              </el-popover>
            </el-col>
            <el-col :span="16">
              <el-input v-model="items4.link" placeholder="请输入内容" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const items1 = {
  id: 1,
  title: '',
  desc: '',
  img: '',
  link: ''
}
const items2 = {
  id: 2,
  title: '',
  desc: '',
  img: '',
  link: ''
}
const items3 = {
  id: 3,
  title: '',
  desc: '',
  img: '',
  link: ''
}
const items4 = {
  id: 4,
  title: '',
  desc: '',
  img: '',
  link: ''
}

const rules1 = {
  title: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请填写辅助标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
const rules2 = {
  title: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请填写辅助标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
const rules3 = {
  title: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请填写辅助标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
const rules4 = {
  title: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请填写辅助标题名称', trigger: 'blur' }],
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
  name: 'BasecompZuhelianjie',
  data() {
    return {
      isShowDesc: true,
      panel_options,
      items: [],
      items1,
      items2,
      items3,
      items4,
      rules1,
      rules2,
      rules3,
      rules4
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      const arr = []
      let isNull = false
      this.$refs.items1.validate(valid => {
        if (!valid) {
          isNull = true
          return false
        }
      })

      this.$refs.items2.validate(valid => {
        if (!valid) {
          isNull = true
          return false
        }
      })

      this.$refs.items3.validate(valid => {
        if (!valid) {
          isNull = true
          return false
        }
      })

      this.$refs.items4.validate(valid => {
        if (!valid) {
          isNull = true
          return false
        }
      })
      arr.push(this.items1)
      arr.push(this.items2)
      arr.push(this.items3)
      arr.push(this.items4)
      this.items = arr
      if (isNull === false) {
        this.$emit('editStyleOption', {
          data: this.items,
          isShowDesc: this.isShowDesc
        })
      }
    },

    // 选择地址
    changeSelectLink(e) {
      const label = this.$refs.select_link_panel.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items1.link = label[0].pathLabels.join('-')
      }
    },
    changeSelectLink2(e) {
      const label = this.$refs.select_link_panel2.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items2.link = label[0].pathLabels.join('-')
      }
    },
    changeSelectLink3(e) {
      const label = this.$refs.select_link_panel3.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items3.link = label[0].pathLabels.join('-')
      }
    },
    changeSelectLink4(e) {
      const label = this.$refs.select_link_panel4.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items4.link = label[0].pathLabels.join('-')
      }
    },

    // 上传图片
    handleAvatarSuccess(res, file) {
      this.items1.img = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccess2(res, file) {
      this.items2.img = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccess3(res, file) {
      this.items3.img = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccess4(res, file) {
      this.items4.img = URL.createObjectURL(file.raw)
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
.zuhelianjie {
  .item {
    margin-bottom: 20px;
    b {
      padding-right: 15px;
    }
  }
}
.form-item {
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: $border-radius-base;
  .bar {
    font-size: 12px;
    padding: 10px;
    background: #f9f9f9;
    margin: -10px -10px 10px -10px;
  }
  span {
    color: rgb(153, 153, 153);
    font-size: 12px;
    margin-top: 10px;
  }
}
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
