/*************************************************
作者：子牛连
类名：FomLevel
说明：污染物级别
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.Fom",
	"LZR.Base.EmClr"
], "LZR.Pro.Green.Airq.Fom.FomLevel");
LZR.Pro.Green.Airq.Fom.FomLevel = function (obj) {
	// 级别编号
	this.id = 0;	/*as:int*/

	// 名称
	this.name = "";	/*as:string*/

	// 指数范围最小值
	this.rangeMin = 0;	/*as:int*/

	// 指数范围最大值
	this.rangeMax = 0;	/*as:int*/

	// 图片路径
	this.imgUrl = "";	/*as:string*/

	// 颜色，初始化属性名：clr
	this.emClr/*m*/ = new LZR.Base.EmClr();	/*as:LZR.Base.EmClr*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.FomLevel.prototype.className_ = "LZR.Pro.Green.Airq.Fom.FomLevel";
LZR.Pro.Green.Airq.Fom.FomLevel.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Fom.FomLevel");

// 构造器
LZR.Pro.Green.Airq.Fom.FomLevel.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.FomLevel.prototype.init_.lzrClass_ = LZR.Pro.Green.Airq.Fom.FomLevel;

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Fom.FomLevel.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.clr) {
		this.emClr.set(obj.clr);
	}
};
LZR.Pro.Green.Airq.Fom.FomLevel.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.Airq.Fom.FomLevel;