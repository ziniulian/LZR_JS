/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：11-三月-2016 13:48:17
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs"
], "LZR.NodeJs.Util");
LZR.NodeJs.Util = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.Util.prototype.className_ = "LZR.NodeJs.Util";
LZR.NodeJs.Util.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.Util");

// 构造器
LZR.NodeJs.Util.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.NodeJs.Util.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
