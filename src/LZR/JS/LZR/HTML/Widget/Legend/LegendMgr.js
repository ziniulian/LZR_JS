/*************************************************
作者：子牛连
类名：LegendMgr
说明：图例管理器
创建日期：29-六月-2016 9:45:36
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Widget/Legend/LegendMgr.css"
});

LZR.load([
	"LZR.HTML.Widget.Legend",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Data",
	"LZR.HTML.Base.Ctrl.Scd",
	"LZR.HTML.Base.Ctrl.SglScd",
	"LZR.Util",
	"LZR.HTML.Widget.Legend.GradientLegend",
	"LZR.HTML.Widget.Legend.BlockLegend",
	"LZR.Base.CallBacks",
	"LZR.Base.InfEvt",
	"LZR.HTML.Base.Ctrl.NumBase.MultiStripNum"
], "LZR.HTML.Widget.Legend.LegendMgr");
LZR.HTML.Widget.Legend.LegendMgr = function (obj) /*bases:LZR.Base.Data*/ /*interfaces:LZR.Base.InfEvt*/ {
	LZR.initSuper(this, obj);

	LZR.Base.InfEvt.call(this);

	// 预览图样式
	this.preCss = "Lc_hwg_LegendMgrPre";	/*as:string*/

	// 被选中时样式
	this.scdCss = "Lc_hwg_LegendMgrScd";	/*as:string*/

	// 初始被选中的图例
	this.scd = "";	/*as:string*/

	// 遮罩按钮间隔
	this.markGap = 0.1;	/*as:int*/

	// 遮罩按钮起始位置
	this.markStart = 0;	/*as:int*/

	// 遮罩按钮结束位置
	this.markEnd = 1;	/*as:int*/

	// 视图元素
	this.view/*m*/ = new LZR.HTML.Base.Doe({
		hd_typ: "div"
	});	/*as:LZR.HTML.Base.Doe*/

	// 控制器
	this.ctrl/*m*/ = new LZR.HTML.Base.Ctrl.SglScd({
		css: this.scdCss
	});	/*as:LZR.HTML.Base.Ctrl.SglScd*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	// 渐变色图例
	this.clsGradientLegend/*m*/ = (LZR.HTML.Widget.Legend.GradientLegend);	/*as:fun*/

	// 色块图例类
	this.clsBlockLegend/*m*/ = (LZR.HTML.Widget.Legend.BlockLegend);	/*as:fun*/

	// 图例变化
	this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 中部开关
	this.viewMid/*m*/ = new LZR.HTML.Base.Doe({
		id: "LegendMgrMid",
		hd_typ: "div",
		hd_css: "Lc_hwg_LegendMgrMid"
	});	/*as:LZR.HTML.Base.Doe*/

	// 中部控制器
	this.midCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Scd({
		css: "Lc_hwg_LegendMgrMidScd"
	});	/*as:LZR.HTML.Base.Ctrl.Scd*/

	// 遮罩控制器
	this.markCtrl/*m*/ = new LZR.HTML.Base.Ctrl.NumBase.MultiStripNum();	/*as:LZR.HTML.Base.Ctrl.NumBase.MultiStripNum*/

	// 遮罩视图
	this.viewMark/*m*/ = new LZR.HTML.Base.Doe({
		id: "LegendMgrMark",
		hd_typ: "div",
		hd_css: "Lc_hwg_LegendMgrMark Lc_nosee",
		chd_: {
			markLeft: {
				hd_typ: "div",
				hd_css: "Lc_hwg_LegendMgrMarkLeft"
			},
			markRight: {
				hd_typ: "div",
				hd_css: "Lc_hwg_LegendMgrMarkRight"
			},
			btnLeft: {
				hd_typ: "div",
				hd_css: "Lc_hwg_LegendMgrMarkBtn"
			},
			btnRight: {
				hd_typ: "div",
				hd_css: "Lc_hwg_LegendMgrMarkBtn"
			}
		}
	});	/*as:LZR.HTML.Base.Doe*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Widget.Legend.LegendMgr.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.HTML.Widget.Legend.LegendMgr.prototype);
LZR.HTML.Widget.Legend.LegendMgr.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.HTML.Widget.Legend.LegendMgr.prototype);
LZR.HTML.Widget.Legend.LegendMgr.prototype.super_ = [LZR.Base.Data];
LZR.HTML.Widget.Legend.LegendMgr.prototype.className_ = "LZR.HTML.Widget.Legend.LegendMgr";
LZR.HTML.Widget.Legend.LegendMgr.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Widget.Legend.LegendMgr");

// 构造器
LZR.HTML.Widget.Legend.LegendMgr.prototype.init_ = function (obj/*as:Object*/) {
	// 中部控制器
	this.view.add(this.viewMid);
	this.midCtrl.add(this.viewMid);
	this.viewMid.dat.hct_scd.evt.change.add(this.utLzr.bind(this, this.hdMidChg));

	this.view.add(this.viewMark);
	this.markCtrl.evt.chg.add(this.utLzr.bind(this, this.hdMark));
	this.ctrl.vcCur.evt.change.add(this.utLzr.bind(this, this.hdChg));

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Widget.Legend.LegendMgr.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.scdCss) {
		this.ctrl.css = obj.scdCss;
	}
	if (obj.hd_legend) {
		this.hdLegend(obj.hd_legend);
	}

	// 调用父类的参数处理
	this.utLzr.supCall (this, 0, "hdObj_", obj);
};

