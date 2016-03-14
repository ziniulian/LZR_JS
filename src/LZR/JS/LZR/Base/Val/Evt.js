/*************************************************
作者：子牛连
类名：Evt
说明：事件集
创建日期：11-三月-2016 14:28:34
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Val",
	"LZR.Base.CallBacks"
], "LZR.Base.Val.Evt");
LZR.Base.Val.Evt = function (obj) {
	// 设置值之前触发的事件
	this.before/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 值变动后触发的事件
	this.change/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 设置值后触发的事件
	this.set/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.Evt.prototype.className_ = "LZR.Base.Val.Evt";
LZR.Base.Val.Evt.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val.Evt");

// 构造器
LZR.Base.Val.Evt.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.Val.Evt.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
