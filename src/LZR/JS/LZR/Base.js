/*************************************************
作者：子牛连
类名：Base
说明：基础
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.Base");
LZR.Base = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
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
		this.hdObj_(obj);
	}
};
LZR.Base.prototype.init_.lzrClass_ = LZR.Base;

// 对构造参数的特殊处理
LZR.Base.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.prototype.hdObj_.lzrClass_ = LZR.Base;