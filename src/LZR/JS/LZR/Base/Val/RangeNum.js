/*************************************************
作者：子牛连
类名：RangeNum
说明：带范围的数值
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Val",
	"LZR.Base.Val.Ctrl",
	"LZR.Util"
], "LZR.Base.Val.RangeNum");
LZR.Base.Val.RangeNum = function (obj) {
	// 是否圆整
	this.isNorm = true;	/*as:boolean*/

	// 是否保证在范围内
	this.inLimit = true;	/*as:boolean*/

	// 最大值
	this.vcMax/*m*/ = new LZR.Base.Val.Ctrl(100);	/*as:LZR.Base.Val.Ctrl*/

	// 最小值
	this.vcMin/*m*/ = new LZR.Base.Val.Ctrl(0);	/*as:LZR.Base.Val.Ctrl*/

	// 步距
	this.vcStep/*m*/ = new LZR.Base.Val.Ctrl(1);	/*as:LZR.Base.Val.Ctrl*/

	// 当前数值
	this.vcNum/*m*/ = new LZR.Base.Val.Ctrl(0);	/*as:LZR.Base.Val.Ctrl*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.RangeNum.prototype.className_ = "LZR.Base.Val.RangeNum";
LZR.Base.Val.RangeNum.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val.RangeNum");

// 增减n个步距
LZR.Base.Val.RangeNum.prototype.add = function (n/*as:int*/)/*as:double*/ {
	if (n !== 0) {
		if (!n) {
			n = 1;
		}
		this.set(this.vcStep.get() * n + this.vcNum.get());
	}
	return this.vcNum.get();
};
LZR.Base.Val.RangeNum.prototype.add.lzrClass_ = LZR.Base.Val.RangeNum;

// 设置
LZR.Base.Val.RangeNum.prototype.set = function (num/*as:double*/, doEvt/*as:boolean*/)/*as:double*/ {
	this.vcNum.set (this.check(num), doEvt);
	return this.vcNum.get();
};
LZR.Base.Val.RangeNum.prototype.set.lzrClass_ = LZR.Base.Val.RangeNum;

// 圆整数据
LZR.Base.Val.RangeNum.prototype.normalize = function (v/*as:double*/, noLimit/*as:boolean*/)/*as:double*/ {
	var b;
	var t = this.vcStep.get();
	var min = this.vcMin.get();
	if (!noLimit) {
		v = this.checkLimit(v);
	}
	v -= min;
	b = Math.round(v/t);
	v = b*t + min;
	return v;
};
LZR.Base.Val.RangeNum.prototype.normalize.lzrClass_ = LZR.Base.Val.RangeNum;

// 构造器
LZR.Base.Val.RangeNum.prototype.init_ = function (obj/*as:Object*/) {
	this.vcMax.evt.change.add (this.utLzr.bind(this, this.reset), "RangeNum_reset");
	this.vcMin.evt.change.add (this.utLzr.bind(this, this.reset), "RangeNum_reset");
	this.vcStep.evt.change.add (this.utLzr.bind(this, this.reset), "RangeNum_reset");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.Val.RangeNum.prototype.init_.lzrClass_ = LZR.Base.Val.RangeNum;

// 对构造参数的特殊处理
LZR.Base.Val.RangeNum.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.max !== undefined) {
		this.vcMax.set(obj.max, false);
	}
	if (obj.min !== undefined) {
		this.vcMin.set(obj.min, false);
	}
	if (obj.step !== undefined) {
		this.vcStep.set(obj.step, false);
	}
	if (obj.num !== undefined) {
		this.set(obj.num, false);
	} else {
		this.reset(false);
	}
};
LZR.Base.Val.RangeNum.prototype.hdObj_.lzrClass_ = LZR.Base.Val.RangeNum;

// 数据检查
LZR.Base.Val.RangeNum.prototype.check = function (v/*as:double*/)/*as:double*/ {
	if (this.isNorm) {
		v = this.normalize(v);
	} else {
		v = this.checkLimit(v);
	}
	return v;
};
LZR.Base.Val.RangeNum.prototype.check.lzrClass_ = LZR.Base.Val.RangeNum;

// 检查并重设数据
LZR.Base.Val.RangeNum.prototype.reset = function (doEvt/*as:boolean*/)/*as:double*/ {
	var n = this.vcNum.get();
	var v = this.check(n);
	if (v !== n) {
		this.vcNum.set (v, doEvt);
	}
	return v;
};
LZR.Base.Val.RangeNum.prototype.reset.lzrClass_ = LZR.Base.Val.RangeNum;

// 获取值
LZR.Base.Val.RangeNum.prototype.get = function ()/*as:double*/ {
	return this.vcNum.get();
};
LZR.Base.Val.RangeNum.prototype.get.lzrClass_ = LZR.Base.Val.RangeNum;

// 检查数据界限
LZR.Base.Val.RangeNum.prototype.checkLimit = function (v/*as:double*/)/*as:double*/ {
	if (this.inLimit) {
		if (v > this.vcMax.get()) {
			v = this.vcMax.get();
		} else if (v < this.vcMin.get()) {
			v = this.vcMin.get();
		}
	}
	return v;
};
LZR.Base.Val.RangeNum.prototype.checkLimit.lzrClass_ = LZR.Base.Val.RangeNum;