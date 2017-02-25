/*************************************************
作者：子牛连
类名：Dev
说明：设备
创建日期：22-2月-2017 14:44:57
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.TmpTagMgmt",
	"LZR.Base.Data",
	"LZR.Pro.TmpTagMgmt.Tag"
], "LZR.Pro.TmpTagMgmt.Dev");
LZR.Pro.TmpTagMgmt.Dev = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this, obj);

	// 设备名
	this.nam = "";	/*as:string*/

	// 设备编号
	this.num = "";	/*as:string*/

	// 状态
	this.stat = true;	/*as:boolean*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.TmpTagMgmt.Dev.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.Pro.TmpTagMgmt.Dev.prototype);
LZR.Pro.TmpTagMgmt.Dev.prototype.super_ = [LZR.Base.Data];
LZR.Pro.TmpTagMgmt.Dev.prototype.className_ = "LZR.Pro.TmpTagMgmt.Dev";
LZR.Pro.TmpTagMgmt.Dev.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.TmpTagMgmt.Dev");

// 构造器
LZR.Pro.TmpTagMgmt.Dev.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.TmpTagMgmt.Dev.prototype.init_.lzrClass_ = LZR.Pro.TmpTagMgmt.Dev;

// 对构造参数的特殊处理
LZR.Pro.TmpTagMgmt.Dev.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.TmpTagMgmt.Dev.prototype.hdObj_.lzrClass_ = LZR.Pro.TmpTagMgmt.Dev;