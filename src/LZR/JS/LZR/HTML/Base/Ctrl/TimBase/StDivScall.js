/*************************************************
作者：子牛连
类名：StDivScall
说明：Div时间刻度
创建日期：16-五月-2016 16:52:23
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Base/Ctrl/TimBase/StDivScall.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.TimBase.InfCalibration"
], "LZR.HTML.Base.Ctrl.TimBase.StDivScall");
LZR.HTML.Base.Ctrl.TimBase.StDivScall = function (obj) /*interfaces:LZR.HTML.Base.Ctrl.TimBase.InfCalibration*/ {
	LZR.HTML.Base.Ctrl.TimBase.InfCalibration.call(this);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.InfCalibration.prototype, LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype);
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.StDivScall";
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.StDivScall");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 显示时间
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.shouTim = function (doeo/*as:LZR.HTML.Base.Doe*/, txt/*as:string*/, usecss/*as:boolean*/) {
	doeo.doe.innerHTML = txt;
	if (usecss) {
		doeo.addCss("Lc_hct_StDivScall_Big_hover");
	} else {
		doeo.delCss("Lc_hct_StDivScall_Big_hover");
	}
};

// 生成容器
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.crtDoe = function (i/*as:int*/)/*as:LZR.HTML.Base.Doe*/ {
	return new this.belongCtrl.clsDoe({
		id: "up_" + i,
		hd_typ: "div",
		hd_css: "Lc_hct_StDivScall_Up",
		chd_: {
			big: {
				hd_typ: "div",
				hd_css: "Lc_hct_StDivScall_Big"
			},
			line: {
				hd_typ: "div",
				hd_css: "Lc_hct_StDivScall_Line"
			},
			point: {
				hd_typ: "div",
				hd_css: "Lc_hct_StDivScall_Point"
			}
		}
	});
};

// 生成时间
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.crtTim = function (min/*as:double*/, stat/*as:int*/)/*as:Object*/ {
	var r = new this.belongCtrl.clsTim({
		hd_tim: min
	});
	switch(stat) {
		case 1:		// 日
			r.doHour(0, false);
			if (r.vcBase.get() < min) {
				r.add(24*3600*1000);
			}
			break;
		case 2:		// 月
			r.doDay(1, false);
			r.doHour(0, false);
			if (r.vcBase.get() < min) {
				r.addMon(1);
			}
			break;
	}
	return r;
};

// 计算总数
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.calcCount = function (dt/*as:Object*/, max/*as:double*/, stat/*as:int*/)/*as:int*/ {
	var d = {
		d: 0,
		t: 0
	};
	switch(stat) {
		case 0:		// 时
			d.d = Math.floor((max - dt.vcBase.get()) / (3600 * 1000));
			d.t = d.d * 3600*1000 + dt.vcBase.get();
			break;
		case 1:		// 日
			d.d = Math.floor((max - dt.vcBase.get()) / (24 * 3600 * 1000));
			d.t = d.d * 24*3600*1000 + dt.vcBase.get();
			break;
		case 2:		// 月
			d.t = new this.belongCtrl.clsTim({
				hd_tim: max
			});
			d.t.doDay(1, false);
			d.t.doHour(0, false);
			d.d = (d.t.doYear() * 12) + (d.t.doMon() - 1) - (dt.doYear() * 12) - (dt.doMon() - 1);
			d.t = d.t.vcBase.get();
	}
	return d;
};

// 计算小方块宽度
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.calcWidth = function (w/*as:double*/, d/*as:Object*/, dt/*as:Object*/, doeo/*as:LZR.HTML.Base.Doe*/, ctrl/*as:Object*/, stat/*as:int*/)/*as:int*/ {
	switch(stat) {
		case 0:		// 时
		case 1:		// 日
			return w;
		case 2:		// 月
			if (d.monow === undefined) {
				d.monow = d.f;
			} else {
				d.monow = d.monnw;
			}
			dt.addMon(1);
			d.monnw = ctrl.position2Num(doeo, dt.vcBase.get(), true);
			return d.monnw - d.monow - 1;
		default:
			return 0;
	}
};

