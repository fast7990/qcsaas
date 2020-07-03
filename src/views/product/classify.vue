<!--
 * @Author: [hsp]
 * @Date: 2020-06-24 16:09:50
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-01 17:47:24
 * @Description:
-->
<template>
  <div class="pages">
    <div class="page-container flex">
      <div class="left">
        <div class="flex">
          <div class="item">全部展开</div>
          <div class="item">全部收起</div>
        </div>
        <el-divider class="m0"></el-divider>
        <el-row
          class="flex flex--justify-content--center flex--align-items--center"
          style="padding:10px 0;"
        >
          <el-button size="mini" type="primary" style="padding: 5px;" @click="addNodeBtn(1)">新增父级</el-button>
          <el-button size="mini" type="primary" style="padding: 5px;" @click="addNodeBtn(2)">新增子级</el-button>
          <span style="font-size: 12px;color: #CCCCCC;margin-left:10px;">最多可设置三级</span>
        </el-row>
        <el-divider class="m0"></el-divider>
        <el-row>
          <div class="block">
            <el-tree
              :data="tree_data"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="data.show">
                  <el-button type="text" size="mini" @click="() => addNodeBtn(3,data)">
                    <i class="el-icon-edit-outline" style="font-size:16px;"></i>
                  </el-button>
                  <el-button type="text" size="mini" @click="() => remove(node, data)">
                    <i class="el-icon-delete" style="font-size:16px;"></i>
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-row>
      </div>
      <div class="right">
        <p style="text-align:center;margin-bottom:50px;">小程序分类模板选择</p>
        <div>
          <el-row :gutter="20">
            <el-col
              :span="12"
              class="flex flex--row flex--justify-content--space-between--align-items--center"
            >
              <img
                src="../../assets/images/select_product_type1.png"
                alt
                style="width:200px;height:430px;"
              />
              <div>
                <el-checkbox v-model="checked_style1">列表样式</el-checkbox>
              </div>
              <p class="el-checkbox__label">更加适合三级商品分类及分类数量较多的情况</p>
            </el-col>
            <el-col
              :span="12"
              class="flex flex--row flex--justify-content--space-between--align-items--center"
            >
              <img
                src="../../assets/images/select_product_type2.png"
                alt
                style="width:200px;height:430px;"
              />
              <div>
                <el-checkbox v-model="checked_style2">列表样式</el-checkbox>
              </div>
              <p class="el-checkbox__label">更加适合一二级商品分类及分类数量较少的情况</p>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 增加父级 -->
      <el-dialog title="收货地址" :visible.sync="show_dialog_parent_visible" width="30%">
        <el-form>
          <el-form-item label="活动名称" class="flex">
            <el-input v-model="form.parent_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBtn(1)">取 消</el-button>
          <el-button type="primary" @click="dialogBtn(2)">确 认</el-button>
        </div>
      </el-dialog>

      <!-- 增加子级 -->
      <el-dialog title="收货地址" :visible.sync="show_dialog_sub_visible" width="30%">
        <el-form>
          <el-form-item label="活动区域" v-if="show_sub_select">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option
                :label="item.label"
                :value="item.id"
                v-for="(item,index) in tree_data"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" class="flex">
            <el-input v-model="form.sub_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标设置" class="flex">
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
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBtn(3)">取 消</el-button>
          <el-button type="primary" @click="dialogBtn(4)">确 认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
let id = 1000;
export default {
  name: "import",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        show: false,
        children: [
          {
            id: 4,
            label: "二级 1-1",
            show: true,
            img: "",
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
                img: "",
                show: false
              },
              {
                id: 10,
                label: "三级 1-1-2",
                img: "",
                show: false
              }
            ]
          }
        ]
      }
    ];
    return {
      checked_style1: false,
      checked_style2: false,
      form: {
        parent_name: "",
        region: "",
        sub_name: ""
      },
      show_sub_select: true,
      imageUrl: "",
      show_dialog_parent_visible: false,
      show_dialog_sub_visible: false,
      tree_data: JSON.parse(JSON.stringify(data)),
      tree_data_sub: []
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    append(data, label) {
      const newChild = { id: id++, label: label, children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    addNodeBtn(type, data) {
      if (type == 1) {
        this.show_dialog_parent_visible = true;
      } else if (type == 2) {
        this.show_sub_select = true;
        this.show_dialog_sub_visible = true;
      } else if (type == 3) {
        this.tree_data_sub = data;
        this.show_sub_select = false;
        this.show_dialog_sub_visible = true;
      }
    },
    dialogBtn(type, tree_data = this.tree_data) {
      if (type == 1) {
        this.show_dialog_parent_visible = false;
      } else if (type == 2) {
        // 确定
        tree_data.push({
          id: id++,
          label: this.form.parent_name,
          children: []
        });
        this.show_dialog_parent_visible = false;
      } else if (type == 3) {
        this.show_dialog_sub_visible = false;
      } else if (type == 4) {
        console.log(this.form.region);
        if (this.show_sub_select) {
          if (this.form.region != "" && this.form.sub_name != "") {
            tree_data.map(item => {
              if (item.id == this.form.region) {
                item.children.push({
                  id: id++,
                  show: true,
                  label: this.form.sub_name,
                  img: "",
                  children: []
                });
              }
            });
          }
        } else {
          if (this.form.sub_name != "") {
            this.append(this.tree_data_sub, this.form.sub_name);
          }
        }
        this.show_dialog_sub_visible = false;
      }
    }
  }
};
</script>

<style lang="scss" >
.pages {
  padding: 10px 20px;
  background: #ffffff;
}
.m0 {
  margin: 0;
}
.page-container {
  .left {
    width: 264px;
    height: 833px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    .item {
      text-align: center;
      height: 60px;
      line-height: 60px;
      width: 50%;
    }
  }
  .right {
    flex: 1;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
