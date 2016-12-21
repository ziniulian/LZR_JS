/*************************************************
作者：子牛连
类名：Bank
说明：存储块
创建日期：21-12月-2016 10:11:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Pro.Rfid.EmBanmNam"
], "LZR.Pro.Rfid.Bank");
LZR.Pro.Rfid.Bank = function (obj) {
	// 可存储的字节总数
	this.size = 0;	/*as:int*/

	// 可写入的开始字节位置
	this.start = 0;	/*as:int*/

	// 可写入的结束字节位置
	this.end = 0;	/*as:int*/

	// 存储的信息
	this.msg = "";	/*as:string*/

	// 名称
	this.emNam/*m*/ = new LZR.Pro.Rfid.EmBanmNam();	/*as:LZR.Pro.Rfid.EmBanmNam*/

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
	
};
LZR.Pro.Rfid.Bank.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.Bank;

// 获取可写入的字节长度
LZR.Pro.Rfid.Bank.prototype.getLength = function ()/*as:int*/ {
	
};
LZR.Pro.Rfid.Bank.prototype.getLength.lzrClass_ = LZR.Pro.Rfid.Bank;