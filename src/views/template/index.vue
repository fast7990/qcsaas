<template>
  <div
    class="dashboard-container flex flex--align-items--center flex--justify-content--space-between"
  >
    <!-- 组件列表 -->
    <div class="components-list">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础组件" name="1">
          <ul class="components-item">
            <li
              v-for="(item, index) in baseComponentsList"
              :key="index"
              @click="addComponentsItem(item)"
            >
              <img :src="item.icon" alt style="width:42px;height:42px;" />
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="半格组件" name="2">
          <ul class="components-item">
            <li
              v-for="(item, index) in latticeComponentsList"
              :key="index"
              @click="addComponentsItem(item)"
            >
              <img :src="item.icon" alt style="width:42px;height:42px;" />
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="通用组件" name="3">
          <ul class="components-item">
            <li
              v-for="(item, index) in currencyComponentsList"
              :key="index"
              @click="addComponentsItem(item)"
            >
              <img :src="item.icon" alt style="width:42px;height:42px;" />
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 模板预览区 -->
    <div class="template-preview">
      <div class="template-box">
        <!-- 头部 -->
        <div class="template-header">
          <span />
          Free商城
          <img src="@/assets/icons/template/bar-btn.png" alt />
        </div>

        <!-- 动态生成内容部分 -->
        <div id="template" ref="template" class="template-body">
          <div class="component-item" @scroll="scrollevent">
            <component
              :is="item.app"
              v-for="(item,index) in apps_body"
              :id="'templateItem'+index"
              :key="index"
              :ref="'templateItem'+index"
              :data-name="item.name"
              :class="{'active': index === pitchOn}"
              :options="item.options"
              @onclick="onClick($event,index)"
            />
          </div>
          <!-- 浮动工具栏 -->
          <div v-show="show_cpt_tools" ref="cpt_tools" class="cpt_tools">
            <div class="bar flex flex--row flex--justify-content--center--align-items--center">
              <div class="el-icon-close" @click="delComponent" />
              <div class="el-icon-arrow-left" />
              <div class="el-icon-arrow-right" />
              <div class="el-icon-top" />
              <div class="el-icon-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件配置信息 -->
    <div class="components-setting">
      <component :is="edit_style" @editStyleOption="editStyleOption" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { option } from "runjs";
