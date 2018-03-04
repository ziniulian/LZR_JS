/*************************************************
作者：子牛连
类名：BankNam
说明：存储块名称
创建日期：21-12月-2016 10:10:45
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid"
], "LZR.Pro.Rfid.BankNam");
LZR.Pro.Rfid.BankNam = function (obj) {
	// 名称
	this.nam = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.BankNam.prototype.className_ = "LZR.Pro.Rfid.BankNam";
LZR.Pro.Rfid.BankNam.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.BankNam");

// 构造器
LZR.Pro.Rfid.BankNam.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.BankNam.prototype.init_.lzrClass_ = LZR.Pro.Rfid.BankNam;

// 对构造参数的特殊处理
LZR.Pro.Rfid.BankNam.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.BankNam.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.BankNam;