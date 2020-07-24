<template>
  <div class="pages">
    <el-form ref="form" :model="form" label-width="120px">
      <!-- line -->
      <div class="cell-top">
        <el-row :gutter="20">
          <el-col>
            <label class="el-form-item__label">基本信息</label>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="商品名称:">
            <el-input v-model="form.name" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="商品分类:">
            <el-cascader :options="product_type_options" @change="changeCascader" clearable></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="商品简介:">
            <el-input v-model="form.introduction" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label" style="font-size: 14px;color: #cccccc;">
            最多30个字，于商品详情页展示
            <i class="el-icon-view" style="color: #000000;margin-left: 30px;"></i>
          </label>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="商品标签:">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="margin-right: 10px;"
            >{{ tag }}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="tag_input_visible"
              v-model="tag_input_value"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
              style="width: 100px;"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="图片:">
            <div>
              <div class="demo-image__preview">
                <div class="el-image-box" v-for="(item, index) in add_img_list" :key="index">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="item"
                    :preview-src-list="add_img_list"
                  ></el-image>
                  <span
                    class="el-image-close flex flex--align-items--center flex--justify-content--center"
                    @click="removeImgItem(index)"
                  >
                    <i class="el-icon-close"></i>
                  </span>
                </div>
                <div class="el-image add-img-box" style>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
              <div>
                最多可以上传9张，建议尺寸640×640像素。
                <span style="color: red;">默认第一张为封面</span>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="cell-top">
        <el-row :gutter="20">
          <el-col>
            <label class="el-form-item__label">价格库存</label>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="规格:">
            <el-select
              v-model="curr_select_sku_type_name"
              placeholder="请选择"
              @change="changeSelectSkuType"
            >
              <el-option v-for="item in options1" :key="item.value" :label="item.lable" :value="item.value">
                <div @click="addGuigeType(3)">+新增规格</div>
              </el-option>
              <el-option
                v-for="(item, index) in sku_type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div class="flex flex--align-items--center flex--justify-content--space-between">
                  <span>{{ item.label }}</span>
                  <span class="el-icon-error" @click="addGuigeType(2, index)"></span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="margin-right: 10px;"
            >{{ tag }}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="tag_input_visible"
              v-model="tag_input_value"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
              style="width: 100px;"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 输入规格数值</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="规格信息："></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="*售价：">
            <el-input placeholder="请输入售价" v-model="form.value">
              <template slot="append">￥</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="*重量：">
            <el-input placeholder="请输入重量" v-model="form.value">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="*库存：">
            <el-input placeholder="请输入库存" v-model="form.value">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="*运费：">
            <el-radio-group v-model="select_logfee">
              <el-radio
                :label="1"
                class="flex flex--align-items--center"
                style="margin-bottom: 10px;"
              >
                <div class="flex flex--align-items--center">
                  <p style="margin-right: 10px;">固定运费</p>
                  <el-input placeholder="请输入运费" v-model="form.value">
                    <template slot="append">kg</template>
                  </el-input>
                </div>
              </el-radio>
              <el-radio :label="2" class="flex flex--align-items--center">
                <div class="flex flex--align-items--center">
                  <p style="margin-right: 10px;">使用模板</p>
                  <el-select v-model="form.value" placeholder="请选择">
                    <el-option
                      v-for="item in temp_logfee_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="市场价：">
            <el-input placeholder="请输入市场价" v-model="form.value"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="商品编码：">
            <el-input placeholder="请输入商品编码" v-model="form.value"></el-input>
            <span style="font-size: 14px;color: #cccccc;">商户若有自己的编码管理可录入编码</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- line -->
      <div class="cell-top">
        <el-row :gutter="20">
          <el-col>
            <label class="el-form-item__label">商品介绍</label>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="*商品介绍：">
            <tinymce v-model="content" :height="300" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- line -->
      <div class="cell-top">
        <el-row :gutter="20">
          <el-col>
            <label class="el-form-item__label">销售属性</label>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="上架处理：">
            <el-radio-group v-model="select_uppro_date">
              <el-radio
                :label="1"
                class="flex flex--align-items--center"
                style="margin-bottom: 10px;"
              >
                <div class="flex flex--align-items--center">
                  <p style="margin-right: 10px;">直接上架售卖</p>
                </div>
              </el-radio>
              <el-radio
                :label="2"
                class="flex flex--align-items--center"
                style="margin-bottom: 10px;"
              >
                <div class="flex flex--align-items--center">
                  <p style="margin-right: 10px;">等待手动上架</p>
                </div>
              </el-radio>
              <el-radio :label="3" class="flex flex--align-items--center">
                <div class="flex flex--align-items--center">
                  <p style="margin-right: 10px;">自定义时间上架</p>
                  <el-date-picker v-model="uppro_date" type="date" placeholder="选择日期"></el-date-picker>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="预售：">
            <el-switch v-model="presale_switch" active-color="#2D8CF0" inactive-color="#CCCCCC"></el-switch>
            <div class="flex flex--align-items--center">
              <div style="margin-right: 10px;">全款预售</div>
              <el-date-picker v-model="uppro_date" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div style="font-size: 14px;color: #CCCCCC;">只允许设置3~90天内的发货时间</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="限购：">
            <el-switch v-model="xiangou_switch" active-color="#2D8CF0" inactive-color="#CCCCCC"></el-switch>
            <el-radio-group v-model="select_uppro_date">
              <el-radio
                :label="1"
                class="flex flex--align-items--center"
                style="margin-bottom: 10px;"
              >
                <div class="flex flex--align-items--center">
                  <p style="margin-right: 10px;">永久限购</p>
                  <el-input placeholder="请输入限量" v-model="form.value" maxlength="8"></el-input>
                </div>
              </el-radio>
              <el-radio
                :label="2"
                class="flex flex--align-items--center"
                style="margin-bottom: 10px;"
              >
                <div class="flex flex--align-items--center">
                  <p style="margin-right: 10px;">周期限购</p>
                  <el-select v-model="form.value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input placeholder="请输入限量" v-model="form.value" maxlength="8"></el-input>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-button type="primary" @click="saveFormBtn">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 添加规格弹框 -->
    <el-dialog
      title="新增规格"
      :visible.sync="show_dialog_visible"
      width="30%"
      :before-close="handleCloseDialog"
    >
      <div class="flex flex--align-items--center">
        <label class="el-form-item__label" style="width: 100px;">规格名称:</label>
        <el-input v-model="add_sku_type_val" autocomplete="off"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importProduct(3)">取 消</el-button>
        <el-button type="primary" @click="importProduct(2)">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { getProductCreate } from "@/api/product";

