/*************************************************
作者：子牛连
类名：GradientLegend
说明：渐变色图例
创建日期：24-六月-2016 13:56:54
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Widget.Legend",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Widget.Legend.LegendClr",
	"LZR.HTML.Widget.Legend.BlockLegend"
], "LZR.HTML.Widget.Legend.GradientLegend");
LZR.HTML.Widget.Legend.GradientLegend = function (obj) /*bases:LZR.HTML.Widget.Legend.BlockLegend*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Widget.Legend.GradientLegend.prototype = LZR.clone (LZR.HTML.Widget.Legend.BlockLegend.prototype, LZR.HTML.Widget.Legend.GradientLegend.prototype);
LZR.HTML.Widget.Legend.GradientLegend.prototype.super_ = [LZR.HTML.Widget.Legend.BlockLegend];
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

// ---- 生成一个色块
LZR.HTML.Widget.Legend.GradientLegend.prototype.crtOneBlock = function (clr/*as:LZR.HTML.Widget.Legend.LegendClr*/, mark/*as:boolean*/)/*as:LZR.HTML.Base.Doe*/ {
	var fc = this.subs[clr.id.get() - 1];
	var r = new this.view.constructor({
		dat: clr,
		hd_typ: "div",
		hd_css: "Lc_hwg_BlockLegend"
	});
	if (mark && (clr.clr.alpha === 0)) {
		r.addCss("Lc_hwg_BlockLegendHid");
	}

	r.setStyle("background", "linear-gradient(to right, " + fc.clr.toCss() + " 0%, " + clr.clr.toCss() + " 100%)");
	return r;
};

// ---- 通过位置获取颜色
LZR.HTML.Widget.Legend.GradientLegend.prototype.getClrByPosition = function (position/*as:double*/)/*as:LZR.Base.Clr*/ {
	var p = position * this.viewLegend.count;
	var i = Math.floor(p);
	var d = this.viewLegend.subs[i + "_BlockLegend"].dat;
	var fc = this.subs[(d.id.get() - 1)];
	var r = new d.clr.constructor();
	p = p-i;
	r.r = Math.floor(p * (d.clr.r - fc.clr.r) + fc.clr.r);
	r.b = Math.floor(p * (d.clr.b - fc.clr.b) + fc.clr.b);
	r.g = Math.floor(p * (d.clr.g - fc.clr.g) + fc.clr.g);
	return r;
};

// ---- 通过位置获取值
LZR.HTML.Widget.Legend.GradientLegend.prototype.getValByPosition = function (position/*as:double*/)/*as:string*/ {
	var r;
	var p = position * this.viewLegend.count;
	var i = Math.floor(p);
	var d = this.viewLegend.subs[i + "_BlockLegend"].dat;
	var fc = this.subs[(d.id.get() - 1)];
	var min = this.min + fc.position * (this.max - this.min);
	var max = this.min + d.position * (this.max - this.min);

	p = p-i;
	r = min + p*(max - min);

	if (this.digit !== null) {
		r = this.utMath.formatFloat(r, this.digit);
	}
	r += " ";
	r += this.unit;

	return r;
};
