/*************************************************
作者：子牛连
类名：ProSrv
说明：专项服务
创建日期：27-七月-2016 12:30:04
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
LZR.NodeJs.ProSrv.prototype.init_.lzrClass_ = LZR.NodeJs.ProSrv;

// 对构造参数的特殊处理
LZR.NodeJs.ProSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.NodeJs.ProSrv.prototype.hdObj_.lzrClass_ = LZR.NodeJs.ProSrv;