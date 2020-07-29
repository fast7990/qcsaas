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
                <span style="font-size: 12px;">{{ data.label }}</span>
                <span v-if="data.children">
                  <el-button type="text" size="mini" @click="() => addNodeBtn(3,data)">
                    <i class="el-icon-edit-outline" style="font-size:16px;"></i>
                  </el-button>
                  <el-button type="text" size="mini" @click="() => remove(data)">
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
              <p class="el-checkbox__labels">更加适合三级商品分类及分类数量较多的情况</p>
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
              <p class="el-checkbox__labels">更加适合一二级商品分类及分类数量较少的情况</p>
            </el-col>
          </el-row>
        </div>
        <div style="width:100%;text-align: center;margin-top: 100px;">
          <el-button type="primary">保存</el-button>
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
                v-for="(item,index) in tree_data"
                :key="index"
                :label="item.label"
                :value="item.id"
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
      <!-- 修改 -->
      <el-dialog title="修改地址" :visible.sync="flag_dialog_visible" width="30%">
        <el-form>
          <el-form-item label="活动名称" class="flex">
            <el-input v-model="form.modify" autocomplete="off" placeholder="请输入活动名称"></el-input>
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
          <el-button @click="modifys(1)">取 消</el-button>
          <el-button type="primary" @click="modifys(2)">确 认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getProductCategoryList,
  getProductCategoryCreate,
  getProductCategoryUpdate,
  getProductCategoryDelete,
} from "@/api/product";
let id = 1000;
export default {
  name: "import",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      checked_style1: false,
      checked_style2: false,
      form: {
        parent_name: "",
        region: "",
        sub_name: "",
        modify: "", // 修改
      },
      show_sub_select: true,
      imageUrl: "",
      show_dialog_parent_visible: false,
      show_dialog_sub_visible: false,
      flag_dialog_visible: false,
      tree_data: [],
      tree_data_sub: [],
    };
  },
  created() {
    this.getProductCategoryLists();
  },
  methods: {
    async getProductCategoryLists() {
      var token = document.cookie.split(";")[0].split("=")[1];
      var data = {
        access_token: token,
      };
      var res = await getProductCategoryList(data);
      for (var k in res.response_data.items) {
        var children = [];
        if (res.response_data.items[k].childes) {
          for (var n in res.response_data.items[k].childes) {
            var newChild = JSON.parse(
              JSON.stringify(res.response_data.items[k].childes[n]).replace(
                /name/g,
                "label"
              )
            );
            children.push(newChild);
          }
          res.response_data.items[k].childes = children;
        }
        var newObj = JSON.parse(
          JSON.stringify(res.response_data.items[k])
            .replace(/name/g, "label")
            .replace(/childes/g, "children")
        );
        this.tree_data.push(newObj);
      }
    },
    async getProductCategoryCreates(type) {
      var token = document.cookie.split(";")[0].split("=")[1];
      var name = "";
      if (type == 0) {
        name = this.form.parent_name;
      } else {
        name = this.form.sub_name;
      }
      var data = {
        access_token: token,
        name: name,
        parent_id: type,
      };
      var res = await getProductCategoryCreate(data);
      this.tree_data = [];
      this.getProductCategoryLists();
    },
    async getProductCategoryUpdates() {
      var token = document.cookie.split(";")[0].split("=")[1];
      var data = {
        access_token: token,
        id: this.tree_data_sub.id,
        name: this.form.modify,
      };
      var res = await getProductCategoryUpdate(data);
      this.tree_data = [];
      this.getProductCategoryLists();
    },
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
    async remove(mas) {
      var token = document.cookie.split(";")[0].split("=")[1];
      var data = {
        access_token: token,
        id: mas.id,
      };
      var res = await getProductCategoryDelete(data);
      this.tree_data = [];
      this.getProductCategoryLists();
    },
    addNodeBtn(type, data) {
      if (type == 1) {
        this.show_dialog_parent_visible = true;
      } else if (type == 2) {
        this.show_sub_select = true;
        this.show_dialog_sub_visible = true;
      } else if (type == 3) {
        this.tree_data_sub = data;
        this.flag_select = false;
        this.flag_dialog_visible = true;
      }
    },
    dialogBtn(type, tree_data = this.tree_data) {
      if (type == 1) {
        this.show_dialog_parent_visible = false;
      } else if (type == 2) {
        // 确定
        this.getProductCategoryCreates(0);
        this.show_dialog_parent_visible = false;
      } else if (type == 3) {
        this.show_dialog_sub_visible = false;
      } else if (type == 4) {
        this.getProductCategoryCreates(this.form.region);
        this.show_dialog_sub_visible = false;
      }
    },
    modifys(type) {
      if (type == 1) {
        this.flag_dialog_visible = false;
      } else if (type == 2) {
        this.getProductCategoryUpdates();
        this.flag_dialog_visible = false;
      }
    },
  },
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
.el-checkbox__labels {
  width: 200px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
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
