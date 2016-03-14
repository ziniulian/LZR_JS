/*************************************************
作者：子牛连
类名：Time
说明：时间
创建日期：11-三月-2016 14:23:26
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Str"
], "LZR.Base.Time");
LZR.Base.Time = function (obj) {
	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Time.prototype.className_ = "LZR.Base.Time";
LZR.Base.Time.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Time");

// 构造器
LZR.Base.Time.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.Time.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 字符串转时间
LZR.Base.Time.prototype.stringToDate = function (date/*as:string*/)/*as:Date*/ {
	return eval( "new Date(" + strDate.replace( /\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; } ).match(/\d+/g) + ")" );
};

// 时间转换为字符串
LZR.Base.Time.prototype.format = function (date/*as:Date*/, format/*as:string*/)/*as:string*/ {
	var s = date.getFullYear();
	s += "-";
	s += date.getMonth() + 1;
	s += "-";
	s += date.getDate();
	s += " ";
	s += this.utStr.format(date.getHours(), 2, "0");
	s += ":";
	s += this.utStr.format(date.getMinutes(), 2, "0");
	s += ":";
	s += this.utStr.format(date.getSeconds(), 2, "0");
	return s;
};

// 时间圆整
LZR.Base.Time.prototype.normalize = function (date/*as:Date*/, hour/*as:int*/, clone/*as:boolean*/)/*as:Date*/ {
	if (!date) {
		date = new Date();
	} else if (clone) {
		date = new Date(date.valueOf());
	}
	if (!hour) {
		hour = date.getHours();
	}
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	date.setHours(hour);
	return date;
};

// 时间加N个小时的时间
LZR.Base.Time.prototype.addHour = function (n/*as:int*/, date/*as:Date*/, clone/*as:boolean*/)/*as:Date*/ {
	if (!date) {
		date = new Date();
	} else if (clone) {
		date = new Date(date.valueOf());
	}
	date.setTime(date.valueOf() + n * 3600 * 1000);
	return date;
};

// 复制一个时间
LZR.Base.Time.prototype.clone = function (date/*as:Date*/)/*as:Date*/ {
	if (!date) {
		date = new Date();
	}
	return new Date(date.valueOf());
};
