/*************************************************
作者：子牛连
类名：TestVmaxFall
说明：放量跌
创建日期：23-四月-2019 16:32:48
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gu",
	"LZR.Pro.Gu.TestVmaxRise"
], "LZR.Pro.Gu.TestVmaxFall");
LZR.Pro.Gu.TestVmaxFall = function (obj) /*bases:LZR.Pro.Gu.TestVmaxRise*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.TestVmaxFall.prototype = LZR.clone (LZR.Pro.Gu.TestVmaxRise.prototype, LZR.Pro.Gu.TestVmaxFall.prototype);
LZR.Pro.Gu.TestVmaxFall.prototype.super_ = [LZR.Pro.Gu.TestVmaxRise];
LZR.Pro.Gu.TestVmaxFall.prototype.className_ = "LZR.Pro.Gu.TestVmaxFall";
LZR.Pro.Gu.TestVmaxFall.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu.TestVmaxFall");

// 构造器
LZR.Pro.Gu.TestVmaxFall.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.TestVmaxFall.prototype.init_.lzrClass_ = LZR.Pro.Gu.TestVmaxFall;

// 对构造参数的特殊处理
LZR.Pro.Gu.TestVmaxFall.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Pro.Gu.TestVmaxFall.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu.TestVmaxFall;

// ----获取参数初始值
LZR.Pro.Gu.TestVmaxFall.prototype.getProInit = function ()/*as:Object*/ {
	return {
		zsy: 30,	// 止盈
		zss: 10,	// 止损
		sf: -1,	// 幅度
		dayd: 250,	// 天数周期
		dayv: 3,	// 量周期
		days: "",	// 起始时间
		daye: ""	// 结束时间
	};
};
LZR.Pro.Gu.TestVmaxFall.prototype.getProInit.lzrClass_ = LZR.Pro.Gu.TestVmaxRise;

// ----条件匹配
LZR.Pro.Gu.TestVmaxFall.prototype.match = function (o/*as:Object*/)/*as:boolean*/ {
	o.p = o.s.c;
	if (
		o.v > o.vh &&
		o.s.f < this.cp.f
	) {
		return true;
	}
	return false;
};
LZR.Pro.Gu.TestVmaxFall.prototype.match.lzrClass_ = LZR.Pro.Gu.TestVmaxFall;
