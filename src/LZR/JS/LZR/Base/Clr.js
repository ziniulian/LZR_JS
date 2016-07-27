/*************************************************
作者：子牛连
类名：Clr
说明：颜色
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Str"
], "LZR.Base.Clr");
LZR.Base.Clr = function (obj) {
	// 红值
	this.r = 0;	/*as:int*/

	// 绿值
	this.g = 0;	/*as:int*/

	// 蓝值
	this.b = 0;	/*as:int*/

	// 透明度
	this.alpha = 1;	/*as:double*/

	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Clr.prototype.className_ = "LZR.Base.Clr";
LZR.Base.Clr.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Clr");

// 构造器
LZR.Base.Clr.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.Clr.prototype.init_.lzrClass_ = LZR.Base.Clr;

// 对构造参数的特殊处理
LZR.Base.Clr.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.Clr.prototype.hdObj_.lzrClass_ = LZR.Base.Clr;

// 返回#形式的颜色字串
LZR.Base.Clr.prototype.toCss = function ()/*as:string*/ {
	var s = "#";
	s += this.utStr.format(this.r.toString(16), 2, "0");
	s += this.utStr.format(this.g.toString(16), 2, "0");
	s += this.utStr.format(this.b.toString(16), 2, "0");
	return s;
};
LZR.Base.Clr.prototype.toCss.lzrClass_ = LZR.Base.Clr;

// 返回 RGBA 字串格式
LZR.Base.Clr.prototype.toRgba = function ()/*as:string*/ {
	return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.alpha + ")";
};
LZR.Base.Clr.prototype.toRgba.lzrClass_ = LZR.Base.Clr;

// 解析#形式的颜色字串
LZR.Base.Clr.parseCss = function (clr/*as:string*/)/*as:Object*/ {
	if (clr[0] === "#") {
		var r = new this();
		if (clr.length === 4) {
			r.r = parseInt((clr[1] + clr[1]), 16) ;
			r.g = parseInt((clr[2] + clr[2]), 16) ;
			r.b = parseInt((clr[3] + clr[3]), 16) ;
			r.alpha = 1;
		} else if (clr.length === 7) {
			r.r = parseInt((clr[1] + clr[2]), 16) ;
			r.g = parseInt((clr[3] + clr[4]), 16) ;
			r.b = parseInt((clr[5] + clr[6]), 16) ;
			r.alpha = 1;
		}
		return r;
	} else {
		return null;
	}
};
LZR.Base.Clr.parseCss.lzrClass_ = LZR.Base.Clr;

// 获取相反色
LZR.Base.Clr.prototype.invert = function ()/*as:Object*/ {
	return new this.constructor({
		r: 255 - this.r,
		g: 255 - this.g,
		b: 255 - this.b,
		alpha: this.alpha
	});
};
LZR.Base.Clr.prototype.invert.lzrClass_ = LZR.Base.Clr;

// 返回四色数组
LZR.Base.Clr.prototype.toAry = function ()/*as:Array*/ {
	return [this.r, this.g, this.b, (Math.floor(this.alpha * 255))];
};
LZR.Base.Clr.prototype.toAry.lzrClass_ = LZR.Base.Clr;