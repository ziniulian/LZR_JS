/*************************************************
作者：子牛连
类名：Pro
说明：项目
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.Pro");
LZR.Pro = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.prototype.className_ = "LZR.Pro";
LZR.Pro.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro");

// 构造器
LZR.Pro.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.prototype.init_.lzrClass_ = LZR.Pro;

// 对构造参数的特殊处理
LZR.Pro.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.prototype.hdObj_.lzrClass_ = LZR.Pro;