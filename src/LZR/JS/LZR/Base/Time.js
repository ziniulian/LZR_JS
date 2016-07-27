/*************************************************
作者：子牛连
类名：Time
说明：时间工具
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Str"
], "LZR.Base.Time");
LZR.Base.Time = function (obj) {
	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
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
LZR.Base.Time.prototype.init_.lzrClass_ = LZR.Base.Time;

// 字符串转时间
LZR.Base.Time.prototype.stringToDate = function (strDate/*as:string*/)/*as:Date*/ {
	var r = strDate.match(/\d+/g);
	r[1]--;
	// return eval( "new Date(" + strDate.replace( /\d+(?=-[^-]+$)/, function (a) { console.log (a); return parseInt(a, 10) - 1; } ).match(/\d+/g) + ")" );
	return eval( "new Date(" + r + ")" );
};
LZR.Base.Time.prototype.stringToDate.lzrClass_ = LZR.Base.Time;

// 时间转换为字符串
LZR.Base.Time.prototype.format = function (date/*as:Date*/, format/*as:string*/)/*as:string*/ {
	var s;
	switch (format) {
		case "date":
			s = date.getFullYear();
			s += "-";
			s += date.getMonth() + 1;
			s += "-";
			s += date.getDate();
			break;
		case "dateChn":
			s = date.getFullYear();
			s += "年";
			s += date.getMonth() + 1;
			s += "月";
			s += date.getDate();
			s += "日";
			break;
		case "hourChn":
			s = date.getFullYear();
			s += "年";
			s += date.getMonth() + 1;
			s += "月";
			s += date.getDate();
			s += "日";
			s += this.utStr.format(date.getHours(), 2, "0");
			s += "时";
			break;
		case "mdChn":
			s = date.getMonth() + 1;
			s += "月";
			s += date.getDate();
			s += "日";
			break;
		case "weekChn":
			switch (date.getDay()) {
				case 0:
					s = "周日";
					break;
				case 1:
					s = "周一";
					break;
				case 2:
					s = "周二";
					break;
				case 3:
					s = "周三";
					break;
				case 4:
					s = "周四";
					break;
				case 5:
					s = "周五";
					break;
				case 6:
					s = "周六";
					break;
			}
			break;
		default:
			s = date.getFullYear();
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
			break;
	}
	return s;
};
LZR.Base.Time.prototype.format.lzrClass_ = LZR.Base.Time;

// 时间圆整
LZR.Base.Time.prototype.normalize = function (date/*as:Date*/, hour/*as:int*/, clone/*as:boolean*/)/*as:Date*/ {
	if (!date) {
		date = this.getDate();
	} else if (clone) {
		date = new Date(date.valueOf());
	}
	if (isNaN(hour)) {
		hour = date.getHours();
	}
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	date.setHours(hour);
	return date;
};
LZR.Base.Time.prototype.normalize.lzrClass_ = LZR.Base.Time;

// 时间加N个小时的时间
LZR.Base.Time.prototype.addHour = function (n/*as:int*/, date/*as:Date*/, clone/*as:boolean*/)/*as:Date*/ {
	if (!date) {
		date = this.getDate();
	} else if (clone) {
		date = new Date(date.valueOf());
	}
	date.setTime(date.valueOf() + n * 3600 * 1000);
	return date;
};
LZR.Base.Time.prototype.addHour.lzrClass_ = LZR.Base.Time;

// 复制一个时间
LZR.Base.Time.prototype.clone = function (date/*as:Date*/)/*as:Date*/ {
	if (!date) {
		return this.getDate();
	}
	return new Date(date.valueOf());
};
LZR.Base.Time.prototype.clone.lzrClass_ = LZR.Base.Time;

// 对构造参数的特殊处理
LZR.Base.Time.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.Time.prototype.hdObj_.lzrClass_ = LZR.Base.Time;

// 获取当前时间
LZR.Base.Time.prototype.getDate = function ()/*as:Date*/ {
	return new Date();
};
LZR.Base.Time.prototype.getDate.lzrClass_ = LZR.Base.Time;

// 获取当前时间值
LZR.Base.Time.prototype.getTim = function ()/*as:int*/ {
	return this.getDate().getTime();
};
LZR.Base.Time.prototype.getTim.lzrClass_ = LZR.Base.Time;