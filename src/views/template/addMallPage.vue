<!--
 * @Author: [hsp]
 * @Date: 2020-07-21 14:19:52
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-21 16:10:42
 * @Description: 
--> 
<template>
  <div class="pages white-bg">
    <el-form class="from-page" ref="form" :model="form" label-width="120px">
      <!-- line -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="页面名称:">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="页面标题:">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label>
            <el-button type="primary" size="medium" @click="topBtnClick(1)">下一步</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="title">选择模板</div>
    <div class="select-temp">
      <div class="item">
        <div class="img">
          <img src="@/assets/images/right.png" alt />
        </div>
        <div class="check">
          <el-checkbox v-model="checked">空白页面</el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "product",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      checked: false,
      form: {
        name: "",
        title: "",
        tpl_id: ""
      }
    };
  },
  mounted() {},
  methods: {
    changeSortTable(e) {
      console.log(e);
    },
    handleClick(row) {
      console.log(row);
    },
    topBtnClick(type) {
      if (type == 1) {
        if (this.form.name == "") {
          this.$message("页面名称不能为空");
          return;
        }
        if (this.form.title == "") {
          this.$message("页面标题不能为空");
          return;
        }
        this.$http({
          url: "/mall/page/create",
          method: "post",
          data: {
            name: this.form.name, //	是	string	页面名称
            title: this.form.title, //	是	string	页面标题
            tpl_id: this.form.tpl_id //	否	int	模板ID(通过模板创建)
          }
        }).then(res => {
          if (res.status == 1) {
            this.$message.success("创建成功");
            let t = setTimeout(() => {
              this.$router.push({ path: "/template/template" });
              clearTimeout(t);
            }, 1500);
          }
          console.log(res);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pages {
  padding: 10px 20px;
  background: #ffffff;
}
.title {
  font-size: 20px;
  padding: 20px 0;
}
.from-page {
  background: #f6f6f6;
  padding-top: 20px;
}
.select-temp {
  .item {
    width: 250px;
    .img {
      width: 250px;
      height: 426px;
      background: inherit;
      background-color: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(242, 242, 242, 1);
      border-radius: 5px;
      -moz-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.349019607843137);
      -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.349019607843137);
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.349019607843137);
      font-family: "微软雅黑";
      font-weight: 400;
      font-style: normal;
      font-size: 18px;
    }
    .check {
      padding: 15px;
      text-align: center;
    }
  }
}
</style>
