/*************************************************
作者：子牛连
类名：NumBase
说明：数值增减控制器基类
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Val.RangeNum",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.Ctrl.NumBase");
LZR.HTML.Base.Ctrl.NumBase = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 数值类
	this.clsNum/*m*/ = (LZR.Base.Val.RangeNum);	/*as:fun*/

	// 值变化
	this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.NumBase.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.NumBase.prototype);
LZR.HTML.Base.Ctrl.NumBase.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.NumBase.prototype.className_ = "LZR.HTML.Base.Ctrl.NumBase";
LZR.HTML.Base.Ctrl.NumBase.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.NumBase");

// 值变化时触发的事件
LZR.HTML.Base.Ctrl.NumBase.prototype.onChg = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:double*/, self/*as:Object*/, old/*as:double*/) {
	if (val !== old) {
		this.evt.chg.execute (doeo, val, self, old);
	}
};
LZR.HTML.Base.Ctrl.NumBase.prototype.onChg.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase;

// 构造器
LZR.HTML.Base.Ctrl.NumBase.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.NumBase.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.NumBase.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.NumBase.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase;