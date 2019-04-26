/*************************************************
作者：子牛连
类名：TestVmaxRise
说明：放量涨
创建日期：23-四月-2019 15:29:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gu",
	"LZR.Pro.Gu.InfTest"
], "LZR.Pro.Gu.TestVmaxRise");
LZR.Pro.Gu.TestVmaxRise = function (obj) /*bases:LZR.Pro.Gu.InfTest*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.TestVmaxRise.prototype = LZR.clone (LZR.Pro.Gu.InfTest.prototype, LZR.Pro.Gu.TestVmaxRise.prototype);
LZR.Pro.Gu.TestVmaxRise.prototype.super_ = [LZR.Pro.Gu.InfTest];
LZR.Pro.Gu.TestVmaxRise.prototype.className_ = "LZR.Pro.Gu.TestVmaxRise";
LZR.Pro.Gu.TestVmaxRise.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu.TestVmaxRise");

// 构造器
LZR.Pro.Gu.TestVmaxRise.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.TestVmaxRise.prototype.init_.lzrClass_ = LZR.Pro.Gu.TestVmaxRise;

// 对构造参数的特殊处理
LZR.Pro.Gu.TestVmaxRise.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Pro.Gu.TestVmaxRise.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu.TestVmaxRise;

// ----获取参数初始值
LZR.Pro.Gu.TestVmaxRise.prototype.getProInit = function ()/*as:Object*/ {
	return {
		zsy: 30,	// 止盈
		zss: 10,	// 止损
		sf: 1,	// 幅度
		dayd: 250,	// 天数周期
		dayv: 8,	// 量周期
		days: "",	// 起始时间
		daye: ""	// 结束时间
	};
};
LZR.Pro.Gu.TestVmaxRise.prototype.getProInit.lzrClass_ = LZR.Pro.Gu.TestVmaxRise;

// ----获取参数
LZR.Pro.Gu.TestVmaxRise.prototype.getPro = function () {
	this.cp.h = zsy.value / 100 + 1;	// 止盈
	this.cp.l = zss.value / -100 + 1;	// 止损
	this.cp.f = sf.value - 0;	// 幅度
	this.cp.d = dayd.value - 0;	// 天数周期
	this.cp.p = 0;	// 价周期
	this.cp.v = dayv.value - 0;	// 量周期
	this.cp.days = this.utTim.getDayTimestamp(days.value + " 0 =0");	// 起始时间
	this.cp.daye = this.utTim.getDayTimestamp(daye.value + " 0:0");	// 结束时间
};
LZR.Pro.Gu.TestVmaxRise.prototype.getPro.lzrClass_ = LZR.Pro.Gu.TestVmaxRise;

// ----条件匹配
LZR.Pro.Gu.TestVmaxRise.prototype.match = function (o/*as:Object*/)/*as:boolean*/ {
	o.p = o.s.c;
	if (
		o.v > o.vh &&
		o.s.f > this.cp.f
	) {
		return true;
	}
	return false;
};
LZR.Pro.Gu.TestVmaxRise.prototype.match.lzrClass_ = LZR.Pro.Gu.TestVmaxRise;
