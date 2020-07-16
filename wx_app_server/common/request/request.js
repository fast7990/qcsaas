export default class request {
	constructor(options) {
		//请求公共地址
		this.baseUrl = options.baseUrl || "";
		//公共文件上传请求地址
		this.fileUrl = options.fileUrl || "";
		//默认请求头
		this.header = options.header || {};
		//默认配置
		this.config = {
			isPrompt: options.isPrompt === false ? false : true, //（默认 true 说明：本接口抛出的错误是否提示）
			load: options.load === false ? false : true, //（默认 true 说明：本接口是否提示加载动画）
			isFactory: options.isFactory === false ? false : true, //（默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数将失去作用）
			loadMore: options.loadMore === false ? false : true
		};
	}

	// 获取默认信息
	getDefault(data, options = {}) {
		//判断url是不是链接
		let urlType = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/.test(data.url);
		let config = Object.assign({}, this.config, options, data);
		if (data.method == "FILE") {
			config.url = urlType ? data.url : this.fileUrl + data.url;
		} else {
			config.url = urlType ? data.url : this.baseUrl + data.url;
		}
		//请求头
		if (options.header) {
			config.header = Object.assign({}, this.header, options.header);
		} else if (data.header) {
			config.header = Object.assign({}, this.header, data.header);
		} else {
			config.header = this.header;
		}
		return config;
	}

	//post请求
	post(url = '', data = {}, options = {}) {
		let object = {
			method: "POST",
			data: data,
			url: url,
		}
		console.log(object,'====1')
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				const element = options[key];
				object[key] = element;
			}
		}
		console.log(object,'====2')
		return this.request(object);
	}

	//get请求
	get(url = '', data = {}, options = {}) {
		let object = {
			method: "GET",
			data: data,
			url: url,
		}
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				const element = options[key];
				object[key] = element;
			}
		}
		return this.request(object);
	}

	//put请求
	put(url = '', data = {}, options = {}) {
		let object = {
			method: "PUT",
			data: data,
			url: url,
		}
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				const element = options[key];
				object[key] = element;
			}
		}
		return this.request(object);
	}

	//delete请求
	delete(url = '', data = {}, options = {}) {
		let object = {
			method: "DELETE",
			data: data,
			url: url,
		}
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				const element = options[key];
				object[key] = element;
			}
		}
		return this.request(object);
	}

	//接口请求方法
	request(data) {
		
		return new Promise((resolve, reject) => {
			if (!data.url) {
				console.log("request缺失数据url");
				reject({
					errMsg: "缺失数据url",
					statusCode: 0
				});
				return;
			}
			if (!data.data.access_token || typeof data.data.access_token === "undefined" || typeof data.data.access_token ===
				"null") {
				data.data.access_token = mpvue.getStorageSync("access_token") ? mpvue.getStorageSync("access_token") : ''
			}
			let requestInfo = this.getDefault(data);
			//请求前回调
			if (this.requestStart) {
				let requestStart = this.requestStart(requestInfo);
				if (typeof requestStart == "object") {
					requestInfo.data = requestStart.data;
					requestInfo.header = requestStart.header;
					requestInfo.isPrompt = requestStart.isPrompt;
					requestInfo.load = requestStart.load;
					requestInfo.isFactory = requestStart.isFactory;
				} else {
					//请求完成回调
					_this.requestEnd && _this.requestEnd(requestInfo, {
						errMsg: "请求开始拦截器未通过",
						statusCode: 0
					});
					reject({
						errMsg: "请求开始拦截器未通过",
						statusCode: 0
					});
					return;
				}
			}
			let requestData = {
				url: requestInfo.url,
				header: requestInfo.header, //加入请求头
				success: (res) => {
					//请求完成回调
					this.requestEnd && this.requestEnd(requestInfo, res);
					//是否用外部的数据处理方法
					if (requestInfo.isFactory && this.dataFactory) {
						//数据处理
						let object = {
							response: res,
							resolve: resolve,
							reject: reject
						}
						for (const key in requestInfo) {
							if (requestInfo.hasOwnProperty(key)) {
								const element = requestInfo[key];
								object[key] = element
							}
						}
						this.dataFactory(object);
					} else {
						resolve(res);
					}
				},
				fail: (err) => {
					console.log("err");
					//请求完成回调
					this.requestEnd && this.requestEnd(requestInfo, err);
					reject(err);
				}
			};
			//请求类型
			if (requestInfo.method) {
				requestData.method = requestInfo.method;
			}
			if (requestInfo.data) {
				requestData.data = requestInfo.data;
			}
			if (requestInfo.dataType) {
				requestData.dataType = requestInfo.dataType;
			}
			if (requestInfo.responseType) {
				requestData.responseType = requestInfo.responseType;
			}
			mpvue.request(requestData);
		});
	}
}
