/*************************************************
作者：子牛连
类名：Tag
说明：标签
创建日期：22-2月-2017 14:48:25
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.TmpTagMgmt",
	"LZR.Base.Data",
	"LZR.Pro.TmpTagMgmt.Log"
], "LZR.Pro.TmpTagMgmt.Tag");
LZR.Pro.TmpTagMgmt.Tag = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this, obj);

	// 标签名
	this.nam = "";	/*as:string*/

	// 当前温度
	this.cur = 0;	/*as:double*/

	// 当前温度的采样时间
	this.tim = new Date();	/*as:Date*/

	// 最大温度
	this.max = 0;	/*as:double*/

	// 最小温度
	this.min = 0;	/*as:double*/

	// EPC
	this.epc = "";	/*as:string*/

	// TID
	this.tid = "";	/*as:string*/

	// 状态
	this.stat = false;	/*as:boolean*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.TmpTagMgmt.Tag.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.Pro.TmpTagMgmt.Tag.prototype);
LZR.Pro.TmpTagMgmt.Tag.prototype.super_ = [LZR.Base.Data];
LZR.Pro.TmpTagMgmt.Tag.prototype.className_ = "LZR.Pro.TmpTagMgmt.Tag";
LZR.Pro.TmpTagMgmt.Tag.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.TmpTagMgmt.Tag");

// 构造器
LZR.Pro.TmpTagMgmt.Tag.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.TmpTagMgmt.Tag.prototype.init_.lzrClass_ = LZR.Pro.TmpTagMgmt.Tag;

// 对构造参数的特殊处理
LZR.Pro.TmpTagMgmt.Tag.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.TmpTagMgmt.Tag.prototype.hdObj_.lzrClass_ = LZR.Pro.TmpTagMgmt.Tag;