// 处理图例集合
LZR.HTML.Widget.Legend.LegendMgr.prototype.hdLegend = function (hd_legend/*as:Object*/) {
	var s, t, p, pro = {};
	var digit = hd_legend.digit;
	var unit = hd_legend.unit;
	if (digit === undefined) {
		digit = null;
	}
	if (unit === undefined) {
		unit = "";
	}

	for (s in hd_legend.subs) {
		pro[s] = {
			min: hd_legend.min,
			max: hd_legend.max,
			digit: digit,
			unit: unit
		};
		for (t in hd_legend.subs[s]) {
			switch (t) {
				case "color":
					pro[s].hd_clrs = hd_legend.subs[s][t];
					break;
				case "chart":
					pro[s].hd_alias = hd_legend.subs[s][t];
					break;
				case "typ":
					switch (hd_legend.subs[s][t]) {
						case 0:
							pro[s].cls_ = this.clsGradientLegend;
							break;
						default:
							pro[s].cls_ = this.clsBlockLegend;
							break;
					}
					break;
				default:
					pro[s][t] = hd_legend.subs[s][t];
					break;
			}
		}
	}

	this.utLzr.supCall (this, 0, "initSubs", pro);
};

// 刷新
LZR.HTML.Widget.Legend.LegendMgr.prototype.flush = function () {
	var s;
	for (s in this.subs) {
		this.subs[s].initFlush();
	}

	if (this.markCtrl.subs.length === 0) {
		this.viewMark.delCss("Lc_nosee");
		this.markCtrl.add(this.viewMark, {
			rn: this.markGap,
			chd_: {
				"0": {
					min: 0,
					max: 1,
					step: 0.01,
					num: this.markStart,
					isNorm: false
				},
				"1": {
					min: 0,
					max: 1,
					step: 0.01,
					num: this.markEnd,
					isNorm: false
				}
			}
		});
		this.viewMark.getById("hct_MultiStripNumBtn_0").add(this.viewMark.getById("btnLeft"));
		this.viewMark.getById("hct_MultiStripNumBtn_1").add(this.viewMark.getById("btnRight"));
	}

	s = this.subs[this.scd];
	if (s) {
		s.viewPre.dat.hct_scd.set(true);
	}

};

// 重置遮罩按钮位置
LZR.HTML.Widget.Legend.LegendMgr.prototype.resizeMark = function () {
	this.viewMark.calcPosition();
	this.markCtrl.placeBtn(this.viewMark.getById("hct_MultiStripNumBtn_0"));
	this.markCtrl.placeBtn(this.viewMark.getById("hct_MultiStripNumBtn_1"));
};

// 获取查询参数
LZR.HTML.Widget.Legend.LegendMgr.prototype.getQry = function ()/*as:string*/ {
	var d = this.ctrl.vcCur.get().dat;
	var r = d.toQry();
	if (this.viewMark.dat) {
		var n = this.viewMark.dat.hct_multiNum;
		r.min = d.utMath.formatFloat(d.getValueByPosition (n.subs[0].rn.get()), d.digit);
		r.max = d.utMath.formatFloat(d.getValueByPosition (n.subs[1].rn.get()), d.digit);
	}
	this.calcMid(r);
	return r;
};

// 处理遮罩变化
LZR.HTML.Widget.Legend.LegendMgr.prototype.hdMark = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:LZR.Base.Val.RangeDat*/, id/*as:string*/, btn/*as:LZR.HTML.Base.Doe*/) {
	var n = doeo.dat.hct_multiNum;
	var d = this.ctrl.vcCur.get().dat;
	var r = d.toQry();
	var p = parseInt(btn.getStyle("left"), 10) / doeo.doe.clientWidth * 100;
	var s;
	r.min = d.utMath.formatFloat(d.getValueByPosition (n.subs[0].rn.get()), d.digit);
	r.max = d.utMath.formatFloat(d.getValueByPosition (n.subs[1].rn.get()), d.digit);

	// 调整遮罩层
	switch (id) {
		case "0":
			this.viewMark.getById("markLeft").doe.innerHTML = r.min;
			d.viewMarkLeft.setStyle("width", p + "%");
			break;
		case "1":
			this.viewMark.getById("markRight").doe.innerHTML = r.max;
			d.viewMarkRight.setStyle("width", (100 - p) + "%");
			break;
	}

	// 中部控制器修正
	this.placeMid();
	this.calcMid(r);

	this.onChg(d.view.doe, r);
};

