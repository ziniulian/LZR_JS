/*************************************************
作者：子牛连
类名：Green
说明：环保
创建日期：24-三月-2016 13:45:46
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro"
], "LZR.Pro.Green");
LZR.Pro.Green = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.prototype.className_ = "LZR.Pro.Green";
LZR.Pro.Green.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green");

// 构造器
LZR.Pro.Green.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Pro.Green.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
