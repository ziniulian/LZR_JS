/*************************************************
作者：子牛连
类名：EmWindDir
说明：风向枚举
创建日期：01-八月-2016 17:31:44
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.WindInfo",
	"LZR.Base.Val.Enum",
	"LZR.Pro.Green.WindInfo.WindDir"
], "LZR.Pro.Green.WindInfo.EmWindDir");
LZR.Pro.Green.WindInfo.EmWindDir = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WindInfo.EmWindDir.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Green.WindInfo.EmWindDir.prototype);
LZR.Pro.Green.WindInfo.EmWindDir.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Green.WindInfo.EmWindDir.prototype.className_ = "LZR.Pro.Green.WindInfo.EmWindDir";
LZR.Pro.Green.WindInfo.EmWindDir.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WindInfo.EmWindDir");

// 东
LZR.Pro.Green.WindInfo.EmWindDir.e/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 0,
	name: "东风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 东南
LZR.Pro.Green.WindInfo.EmWindDir.es/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 1,
	name: "东南风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 南
LZR.Pro.Green.WindInfo.EmWindDir.s/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 2,
	name: "南风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 西南
LZR.Pro.Green.WindInfo.EmWindDir.ws/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 3,
	name: "西南风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 西
LZR.Pro.Green.WindInfo.EmWindDir.w/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 4,
	name: "西风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 空
LZR.Pro.Green.WindInfo.EmWindDir.emnull/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: -1,
	name: ""
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 西北
LZR.Pro.Green.WindInfo.EmWindDir.wn/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 5,
	name: "西北风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 北
LZR.Pro.Green.WindInfo.EmWindDir.n/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 6,
	name: "北风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 东北
LZR.Pro.Green.WindInfo.EmWindDir.en/*m*/ = new LZR.Pro.Green.WindInfo.WindDir({
	id: 7,
	name: "东北风"
});	/*as:LZR.Pro.Green.WindInfo.WindDir*/

// 对构造参数的特殊处理
LZR.Pro.Green.WindInfo.EmWindDir.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.WindInfo.EmWindDir.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WindInfo.EmWindDir;