/*************************************************
作者：子牛连
类名：EmTagTyp
说明：标签类型枚举
创建日期：22-12月-2016 8:39:59
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Base.Val.Enum",
	"LZR.Pro.Rfid.TagTyp"
], "LZR.Pro.Rfid.EmTagTyp");
LZR.Pro.Rfid.EmTagTyp = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.EmTagTyp.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Rfid.EmTagTyp.prototype);
LZR.Pro.Rfid.EmTagTyp.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Rfid.EmTagTyp.prototype.className_ = "LZR.Pro.Rfid.EmTagTyp";
LZR.Pro.Rfid.EmTagTyp.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.EmTagTyp");

// 6C
LZR.Pro.Rfid.EmTagTyp.t6c/*m*/ = new LZR.Pro.Rfid.TagTyp({
	conf: {
		ecp:[16,4,16,2,16],
		tid:[24,24,24,0,24],
		usr:[64,0,64,0,64],
		bck:[8,0,8,0,8]
	}
});	/*as:LZR.Pro.Rfid.TagTyp*/

// 构造器
LZR.Pro.Rfid.EmTagTyp.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.EmTagTyp.prototype.init_.lzrClass_ = LZR.Pro.Rfid.EmTagTyp;

// 对构造参数的特殊处理
LZR.Pro.Rfid.EmTagTyp.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.EmTagTyp.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.EmTagTyp;