/*************************************************
作者：子牛连
类名：Evt
说明：事件集
创建日期：11-三月-2016 14:13:43
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Doe"
], "LZR.HTML.Base.Doe.Evt");
LZR.HTML.Base.Doe.Evt = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Doe.Evt.prototype.className_ = "LZR.HTML.Base.Doe.Evt";
LZR.HTML.Base.Doe.Evt.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Doe.Evt");

// 构造器
LZR.HTML.Base.Doe.Evt.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Doe.Evt.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
