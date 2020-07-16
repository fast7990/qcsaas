const initdata = {
	state: {
		hasLogin: true,
		openid: null,
		userInfo: {}, //用户信息
		checkedVersion: false,
		currentAppVersion: '1.2.5', //版本号
		baseurl: "http://h5.zhuyu.huayuanshangcheng.com",
		baseimgurl: "http://h5.zhuyu.huayuanshangcheng.com/rest/2.0/",
		// apihost: "http://zhuyu.huayuanshangcheng.com/rest/2.0",
		apihost: "http://huayuanduobao.test01.qcw100.com/rest/2.0",
		CustomBar: 0,
		nullimg: {
			bannerimg: "/static/img/banner_1.png",
			avatar: "/static/img/avatar.png",
			cellimg: "/static/img/cell-img.png"
		}
	},
	mutations: {
		logout(state, flag) {
			state.hasLogin = false;
			state.access_token = "";
			state.userInfo = {};
			wx.setStorageSync('access_token', '');
			wx.removeStorageSync('userInfo');
			wx.removeStorageSync('createOrderInfo');
			wx.removeStorageSync('selectAddressInfo');
			wx.removeStorageSync('exchange_data_list');
		}
	},
	actions: {

	},
	getters: {
		getUserInfo: (state) => () => {
		},
	}
}

export default initdata
