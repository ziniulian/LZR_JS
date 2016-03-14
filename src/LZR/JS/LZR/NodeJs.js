/*************************************************
作者：子牛连
类名：NodeJs
说明：
创建日期：11-三月-2016 13:43:01
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.NodeJs");
LZR.NodeJs = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.prototype.className_ = "LZR.NodeJs";
LZR.NodeJs.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs");

// 构造器
LZR.NodeJs.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.NodeJs.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};