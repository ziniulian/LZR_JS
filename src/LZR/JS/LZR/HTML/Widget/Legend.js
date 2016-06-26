/*************************************************
作者：子牛连
类名：Legend
说明：图例
创建日期：23-六月-2016 11:00:40
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/normal.css",
	css_1: "/Lib/css/HTML/Widget/Legend/Legend.css"
});

LZR.load([
	"LZR.HTML.Widget",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Clr",
	"LZR.HTML.Widget.Legend.LegendClr",
	"LZR.Base.Math",
	"LZR.Base.Data"
], "LZR.HTML.Widget.Legend");
LZR.HTML.Widget.Legend = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this, obj);

	// 最小值
	this.min = 0;	/*as:double*/

	// 最大值
	this.max = 0;	/*as:double*/

	// 数值显示位数
	this.digit = null;	/*as:int*/

	// 单位
	this.unit = "";	/*as:string*/

	// 类型编号
	this.typ = 0;	/*as:int*/

	// 刻度字体样式
	this.cfCss = "Lc_hwg_LegendCalibrationFont";	/*as:string*/

	// 刻度边框样式
	this.cbCss = "Lc_hwg_LegendCalibrationBorder";	/*as:string*/

	// 首刻度字体样式
	this.fcfCss = "Lc_hwg_LegendCalibrationFirstFont";	/*as:string*/

	// 首刻度边框样式
	this.fcbCss = "Lc_hwg_LegendCalibrationFirstBorder";	/*as:string*/

	// 单位样式
	this.unitCss = "Lc_hwg_LegendUnit";	/*as:string*/

	// 外框样式
	this.outCss = "Lc_hwg_Legend Lc_noselect";	/*as:string*/

	// 拾色器样式
	this.pickCss = "Lc_hwg_LegendPicker Lc_nosee";	/*as:string*/

	// 视图元素
	this.view/*m*/ = new LZR.HTML.Base.Doe({
		hd_typ: "div",
		dat: this,
		hd_css: this.outCss
	});	/*as:LZR.HTML.Base.Doe*/

	// 图例视图
	this.viewLegend/*m*/ = new LZR.HTML.Base.Doe({
		id: "Legend",
		dat: this,
		hd_typ: "div",
		hd_css: "Lc_full"
	});	/*as:LZR.HTML.Base.Doe*/

	// 预览视图
	this.viewPre/*m*/ = new LZR.HTML.Base.Doe({
		id: "LegendPreview",
		dat: this,
		hd_typ: "div",
		hd_css: "Lc_full"
	});	/*as:LZR.HTML.Base.Doe*/

	// 单位视图
	this.viewUnit/*m*/ = new LZR.HTML.Base.Doe({
		id: "LegendUnit",
		hd_typ: "div",
		hd_css: this.unitCss
	});	/*as:LZR.HTML.Base.Doe*/

	// 拾色器
	this.viewPicker/*m*/ = new LZR.HTML.Base.Doe({
		id: "LegendPicker",
		hd_typ: "div",
		hd_css: this.pickCss,
		chd_: {
			clr: {
				hd_typ: "div",
				hd_css: "clr"
			},
			txt: {
				hd_typ: "div",
				hd_css: "txt"
			}
		}
	});	/*as:LZR.HTML.Base.Doe*/

	// 颜色类
	this.clsLegendClr/*m*/ = (LZR.HTML.Widget.Legend.LegendClr);	/*as:fun*/

	// 数学工具
	this.utMath/*m*/ = LZR.getSingleton(LZR.Base.Math);	/*as:LZR.Base.Math*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Widget.Legend.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.HTML.Widget.Legend.prototype);
LZR.HTML.Widget.Legend.prototype.super_ = [LZR.Base.Data];
LZR.HTML.Widget.Legend.prototype.className_ = "LZR.HTML.Widget.Legend";
LZR.HTML.Widget.Legend.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Widget.Legend");

// 构造器
LZR.HTML.Widget.Legend.prototype.init_ = function (obj/*as:Object*/) {
	this.view.add(this.viewLegend);
	this.view.add(this.viewUnit);
	this.view.add(this.viewPicker);
	this.view.addEvt("mousemove", this.utLzr.bind(this, this.showPicker), "hwg_Legend_showPicker");
	this.view.addEvt("mouseout", this.utLzr.bind(this, this.hidPicker), "hwg_Legend_hidPicker");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Widget.Legend.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_clrs) {
		this.hdClrs(obj.hd_clrs, obj.hd_alias);
	}

	this.view.chgCss(this.outCss);
	this.viewUnit.chgCss(this.unitCss);
	this.viewPicker.chgCss(this.pickCss);

	// 调用父类的参数处理
	this.utLzr.supCall (this, 0, "hdObj_", obj);
};

// 处理颜色信息
LZR.HTML.Widget.Legend.prototype.hdClrs = function (hd_clrs/*as:Object*/, hd_alias/*as:Object*/) {
	var s, c, i=0, r=[];
	for (s in hd_clrs) {
// console.log(s);	// s为小数时会滞后
		c = new this.clsLegendClr({
			id: i.toString(),
			alias: (!hd_alias || hd_alias[s]===undefined) ? "" : hd_alias[s],
			position: s/100
		});
		if (hd_clrs[s] === 0) {
			c.clr.r = -1;
			c.clr.alpha = 0;
		} else {
			c.clr.r = hd_clrs[s][0];
			c.clr.g = hd_clrs[s][1];
			c.clr.b = hd_clrs[s][2];
		}
		this.add(c);
		i++;
	}
	return r;
};

// 返回字串颜色
LZR.HTML.Widget.Legend.prototype.toClrStr = function (min/*as:double*/, max/*as:double*/)/*as:string*/ {
	var i, c, d, r="";
	d = max - min;
	for (i=0; i<this.count; i++) {
		if (i) {
			r += ";";
		}
		r += min + this.subs[i].position * d;
		r += ",";
		c = this.subs[i].clr;
		if (c.alpha) {
			r += c.r;
			r += ",";
			r += c.g;
			r += ",";
			r += c.b;
		} else {
			r += "-1,-1,-1";
		}
	}
	return r;
};

// 返回查询参数
LZR.HTML.Widget.Legend.prototype.toQry = function (min/*as:double*/, max/*as:double*/)/*as:string*/ {
	var r = {};
	if (isNaN(min)) {
		min = this.min;
	}
	if (isNaN(max)) {
		max = this.max;
	}
	r.min = min;
	r.max = max;
	r.typ = this.typ;
	r.color = this.toClrStr(min, max);
	return r;
};

// 隐藏拾色器
LZR.HTML.Widget.Legend.prototype.hidPicker = function (evt/*as:Object*/) {
	this.viewPicker.addCss("Lc_nosee");
};

// 显示拾色器
LZR.HTML.Widget.Legend.prototype.showPicker = function (evt/*as:Object*/) {
	var p = this.view.utEvt.getMousePosition(evt);
	this.view.calcPosition();
	p = (p.x - this.view.position.left) / this.view.position.width;

	if (p>0 && p<1) {
		this.viewPicker.getById("clr").setStyle("background-color", this.getClrByPosition(p).toCss());
		this.viewPicker.getById("txt").doe.innerHTML = this.getValByPosition(p);
		this.viewPicker.delCss("Lc_nosee");
	}
};
