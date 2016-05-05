/*************************************************
作者：子牛连
类名：ProSrv
说明：专项服务
创建日期：04-五月-2016 11:31:39
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs"
], "LZR.NodeJs.ProSrv");
LZR.NodeJs.ProSrv = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.ProSrv.prototype.className_ = "LZR.NodeJs.ProSrv";
LZR.NodeJs.ProSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.ProSrv");

// 构造器
LZR.NodeJs.ProSrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.NodeJs.ProSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