// 处理图例变化
LZR.HTML.Widget.Legend.LegendMgr.prototype.hdChg = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d = doeo.dat;
	var r = d.toQry();

	if (this.viewMark.dat) {
		var s;
		var n = this.viewMark.dat.hct_multiNum;

		// 色块滚动限制
		switch (d.typ) {
			case 1:
				for (s in n.subs) {
					n.subs[s].rn.vcStep.set(1/d.viewLegend.count, false);
					n.subs[s].rn.isNorm = true;
					n.subs[s].rn.reset(false);
				}
				break;
			case 0:
				for (s in n.subs) {
					n.subs[s].rn.isNorm = false;
				}
				break;
		}

		var l = n.subs[0].rn.get() * 100;
		var w = (1 - n.subs[1].rn.get()) * 100;
		d.viewMarkLeft.setStyle("width", l + "%");
		d.viewMarkRight.setStyle("width", w + "%");

		r.min = d.utMath.formatFloat(d.getValueByPosition (n.subs[0].rn.get()), d.digit);
		r.max = d.utMath.formatFloat(d.getValueByPosition (n.subs[1].rn.get()), d.digit);

		this.viewMark.getById("markLeft").doe.innerHTML = r.min;
		this.viewMark.getById("markRight").doe.innerHTML = r.max;

		// 中部控制器修正
		this.placeMid(l + "%", (100-w-l) + "%");
		this.calcMid(r);
	}
	this.onChg(d.view.doe, r);
};

// 处理中部控制器变化
LZR.HTML.Widget.Legend.LegendMgr.prototype.hdMidChg = function () {
	this.hdChg(this.ctrl.vcCur.get());
};

// 放置中部遮罩
LZR.HTML.Widget.Legend.LegendMgr.prototype.placeMid = function (left/*as:string*/, width/*as:string*/) {
	var d = this.ctrl.vcCur.get().dat;

	if (this.viewMid.dat.hct_scd.get()) {
		if (!left) {
			left = d.viewMarkLeft.doe.clientWidth;
			width = d.viewLegend.doe.clientWidth - left - d.viewMarkRight.doe.clientWidth;
			left += "px";
			width += "px";
		}

		d.viewMarkMid.setStyle("left", left);
		d.viewMarkMid.setStyle("width", width);
		d.viewMarkMid.delCss("Lc_nosee");
	} else {
		d.viewMarkMid.addCss("Lc_nosee");
	}
};

// 计算中部遮罩数据
LZR.HTML.Widget.Legend.LegendMgr.prototype.calcMid = function (s/*as:Object*/)/*as:Object*/ {
	if (this.viewMid.dat.hct_scd.get()) {
		var i, j;
		var d = s.max - s.min;
		var a = s.color.split(";");
		var aa = [];
		for (i=0; i<a.length; i++) {
			if (a[i].indexOf("-1") < 0) {
				aa.push(a[i].split(","));
			}
		}
		d /= (aa.length - 1);
		s.color = "";
		for (i=0; i<aa.length; i++) {
			s.color += s.min + i*d;
			for (j=1; j<aa[i].length; j++) {
				s.color += ",";
				s.color += aa[i][j];
			}
			s.color += ";";
		}
	}
	return s;
};

// 图例变化事件
LZR.HTML.Widget.Legend.LegendMgr.prototype.onChg = function (doe/*as:Object*/, qryDat/*as:Object*/)/*as:boolean*/ {
	return this.evt.chg.execute (doe, qryDat);
};

// ---- 添加子数据
LZR.HTML.Widget.Legend.LegendMgr.prototype.add = function (sub/*as:LZR.Base.Data*/, id/*as:string*/)/*as:boolean*/ {
	var r = this.utLzr.supCall (this, 0, "add", sub, id);
	if (r && sub.viewPre) {
		if (this.preCss) {
			sub.viewPre.chgCss(this.preCss);
		}
		var d = new this.view.constructor ({
			hd_typ: "div"
		});
		var n = new this.view.constructor ({
			hd_typ: "div",
			hd_css: "Lc_hwg_LegendMgrNam"
		});
		n.doe.innerHTML = sub.id.get();
		d.add(sub.viewPre, "pre");
		d.add(n, "nam");
		this.view.add(d, sub.id.get());
		this.ctrl.add(sub.viewPre);
	}
	return r;
};

// ---- 删除子数据
LZR.HTML.Widget.Legend.LegendMgr.prototype.del = function (id/*as:string*/)/*as:Object*/ {
	var r = this.utLzr.supCall (this, 0, "del", id);
	if (r) {
		this.view.del(r.viewPre);
		this.ctrl.del(r.viewPre);
	}
	return r;
};
