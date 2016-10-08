/*************************************************
作者：子牛连
类名：Str
说明：字符串
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Str");
LZR.Base.Str = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Str.prototype.className_ = "LZR.Base.Str";
LZR.Base.Str.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Str");

// 构造器
LZR.Base.Str.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.Str.prototype.init_.lzrClass_ = LZR.Base.Str;

// 转固定宽度的字符
LZR.Base.Str.prototype.format = function (s/*as:string*/, width/*as:int*/, subs/*as:string*/) {
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
LZR.Base.Str.prototype.format.lzrClass_ = LZR.Base.Str;

// 判断字符串是否以start字串开头
LZR.Base.Str.prototype.startWith = function (s/*as:string*/, start/*as:string*/) {
	var reg=new RegExp("^"+start);
	return reg.test(s);
};
LZR.Base.Str.prototype.startWith.lzrClass_ = LZR.Base.Str;

// 判断字符串是否以end字串结束
LZR.Base.Str.prototype.endWith = function (s/*as:string*/, end/*as:string*/) {
	var reg=new RegExp(end+"$");
	return reg.test(s);
};
LZR.Base.Str.prototype.endWith.lzrClass_ = LZR.Base.Str;

// 对构造参数的特殊处理
LZR.Base.Str.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.Str.prototype.hdObj_.lzrClass_ = LZR.Base.Str;