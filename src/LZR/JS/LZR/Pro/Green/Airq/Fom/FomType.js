/*************************************************
作者：子牛连
类名：FomType
说明：污染物类型
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.Fom"
], "LZR.Pro.Green.Airq.Fom.FomType");
LZR.Pro.Green.Airq.Fom.FomType = function (obj) {
	// 编号
	this.id = "";	/*as:string*/

	// 名称
	this.name = "";	/*as:string*/

	// web显示文本
	this.htm = "";	/*as:string*/

	// 单位
	this.unit = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.FomType.prototype.className_ = "LZR.Pro.Green.Airq.Fom.FomType";
LZR.Pro.Green.Airq.Fom.FomType.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Fom.FomType");

// 构造器
LZR.Pro.Green.Airq.Fom.FomType.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.FomType.prototype.init_.lzrClass_ = LZR.Pro.Green.Airq.Fom.FomType;

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Fom.FomType.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.Airq.Fom.FomType.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.Airq.Fom.FomType;