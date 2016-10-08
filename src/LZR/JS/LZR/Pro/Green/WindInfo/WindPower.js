/*************************************************
作者：子牛连
类名：WindPower
说明：风力
创建日期：01-八月-2016 17:08:14
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.WindInfo"
], "LZR.Pro.Green.WindInfo.WindPower");
LZR.Pro.Green.WindInfo.WindPower = function (obj) {
	// 级别编号
	this.id = -1;	/*as:int*/

	// 名称
	this.name = "";	/*as:string*/

	// 最小风速
	this.minSpeed = 0;	/*as:double*/

	// 最大风速
	this.maxSpeed = 0;	/*as:double*/

	// 陆地现象
	this.phenomenon = "";	/*as:string*/

	// 海面波浪
	this.sea = "";	/*as:string*/

	// 浪高
	this.wave = 0;	/*as:double*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WindInfo.WindPower.prototype.className_ = "LZR.Pro.Green.WindInfo.WindPower";
LZR.Pro.Green.WindInfo.WindPower.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WindInfo.WindPower");

// 构造器
LZR.Pro.Green.WindInfo.WindPower.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.WindInfo.WindPower.prototype.init_.lzrClass_ = LZR.Pro.Green.WindInfo.WindPower;

// 对构造参数的特殊处理
LZR.Pro.Green.WindInfo.WindPower.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.WindInfo.WindPower.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WindInfo.WindPower;