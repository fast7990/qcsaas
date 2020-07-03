<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div class="flex">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="true"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
          @select="selectMenu"
          @open="handleOpen"
          @close="handleClose"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    // eslint-disable-next-line vue/return-in-computed-property
    selectMenu(index, path) {
      if (path.length == 1) {
        this.$store.dispatch("app/toggleIsOpenSideBar", false);
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    handleOpen(index, path) {
      this.$store.dispatch("app/toggleIsOpenSideBar", true);
    },
    // eslint-disable-next-line vue/return-in-computed-property
    handleClose(index, path) {
      this.$store.dispatch("app/toggleIsOpenSideBar", false);
    }
  }
};
</script>
