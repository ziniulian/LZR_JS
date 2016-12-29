/*************************************************
作者：子牛连
类名：ScanTag
说明：扫码标签
创建日期：21-12月-2016 16:41:17
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid.At911n",
	"LZR.Pro.Rfid.Tag"
], "LZR.Pro.Rfid.At911n.ScanTag");
LZR.Pro.Rfid.At911n.ScanTag = function (obj) /*bases:LZR.Pro.Rfid.Tag*/ {
	LZR.initSuper(this, obj);

	// ECP序号
	this.id = "";	/*as:string*/

	// 被扫描到的次数
	this.scanNum = 0;	/*as:int*/

	// 元素
	this.doeo = null;	/*as:LZR.HTML.Base.Doe*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.At911n.ScanTag.prototype = LZR.clone (LZR.Pro.Rfid.Tag.prototype, LZR.Pro.Rfid.At911n.ScanTag.prototype);
LZR.Pro.Rfid.At911n.ScanTag.prototype.super_ = [LZR.Pro.Rfid.Tag];
LZR.Pro.Rfid.At911n.ScanTag.prototype.className_ = "LZR.Pro.Rfid.At911n.ScanTag";
LZR.Pro.Rfid.At911n.ScanTag.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.At911n.ScanTag");

// 构造器
LZR.Pro.Rfid.At911n.ScanTag.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.At911n.ScanTag.prototype.init_.lzrClass_ = LZR.Pro.Rfid.At911n.ScanTag;

// 对构造参数的特殊处理
LZR.Pro.Rfid.At911n.ScanTag.prototype.hdObj_ = function (obj/*as:Object*/) {
	this.utLzr.supCall(this, 0, "hdObj_", obj);
};
LZR.Pro.Rfid.At911n.ScanTag.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.At911n.ScanTag;
