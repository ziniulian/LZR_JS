/*************************************************
作者：子牛连
类名：Val
说明：值
创建日期：07-三月-2016 11:45:15
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Val");
LZR.Base.Val = function (obj) {
	// 值
	this.val = null;	/*as:Object*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
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
		LZR.setObj (this, obj);
	}
};

// 获取值
LZR.Base.Val.prototype.get = function ()/*as:Object*/ {
	return this.val;
};

// 设置值
LZR.Base.Val.prototype.set = function (value/*as:Object*/)/*as:boolean*/ {
	this.val = value;
	return true;
};
