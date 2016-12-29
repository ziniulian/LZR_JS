/*************************************************
作者：子牛连
类名：TagTyp
说明：标签类型
创建日期：21-12月-2016 14:33:35
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid"
], "LZR.Pro.Rfid.TagTyp");
LZR.Pro.Rfid.TagTyp = function (obj) {
	// 存储区配置信息
	this.conf = null;	/*as:Object*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.TagTyp.prototype.className_ = "LZR.Pro.Rfid.TagTyp";
LZR.Pro.Rfid.TagTyp.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.TagTyp");

// 构造器
LZR.Pro.Rfid.TagTyp.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.TagTyp.prototype.init_.lzrClass_ = LZR.Pro.Rfid.TagTyp;

// 对构造参数的特殊处理
LZR.Pro.Rfid.TagTyp.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.TagTyp.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.TagTyp;
