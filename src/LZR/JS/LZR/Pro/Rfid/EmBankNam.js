/*************************************************
作者：子牛连
类名：EmBankNam
说明：存储块名枚举
创建日期：21-12月-2016 17:12:57
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Pro.Rfid.BankNam",
	"LZR.Base.Val.Enum"
], "LZR.Pro.Rfid.EmBankNam");
LZR.Pro.Rfid.EmBankNam = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.EmBankNam.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Rfid.EmBankNam.prototype);
LZR.Pro.Rfid.EmBankNam.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Rfid.EmBankNam.prototype.className_ = "LZR.Pro.Rfid.EmBankNam";
LZR.Pro.Rfid.EmBankNam.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.EmBankNam");

// 可用
LZR.Pro.Rfid.EmBankNam.usr/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"User"});	/*as:LZR.Pro.Rfid.BankNam*/

// 备用
LZR.Pro.Rfid.EmBankNam.bck/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"Reserved"});	/*as:LZR.Pro.Rfid.BankNam*/

// EPC
LZR.Pro.Rfid.EmBankNam.epc/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"EPC"});	/*as:LZR.Pro.Rfid.BankNam*/

// TID
LZR.Pro.Rfid.EmBankNam.tid/*m*/ = new LZR.Pro.Rfid.BankNam({nam:"TID"});	/*as:LZR.Pro.Rfid.BankNam*/

// 构造器
LZR.Pro.Rfid.EmBankNam.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.EmBankNam.prototype.init_.lzrClass_ = LZR.Pro.Rfid.EmBankNam;

// 对构造参数的特殊处理
LZR.Pro.Rfid.EmBankNam.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.EmBankNam.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.EmBankNam;