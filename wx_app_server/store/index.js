import Vue from 'vue';
import Vuex from 'vuex';
import initdata from './modules/initdata';
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		initdata,
	}
});
