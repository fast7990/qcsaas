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
              <span>{{item.title}}</span>
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
              <span>{{item.title}}</span>
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
              <span>{{item.title}}</span>
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
              :key="index"
              :options="item.options"
              :ref="item.name+index"
              @onclick="onClick($event,index)"
            />
          </div>
          <!-- 浮动工具栏 -->
          <div ref="cpt_tools" v-show="show_cpt_tools" class="cpt_tools">
            <div class="bar flex flex--row flex--justify-content--center--align-items--center">
              <div class="el-icon-close"></div>
              <div class="el-icon-arrow-left"></div>
              <div class="el-icon-arrow-right"></div>
              <div class="el-icon-top"></div>
              <div class="el-icon-bottom"></div>
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
export default {
  name: "templates",
  components: {},
  data() {
    return {
      component_scroll_top: 0,
      show_cpt_tools: false,
      activeNames: ["1", "2"],
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
          name: "currcomp_shangpinliebiao",
          title: "限时秒杀",
          icon: require("../../assets/icons/template/xianshimiaosha.png")
        },
        {
          id: 10,
          name: "currcomp_shangpinliebiao",
          title: "多人拼团",
          icon: require("../../assets/icons/template/duorenpintuan.png")
        }
      ],
      currencyComponentsList: [
        {
          id: 11,
          name: "currcomp_shangpinliebiao",
          title: "商品列表",
          icon: require("../../assets/icons/template/shangpinliebiao.png")
        },
        {
          id: 12,
          name: "currcomp_shangpinfenye",
          title: "商品分页",
          icon: require("../../assets/icons/template/shangpinfenye.png")
        },
        {
          id: 13,
          name: "currcomp_tuwendaohang",
          title: "图文导航",
          icon: require("../../assets/icons/template/tuwendaohang.png")
        },
        {
          id: 14,
          name: "currcomp_wenben",
          title: "文本",
          icon: require("../../assets/icons/template/wenben.png")
        },
        {
          id: 15,
          name: "currcomp_fuwenben",
          title: "富文本",
          icon: require("../../assets/icons/template/fuwenben.png")
        },
        {
          id: 16,
          name: "currcomp_tupianguanggao",
          title: "图片广告",
          icon: require("../../assets/icons/template/tupianguanggao.png")
        }
      ],
      befor_element: {},
      edit_style: function() {},
      apps_body: []
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
        }
        let edit_style = require(`./editstyle/${item.name}.vue`).default;
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
      console.log(this.component_scroll_top);
    },
    editStyleOption(options) {
      // 右侧工具栏
      console.log(options, "右侧工具栏传递options");
      this.apps_body[0].options = options;
    },
    onClick(e, i) {
      this.showTools(e, i);
    },
    // 鼠标移动到生成的组件上显示浮动工具栏
    showTools(e, i) {
      console.log(e, "ii", i);
      const that = this;
      let tao_height = 0;
      this.show_cpt_tools = true;
      let offsetTop = this.$refs[this.apps_body[i].name + i][0].$el.offsetTop;
      let offsetWidth = this.$refs[this.apps_body[i].name + i][0].$el
        .offsetWidth;
      let offsetHeight = this.$refs[this.apps_body[i].name + i][0].$el
        .offsetHeight;
      console.log(offsetTop, offsetHeight);
      Object.assign(this.$refs.cpt_tools.style, {
        top: Number(offsetTop - this.component_scroll_top) + "px",
        left: 0,
        width: offsetWidth + "px",
        height: offsetHeight + "px"
      });
      this.apps_body[i].width = offsetWidth;
      this.apps_body[i].height = offsetHeight;
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
