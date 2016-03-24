/*************************************************
作者：子牛连
类名：EmClr
说明：常用颜色枚举
创建日期：24-三月-2016 15:12:39
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Clr",
	"LZR.Base.Str",
	"LZR.Base.Val.Enum"
], "LZR.Base.EmClr");
LZR.Base.EmClr = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.EmClr.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Base.EmClr.prototype);
LZR.Base.EmClr.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Base.EmClr.prototype.className_ = "LZR.Base.EmClr";
LZR.Base.EmClr.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.EmClr");

// 五级污染
LZR.Base.EmClr.v5/*m*/ = new LZR.Base.Clr({
	r: 153,
	b: 76
});	/*as:LZR.Base.Clr*/

// 六级污染
LZR.Base.EmClr.v6/*m*/ = new LZR.Base.Clr({
	r: 126,
	b: 35
});	/*as:LZR.Base.Clr*/

// 透明色
LZR.Base.EmClr.no/*m*/ = new LZR.Base.Clr({
	alpha: 0
});	/*as:LZR.Base.Clr*/

// 白
LZR.Base.EmClr.white/*m*/ = new LZR.Base.Clr({
	r: 255,
	g: 255,
	b: 255
});	/*as:LZR.Base.Clr*/

// 红
LZR.Base.EmClr.red/*m*/ = new LZR.Base.Clr({
	r: 255
});	/*as:LZR.Base.Clr*/

// 青
LZR.Base.EmClr.aqua/*m*/ = new LZR.Base.Clr({
	r: 0 ,
	g: 255,
	b: 255
});	/*as:LZR.Base.Clr*/

// 绿
LZR.Base.EmClr.green/*m*/ = new LZR.Base.Clr({
	g: 255
});	/*as:LZR.Base.Clr*/

// 蓝
LZR.Base.EmClr.blue/*m*/ = new LZR.Base.Clr({
	b: 255
});	/*as:LZR.Base.Clr*/

// 黑
LZR.Base.EmClr.black/*m*/ = new LZR.Base.Clr();	/*as:LZR.Base.Clr*/

// 黄
LZR.Base.EmClr.yellow/*m*/ = new LZR.Base.Clr({
	r: 255,
	g: 255,
	b: 0
});	/*as:LZR.Base.Clr*/

// 紫
LZR.Base.EmClr.fuchsia/*m*/ = new LZR.Base.Clr({
	r: 255,
	g: 0 ,
	b: 255
});	/*as:LZR.Base.Clr*/

// 一级污染
LZR.Base.EmClr.v1/*m*/ = new LZR.Base.Clr({
	g: 228
});	/*as:LZR.Base.Clr*/

// 三级污染
LZR.Base.EmClr.v3/*m*/ = new LZR.Base.Clr({
	r: 255,
	g: 126
});	/*as:LZR.Base.Clr*/

// 构造器
LZR.Base.EmClr.prototype.init_ = function (obj/*as:Object*/) {
	this.set(obj);
	if (obj) {
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.EmClr.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 灰度处理
LZR.Base.EmClr.prototype.hdGray = function (grayKey/*as:string*/)/*as:Object*/ {
	if (!this.constructor[grayKey]) {
		var s = grayKey.substr(4);
		s = "#" + s + s + s;
// console.log (s);
// console.log (grayKey);
		this.constructor[grayKey] = this.constructor.no.constructor.parseCss(s);
	}
	return this.constructor[grayKey];
};

// ---- 设置值
LZR.Base.EmClr.prototype.set = function (key/*as:string*/)/*as:boolean*/ {
	if (key) {
		this.key = key;
		if (this.utStr.startWith(key, "gray")) {
			this.val = this.hdGray(key);
		} else {
			this.val = this.constructor[key];
		}
	} else {
		this.key = "";
		this.val = this.constructor.no;
	}
	return true;
};
