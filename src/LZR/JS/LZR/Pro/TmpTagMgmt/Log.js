/*************************************************
作者：子牛连
类名：Log
说明：温度日志
创建日期：22-2月-2017 14:48:34
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.TmpTagMgmt",
	"LZR.Base.Data"
], "LZR.Pro.TmpTagMgmt.Log");
LZR.Pro.TmpTagMgmt.Log = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this, obj);

	// 时间
	this.tim = new Date();	/*as:Date*/

	// 温度
	this.tmp = 0;	/*as:double*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.TmpTagMgmt.Log.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.Pro.TmpTagMgmt.Log.prototype);
LZR.Pro.TmpTagMgmt.Log.prototype.super_ = [LZR.Base.Data];
LZR.Pro.TmpTagMgmt.Log.prototype.className_ = "LZR.Pro.TmpTagMgmt.Log";
LZR.Pro.TmpTagMgmt.Log.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.TmpTagMgmt.Log");

// 构造器
LZR.Pro.TmpTagMgmt.Log.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.TmpTagMgmt.Log.prototype.init_.lzrClass_ = LZR.Pro.TmpTagMgmt.Log;

// 对构造参数的特殊处理
LZR.Pro.TmpTagMgmt.Log.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.TmpTagMgmt.Log.prototype.hdObj_.lzrClass_ = LZR.Pro.TmpTagMgmt.Log;