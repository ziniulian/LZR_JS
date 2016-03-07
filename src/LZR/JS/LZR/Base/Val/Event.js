/*************************************************
作者：子牛连
类名：Event
说明：事件集
创建日期：07-三月-2016 15:21:07
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Val",
	"LZR.Base.CallBacks"
], "LZR.Base.Val.Event");
LZR.Base.Val.Event = function (obj) {
	// 设置值之前触发的事件
	this.before/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 值变动后触发的事件
	this.change/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 设置值后触发的事件
	this.set/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.super_) {
		this.init_();
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.Event.prototype.className_ = "LZR.Base.Val.Event";
LZR.Base.Val.Event.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val.Event");

// 构造器
LZR.Base.Val.Event.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};