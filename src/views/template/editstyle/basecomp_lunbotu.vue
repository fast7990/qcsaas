<!--
 * @Author: [hsp]
 * @Date: 2020-07-08 18:33:51
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-10 17:26:31
 * @Description: 
--> 
<template>
  <div class="lunbotu-style">
    <div class="title">海报样式：</div>
    <div class="img-list">
      <img
        class="img"
        :class="curr_1==index?'curr_img':''"
        :src="item.icon"
        alt
        @click="chengeCurr(index,1)"
        v-for="(item,index) in img_1"
        :key="index"
      />
    </div>
    <div class="title">页码样式：</div>
    <div class="img-list">
      <img
        class="img"
        :class="curr_2==index?'curr_img':''"
        :src="item.icon"
        alt
        @click="chengeCurr(index,2)"
        v-for="(item,index) in img_2"
        :key="index"
      />
    </div>
    <div class="title">
      <el-row :gutter="10" class="flex flex--align-items--center">
        <el-col :span="8">海报高度：</el-col>
        <el-col :span="16">
          <el-input
            type="number"
            placeholder="请输入内容"
            v-model="height"
            maxlength="3"
            minlength="2"
            max="2000"
            min="10"
            @change="changeHeight"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="title">
      <el-row :gutter="10" class="flex flex--align-items--center">
        <el-col :span="8">轮播间隔：</el-col>
        <el-col :span="16">
          <el-slider v-model="slider_time"></el-slider>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="img-list">
        <el-upload
          action="http://zhubaoapi.test01.qcw100.com/rest/2.0/file/file/upload"
          ref="upload"
          :file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
          :limit="3"
          :on-success="uploadSuccess"
          :on-change="uploadChange"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <div
        style="color: rgb(153, 153, 153);font-size:12px;margin-top:10px;"
      >最佳尺寸：750*360 最多9张海报，拖动调整顺序</div>
    </div>
    <div class="title">
      <div>海报链接：</div>
      <el-row :gutter="10" class="flex flex--align-items--center" style="margin-top:10px;">
        <el-col :span="8">
          <el-popover placement="bottom" width="400" trigger="click">
            <el-cascader-panel
              ref="select_link_panel"
              :options="panel_options"
              @change="changeSelectLink"
            ></el-cascader-panel>
            <el-button slot="reference">选择链接</el-button>
          </el-popover>
        </el-col>
        <el-col :span="16">
          <el-input v-model="link_val" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:50px;text-align:center;">
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
    <selectProduct ref="show_dialog_product_select" @changeSelectProduct="changeSelectProduct"></selectProduct>
  </div>
</template>
<script>
import selectProduct from "../publish/selectProduct.vue";
export default {
  components: { selectProduct },
  data() {
    return {
      show_dialog_product_select: false,
      panel_show_state: false,
      panel_options: [
        {
          value: "gongnengyemian",
          label: "功能页面",
          children: [
            {
              value: "quanbudingdan",
              label: "全部订单"
            },
            {
              value: "youhuiquanlingqu",
              label: "优惠券"
            },
            {
              value: "fenleiyemian",
              label: "分类页面"
            }
          ]
        },
        {
          value: "yingxiaohuodong",
          label: "营销活动",
          children: [
            {
              value: "xianshimiaosha",
              label: "限时秒杀"
            },
            {
              value: "duorenpintuan",
              label: "多人拼团"
            },
            {
              value: "haoyoukanjia",
              label: "好友砍价"
            },
            {
              value: "manjianmanzhe",
              label: "满减满折"
            }
          ]
        },
        {
          value: "shangpinbiaoqian",
          label: "商品标签",
          children: [
            {
              value: "xinpin",
              label: "新品"
            },
            {
              value: "cuxiaoshangpin",
              label: "促销商品"
            }
          ]
        },
        {
          value: "shangpinxiangqing",
          label: "商品详情"
        },
        {
          value: "shangpinfenlei",
          label: "商品分类"
        },
        {
          value: "zhekouzhuanchang",
          label: "折扣专场"
        }
      ],
      curr_1: 0,
      curr_2: 0,
      height: 10,
      slider_time: 0,
      fileList: [],
      dialogImageUrl: "",
      link_val: "",
      dialogVisible: false,
      disabled: false,
      img_1: [
        {
          icon: require("../../../assets/swiper_style_img/a.png")
        },
        {
          icon: require("../../../assets/swiper_style_img/b.png")
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
    openSelectLink() {
      // 打开选择链接
    },
    changeSelectLink(e) {
      // 选择链接改变

      let label = this.$refs.select_link_panel.getCheckedNodes();
      if (typeof label[0] === "object") {
        this.link_val = label[0].pathLabels.join("-");
      }
      console.log(e, label);
    },
    changeHeight(e) {
      console.log(e);
      if (e < 10 || e > 2000) {
        this.$message({
          message: "高度最小为10最大2000",
          type: "warning"
        });
        this.height = 10;
      }
    },
    changeSelectProduct(e) {
      //选择商品
      console.log(e);
    },
    confirm() {
      // 确定预览
      this.$emit("editStyleOption", {
        duration: this.slider_time * 100
      });
      // this.$refs.show_dialog_product_select.dialogBox = true;
      // this.submitUpload();
    },
    handleRemove(file) {
      console.log(this.$refs.upload.handleRemove());
      // this.$refs.upload.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file, this.fileList);
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    uploadChange(file, fileList) {
      console.log(file, fileList);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    chengeCurr(index, type) {
      if (type == 1) {
        this.curr_1 = index;
      } else if (type == 2) {
        this.curr_2 = index;
      }
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
  .img {
    width: 95px;
    height: 60px;
    margin-right: 5px;
  }
  .curr_img {
    border: 2px solid rgb(194, 98, 98);
  }
}
.lunbotu-style {
  .el-upload-list--picture-card .el-upload-list__item,
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 106px;
  }
}
</style>