/*
 * @Author: [hsp]
 * @Date: 2020-06-28 15:09:40
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-20 16:03:42
 * @Description: 
 */
const setTemp = require('../util/setTemp'); //模板处理内容

let tempfun = (options) => {
  let temp = setTemp(options);
  let result = {
    template: `<template>
        <div>
        ${temp.view}
        </div>
      </template>
      <script>
      ${temp.components}
      export default {
        data() {
          return {
            apps_body: [],
            openList: [],
            openListValue: []
          };
        },
      components: {${temp.components_name}},
      onPullDownRefresh() {
        setTimeout(() => {
          //todo
          mpvue.stopPullDownRefresh();
        }, 500);
      },
      onShow() { },
      onLoad() { },
      created() {
        this.getList();
      },
      methods: {
        getList() { },
        onClick() { }
      }
    };
    </script>
    <style scoped></style>`
  };
  return result;
}
module.exports = tempfun;