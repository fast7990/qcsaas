/*
 * @Author: [hsp]
 * @Date: 2020-06-28 17:53:30
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-28 18:13:10
 * @Description: 
 */
var fs = require('fs'); //用来读取文件
class writeFileBuild {
    constructor(path) {
        this.path = path;
    }
    static async writeFile(str) {
        var w_data = new Buffer(str);
        /**
         * filename, 必选参数，文件名
         * data, 写入的数据，可以字符或一个Buffer对象
         * [options],flag,mode(权限),encoding
         * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
         */
        let result = await new Promise((resolve, reject) => {
            fs.writeFile(__dirname + this.path, w_data, { flag: 'w' }, function (err) {
                if (err) {
                    reject(err);
                    console.error(err);
                } else {
                    resolve(true);
                    console.log('写入成功');
                }
            });
        })
        return result;
    }
    static async buildapp() {
        const exec = require('child_process').exec;
        const cmdStr = 'npm run build';
        let result = await new Promise((resolve, reject) => {
            exec(cmdStr, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    console.log(err);
                    console.warn(new Date(), ' API文档编译命令执行失败');
                } else {
                    resolve(true);
                    console.log(stdout);
                    console.warn(new Date(), ' API文档编译命令执行成功');
                }
            });
        });
        return result;
    }
}
module.exports = writeFileBuild