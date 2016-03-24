/*************************************************
作者：子牛连
类名：EmAreaLevel
说明：区域级别枚举
创建日期：24-三月-2016 16:16:32
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gis.Area",
	"LZR.Pro.Gis.Area.AreaLevel",
	"LZR.Base.Val.Enum"
], "LZR.Pro.Gis.Area.EmAreaLevel");
LZR.Pro.Gis.Area.EmAreaLevel = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gis.Area.EmAreaLevel.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Gis.Area.EmAreaLevel.prototype);
LZR.Pro.Gis.Area.EmAreaLevel.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Gis.Area.EmAreaLevel.prototype.className_ = "LZR.Pro.Gis.Area.EmAreaLevel";
LZR.Pro.Gis.Area.EmAreaLevel.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gis.Area.EmAreaLevel");

// 省
LZR.Pro.Gis.Area.EmAreaLevel.prvn/*m*/ = new LZR.Pro.Gis.Area.AreaLevel({
	id: 30,
	name: "省"
});	/*as:LZR.Pro.Gis.Area.AreaLevel*/

// 市
LZR.Pro.Gis.Area.EmAreaLevel.city/*m*/ = new LZR.Pro.Gis.Area.AreaLevel({
	id: 100,
	name: "市"
});	/*as:LZR.Pro.Gis.Area.AreaLevel*/

// 站点
LZR.Pro.Gis.Area.EmAreaLevel.station/*m*/ = new LZR.Pro.Gis.Area.AreaLevel({
	id: 300,
	name: "站点"
});	/*as:LZR.Pro.Gis.Area.AreaLevel*/

// 构造器
LZR.Pro.Gis.Area.EmAreaLevel.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		this.set(obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Pro.Gis.Area.EmAreaLevel.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
