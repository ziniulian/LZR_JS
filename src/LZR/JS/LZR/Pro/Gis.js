/*************************************************
作者：子牛连
类名：Gis
说明：地理信息
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro"
], "LZR.Pro.Gis");
LZR.Pro.Gis = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gis.prototype.className_ = "LZR.Pro.Gis";
LZR.Pro.Gis.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gis");

// 构造器
LZR.Pro.Gis.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gis.prototype.init_.lzrClass_ = LZR.Pro.Gis;

// 对构造参数的特殊处理
LZR.Pro.Gis.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Gis.prototype.hdObj_.lzrClass_ = LZR.Pro.Gis;