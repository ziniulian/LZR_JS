/*************************************************
作者：子牛连
类名：BlockTim
说明：块状时间控制器
创建日期：11-五月-2016 11:14:45
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Base/Ctrl/TimBase/BlockTim.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.NumBase.BlockNum"
], "LZR.HTML.Base.Ctrl.TimBase.BlockTim");
LZR.HTML.Base.Ctrl.TimBase.BlockTim = function (obj) /*bases:LZR.HTML.Base.Ctrl.TimBase*/ {
	LZR.initSuper(this, obj);

	// 最大年度
	this.yearMax = 2100;	/*as:int*/

	// 最小年度
	this.yearMin = 1970;	/*as:int*/

	// 格式
	this.format = "yMdhmsf";	/*as:string*/

	// 数值控制器
	this.numCtrl/*m*/ = new LZR.HTML.Base.Ctrl.NumBase.BlockNum();	/*as:LZR.HTML.Base.Ctrl.NumBase.BlockNum*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.prototype, LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype);
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.super_ = [LZR.HTML.Base.Ctrl.TimBase];
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.BlockTim";
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.BlockTim");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.init_ = function (obj/*as:Object*/) {
	this.numCtrl.evt.chg.add(this.utLzr.bind(this, this.hdSetTim), "BlockTim_hdSetTim");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_css) {
		this.hdCss(obj.hd_css);
	}
	if (obj.hd_formatDigit) {
		this.hdFormatDigit(obj.hd_formatDigit);
	}
};

//  处理样式参数
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.hdCss = function (s/*as:Object*/) {
	this.numCtrl.hdCss(s);
};

//  处理位数参数
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.hdFormatDigit = function (v/*as:int*/) {
	this.numCtrl.formatDigit = v;
};

// 处理时间设置
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.hdSetTim = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/) {
	switch (doeo.id.get()) {
		case "hct_BlockTimDoe_y":
			doeo.dat.hct_tim.doYear(v);
			break;
		case "hct_BlockTimDoe_M":
			doeo.dat.hct_tim.doMon(v);
			break;
		case "hct_BlockTimDoe_d":
			doeo.dat.hct_tim.doDay(v);
			break;
		case "hct_BlockTimDoe_h":
			doeo.dat.hct_tim.doHour(v);
			break;
		case "hct_BlockTimDoe_m":
			doeo.dat.hct_tim.doMut(v);
			break;
		case "hct_BlockTimDoe_s":
			doeo.dat.hct_tim.doSec(v);
			break;
		case "hct_BlockTimDoe_f":
			doeo.dat.hct_tim.doMs(v);
			break;
	}
};

// 处理时间的自动变化
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.hdAutoChg = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d, i, v;

	for (i = 0; i<this.format.length; i++) {
		switch (this.format[i]) {
			case "y":	// 年
				v = doeo.dat.hct_tim.doYear();
				break;
			case "M":	// 月
				v = doeo.dat.hct_tim.doMon();
				break;
			case "d":	// 日
				v = doeo.dat.hct_tim.doDay();
				break;
			case "h":	// 时
				v = doeo.dat.hct_tim.doHour();
				break;
			case "m":	// 分
				v = doeo.dat.hct_tim.doMut();
				break;
			case "s":	// 秒
				v = doeo.dat.hct_tim.doSec();
				break;
			case "f":	// 毫秒
				v = doeo.dat.hct_tim.doMs();
				break;
			default:
				v = null;
				break;
		}
		if (v !== null) {
			d = doeo.getById("hct_BlockTimDoe_" + this.format[i]).dat.hct_num;
			if (d.get() !== v) {
				this.numCtrl.evt.chg.enableEvent = false;
				d.set(v);
			}
		}
	}
};

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var d, v, p, i;
	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_tim", obj);
	} else {
		v = this.crtDat(doeo, "hct_tim", new this.clsTim(pro));
	}

	// 创建元素
	for (i = 0; i<this.format.length; i++) {
		switch (this.format[i]) {
			case "y":	// 年
				p = {
					min: this.yearMin,
					max: this.yearMax,
					step: 1,
					num: v.doYear()
				};
				break;
			case "M":	// 月
				p = {
					min: 1,
					max: 12,
					step: 1,
					num: v.doMon()
				};
				break;
			case "d":	// 日
				p = {
					min: 1,
					max: 31,
					step: 1,
					num: v.doDay()
				};
				break;
			case "h":	// 时
				p = {
					min: 0,
					max: 23,
					step: 1,
					num: v.doHour()
				};
				break;
			case "m":	// 分
				p = {
					min: 0,
					max: 59,
					step: 1,
					num: v.doMut()
				};
				break;
			case "s":	// 秒
				p = {
					min: 0,
					max: 59,
					step: 1,
					num: v.doSec()
				};
				break;
			case "f":	// 毫秒
				p = {
					min: 0,
					max: 999,
					step: 1,
					num: v.doMs()
				};
				break;
			default:
				p = null;
				break;
		}
		if (p) {
			d = this.crtDoe(doeo, "hct_BlockTimDoe_" + this.format[i], "div", "Lc_hct_BlockTimDoe");
			this.numCtrl.add(d, p);
			this.crtDat(d, "hct_tim", v);
		}
	}

	// 创建事件（为保证 onChg 事件在 hdAutoChg 之后触发，就必须使用 set 事件）
	this.crtCb2Dat(doeo, doeo.dat.hct_tim.evt.set, "hdAutoChg");
	this.crtCb2Dat(doeo, doeo.dat.hct_tim.evt.set, "onChg");
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.TimBase.BlockTim.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var i, d;

	// 删除元素
	for (i = 0; i<this.format.length; i++) {
		d = doeo.getById("hct_BlockTimDoe_" + this.format[i]);
		if (d)  {
			this.numCtrl.del(d);
			this.delDat(d, "hct_tim");
		}
	}

	// 删除事件
	this.delCb2Dat(doeo, doeo.dat.hct_tim.evt.set, "hdAutoChg");
	this.delCb2Dat(doeo, doeo.dat.hct_tim.evt.set, "onChg");

	// 删除数据
	this.delDat(doeo, "hct_tim");
};
