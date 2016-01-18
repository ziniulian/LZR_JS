/*************************************************
作者：子牛连
类名：String
说明：字符串
创建日期：14-一月-2016 11:02:50
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.String");
LZR.Base.String = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.String.prototype.className_ = "LZR.Base.String";
LZR.Base.String.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.String");

// 构造器
LZR.Base.String.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 转固定宽度的字符
LZR.Base.String.format = function (s/*as:string*/, width/*as:int*/, subs/*as:string*/) {
	s += "";
	var n = s.length;
	if (width > n) {
		n = width - n;
		for (var i=0; i<n; i++) {
			s = subs + s;
		}
	}
	return s;
};