/*************************************************
作者：子牛连
类名：Math
说明：数学
创建日期：11-三月-2016 14:24:41
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Math");
LZR.Base.Math = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
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
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.Math.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 消除小数的精度误差
LZR.Base.Math.prototype.formatFloat = function (f/*as:double*/, digit/*as:int*/)/*as:double*/ {
	var m = Math.pow(10, digit);
	return parseInt(f * m, 10) / m;
};
