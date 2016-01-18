/*************************************************
作者：子牛连
类名：Event
说明：事件集
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.ValCtrl",
	"LZR.Base.CallBacks"
], "LZR.Base.ValCtrl.Event");
LZR.Base.ValCtrl.Event = function (obj) {
	// 设置值之前触发的事件
	this.before = new LZR.Base.CallBacks(obj.self);	/*as:LZR.Base.CallBacks*/

	// 值变动后触发的事件
	this.change = new LZR.Base.CallBacks(obj.self);	/*as:LZR.Base.CallBacks*/

	// 设置值后触发的事件
	this.set = new LZR.Base.CallBacks(obj.self);	/*as:LZR.Base.CallBacks*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.ValCtrl.Event.prototype.className_ = "LZR.Base.ValCtrl.Event";
LZR.Base.ValCtrl.Event.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.ValCtrl.Event");

// 构造器
LZR.Base.ValCtrl.Event.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};