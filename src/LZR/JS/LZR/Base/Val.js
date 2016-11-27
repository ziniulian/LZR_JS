/*************************************************
作者：子牛连
类名：Val
说明：值
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Val");
LZR.Base.Val = function (obj) {
	// 值
	this.val = null;	/*as:Object*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.prototype.className_ = "LZR.Base.Val";
LZR.Base.Val.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val");

// 构造器
LZR.Base.Val.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		this.val = obj;
		this.hdObj_(obj);
	}
};
LZR.Base.Val.prototype.init_.lzrClass_ = LZR.Base.Val;

// 获取值
LZR.Base.Val.prototype.get = function ()/*as:Object*/ {
	return this.val;
};
LZR.Base.Val.prototype.get.lzrClass_ = LZR.Base.Val;

// 设置值
LZR.Base.Val.prototype.set = function (value/*as:Object*/)/*as:boolean*/ {
	this.val = value;
	return true;
};
LZR.Base.Val.prototype.set.lzrClass_ = LZR.Base.Val;

// 克隆
LZR.Base.Val.prototype.clone = function (dep/*as:boolean*/)/*as:Object*/ {
	var r = this.get();
	if (dep) {
		r = LZR.clone(r);
	}
	return new this.constructor (r);
};
LZR.Base.Val.prototype.clone.lzrClass_ = LZR.Base.Val;

// 对构造参数的特殊处理
LZR.Base.Val.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.Val.prototype.hdObj_.lzrClass_ = LZR.Base.Val;