/*************************************************
作者：子牛连
类名：Ary
说明：数组
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Ary");
LZR.Base.Ary = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Ary.prototype.className_ = "LZR.Base.Ary";
LZR.Base.Ary.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Ary");

// 构造器
LZR.Base.Ary.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};