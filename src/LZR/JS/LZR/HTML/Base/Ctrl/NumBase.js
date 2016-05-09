/*************************************************
作者：子牛连
类名：NumBase
说明：数值增减控制器基类
创建日期：09-五月-2016 11:59:20
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.Base.Val.RangeNum",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.Ctrl.NumBase");
LZR.HTML.Base.Ctrl.NumBase = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 数值
	this.num/*m*/ = new LZR.Base.Val.RangeNum();	/*as:LZR.Base.Val.RangeNum*/

	// 值变化
	this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 最大值变化
	this.evt.maxChg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 步距变化
	this.evt.stepChg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 最小值变化
	this.evt.minChg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

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

// 构造器
LZR.HTML.Base.Ctrl.NumBase.prototype.init_ = function (obj/*as:Object*/) {
	this.linkEvt();

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.NumBase.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_Num) {
		this.num.hdObj_(obj.hd_Num);
	}
};

// 增减n个步距
LZR.HTML.Base.Ctrl.NumBase.prototype.addStep = function (n/*as:int*/)/*as:double*/ {
	return this.num.add(n);
};

// 圆整数据
LZR.HTML.Base.Ctrl.NumBase.prototype.normalize = function ()/*as:double*/ {
	var o = this.num.get();
	var v = this.num.normalize(o);
	if (v !== o) {
		this.set(v);
	}
	return v;
};

// 获取值
LZR.HTML.Base.Ctrl.NumBase.prototype.get = function ()/*as:double*/ {
	return this.num.get();
};

// 设置
LZR.HTML.Base.Ctrl.NumBase.prototype.set = function (num/*as:double*/, doEvt/*as:boolean*/)/*as:double*/ {
	return this.num.set(num, doEvt);
};

// 设置最大值
LZR.HTML.Base.Ctrl.NumBase.prototype.setMax = function (v/*as:double*/, doEvt/*as:boolean*/) {
	this.num.vcMax.set(v, doEvt);
};

// 设置最小值
LZR.HTML.Base.Ctrl.NumBase.prototype.setMin = function (v/*as:double*/, doEvt/*as:boolean*/) {
	this.num.vcMin.set(v, doEvt);
};

// 设置步距
LZR.HTML.Base.Ctrl.NumBase.prototype.setStep = function (v/*as:double*/, doEvt/*as:boolean*/) {
	this.num.vcStep.set(v, doEvt);
};

// 值变化时触发的事件
LZR.HTML.Base.Ctrl.NumBase.prototype.onChg = function (val/*as:double*/, old/*as:double*/) {
	this.evt.chg.execute (val, old);
};

// 最大值变化时触发的事件
LZR.HTML.Base.Ctrl.NumBase.prototype.onMaxChg = function (val/*as:double*/, old/*as:double*/) {
	this.evt.maxChg.execute (val, old);
};

// 最小值变化时触发的事件
LZR.HTML.Base.Ctrl.NumBase.prototype.onMinChg = function (val/*as:double*/, old/*as:double*/) {
	this.evt.minChg.execute (val, old);
};

// 步距变化时触发的事件
LZR.HTML.Base.Ctrl.NumBase.prototype.onStepChg = function (val/*as:double*/, old/*as:double*/) {
	this.evt.stepChg.execute (val, old);
};

// 事件关联
LZR.HTML.Base.Ctrl.NumBase.prototype.linkEvt = function () {
	var e = function (evtNam, v, s, o) {
		this[evtNam](v, o);
	};

	this.num.vcNum.evt.change.add(this.utLzr.bind(this, e, "onChg"), "NumBase_linkEvt");
	this.num.vcMax.evt.change.add(this.utLzr.bind(this, e, "onMaxChg"), "NumBase_linkEvt");
	this.num.vcMin.evt.change.add(this.utLzr.bind(this, e, "onMinChg"), "NumBase_linkEvt");
	this.num.vcStep.evt.change.add(this.utLzr.bind(this, e, "onStepChg"), "NumBase_linkEvt");
};
