/*************************************************
作者：子牛连
类名：BlockLegend
说明：色块图例
创建日期：21-六月-2016 14:21:12
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Widget/Legend/BlockLegend.css"
});

LZR.load([
	"LZR.HTML.Widget.Legend",
	"LZR.Base.Clr"
], "LZR.HTML.Widget.Legend.BlockLegend");
LZR.HTML.Widget.Legend.BlockLegend = function (obj) /*bases:LZR.HTML.Widget.Legend*/ {
	LZR.initSuper(this, obj);

	// 类型编号
	this.typ = 1;	/*as:int*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Widget.Legend.BlockLegend.prototype = LZR.clone (LZR.HTML.Widget.Legend.prototype, LZR.HTML.Widget.Legend.BlockLegend.prototype);
LZR.HTML.Widget.Legend.BlockLegend.prototype.super_ = [LZR.HTML.Widget.Legend];
LZR.HTML.Widget.Legend.BlockLegend.prototype.className_ = "LZR.HTML.Widget.Legend.BlockLegend";
LZR.HTML.Widget.Legend.BlockLegend.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Widget.Legend.BlockLegend");

// 构造器
LZR.HTML.Widget.Legend.BlockLegend.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 生成一个色块
LZR.HTML.Widget.Legend.BlockLegend.prototype.crtOneBlock = function (clr/*as:LZR.HTML.Widget.Legend.LegendClr*/, mark/*as:boolean*/)/*as:LZR.HTML.Base.Doe*/ {
	var r = new this.view.constructor({
		dat: clr,
		hd_typ: "div",
		hd_css: "Lc_hwg_BlockLegend"
	});
	if (mark && (clr.clr.alpha === 0)) {
		r.addCss("Lc_hwg_BlockLegendHid");
	}
	r.setStyle("background-color", clr.clr.toCss());
	return r;
};

// 生成中部遮罩背景
LZR.HTML.Widget.Legend.BlockLegend.prototype.crtMidBackground = function (clrs/*as:Array*/)/*as:string*/ {
	var r = "linear-gradient(to right";
	var c = clrs.length - 1;
	var d = 100/(clrs.length - 1);
	for (var i=1; i<clrs.length; i++) {
		r += ", ";
		r += clrs[i];
		r += " ";
		r += ((i-1) * d);
		r += "%";

		r += ", ";
		r += clrs[i];
		r += " ";
		r += (i * d);
		r += "%";
	}
	return r;
};

// 生成刻度
LZR.HTML.Widget.Legend.BlockLegend.prototype.crtCalibration = function (doeo/*as:LZR.HTML.Base.Doe*/, clr/*as:LZR.HTML.Widget.Legend.LegendClr*/, boderCss/*as:string*/, fontCss/*as:string*/) {
	var cf, cb;
	cf = new this.view.constructor({
		hd_typ: "div",
		hd_css: fontCss
	});

	if (clr.alias === "") {
		cb = this.min + clr.position * (this.max - this.min);
		if (this.digit !== null) {
			cb = this.utMath.formatFloat(cb, this.digit);
		}
		cf.doe.innerHTML = cb;
	} else if (clr.alias) {
		cf.doe.innerHTML = clr.alias;
	}
	doeo.add(cf, fontCss);

	cb = new this.view.constructor({
		hd_typ: "div",
		hd_css: boderCss
	});
	doeo.add(cb, boderCss);
};

// ---- 初始化刷新
LZR.HTML.Widget.Legend.BlockLegend.prototype.initFlush = function (doeo/*as:LZR.HTML.Base.Doe*/, isPreview/*as:boolean*/) {
	var c = [];
	for (var s in this.subs) {
		if (this.subs[s].clr.r > -1) {
			this.subs[s].clr.alpha = 1;
			c.push(this.subs[s].clr.toCss());
		}
	}
	this.viewMarkMid.setStyle("background", this.crtMidBackground(c));
	this.flush(doeo, isPreview);
};

// ---- 刷新
LZR.HTML.Widget.Legend.BlockLegend.prototype.flush = function (doeo/*as:LZR.HTML.Base.Doe*/, isPreview/*as:boolean*/) {
	if (doeo) {
		var i, w, s, d, cf, cb, c=[];
		for (i=1; i<this.count; i++) {
			if (this.subs[i].clr.r > -1) {
				c.push(this.subs[i]);
			}
		}
		if (c.length > 0) {
			doeo.delAll();
			d = this.max - this.min;
			w = 100 / c.length;
			for (i=0; i<c.length; i++) {
				s = this.crtOneBlock(c[i], !isPreview);
				if (!isPreview) {
					c[i].view = s;

					// 生成刻度
					this.crtCalibration (s, c[i], this.cbCss, this.cfCss);
					if (i === 0) {
						this.crtCalibration (s, this.subs[c[i].id.get() - 1], this.fcbCss, this.fcfCss);
					}
				}
				s.setStyle("width", w + "%");
				doeo.add(s, i + "_BlockLegend");
			}
		}
	} else {
		this.flush(this.viewPre, true);
		this.flush(this.viewLegend);
		this.viewUnit.doe.innerHTML = this.unit;
	}
};

// ---- 通过位置获取颜色
LZR.HTML.Widget.Legend.BlockLegend.prototype.getClrByPosition = function (position/*as:double*/)/*as:LZR.Base.Clr*/ {
	var i;
	if (position >= 1) {
		i = this.viewLegend.count - 1;
	} else if (position <= 0) {
		i = 0;
	} else {
		i = Math.floor(position * this.viewLegend.count);
	}
	return this.viewLegend.subs[i + "_BlockLegend"].dat.clr;
};

// ---- 通过位置获取值信息
LZR.HTML.Widget.Legend.BlockLegend.prototype.getValByPosition = function (position/*as:double*/)/*as:string*/ {
	var fc, v, d, r="";
	if (position >= 1) {
		d = this.viewLegend.count - 1;
	} else if (position <= 0) {
		d = 0;
	} else {
		d = Math.floor(position * this.viewLegend.count);
	}
	d = this.viewLegend.subs[d + "_BlockLegend"].dat;

	// 显示别名
	if (d.alias) {
		return d.alias;
	}

	fc = this.subs[(d.id.get() - 1)];

	v = this.min + fc.position * (this.max - this.min);
	if (this.digit !== null) {
		v = this.utMath.formatFloat(v, this.digit);
	}
	r += v;
	r += " - ";

	v = this.min + d.position * (this.max - this.min);
	if (this.digit !== null) {
		v = this.utMath.formatFloat(v, this.digit);
	}
	r += v;
	// r += " ";
	// r += this.unit;

	return r;
};

// ---- 通过位置获取值
LZR.HTML.Widget.Legend.BlockLegend.prototype.getValueByPosition = function (position/*as:double*/)/*as:string*/ {
	if (position >= 1) {
		return this.max;
	} else if (position <= 0) {
		return this.min;
	} else {
		var r;
		var p = position * this.viewLegend.count;
		var i = Math.floor(p);
		var d = this.viewLegend.subs[i + "_BlockLegend"].dat;
		var fc = this.subs[(d.id.get() - 1)];
		var min = this.min + fc.position * (this.max - this.min);
		var max = this.min + d.position * (this.max - this.min);

		p = p-i;
		r = min + p*(max - min);

		return r;
	}
};