export default {
  name: "product",
  components: { Tinymce },
  data() {
    return {
      content: "",
      editorOption: {},
      dynamicTags: [],
      show_dialog_visible: false,
      tag_input_visible: false,
      tag_input_value: "",
      add_sku_type_val: "",
      curr_select_sku_type: "",
      curr_select_sku_type_name: "",
      select_uppro_date: "",
      uppro_date: "", //上架
      presale_switch: "", //预售
      xiangou_switch: "", //限购
      options: [
        {
          value: "选项1",
          label: "每日",
        },
        {
          value: "选项2",
          label: "每周",
        },
        {
          value: "选项3",
          label: "每月",
        },
      ],
      options1:[
        {
          value: "请选择",
          label: "+新增规格"
        }
      ],
      form: {
        value: "",
        name: "",
        status: "",
        introduction: "",
      },
      imageUrl: "",
      select_logfee: 1,
      add_img_list: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      sku_type_options: [],
      temp_logfee_options: [
        {
          value: "moren",
          label: "默认运费模板",
        },
      ],
      product_type_options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
            },
            {
              value: "cexiangdaohang",
              label: "侧向导航",
            },
            {
              value: "dingbudaohang",
              label: "顶部导航",
            },
          ],
        },
      ],
    };
  },
  methods: {
    changeCascader(e) {
      // 下拉选择
      // console.log(e);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleCloseDialog() {
      this.show_dialog_visible = false;
    },
    showInput() {
      this.tag_input_visible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async saveFormBtn() {
      // console.log(this.content);
      var token = document.cookie.split(";")[0].split("=")[1];
      var data = {
        access_token: token,
        name: this.form.name,
        // summary: this.from.introduction,
        category_id: 1,
        desc: this.form.introduction,
        price: parseInt(this.form.value),
        weight: 0,
        specs: [],
        sale_at: 1595260800,
        status: this.status,
        images: [
          {
            image:
              "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          },
        ],
      };
      var res = await getProductCreate(data);
      console.log(res);
      if(res.status==1){
        this.$router.push({ path: "/product/product" });
      }
    },
    importProduct(type) {
      if (type == 1) {
        this.show_dialog_visible = true;
      } else if (type == 2) {
        this.addGuigeType(1);
        this.show_dialog_visible = false;
      } else if (type == 3) {
        this.show_dialog_visible = false;
      }
    },
    addGuigeType(type, index) {
      if (type == 1) {
        // 加
        if (this.add_sku_type_val != "") {
          this.sku_type_options.push({
            value: this.add_sku_type_val,
            label: this.add_sku_type_val,
          });
        } else {
          this.$message({
            showClose: true,
            message: "输入规格不能为空",
            type: "error",
          });
        }
      } else if (type == 2) {
        // 减
        this.sku_type_options.splice(index, 1);
      } else if (type == 3) {
        this.show_dialog_visible = true;
      }
      this.add_sku_type_val = "";
    },
    changeSelectSkuType(e) {
      this.curr_select_sku_type = e;
      if (e == 0) {
      }
    },
    handleInputConfirm() {
      let tag_input_value = this.tag_input_value;
      if (tag_input_value) {
        this.dynamicTags.push(tag_input_value);
      }
      this.tag_input_visible = false;
      this.tag_input_value = "";
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res, file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isImgLeng = this.add_img_list.length < 9;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (!isImgLeng) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M && isImgLeng;
    },
    removeImgItem(i) {
      this.add_img_list.splice(i, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.pages {
  padding: 10px 20px;
  background: #ffffff;
}

.add-img-box {
  margin-right: 10px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 36px;
  border: 1px dotted #889aa4;
}
.demo-image__preview {
  .el-image-box {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    width: 100px;
    height: 100px;
    .el-image-close {
      position: absolute;
      width: 10px;
      height: 10px;
      padding: 10px;
      right: 0px;
      top: 0;
      background-color: #000000;
      color: #ffffff;
    }
  }
}
.cell-top {
  background: #f2f2f2;
  padding: 0 10px;
  margin-bottom: 30px;
}
</style>
