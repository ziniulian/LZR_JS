/*************************************************
作者：子牛连
类名：Base
说明：基础
创建日期：11-三月-2016 13:45:34
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

// 对构造参数的特殊处理
LZR.Base.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};