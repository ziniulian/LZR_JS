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
	s = this.subs[this.scd];

	if (s) {
		this.viewMark.getById("markLeft").doe.innerHTML = s.min;
		this.viewMark.getById("markRight").doe.innerHTML = s.max;
		s.viewPre.dat.hct_scd.set(true);
	}

};

// 启动控制
LZR.HTML.Widget.Legend.LegendMgr.prototype.openCtrl = function () {
	if (this.markCtrl.subs.length === 0) {
		this.viewMark.delCss("Lc_nosee");
		this.markCtrl.add(this.viewMark, {
			rn: 0.1,
			chd_: {
				"0": {
					min: 0,
					max: 1,
					step: 0.05,
					num: 0,
					isNorm: false
				},
				"1": {
					min: 0,
					max: 1,
					step: 0.05,
					num: 1,
					isNorm: false
				}
			}
		});
		this.viewMark.getById("hct_MultiStripNumBtn_0").add(this.viewMark.getById("btnLeft"));
		this.viewMark.getById("hct_MultiStripNumBtn_1").add(this.viewMark.getById("btnRight"));
	}
};

// 获取查询参数
LZR.HTML.Widget.Legend.LegendMgr.prototype.getQry = function ()/*as:string*/ {
	var d = this.ctrl.vcCur.get().dat;
	var r = d.toQry();
	if (this.viewMark.dat) {
		var n = this.viewMark.dat.hct_multiNum;
		r.min = d.utMath.formatFloat(d.getValueByPosition (n.subs[0].rn.get()), 2);
		r.max = d.utMath.formatFloat(d.getValueByPosition (n.subs[1].rn.get()), 2);
	}
	return r;
};

// 处理遮罩变化
LZR.HTML.Widget.Legend.LegendMgr.prototype.hdMark = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:LZR.Base.Val.RangeDat*/, id/*as:string*/, btn/*as:LZR.HTML.Base.Doe*/) {
	var n = doeo.dat.hct_multiNum;
	var d = this.ctrl.vcCur.get().dat;
	var r = d.toQry();
	var p = parseInt(btn.getStyle("left"), 10) / doeo.doe.clientWidth * 100;
	var s;
	r.min = d.utMath.formatFloat(d.getValueByPosition (n.subs[0].rn.get()), 2);
	r.max = d.utMath.formatFloat(d.getValueByPosition (n.subs[1].rn.get()), 2);

	// 调整遮罩层
	switch (id) {
		case "0":
			this.viewMark.getById("markLeft").doe.innerHTML = r.min;
			for (s in this.subs) {
				this.subs[s].viewMarkLeft.setStyle("width", p + "%");
			}
			break;
		case "1":
			this.viewMark.getById("markRight").doe.innerHTML = r.max;
			for (s in this.subs) {
				this.subs[s].viewMarkRight.setStyle("width", (100 - p) + "%");
			}
			break;
	}

	this.onChg(d.view.doe, r);
};

// 处理图例变化
LZR.HTML.Widget.Legend.LegendMgr.prototype.hdChg = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d = doeo.dat;
	var r = d.toQry();
	if (this.viewMark.dat) {
		var n = this.viewMark.dat.hct_multiNum;
		r.min = d.utMath.formatFloat(d.getValueByPosition (n.subs[0].rn.get()), 2);
		r.max = d.utMath.formatFloat(d.getValueByPosition (n.subs[1].rn.get()), 2);

		this.viewMark.getById("markLeft").doe.innerHTML = r.min;
		this.viewMark.getById("markRight").doe.innerHTML = r.max;
	}
	this.onChg(d.view.doe, r);
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
		this.view.add(sub.viewPre, sub.id.get());
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
