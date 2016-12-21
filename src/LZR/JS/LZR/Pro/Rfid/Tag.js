/*************************************************
作者：子牛连
类名：Tag
说明：标签
创建日期：21-12月-2016 10:11:08
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Pro.Rfid.Bank"
], "LZR.Pro.Rfid.Tag");
LZR.Pro.Rfid.Tag = function (obj) {
	// EPC
	this.epc/*m*/ = new LZR.Pro.Rfid.Bank();	/*as:LZR.Pro.Rfid.Bank*/

	// TID
	this.tid/*m*/ = new LZR.Pro.Rfid.Bank();	/*as:LZR.Pro.Rfid.Bank*/

	// 可用
	this.usr/*m*/ = new LZR.Pro.Rfid.Bank();	/*as:LZR.Pro.Rfid.Bank*/

	// 备用
	this.rev/*m*/ = new LZR.Pro.Rfid.Bank();	/*as:LZR.Pro.Rfid.Bank*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.Tag.prototype.className_ = "LZR.Pro.Rfid.Tag";
LZR.Pro.Rfid.Tag.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.Tag");

// 构造器
LZR.Pro.Rfid.Tag.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.Tag.prototype.init_.lzrClass_ = LZR.Pro.Rfid.Tag;

// 对构造参数的特殊处理
LZR.Pro.Rfid.Tag.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.Tag.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.Tag;