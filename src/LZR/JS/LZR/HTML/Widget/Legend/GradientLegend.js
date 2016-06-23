/*************************************************
作者：子牛连
类名：GradientLegend
说明：渐变色图例
创建日期：23-六月-2016 17:43:41
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Widget.Legend"
], "LZR.HTML.Widget.Legend.GradientLegend");
LZR.HTML.Widget.Legend.GradientLegend = function (obj) /*bases:LZR.HTML.Widget.Legend*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Widget.Legend.GradientLegend.prototype = LZR.clone (LZR.HTML.Widget.Legend.prototype, LZR.HTML.Widget.Legend.GradientLegend.prototype);
LZR.HTML.Widget.Legend.GradientLegend.prototype.super_ = [LZR.HTML.Widget.Legend];
LZR.HTML.Widget.Legend.GradientLegend.prototype.className_ = "LZR.HTML.Widget.Legend.GradientLegend";
LZR.HTML.Widget.Legend.GradientLegend.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Widget.Legend.GradientLegend");

// 构造器
LZR.HTML.Widget.Legend.GradientLegend.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};