// 获取判别节点
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.getNode = function (dt/*as:Object*/, stat/*as:int*/)/*as:int*/ {
	switch(stat) {
		case 0:		// 时
			return dt.doDay();
		case 1:		// 日
			return dt.doMon();
		case 2:		// 月
			return dt.doYear();
		default:
			return 0;
	}
};

// 设置判别节点
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.setNode = function (dt/*as:Object*/, stat/*as:int*/) {
	switch(stat) {
		case 0:		// 时
			dt.add(3600 * 1000);
			break;
		case 1:		// 日
			dt.add(24 * 3600 * 1000);
			break;
		case 2:		// 月
			// dt.addMon(1);
			break;
	}
};

// 获取提示内容
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.getTxt = function (dt/*as:Object*/, stat/*as:int*/)/*as:string*/ {
	switch(stat) {
		case 0:		// 时
			return dt.format("d日(M月)");
		case 1:		// 日
			return dt.format("M月(y年)");
		case 2:		// 月
			return dt.format("y年");
		default:
			return "";
	}
};

// 获取经过的提示内容
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.getHoverTxt = function (dt/*as:Object*/, stat/*as:int*/)/*as:string*/ {
	switch(stat) {
		case 0:		// 时
			return dt.format("y-M-d hh时");
		case 1:		// 日
			return dt.format("y-M-d");
		case 2:		// 月
			return dt.format("y年M月");
		default:
			return "";
	}
};

// ---- 划刻度
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.draw = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var n = doeo.dat.hct_num;
	var stat = doeo.dat.hct_StDivScall_stat;
	var ctrl = this.belongCtrl.numCtrl;
	var dt = this.crtTim(n.vcMin.get(), stat);
	var d, w, i, old, out, up, big, sd;

	// 清空容器
	doeo.del("hct_StDivScall");
	out = new this.belongCtrl.clsDoe({
		id: "hct_StDivScall",
		hd_typ: "div",
		hd_css: "Lc_hct_StDivScall_Out"
	});
	doeo.add(out);

	// 创建容器
	up = this.crtDoe(0);
	big = up.subs.big;
	big.doe.innerHTML = this.getTxt(dt, stat);
	out.add(up);

	// 计算距离、宽度
	d = this.calcCount( dt, n.vcMax.get(), stat );
	d.w = ctrl.position2Num(doeo, d.t, true);

	// 补正
	d.f = ctrl.position2Num(doeo, dt.vcBase.get(), true);
	if (d.f) {
		w = new this.belongCtrl.clsDoe({
			id: "offset",
			hd_typ: "div",
			hd_css: "Lc_hct_StDivScall_Offset"
		});
		w.setStyle("width", d.f);
		up.add(w);
	}

	w = ((d.w - d.f) / d.d) - 1;

	// 放容器
	for (i = 0; i<d.d; i++) {
		if (i) {
			this.setNode(dt, stat);
			if (old !== this.getNode(dt, stat)) {
				up = this.crtDoe(i);
				big = up.subs.big;
				big.doe.innerHTML = this.getTxt(dt, stat);
				out.add(up);
			}
		}

		sd = new this.belongCtrl.clsDoe({
			id: "sd_" + i,
			hd_typ: "div",
			hd_css: "Lc_hct_StDivScall_Small"
		});
		sd.addEvt("mouseover", this.belongCtrl.utLzr.bind(this, this.shouTim, big, this.getHoverTxt(dt, stat), true));
		sd.addEvt("mouseout", this.belongCtrl.utLzr.bind(this, this.shouTim, big, this.getTxt(dt, stat), false));
		old = this.getNode(dt, stat);
		sd.setStyle("width", this.calcWidth(w, d, dt, doeo, ctrl, stat));	// 月刻度会使 dt 值增加
		up.add(sd);
	}

	// 清空最后的点线
	up.del("point");
	up.del("line");

	// 补正
	i = Math.floor(doeo.position.width - d.w - 1);
	if (i>0) {
		w = new this.belongCtrl.clsDoe({
			id: "offset2",
			hd_typ: "div",
			hd_css: "Lc_hct_StDivScall_Offset2"
		});
		w.setStyle("width", i);
		up.add(w);
	}
};
