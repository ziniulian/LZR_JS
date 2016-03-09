/*************************************************
作者：子牛连
类名：CallBack
说明：回调函数
创建日期：16-二月-2016 15:22:24
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.CallBacks"
], "LZR.Base.CallBacks.CallBack");
LZR.Base.CallBacks.CallBack = function (obj) {
	// 名字
	this.name = "";	/*as:string*/

	// 是否触发事件
	this.enableEvent = true;	/*as:boolean*/

	// 事件自动恢复
	this.autoEvent = true;	/*as:boolean*/

	// 函数
	this.fun = null;	/*as:fun*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.CallBacks.CallBack.prototype.className_ = "LZR.Base.CallBacks.CallBack";
LZR.Base.CallBacks.CallBack.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.CallBacks.CallBack");

// 构造器
LZR.Base.CallBacks.CallBack.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};