/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：17-二月-2016 10:19:15
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs"
], "LZR.NodeJs.Util");
LZR.NodeJs.Util = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
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
	}
};