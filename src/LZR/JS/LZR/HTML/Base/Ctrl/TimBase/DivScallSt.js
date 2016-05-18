/*************************************************
作者：子牛连
类名：DivScallSt
说明：Div刻度的时间控制条
创建日期：16-五月-2016 17:16:14
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase",
	"LZR.HTML.Base.Ctrl.TimBase.StDivScall",
	"LZR.HTML.Base.Ctrl.TimBase.StripTim"
], "LZR.HTML.Base.Ctrl.TimBase.DivScallSt");
LZR.HTML.Base.Ctrl.TimBase.DivScallSt = function (obj) /*bases:LZR.HTML.Base.Ctrl.TimBase.StripTim*/ {
	LZR.initSuper(this, obj);

	// 刻度
	this.scall/*m*/ = new LZR.HTML.Base.Ctrl.TimBase.StDivScall({
		belongCtrl: this
	});	/*as:LZR.HTML.Base.Ctrl.TimBase.StDivScall*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype, LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype);
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.super_ = [LZR.HTML.Base.Ctrl.TimBase.StripTim];
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.DivScallSt";
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.DivScallSt");

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
