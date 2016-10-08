/*************************************************
作者：子牛连
类名：WindInfo
说明：风
创建日期：01-八月-2016 17:16:00
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green",
	"LZR.Pro.Green.WindInfo.EmWindPower",
	"LZR.Pro.Green.WindInfo.EmWindDir"
], "LZR.Pro.Green.WindInfo");
LZR.Pro.Green.WindInfo = function (obj) {
	// 风力
	this.emPower/*m*/ = new LZR.Pro.Green.WindInfo.EmWindPower();	/*as:LZR.Pro.Green.WindInfo.EmWindPower*/

	// 风向
	this.emDir/*m*/ = new LZR.Pro.Green.WindInfo.EmWindDir();	/*as:LZR.Pro.Green.WindInfo.EmWindDir*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WindInfo.prototype.className_ = "LZR.Pro.Green.WindInfo";
LZR.Pro.Green.WindInfo.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WindInfo");

// 构造器
LZR.Pro.Green.WindInfo.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.WindInfo.prototype.init_.lzrClass_ = LZR.Pro.Green.WindInfo;

// 对构造参数的特殊处理
LZR.Pro.Green.WindInfo.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.windPow) {
		this.emPower.set(obj.windPow);
	}
	if (obj.windDir) {
		this.emDir.set(obj.windDir);
	}
};
LZR.Pro.Green.WindInfo.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WindInfo;
