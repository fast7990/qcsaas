/**
 * created by niujiahao on 2018/5/13
 */
/**
 * 首字母变大写，公共过滤器  alice →→→→→→→ Alice
 * @param {*value} value
 */

let capitalize = value => {
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * 格式化时间
 */
let formatTime = (value, format) => {
	if (value == 0 || value == "") {
		return "";
	}
	value = Number(value);
	if (isNaN(value)) {
		return "";
	}
	var _format = function(number) {
		return (number < 10 ? ('0' + number) : number);
	};
	var value1 = value.length > 10 ? value : value * 1000;
	var weekday_list = ['日', '一', '二', '三', '四', '五', '六'];
	var d = new Date(value1);
	var year = _format(d.getFullYear());
	var month = _format(d.getMonth() + 1);
	var day = _format(d.getDate());
	var hour = _format(d.getHours());
	var minutes = _format(d.getMinutes());
	var seconds = _format(d.getSeconds());
	var weekday = d.getDay();
	if (format == "YYYY-MM-DD") {
		return year + '-' + month + '-' + day;
	} else if (format == "MM-DD") {
		return month + '-' + day;
	} else if (format == "YYYY-MM-DD HH:MM:SS") {
		return year + '-' + month + '-' + day + '  ' + hour + ':' + minutes + ':' + seconds;
	} else if (format == "HH:MM:SS") {
		return hour + ':' + minutes + ':' + seconds;
	} else if (format == "HH:MM") {
		return hour + ':' + minutes;
	} else if (format == "YYYY/MM/DD weekday") {
		return year + '/' + month + '/' + day + '  ' + '星期' + weekday_list[weekday];
	} else if (format == "YYYY-MM-DD HH:MM") {
		return year + '-' + month + '-' + day + '  ' + hour + ':' + minutes;
	} else if (format == "YYYY-MM") {
		return year + '-' + month;
	} else {
		return year + '-' + month + '-' + day;
	}
}

/**
 * 格式化时间差天数
 */
let rangHadelDay = value => {
	if (value == 0 || value == "") {
		return "";
	}
	value = Number(value);
	if (isNaN(value)) {
		return "";
	}
	var startTime = new Date().getTime(); //开始时间 
	var endTime = value.length > 10 ? value : value * 1000; //结束时间
	var date3 = endTime - startTime //时间差的毫秒数 
	var days = Math.floor(date3 / (24 * 3600 * 1000));
	return days
}

/**
 * 格式化商品价格(分)
 */
let formatPrice = (value, type) => {
	//type 1，左半部分价格2，右半部分价格
	if (isNaN(value)) {
		return 0;
	}
	const f = (Math.round(value * 100) / 100 / 100).toFixed(2);
	const s = f.toString().split(".");
	if (type == 1) {
		return s[0].toString()
	} else if (type == 2) {
		return s[1].toString()
	} else if (type == 3) {
		let price = s.join(".");
		if (Number(price) > 10000) {
			return parseInt(price / 10000) + 'w'
		} else {
			return s.join(".")
		}

	} else {
		return s.join(".")
	}
}

/**
 * 截取标题加省略号
 */
let ellipsText = (text, num) => {
	if (text) {
		if (text.length > num) {
			return text.substring(0, num) + '...';
		} else {
			return text;
		}
	} else {
		return text
	}
}

let ellipsMoblie = (text, num) => {
	if (text) {
		if (text.length > num) {
			num = num > 1 ? num : 1;
			return text.substring(0, num) + '****' + text.substring(text.length - num, text.length);
		} else {
			return text.substring(0, 3) + '****' + text.substring(text.length - 3, text.length);
		}
	} else {
		return text
	}
}

/**
 * 浏览量
 */
let computerLook = (num) => {
	if (!isNaN(num)) {
		num = Number(num);
		if (num > 10000) {
			num = (num / 10000).toFixed(2);
			return num + 'w';
		} else {
			return num;
		}
	} else {
		return 0;
	}
}
let escape2Html = (str) => {
	if (!str || str.length == 0) {
		return '';
	}
	var arrEntities = {
		lt: '<',
		gt: '>',
		nbsp: ' ',
		'↵': ' ',
		amp: '&',
		quot: '"'
	};
	return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
		return arrEntities[t];
	});
}
let escape2HtmlImg = (str) => {
	if (!str || str.length == 0) {
		return '';
	}
	return str.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ');
}

let orderStatus = (type) => {
	let str = "";
	//	：1下单待支付，2支付完成待发货，3已发货待收货，4已收货，5已取消
	switch (Number(type)) {
		case 1:
			str = "待支付";
			break;
		case 2:
			str = "待发货";
			break;
		case 3:
			str = "待收货";
			break;
		case 4:
			str = "已完成";
			break;
		case 5:
			str = "已取消";
			break;
		case 6:
			str = "申请售后";
			break;
		default:
			break;

	}
	return str;
}

/*
 * @param {Array} list 需要排序的数组
 * @param {String} property 目标字段
 * @description 根据数组中的某一属性升序排序
 */
let sortASC = (list, property) => {
	let str = list[0][property]
	let pattern = new RegExp("[\u4E00-\u9FA5]+");
	let pattern2 = new RegExp("[A-Za-z]+");
	if (pattern.test(str) || pattern2.test(str)) {
		list.sort(function(item1, item2) {
			return item1[property].localeCompare(item2[property], "zh-CN");
		});
	}
	let pattern3 = new RegExp("[0-9]+");
	if (pattern3.test(str)) {
		list.sort(function(a, b) {
			let value1 = a[property];
			let value2 = b[property];
			return value1 - value2;
		});
	}
}

/*
 * @param {Function} cb 上传成功回调函数,返回上传结果
 * @param {String} fileType 文件类型,仅支付宝小程序必填,image/video/audio
 * @description 上传文件
 */
let updataFile = (fileType, cb) => {
	if (typeof(fileType) == 'function') {
		cb = fileType
		fileType = 'image'
	}
	uni.chooseImage({
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album'], //从相册选择
		success: (chooseImageRes) => {
			uni.uploadFile({
				url: 'http://huayuanduobao.test01.qcw100.com/rest/2.0/file/file/upload',
				filePath: chooseImageRes.tempFilePaths[0],
				name: 'file',
				fileType,
				success: (res) => {
					let data = ''
					if (res.data) {
						data = JSON.parse(res.data)
					}
					cb(data);
				},
				fail: () => {
					console.log('调用失败')
				}
			});
		}
	});
}

export {
	capitalize,
	formatTime,
	formatPrice,
	ellipsText,
	ellipsMoblie,
	rangHadelDay,
	computerLook,
	escape2Html,
	escape2HtmlImg,
	orderStatus,
	sortASC,
	updataFile
}
