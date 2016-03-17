/*************************************************
作者：子牛连
类名：Ctrl
说明：控制器
创建日期：17-三月-2016 16:18:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.Base.InfEvt",
	"LZR.Base.Val.Ctrl"
], "LZR.HTML.Base.Ctrl");
LZR.HTML.Base.Ctrl = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// 元素
	this.vcDoe/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.HTML.Base.Ctrl.prototype);
LZR.HTML.Base.Ctrl.prototype.className_ = "LZR.HTML.Base.Ctrl";
LZR.HTML.Base.Ctrl.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl");

// 构造器
LZR.HTML.Base.Ctrl.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
