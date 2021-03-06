/*************************************************
作者：子牛连
类名：AreaLevel
说明：区域级别
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gis.Area"
], "LZR.Pro.Gis.Area.AreaLevel");
LZR.Pro.Gis.Area.AreaLevel = function (obj) {
	// 级别编号
	this.id = 0;	/*as:int*/

	// 名称
	this.name = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gis.Area.AreaLevel.prototype.className_ = "LZR.Pro.Gis.Area.AreaLevel";
LZR.Pro.Gis.Area.AreaLevel.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gis.Area.AreaLevel");

// 构造器
LZR.Pro.Gis.Area.AreaLevel.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gis.Area.AreaLevel.prototype.init_.lzrClass_ = LZR.Pro.Gis.Area.AreaLevel;

// 对构造参数的特殊处理
LZR.Pro.Gis.Area.AreaLevel.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Gis.Area.AreaLevel.prototype.hdObj_.lzrClass_ = LZR.Pro.Gis.Area.AreaLevel;