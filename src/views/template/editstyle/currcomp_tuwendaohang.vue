<!--
 * @Author weipeng
 * @Github https://github.com/weiipeng
 * @Date 2020-07-16 14:53:34
 * @LastEditors weipeng
 * @LastEditTime 2020-07-17 11:33:05
 * @Description 图文导航
-->

<template>
  <div>
    <div class="item">
      <b>导航样式</b>
    </div>

    <div class="item">
      <b>导航名称</b>
      <el-switch v-model="isShowTitle" active-color="#13ce66" inactive-color="#ff4949" />
    </div>

    <div class="item">
      <b>字体颜色</b>
      <el-color-picker v-model="fontColor" />
    </div>

    <div class="item">
      <b>导航数量</b>
      <el-select v-model="thisNum" placeholder="请选择">
        <el-option v-for="item in num" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
        <el-form-item label="导航图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess1"
          >
            <img v-if="items1.img" :src="items1.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="导航名称" prop="text">
          <el-input v-model="items1.text" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel"
                  :options="panel_options"
                  @change="changeSelectLink1"
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
        <el-form-item label="导航图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess2"
          >
            <img v-if="items2.img" :src="items2.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="导航名称" prop="text">
          <el-input v-model="items2.text" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel"
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
        <el-form-item label="导航图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess3"
          >
            <img v-if="items3.img" :src="items3.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="导航名称" prop="text">
          <el-input v-model="items3.text" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel"
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
        v-show="thisNum >= 4"
        ref="items4"
        class="form-item"
        :model="items4"
        :rules="rules4"
        label-position="left"
        label-width="80px"
      >
        <div class="bar">连接4</div>
        <el-form-item label="导航图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess4"
          >
            <img v-if="items4.img" :src="items4.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="导航名称" prop="text">
          <el-input v-model="items4.text" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel"
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
      </el-form>

      <!-- 5 -->
      <el-form
        v-show="thisNum >= 5"
        ref="items5"
        class="form-item"
        :model="items5"
        :rules="rules5"
        label-position="left"
        label-width="80px"
      >
        <div class="bar">连接5</div>
        <el-form-item label="导航图片" prop="img">
          <el-upload
            class="uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess5"
          >
            <img v-if="items5.img" :src="items5.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <span>最佳尺寸:75*75</span>
        </el-form-item>
        <el-form-item label="导航名称" prop="text">
          <el-input v-model="items5.text" maxlength="6" show-word-limit />
        </el-form-item>
        <el-form-item label="跳转连接" prop="link">
          <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
            <el-col :span="8">
              <el-popover placement="bottom" width="400" trigger="click">
                <el-cascader-panel
                  ref="select_link_panel"
                  :options="panel_options"
                  @change="changeSelectLink5"
                />
                <el-button slot="reference">选择链接</el-button>
              </el-popover>
            </el-col>
            <el-col :span="16">
              <el-input v-model="items5.link" placeholder="请输入内容" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

    </div>

    <el-button type="primary" @click="submitForm">保存</el-button>
  </div>
</template>

<script>
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

const items1 = {
  id: 1,
  text: '',
  img: '',
  link: ''
}
const items2 = {
  id: 1,
  text: '',
  img: '',
  link: ''
}
const items3 = {
  id: 1,
  text: '',
  img: '',
  link: ''
}
const items4 = {
  id: 1,
  text: '',
  img: '',
  link: ''
}
const items5 = {
  id: 1,
  text: '',
  img: '',
  link: ''
}

const rules1 = {
  text: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
const rules2 = {
  text: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
const rules3 = {
  text: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
const rules4 = {
  text: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
const rules5 = {
  text: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
  link: [{ required: true, message: '请填写连接', trigger: 'blur' }]
}
export default {
  name: 'CurrcompTuwendaohang',
  data() {
    return {
      num: [
        {
          item: 3,
          value: 3
        },
        {
          item: 4,
          value: 4
        },
        {
          item: 5,
          value: 5
        }
      ],
      panel_options,
      thisNum: 5,
      isShowTitle: true,
      fontColor: '#000000',
      items: null,
      items1,
      items2,
      items3,
      items4,
      items5,
      rules1,
      rules2,
      rules3,
      rules4,
      rules5
    }
  },
  methods: {
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

      if (this.thisNum >= 4) {
        this.$refs.items4.validate(valid => {
          if (!valid) {
            isNull = true
            return false
          }
        })
      }

      if (this.thisNum >= 5) {
        this.$refs.items5.validate(valid => {
          if (!valid) {
            isNull = true
            return false
          }
        })
      }

      arr.push(this.items1)
      arr.push(this.items2)
      arr.push(this.items3)
      if (this.thisNum >= 4) {
        arr.push(this.items4)
      }
      if (this.thisNum >= 5) {
        arr.push(this.items5)
      }
      this.items = arr

      if (isNull === false) {
        this.$emit('editStyleOption', {
          isShowTitle: this.isShowTitle,
          fontColor: this.fontColor,
          items: this.items
        })
      }
    },

    // 选择地址
    changeSelectLink1(e) {
      const label = this.$refs.select_link_panel1.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items[0].link = label[0].pathLabels.join('-')
      }
    },
    changeSelectLink2(e) {
      const label = this.$refs.select_link_panel2.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items[1].link = label[0].pathLabels.join('-')
      }
    },
    changeSelectLink3(e) {
      const label = this.$refs.select_link_panel3.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items[2].link = label[0].pathLabels.join('-')
      }
    },
    changeSelectLink4(e) {
      const label = this.$refs.select_link_panel4.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items[3].link = label[0].pathLabels.join('-')
      }
    },
    changeSelectLink5(e) {
      const label = this.$refs.select_link_panel5.getCheckedNodes()
      if (typeof label[0] === 'object') {
        this.items[4].link = label[0].pathLabels.join('-')
      }
    },

    // 上传图片
    handleAvatarSuccess1(res, file) {
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
    handleAvatarSuccess5(res, file) {
      this.items5.img = URL.createObjectURL(file.raw)
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
.item {
  margin-bottom: 20px;
  b {
    padding-right: 15px;
  }
}
.item-item {
  margin-top: 15px;
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
.m-title{
  font-size: 12px;
  padding: 10px;
  background: #f9f9f9;
  margin: -10px -10px 10px -10px;
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
