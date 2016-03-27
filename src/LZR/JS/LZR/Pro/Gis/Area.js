/*************************************************
作者：子牛连
类名：Area
说明：区域
创建日期：24-三月-2016 13:45:46
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gis",
	"LZR.Pro.Gis.Area.EmAreaLevel",
	"LZR.Base.Data"
], "LZR.Pro.Gis.Area");
LZR.Pro.Gis.Area = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this, obj);

	// 区域名称
	this.name = "";	/*as:string*/

	// 空间数据
	this.geoJson = null;	/*as:Object*/

	// 区域级别
	this.emLevel/*m*/ = new LZR.Pro.Gis.Area.EmAreaLevel();	/*as:LZR.Pro.Gis.Area.EmAreaLevel*/

	// 常用工具包
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gis.Area.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.Pro.Gis.Area.prototype);
LZR.Pro.Gis.Area.prototype.super_ = [LZR.Base.Data];
LZR.Pro.Gis.Area.prototype.className_ = "LZR.Pro.Gis.Area";
LZR.Pro.Gis.Area.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gis.Area");

// 构造器
LZR.Pro.Gis.Area.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Pro.Gis.Area.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.level) {
		this.emLevel.set(obj.level);
	}

	// 调用父类的参数处理（子数据的递归创建）
	this.utLzr.supCall (this, 0, "hdObj_", obj);
};
