/*
 * @Author: [hsp]
 * @Date: 2020-06-28 15:09:40
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-16 18:35:50
 * @Description: 
 */
let temp = () => {
    let text = {
        template: `<template>
        <div>
        123
          <basecompLunbotu></basecompLunbotu>
        </div>
      </template>
      <script>
      import { openModules } from "@/config/index";
      import basecompLunbotu from "@/components/basecomp_lunbotu/basecomp_lunbotu.vue";
      export default {
        data() {
          return {
            apps_body: [],
            openList: [],
            openListValue: []
          };
        },
        components: { basecompLunbotu },
        onPullDownRefresh() {
          setTimeout(() => {
            //todo
            mpvue.stopPullDownRefresh();
          }, 500);
        },
        onShow() {},
        onLoad() {},
        created() {
          this.getList();
        },
        methods: {
          getList() {},
          onClick() {}
        }
      };
      </script>
      <style scoped></style>`
    };
    return text;
}
module.exports = temp;