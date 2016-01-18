/*************************************************
作者：子牛连
类名：Base
说明：基础
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.Base");
LZR.Base = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.prototype.className_ = "LZR.Base";
LZR.Base.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base");

// 构造器
LZR.Base.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};