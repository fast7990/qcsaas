

### get请求 正常写法 
```
this.$http.get('aid/region',{pid:0}).
then(function (response) {
	//这里只会在接口是成功状态返回
}).catch(function (error) {
	//这里只会在接口是失败状态返回，不需要去处理错误提示
	console.log(error);
});
```

### post请求 async写法 
```
async request(){
	let data = await this.$http.post('aid/region',{pid:0});
	console.log(data);
}
```

### 其他功能配置项
```
let data = await this.$http.post(
	'http://www.aaa.com/aid/region', //可以直接放链接(将不启用全局定义域名)
	{
		pid:0
	}, 
	{
		isPrompt: true,//（默认 true 说明：本接口抛出的错误是否提示）
		load: true,//（默认 true 说明：本接口是否提示加载动画）
		header: { //默认 无 说明：请求头
			'Content-Type': 'application/json'
		},
		isFactory: true //（默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数将失去作用）
	}
);
```

### 本地服务器图片上传（支持多张上传）
```
this.$http.urlImgUpload('flie/upload',{
	name:"后台接受文件key名称", //默认 file
	count:"最大选择数",//默认 9
	sizeType:"选择压缩图原图，默认两个都选",//默认 ['original', 'compressed']
	sourceType:"选择相机拍照或相册上传 默认两个都选",//默认 ['album','camera']
	data:"而外参数" //可不填,
	onEachUpdate: res => {
		console.log("单张上传成功返回：",res);
	},
	onProgressUpdate: res => {
		console.log("上传进度返回：",res);
	}
},{
	isPrompt: true,//（默认 true 说明：本接口抛出的错误是否提示）
	load: true,//（默认 true 说明：本接口是否提示加载动画）
	header: { //默认 无 说明：请求头
		'Content-Type': 'application/json'
	},
	isFactory: true, //（默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数奖失去作用）
	maxSize: 300000 //（默认 无 说明：上传的文件最大字节数限制，默认不限制）
}).then(res => {
	console.log("全部上传完返回结果：",res);
});
```
### 本地服务器文件上传（支持多张上传）
```
this.$http.urlFileUpload("flie/upload",{
		files:[], // 必填 临时文件路径
		data:"向服务器传递的参数", //可不填
		name:"后台接受文件key名称", //默认 file
		onEachUpdate: res => {
			console.log("单张上传成功返回：",res);
		},
		onProgressUpdate: res => {
			console.log("上传进度返回：",res);
		}
	},
	{
		isPrompt: true,//（默认 true 说明：本接口抛出的错误是否提示）
		load: true,//（默认 true 说明：本接口是否提示加载动画）
		header: { //默认 无 说明：请求头
			'Content-Type': 'application/json'
		},
		isFactory: true, //（默认 true 说明：本接口是否调用公共的数据处理方法，设置false后isPrompt参数奖失去作用）
		maxSize: 300000 //（默认 无 说明：上传的文件最大字节数限制，默认不限制）
	}).then(res => {
		console.log("全部上传完返回结果：",res);
	});
```

### 七牛云图片上传（支持多张上传）
```
this.$http.qnImgUpload({
		count:"最大选择数", // 默认 9
		sizeType:"选择压缩图原图，默认两个都选", // 默认 ['original', 'compressed']
		sourceType:"选择相机拍照或相册上传 默认两个都选", // 默认 ['album','camera']
		onEachUpdate: res => {
			console.log("单张上传成功返回：",res);
		},
		onProgressUpdate: res => {
			console.log("上传进度返回：",res);
		}
	},
	{
		load: true, //（默认 true 说明：本接口是否提示加载动画）
		maxSize: 300000 //（默认 无 说明：上传的文件最大字节数限制，默认不限制）
	}).then(res => {
		console.log("全部上传完返回结果：",res);
	});
```

### 七牛云文件上传（支持多张上传）
```
this.$http.qnFileUpload(
	{
		files:[], // 必填 临时文件路径
		onEachUpdate: res => {
			console.log("单张上传成功返回：",res);
		},
		onProgressUpdate: res => {
			console.log("上传进度返回：",res);
		}
	},
	{
		load: true, //（默认 true 说明：本接口是否提示加载动画）
		maxSize: 300000 //（默认 无 说明：上传的文件最大字节数限制，默认不限制）
	}).then(res => {
		console.log("全部上传完返回结果：",res);
	});
```
### jsonp 跨域请求（只支持H5）
```
let data = await this.$http.jsonp('http://www.aaa.com/aid/region',{pid:0});
```
