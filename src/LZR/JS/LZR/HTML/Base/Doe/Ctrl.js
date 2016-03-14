/*************************************************
作者：子牛连
类名：Ctrl
说明：控制器
创建日期：11-三月-2016 14:14:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Doe"
], "LZR.HTML.Base.Doe.Ctrl");
LZR.HTML.Base.Doe.Ctrl = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Doe.Ctrl.prototype.className_ = "LZR.HTML.Base.Doe.Ctrl";
LZR.HTML.Base.Doe.Ctrl.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Doe.Ctrl");

// 构造器
LZR.HTML.Base.Doe.Ctrl.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Doe.Ctrl.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
