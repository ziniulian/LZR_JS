/*************************************************
作者：子牛连
类名：Airq
说明：空气质量
创建日期：24-三月-2016 13:45:46
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green"
], "LZR.Pro.Green.Airq");
LZR.Pro.Green.Airq = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.prototype.className_ = "LZR.Pro.Green.Airq";
LZR.Pro.Green.Airq.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq");

// 构造器
LZR.Pro.Green.Airq.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
