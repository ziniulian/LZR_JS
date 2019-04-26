/*************************************************
作者：子牛连
类名：Test3R
说明：三阳
创建日期：24-四月-2019 15:46:06
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gu",
	"LZR.Pro.Gu.InfTest"
], "LZR.Pro.Gu.Test3R");
LZR.Pro.Gu.Test3R = function (obj) /*bases:LZR.Pro.Gu.InfTest*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.Test3R.prototype = LZR.clone (LZR.Pro.Gu.InfTest.prototype, LZR.Pro.Gu.Test3R.prototype);
LZR.Pro.Gu.Test3R.prototype.super_ = [LZR.Pro.Gu.InfTest];
LZR.Pro.Gu.Test3R.prototype.className_ = "LZR.Pro.Gu.Test3R";
LZR.Pro.Gu.Test3R.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu.Test3R");

// 构造器
LZR.Pro.Gu.Test3R.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.Test3R.prototype.init_.lzrClass_ = LZR.Pro.Gu.Test3R;

// 对构造参数的特殊处理
LZR.Pro.Gu.Test3R.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Pro.Gu.Test3R.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu.Test3R;

// 获取参数初始值
LZR.Pro.Gu.Test3R.prototype.getProInit = function ()/*as:Object*/ {
	return {
		zsy: 5,	// 止盈
		zss: 0,	// 止损
		sf: 0,	// 幅度
		dayd: 0,	// 天数周期
		dayv: 10,	// 量周期
		days: "",	// 起始时间
		daye: ""	// 结束时间
	};
};
LZR.Pro.Gu.Test3R.prototype.getProInit.lzrClass_ = LZR.Pro.Gu.Test3R;

// 获取参数
LZR.Pro.Gu.Test3R.prototype.getPro = function () {
	this.cp.h = zsy.value / 100 + 1;	// 止盈
	this.cp.l = zss.value / -100 + 1;	// 止损
	this.cp.f = sf.value - 0;	// 幅度
	this.cp.d = dayd.value - 0;	// 天数周期
	this.cp.p = 0;	// 价周期
	this.cp.v = dayv.value - 0;	// 量周期
	this.cp.days = this.utTim.getDayTimestamp(days.value + " 0 =0");	// 起始时间
	this.cp.daye = this.utTim.getDayTimestamp(daye.value + " 0:0");	// 结束时间
};
LZR.Pro.Gu.Test3R.prototype.getPro.lzrClass_ = LZR.Pro.Gu.Test3R;

// 条件匹配
LZR.Pro.Gu.Test3R.prototype.match = function (o/*as:Object*/, i/*as:int*/)/*as:boolean*/ {
	if (o.s.f > 0) {
		var j, t;

		// 找出阳量区间
		o.p = o.s.c;
		o.pl = o.s.l;
		for (j = 1; j < 3; j ++) {
			t = this.sr[i - j];
			if (t.f > 0) {
				if (o.pl > t.l) {
					o.pl = t.l;
				}
				if (o.v < t.v) {
					o.v = t.v;
				}
			} else {
				break;
			}
		}

		// 判断是否放量
		if (o.v >= o.vh) {
			o.pc = o.p / o.pl * 100 -100;	// 涨幅
			if (this.cp.l && this.cp.f && this.cp.d) {
				if (o.pc > this.cp.f) {
					return true;
				}
			} else {
				// 自动比对
				if (o.pc > 7) {
					this.cp.d = 20;	// 天数周期
					o.l = o.pl;	// 止损位
					return true;
				} else if (o.pc > 5) {
					this.cp.d = 10;
					o.l = (o.p - o.pl)/2 + o.pl;
					return true;
				} else if (o.pc > 3) {
					this.cp.d = 5;
					o.l = o.p - (o.p - o.pl)/3;
					return true;
				}
			}
		}
	}
	return false;
};
LZR.Pro.Gu.Test3R.prototype.match.lzrClass_ = LZR.Pro.Gu.Test3R;
