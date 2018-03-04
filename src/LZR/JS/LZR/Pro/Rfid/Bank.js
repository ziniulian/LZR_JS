/*************************************************
作者：子牛连
类名：Bank
说明：存储块
创建日期：22-12月-2016 8:37:13
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Pro.Rfid.EmBankNam"
], "LZR.Pro.Rfid.Bank");
LZR.Pro.Rfid.Bank = function (obj) {
	// 可存储的字节总数
	this.size = 0;	/*as:int*/

	// 写入开始的字节位置
	this.ws = 0;	/*as:int*/

	// 写入结束的字节位置
	this.we = 0;	/*as:int*/

	// 读取开始的字节位置
	this.rs = 0;	/*as:int*/

	// 读取结束的字节位置
	this.re = 0;	/*as:int*/

	// 存储的内容
	this.msg = "";	/*as:string*/

	// 名称
	this.emNam/*m*/ = new LZR.Pro.Rfid.EmBankNam();	/*as:LZR.Pro.Rfid.EmBankNam*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.Bank.prototype.className_ = "LZR.Pro.Rfid.Bank";
LZR.Pro.Rfid.Bank.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.Bank");

// 构造器
LZR.Pro.Rfid.Bank.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.Bank.prototype.init_.lzrClass_ = LZR.Pro.Rfid.Bank;

// 对构造参数的特殊处理
LZR.Pro.Rfid.Bank.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_emNam) {
		this.emNam.set(obj.hd_emNam);
	}
};
LZR.Pro.Rfid.Bank.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.Bank;

// 获取可写入的字节长度
LZR.Pro.Rfid.Bank.prototype.getLength = function (isWrite/*as:boolean*/)/*as:int*/ {
	if (isWrite) {
		return this.we - this.ws;
	} else {
		return this.re - this.rs;
	}
};
LZR.Pro.Rfid.Bank.prototype.getLength.lzrClass_ = LZR.Pro.Rfid.Bank;
