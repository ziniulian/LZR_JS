/*************************************************
作者：子牛连
类名：File
说明：文件处理工具
创建日期：17-二月-2016 10:20:18
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs.Util"
], "LZR.NodeJs.Util.File");
LZR.NodeJs.Util.File = function (obj) {
	// Nodejs的文件模块
	this.fs = LZR.getSingleton (null, null, "fs");	/*as:Object*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.Util.File.prototype.className_ = "LZR.NodeJs.Util.File";
LZR.NodeJs.Util.File.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.Util.File");

// 构造器
LZR.NodeJs.Util.File.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 判断路径是否存在
LZR.NodeJs.Util.File.prototype.exists = function (path/*as:string*/, callback/*as:fun*/) {
	this.fs.stat(path, function(err, stat) {
		if(err === null) {
			if(stat.isDirectory()) {
				// console.log('文件夹存在');
				callback (2);
			} else if(stat.isFile()) {
				// console.log('文件存在');
				callback (1);
			} else {
				// console.log('路径存在，但既不是文件，也不是文件夹');
				// //输出路径对象信息
				// console.log(stat);
				callback (0);
			}
		} else if(err.code == 'ENOENT') {
			// console.log(err.name);
			// console.log('路径不存在');
			callback (0);
		} else {
			// console.log('错误：' + err);
			callback (0);
		}
	});
};

// 读取文件内容
LZR.NodeJs.Util.File.prototype.readFile = function (filename/*as:string*/, options/*as:string*/, callback/*as:fun*/) {
	this.fs.readFile (filename, options, callback);
};