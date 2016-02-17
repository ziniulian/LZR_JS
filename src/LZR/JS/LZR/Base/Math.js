/*************************************************
作者：子牛连
类名：Math
说明：数学
创建日期：16-二月-2016 15:28:31
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Math");
LZR.Base.Math = function (obj) {
	if (obj && obj.super_) {
		this.init_();
	} else {
		this.init_(obj);
	}
};
LZR.Base.Math.prototype.className_ = "LZR.Base.Math";
LZR.Base.Math.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Math");

// 构造器
LZR.Base.Math.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 消除小数的精度误差
LZR.Base.Math.prototype.formatFloat = function (f/*as:double*/, digit/*as:int*/)/*as:double*/ {
	var m = Math.pow(10, digit);
	return parseInt(f * m, 10) / m;
};