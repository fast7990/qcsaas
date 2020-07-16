import Vue from 'vue'
import App from './App'
import $http from '../common/request/index.js';
import * as filter from '../common/js/filter.js'
import store from '../store'
Vue.config.productionTip = false
Vue.prototype.$http = $http;
Vue.prototype.$filter = filter;
App.mpType = 'app'
// 全局使用自定义过滤器
Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key]);
});
const app = new Vue({
    store,
    ...App
})
app.$mount()
