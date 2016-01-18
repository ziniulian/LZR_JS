/*************************************************
作者：子牛连
类名：Date
说明：时间
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Date");
LZR.Base.Date = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Date.prototype.className_ = "LZR.Base.Date";
LZR.Base.Date.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Date");

// 构造器
LZR.Base.Date.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 字符串转时间
LZR.Base.Date.stringToDate = function (date/*as:string*/)/*as:Date*/ {
	return eval( 'new Date(' + strDate.replace( /\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; } ).match(/\d+/g) + ')' );
};

// 时间转换为字符串
LZR.Base.Date.format = function (date/*as:Date*/, format/*as:string*/)/*as:string*/ {
	var s = date.getFullYear();
	s += "-";
	s += date.getMonth() + 1;
	s += "-";
	s += date.getDate();
	s += " ";
	s += LZR.HTML5.Util.format(date.getHours(), 2, "0");
	s += ":";
	s += LZR.HTML5.Util.format(date.getMinutes(), 2, "0");
	s += ":";
	s += LZR.HTML5.Util.format(date.getSeconds(), 2, "0");
	return s;
};

// 时间圆整
LZR.Base.Date.normalize = function (date/*as:Date*/, hour/*as:int*/, clone/*as:boolean*/)/*as:Date*/ {
	if (!date) {
		date = new Date();
	} else if (clone) {
		date = new Date(date.valueOf());
	}
	if (!hour) {
		hour = 0;
	}
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	date.setHours(hour);
	return date;
};

// 时间加N个小时的时间
LZR.Base.Date.addHour = function (n/*as:int*/, date/*as:Date*/, clone/*as:boolean*/)/*as:Date*/ {
	if (!date) {
		date = new Date();
	} else if (clone) {
		date = new Date(date.valueOf());
	}
	date.setTime(date.valueOf() + n * 3600 * 1000);
	return date;
};

// 复制一个时间
LZR.Base.Date.clone = function (date/*as:Date*/)/*as:Date*/ {
	if (!date) {
		date = new Date();
	}
	return new Date(date.valueOf());
};