/*************************************************
作者：子牛连
类名：At911n
说明：手持机设备
创建日期：21-12月-2016 10:10:20
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid"
], "LZR.Pro.Rfid.At911n");
LZR.Pro.Rfid.At911n = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.At911n.prototype.className_ = "LZR.Pro.Rfid.At911n";
LZR.Pro.Rfid.At911n.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.At911n");

// 对构造参数的特殊处理
LZR.Pro.Rfid.At911n.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.At911n.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.At911n;

// 构造器
LZR.Pro.Rfid.At911n.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.At911n.prototype.init_.lzrClass_ = LZR.Pro.Rfid.At911n;