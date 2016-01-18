/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：14-一月-2016 11:02:50
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.Util");
LZR.Util = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Util.prototype.className_ = "LZR.Util";
LZR.Util.prototype.version_ = "1.0";

LZR.load(null, "LZR.Util");

// 构造器
LZR.Util.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};