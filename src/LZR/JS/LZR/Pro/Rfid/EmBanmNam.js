/*************************************************
作者：子牛连
类名：EmBanmNam
说明：存储块名枚举
创建日期：21-12月-2016 10:10:52
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Base.Val.Enum",
	"LZR.Pro.Rfid.BankNam"
], "LZR.Pro.Rfid.EmBanmNam");
LZR.Pro.Rfid.EmBanmNam = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.EmBanmNam.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Rfid.EmBanmNam.prototype);
LZR.Pro.Rfid.EmBanmNam.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Rfid.EmBanmNam.prototype.className_ = "LZR.Pro.Rfid.EmBanmNam";
LZR.Pro.Rfid.EmBanmNam.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.EmBanmNam");

// EPC
LZR.Pro.Rfid.EmBanmNam.epc/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"EPC"});	/*as:LZR.Pro.Rfid.BankNam*/

// TID
LZR.Pro.Rfid.EmBanmNam.tid/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"TID"});	/*as:LZR.Pro.Rfid.BankNam*/

// 可用
LZR.Pro.Rfid.EmBanmNam.usr/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"User"});	/*as:LZR.Pro.Rfid.BankNam*/

// 备用
LZR.Pro.Rfid.EmBanmNam.rev/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"Reserved"});	/*as:LZR.Pro.Rfid.BankNam*/

// 构造器
LZR.Pro.Rfid.EmBanmNam.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.EmBanmNam.prototype.init_.lzrClass_ = LZR.Pro.Rfid.EmBanmNam;

// 对构造参数的特殊处理
LZR.Pro.Rfid.EmBanmNam.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.EmBanmNam.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.EmBanmNam;