/*************************************************
作者：子牛连
类名：Tag
说明：标签
创建日期：21-12月-2016 14:35:28
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Pro.Rfid.Bank",
	"LZR.Pro.Rfid.EmTagTyp"
], "LZR.Pro.Rfid.Tag");
LZR.Pro.Rfid.Tag = function (obj) {
	// 存储区
	this.banks/*m*/ = {};	/*as:LZR.Pro.Rfid.Bank*/

	// 存储类
	this.clsBank/*m*/ = (LZR.Pro.Rfid.Bank);	/*as:fun*/

	// 标签类型
	this.emTyp/*m*/ = new LZR.Pro.Rfid.EmTagTyp();	/*as:LZR.Pro.Rfid.EmTagTyp*/

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
	if (obj.hd_emTyp) {
		this.setTyp(obj.hd_emTyp);
	}
	if (obj.hd_msg) {
		this.hdMsg(obj.hd_msg);
	}
};
LZR.Pro.Rfid.Tag.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.Tag;

// 处理信息构造参数
LZR.Pro.Rfid.Tag.prototype.hdMsg = function (msg/*as:Object*/) {
	var s;
	for (s in msg) {
		if (this.banks[s]) {
			this.banks[s].msg = msg[s];
		}
	}
};
LZR.Pro.Rfid.Tag.prototype.hdMsg.lzrClass_ = LZR.Pro.Rfid.Tag;

// 设置标签类型
LZR.Pro.Rfid.Tag.prototype.setTyp = function (typNam/*as:string*/) {
	if (typNam !== this.emTyp.getKey() && this.emTyp.set(typNam)) {
		LZR.del(this, "banks");
		this.banks = this.crtBanks();
	}
};
LZR.Pro.Rfid.Tag.prototype.setTyp.lzrClass_ = LZR.Pro.Rfid.Tag;

// 创建存储区
LZR.Pro.Rfid.Tag.prototype.crtBanks = function ()/*as:Object*/ {
	var s, r = {};
	var o = this.emTyp.get().conf;
	for (s in o) {
		r[s] = new this.clsBank({
			hd_emNam: s,
			size: o[s][0],
			ws: o[s][1],
			we: o[s][2],
			rs: o[s][3],
			re: o[s][4]
		});
	}
	return r;
};
LZR.Pro.Rfid.Tag.prototype.crtBanks.lzrClass_ = LZR.Pro.Rfid.Tag;
