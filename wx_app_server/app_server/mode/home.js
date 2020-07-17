/*
 * @Author: [hsp]
 * @Date: 2020-06-28 15:09:40
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-17 18:17:53
 * @Description: 
 */
let tempfun = (options) => {
  let temp = ''
  for (let i = 0; i < options.length; i++) {
    temp += '<' + options.name.replace('_', '') + ' />'
  }
  let text = {
    template: `<template>
        <div>
        ${temp}
        </div>
      </template>
      <script>
      ${
      'import ' + options.name.replace('_', '') + ' from ' + '"@/components/' + options.name + '/' + options.name + '.vue";'
      }
  export default {
    data() {
      return {
        apps_body: [],
        openList: [],
        openListValue: []
      };
    },
    components: { ${options.name.replace('_', '')} },
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
      </script >
  <style scoped></style>`
  };
  return text;
}
module.exports = tempfun;