import { setStyleOptions } from "@/api/setcomp";
export default {
  name: "Templates",
  components: {},
  data() {
    return {
      component_scroll_top: 0,
      show_cpt_tools: false,
      activeNames: ["1", "2", "3"],
      baseComponentsList: [
        {
          id: 1,
          name: "basecomp_lunbotu",
          title: "轮播图",
          options: {},
          icon: require("../../assets/icons/template/lunbotu.png")
        },
        {
          id: 2,
          name: "basecomp_sousuolan",
          title: "搜索栏",
          options: {},
          icon: require("../../assets/icons/template/sousuolan.png")
        },
        {
          id: 3,
          name: "basecomp_zuhelianjie",
          title: "组合链接",
          options: {},
          icon: require("../../assets/icons/template/zuhelianjie.png")
        },
        {
          id: 4,
          name: "basecomp_youhuiquan",
          title: "优惠券",
          options: {},
          icon: require("../../assets/icons/template/youhuiquan.png")
        },
        {
          id: 5,
          name: "basecomp_xianshimiaosha",
          title: "限时秒杀",
          icon: require("../../assets/icons/template/xianshimiaosha.png")
        },
        {
          id: 6,
          name: "basecomp_duorenpintuan",
          title: "多人拼团",
          icon: require("../../assets/icons/template/duorenpintuan.png")
        },
        {
          id: 7,
          name: "basecomp_zhekouzhuanti",
          title: "折扣专题",
          icon: require("../../assets/icons/template/zhekouzhuanti.png")
        },
        {
          id: 8,
          name: "basecomp_haoyoukanjia",
          title: "好友砍价",
          icon: require("../../assets/icons/template/haoyoukanjia.png")
        }
      ],
      latticeComponentsList: [
        {
          id: 9,
          name: "currcomp_xianshimiaosha",
          title: "限时秒杀",
          options: {},
          icon: require("../../assets/icons/template/xianshimiaosha.png")
        },
        {
          id: 10,
          name: "currcomp_duorenpintuan",
          title: "多人拼团",
          options: {},
          icon: require("../../assets/icons/template/duorenpintuan.png")
        }
      ],
      currencyComponentsList: [
        {
          id: 11,
          name: "currcomp_shangpinliebiao",
          title: "商品列表",
          options: {},
          icon: require("../../assets/icons/template/shangpinliebiao.png")
        },
        {
          id: 12,
          name: "currcomp_shangpinfenye",
          title: "商品分页",
          options: {},
          icon: require("../../assets/icons/template/shangpinfenye.png")
        },
        {
          id: 13,
          name: "currcomp_tuwendaohang",
          title: "图文导航",
          options: {},
          icon: require("../../assets/icons/template/tuwendaohang.png")
        },
        {
          id: 14,
          name: "currcomp_wenben",
          title: "文本",
          options: {},
          icon: require("../../assets/icons/template/wenben.png")
        },
        {
          id: 15,
          name: "currcomp_fuwenben",
          title: "富文本",
          options: {},
          icon: require("../../assets/icons/template/fuwenben.png")
        },
        {
          id: 16,
          name: "currcomp_tupianguanggao",
          title: "图片广告",
          options: {},
          icon: require("../../assets/icons/template/tupianguanggao.png")
        }
      ],
      befor_element: {},
      edit_style: function() {},
      apps_body: [],
      pitchOn: null // 选中组件的索引
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 添加组件
    addComponentsItem(item) {
      if (item.name) {
        item.app = require(`../../xcx_components/${item.name}.vue`).default;
        if (item.app) {
          this.apps_body.push(item);
          this.pitchOn = this.apps_body.length - 1;
        }
        const edit_style = require(`./editstyle/${item.name}.vue`).default;
        this.edit_style = edit_style;
      }
    },
    scrollevent(e) {
      this.component_scroll_top = e.target.scrollTop;
      Object.assign(this.$refs.cpt_tools.style, {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      });
      this.show_cpt_tools = false;
    },

    // 右侧工具栏
    editStyleOption(options) {
      this.apps_body[this.pitchOn].options = options;
      console.log(this.apps_body[this.pitchOn].options);
      this.submitSetStyle();
    },

    // 点击组件
    onClick(e, i) {
      this.pitchOn = i;
      this.showTools(e, i);
      // console.log(e, i);
      // 切换右侧编辑区
      const self = this.$refs["templateItem" + this.pitchOn][0];
      const fileName = self.$attrs["data-name"];
      console.log(self, fileName);
      const edit_style = require(`./editstyle/${fileName}.vue`).default;
      this.edit_style = edit_style;
    },

    // 鼠标移动到生成的组件上显示浮动工具栏
    showTools(e, i) {
      this.show_cpt_tools = true;
      const offsetTop = this.$refs["templateItem" + i][0].$el.offsetTop;
      const offsetWidth = this.$refs["templateItem" + i][0].$el.offsetWidth;
      const offsetHeight = this.$refs["templateItem" + i][0].$el.offsetHeight;
      Object.assign(this.$refs.cpt_tools.style, {
        top: Number(offsetTop - this.component_scroll_top) + "px",
        left: 0 + "px",
        width: "100%",
        height: offsetHeight + "px"
      });
      this.apps_body[i].width = offsetWidth;
      this.apps_body[i].height = offsetHeight;
    },

    // 删除组件
    delComponent() {
      const self = document.getElementById("templateItem" + this.pitchOn);
      const parent = self.parentElement;
      parent.removeChild(self);
      this.show_cpt_tools = false;
    },
    submitSetStyle() {
      let resulit = this.apps_body;
      let select_arr = [];
      resulit.map(object => {
        let obj = {};
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (key != "app") {
              obj[key] = element;
            }
          }
        }
        select_arr.push(obj);
      });
      console.log(select_arr);
      setStyleOptions({ setdata: JSON.stringify(select_arr) })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/template.scss";
</style>
