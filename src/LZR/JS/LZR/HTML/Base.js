/*************************************************
作者：子牛连
类名：Base
说明：基础
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML"
], "LZR.HTML.Base");
LZR.HTML.Base = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.prototype.className_ = "LZR.HTML.Base";
LZR.HTML.Base.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base");

// 构造器
LZR.HTML.Base.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.prototype.init_.lzrClass_ = LZR.HTML.Base;

// 对构造参数的特殊处理
LZR.HTML.Base.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.prototype.hdObj_.lzrClass_ = LZR.HTML.Base;