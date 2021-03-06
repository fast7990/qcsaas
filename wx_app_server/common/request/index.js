import store from '../../store/index.js';
import request from "./request";
// 全局配置的请求域名
let baseUrl = store.state.initdata.apihost;
//可以new多个request来支持多个域名请求
let http = new request({
	//接口请求地址
	baseUrl: baseUrl,
	//服务器本地上传文件地址
	fileUrl: baseUrl,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
	},
	//以下是默认值可不写
	//是否提示--默认提示
	isPrompt: true,
	//是否显示请求动画
	load: true,
	//是否使用处理数据模板
	isFactory: true
});


//当前接口请求数
let requestNum = 0;
//请求开始拦截器
http.requestStart = function(options) {
	if (options.load) {
		if (requestNum <= 0) {
			//打开加载动画
			mpvue.showLoading({
				title: '加载中',
				mask: true
			});
		}
		requestNum += 1;
	}
	// 图片上传大小限制
	if (options.method == "FILE" && options.maxSize) {
		// 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
		maxSize = options.maxSize;
		for (let item of options.files) {
			if (item.size > maxSize) {
				setTimeout(() => {
					mpvue.showToast({
						title: "图片过大，请重新上传",
						icon: "none"
					});
				}, 500);
				return false;
			}
		}
	}
	//请求前加入token
	options.header['token'] = "";
	return options;
}
//请求结束
http.requestEnd = function(options, resolve) {
	//判断当前接口是否需要加载动画
	if (options.load) {
		requestNum = requestNum - 1;
		if (requestNum <= 0) {
			mpvue.hideLoading();
		}
	}
	if (resolve.errMsg && resolve.statusCode && resolve.statusCode > 300) {
		setTimeout(() => {
			mpvue.showToast({
				title: "网络错误，请检查一下网络",
				icon: "none"
			});
		}, 500);
	}
}
//登录弹窗次数
let loginPopupNum = 0;
//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
http.dataFactory = function(res) {
	console.log("接口请求数据", {
		httpUrl: res.httpUrl,
		resolve: res.response,
		header: res.header,
		data: res.data,
		method: res.method,
	});
	// 判断接口请求是否成功
	if (res.response.statusCode && res.response.statusCode == 200) {
		let httpData = res.response.data;
		/*********以下只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
		//判断数据是否请求成功
		if (!httpData.error_code) {
			// 返回正确的结果(then接受数据)
			res.resolve(httpData);
		} else if (httpData.error_code == "113004" || httpData.error_code == "1001") { //未登录或登录已失效
			if (loginPopupNum <= 0) {
				loginPopupNum++;
				mpvue.showModal({
					title: '温馨提示',
					content: '此时此刻需要您登录喔~',
					confirmText: "去登录",
					cancelText: "再逛会",
					success: res2 => {
						loginPopupNum--;
						if (res2.confirm) {
							mpvue.navigateTo({
								url: "'/pages/login/login"
							});
						}
					}
				});
			}
			// 返回错误的结果(catch接受数据)
			res.reject(res.response);
		} else { //其他错误提示
			if (res.isPrompt) { //设置可以提示的时候
				setTimeout(function() {
					mpvue.showToast({
						title: httpData.error_msg, //提示后台接口抛出的错误信息
						icon: "none",
						duration: 3000
					});
				}, 500);
			}
			// 返回错误的结果(catch接受数据)
			res.reject(res.response);
		}

		/*********以上只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/

	} else {
		// 返回错误的结果(catch接受数据)
		res.reject(res.response);
	}
};
export default http;
