/*************************************************
作者：子牛连
类名：NodeJs
说明：
创建日期：14-一月-2016 11:02:50
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
	}
};