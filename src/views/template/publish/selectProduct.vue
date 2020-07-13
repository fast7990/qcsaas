<!--
 * @Author: [hsp]
 * @Date: 2020-07-10 14:17:14
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-10 15:55:00
 * @Description: 
--> 
<template>
  <div class="select-product">
    <el-dialog title="选择商品" width="70%" :visible.sync="dialogBox" :close-on-click-modal="false">
      <div style="height:500px;">
        <el-form ref="label_form" :model="label_form">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="商品分类:" class="flex">
                <el-cascader v-model="label_form.class_id" :options="product_class"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="商品标签:" class="flex">
                <el-select v-model="label_form.label_id" placeholder="请选择">
                  <el-option
                    v-for="item in order_type_list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="商品名称:" class="flex">
                <el-input
                  v-model="label_form.name"
                  type="text"
                  placeholder="请输入商品名称"
                  class="input-box"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            height="380"
            style="width: 100%;matgin-top:10px;"
            :fit="true"
            :header-cell-style="{ background: '#f2f2f2' }"
            @selection-change="handleSelectionTableChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品" width="350">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="8">
                    <img
                      src="../../../assets/swiper_style_img/a.png"
                      alt
                      srcset
                      style="width:80px;height:60px;"
                    />
                  </el-col>
                  <el-col :span="16">
                    <div
                      class="ellipsis2"
                    >暗杀事件搭讪的机会咯技术的健身卡的空间上的江哈斯的夸奖哈手机打开很快就撒低级哈萨克接电话卡时间肯定会卡就卡死的很快就很快就</div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="分类"></el-table-column>
            <el-table-column prop="address" label="标签"></el-table-column>
            <el-table-column prop="address" label="价格" width="130"></el-table-column>
            <el-table-column prop="address" label="库存" width="130"></el-table-column>
            <el-table-column prop="address" label="销量" width="130"></el-table-column>
          </el-table>
          <div style="margin-top: 20px;text-align:center;">
            <el-button type="primary" size="medium" @click="toggleSelection(1)">选择</el-button>
            <el-button size="medium" @click="toggleSelection(2)">取消</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show_dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogBox: false,
      label_form: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      product_class: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            },
            {
              value: "shejiyuanze",
              label: "设计原则"
            }
          ]
        },
        {
          value: "shejiyuanze",
          label: "设计原则"
        },
        ,
        {
          value: "shejiyuanze",
          label: "设计原则"
        }
      ],
      order_type_list: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ]
    };
  },
  methods: {
    handleSelectionTableChange() {
      // 表格多项选择
    },
    toggleSelection(type) {
      // 按钮操作
      if (type == 1) {
        this.changeSelectProduct();
        this.dialogBox = false;
      } else if (type == 2) {
        this.dialogBox = false;
      }
    },
    searchClick() {
      // 搜索
      console.log(this.label_form);
    },
    changeSelectProduct() {
      this.$emit("changeSelectProduct", 1);
    }
  }
};
</script>
<style lang="scss">
.select-product {
}
</style>