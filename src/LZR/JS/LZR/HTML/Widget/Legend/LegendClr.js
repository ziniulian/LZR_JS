/*************************************************
作者：子牛连
类名：LegendClr
说明：图例的颜色
创建日期：21-六月-2016 16:20:07
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Widget.Legend",
	"LZR.Base.Data",
	"LZR.Base.Clr"
], "LZR.HTML.Widget.Legend.LegendClr");
LZR.HTML.Widget.Legend.LegendClr = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this, obj);

	// 颜色位置
	this.position = 0;	/*as:double*/

	// 别名
	this.alias = "";	/*as:string*/

	// 颜色
	this.clr/*m*/ = new LZR.Base.Clr();	/*as:LZR.Base.Clr*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Widget.Legend.LegendClr.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.HTML.Widget.Legend.LegendClr.prototype);
LZR.HTML.Widget.Legend.LegendClr.prototype.super_ = [LZR.Base.Data];
LZR.HTML.Widget.Legend.LegendClr.prototype.className_ = "LZR.HTML.Widget.Legend.LegendClr";
LZR.HTML.Widget.Legend.LegendClr.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Widget.Legend.LegendClr");

// 构造器
LZR.HTML.Widget.Legend.LegendClr.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
