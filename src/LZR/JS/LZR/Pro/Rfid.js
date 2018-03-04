/*************************************************
作者：子牛连
类名：Rfid
说明：RFID
创建日期：21-12月-2016 11:45:44
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro"
], "LZR.Pro.Rfid");
LZR.Pro.Rfid = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.prototype.className_ = "LZR.Pro.Rfid";
LZR.Pro.Rfid.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid");

// 对构造参数的特殊处理
LZR.Pro.Rfid.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid;

// 构造器
LZR.Pro.Rfid.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.prototype.init_.lzrClass_ = LZR.Pro.Rfid;