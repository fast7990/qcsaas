/*
 * @Author: [hsp]
 * @Date: 2020-06-28 15:09:40
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-28 16:14:45
 * @Description: 
 */
let temp = () => {
    let text = {
        template: `<template>
<div>
    打开了
</div>
</template>

<script>
export default {
data() {
    return {
    motto: "Hello miniprograme"
    };
},

components: {},
mounted() {},
onPullDownRefresh() {
    setTimeout(() => {
    //todo
    wx.stopPullDownRefresh();
    }, 500);
},
methods: {},

created() {
    // let app = getApp()
}
};
</script>

<style scoped></style>`
    };
    return text;
}
module.exports = temp;