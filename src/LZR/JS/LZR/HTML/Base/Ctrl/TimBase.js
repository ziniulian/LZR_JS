/*************************************************
作者：子牛连
类名：TimBase
说明：时间控制器基类
创建日期：11-五月-2016 10:29:48
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.Base.CallBacks",
	"LZR.Base.Val.Tim"
], "LZR.HTML.Base.Ctrl.TimBase");
LZR.HTML.Base.Ctrl.TimBase = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 时间变化
	this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 时间类
	this.clsTim/*m*/ = (LZR.Base.Val.Tim);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.TimBase.prototype);
LZR.HTML.Base.Ctrl.TimBase.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.TimBase.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase";
LZR.HTML.Base.Ctrl.TimBase.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.prototype.hdObj_ = function (obj/*as:Object*/) {

};

// 时间变化时触发的事件
LZR.HTML.Base.Ctrl.TimBase.prototype.onChg = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:Object*/, s/*as:Object*/, old/*as:Object*/) {
	if (v !== old) {
		this.evt.chg.execute (doeo, new Date(v), s, old);
	}
};
