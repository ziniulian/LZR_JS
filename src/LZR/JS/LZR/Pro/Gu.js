/*************************************************
作者：子牛连
类名：Gu
说明：股
创建日期：20-三月-2019 10:32:52
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro"
], "LZR.Pro.Gu");
LZR.Pro.Gu = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.prototype.className_ = "LZR.Pro.Gu";
LZR.Pro.Gu.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu");

// 构造器
LZR.Pro.Gu.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.prototype.init_.lzrClass_ = LZR.Pro.Gu;

// 对构造参数的特殊处理
LZR.Pro.Gu.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Gu.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu;