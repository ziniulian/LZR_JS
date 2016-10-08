/*************************************************
作者：子牛连
类名：WindDir
说明：风向
创建日期：01-八月-2016 17:08:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.WindInfo"
], "LZR.Pro.Green.WindInfo.WindDir");
LZR.Pro.Green.WindInfo.WindDir = function (obj) {
	// 编号
	this.id = -1;	/*as:int*/

	// 名称
	this.name = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WindInfo.WindDir.prototype.className_ = "LZR.Pro.Green.WindInfo.WindDir";
LZR.Pro.Green.WindInfo.WindDir.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WindInfo.WindDir");

// 构造器
LZR.Pro.Green.WindInfo.WindDir.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.WindInfo.WindDir.prototype.init_.lzrClass_ = LZR.Pro.Green.WindInfo.WindDir;

// 对构造参数的特殊处理
LZR.Pro.Green.WindInfo.WindDir.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.WindInfo.WindDir.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WindInfo.WindDir;