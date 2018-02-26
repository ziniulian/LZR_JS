/*************************************************
作者：子牛连
类名：Math
说明：数学
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Math");
LZR.Base.Math = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
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
LZR.Base.Math.prototype.init_.lzrClass_ = LZR.Base.Math;

// 对构造参数的特殊处理
LZR.Base.Math.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Base.Math.prototype.hdObj_.lzrClass_ = LZR.Base.Math;

// 消除小数的精度误差
LZR.Base.Math.prototype.formatFloat = function (f/*as:double*/, digit/*as:int*/)/*as:double*/ {
	var m = Math.pow(10, digit);
	return parseInt(f * m, 10) / m;
};
LZR.Base.Math.prototype.formatFloat.lzrClass_ = LZR.Base.Math;

// 格式化为指定精度的字串
LZR.Base.Math.prototype.format = function (f/*as:double*/, digit/*as:int*/)/*as:string*/ {
	var m = Math.pow(10, digit);
	var d = Math.floor(f);
	var x = Math.floor((f - d) * m) + "";
	var n = x.length;
	if (digit > n) {
		n = digit - n;
		for (var i = 0; i < n; i++) {
			x = "0" + x;
		}
	}
	return d + "." + x;
};
LZR.Base.Math.prototype.format.lzrClass_ = LZR.Base.Math;

// 将字符串转换成数字
LZR.Base.Math.prototype.str2num = function (num/*as:string*/)/*as:double*/ {
	if (num || (num === 0)) {
		return num - 0;
	} else {
		return NaN;
	}
};
LZR.Base.Math.prototype.str2num.lzrClass_ = LZR.Base.Math;
