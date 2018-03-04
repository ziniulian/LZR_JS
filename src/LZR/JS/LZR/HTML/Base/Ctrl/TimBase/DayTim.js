/*************************************************
作者：子牛连
类名：DayTim
说明：日刻度时间控制器
创建日期：01-九月-2016 16:30:13
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/normal.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo",
	"LZR.HTML.Base.Ctrl.Scd",
	"LZR.HTML.Base.Ctrl.Btn",
	"LZR.HTML.Base.Ctrl",
	"LZR.Base.CallBacks",
	"LZR.HTML.Base.Ctrl.NumBase.StripNum"
], "LZR.HTML.Base.Ctrl.TimBase.DayTim");
LZR.HTML.Base.Ctrl.TimBase.DayTim = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 播放时样式
	this.playCss = "stop";	/*as:string*/

	// 信息类
	this.clsInfo/*m*/ = (LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo);	/*as:fun*/

	// 播放按钮控制器
	this.ctrlPlay/*m*/ = new LZR.HTML.Base.Ctrl.Scd();	/*as:LZR.HTML.Base.Ctrl.Scd*/

	// 按钮控制器
	this.ctrlBtn/*m*/ = new LZR.HTML.Base.Ctrl.Btn({
		dbTim: 0
	});	/*as:LZR.HTML.Base.Ctrl.Btn*/

	// 时间变化
	this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 滚动条控制器
	this.ctrlStrip/*m*/ = new LZR.HTML.Base.Ctrl.NumBase.StripNum();	/*as:LZR.HTML.Base.Ctrl.NumBase.StripNum*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype);
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.DayTim";
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.DayTim");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.init_ = function (obj/*as:Object*/) {
	this.ctrlStrip.enableDropBase = false;
	this.ctrlStrip.evt.chg.add(this.utLzr.bind(this, this.hdStrip), "DayTim_hdStrip");
	this.ctrlStrip.evt.move.add(this.utLzr.bind(this, this.hdMoveShow), "DayTim_hdMoveShow");
	this.ctrlStrip.btnCtrl.evt.down.add(this.clsInfo.autoStop, "DayTim_autoStop");
	this.ctrlStrip.baseCtrl.evt.down.add(this.clsInfo.autoStop, "DayTim_autoStop");
	this.ctrlBtn.evt.click.add(this.utLzr.bind(this, this.hdClick), "DayTim_hdClick");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.ctrlPlay.css = this.playCss;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 时间变化时触发的事件
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.onChg = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:Object*/) {
	this.evt.chg.execute (doeo, new Date(v));
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.onChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 处理滚动事件
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdStrip = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/) {
	doeo.dat.hct_tim.hdHourChg(doeo, v);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdStrip.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 处理经过提示事件
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdMoveShow = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/, x/*as:double*/) {
	var d = doeo.getById("hct_DayTimHourBarMs");
	d.setStyle("left", x);
	d.getById("txt").doe.innerHTML = v;
	d.delCss("Lc_nosee");
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdMoveShow.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 隐藏经过提示
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hidMoveShow = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.getById("hct_DayTimHourBarMs").addCss("Lc_nosee");
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hidMoveShow.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 处理点击事件
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdClick = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	switch (doeo.id.get()) {
		case "hct_DayTimPlayPrev":
			doeo.dat.hct_tim.prev();
			break;
		case "hct_DayTimPlayNext":
			doeo.dat.hct_tim.next();
			break;
	}

	// 停止播放
	this.clsInfo.autoStop(doeo);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdClick.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 处理播放事件
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdPlay = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:boolean*/) {
	if (v) {
		doeo.dat.hct_tim.play();
	} else {
		doeo.dat.hct_tim.stop();
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.hdPlay.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 重置
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.resize = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d = doeo.getById("hct_DayTimHourBar");
	d.calcPosition();
	this.ctrlStrip.placeBtn(d);
	doeo.dat.hct_tim.hdHourChg(doeo);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.resize.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// 生成滚动条控制器参数
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.crtProForCtrlStrip = function (val/*as:Object*/)/*as:Object*/ {
	return {
		min: 0,
		max: 23,
		num: val.tim.doHour(),
		step: 1
	};
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.crtProForCtrlStrip.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var d, v;

	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_tim", obj);
	} else {
		v = this.crtDat(doeo, "hct_tim", new this.clsInfo(pro));
	}

	// 模版
	d = doeo.getById("hct_DayTimDayTemplate");
	if (d) {
		v.dayMod = d;
		d.remove();
	}

	// 上一帧
	d = this.crtDoe(doeo, "hct_DayTimPlayPrev", "div");
	this.crtDat(d, "hct_tim", v);
	// 事件添加
	this.ctrlBtn.add(d);

	// 下一帧
	d = this.crtDoe(doeo, "hct_DayTimPlayNext", "div");
	this.crtDat(d, "hct_tim", v);
	// 事件添加
	this.ctrlBtn.add(d);

	// 播放按钮
	d = this.crtDoe(doeo, "hct_DayTimPlayBtn", "div");
	// 事件添加
	this.ctrlPlay.add(d);
	this.crtCb2Dat(doeo, d.dat.hct_scd.evt.change, "hdPlay");

	// 滚动条
	d = this.crtDoe(doeo, "hct_DayTimHourBar", "div");
	this.crtDat(d, "hct_tim", v);
	// 事件添加
	this.ctrlStrip.add(d, this.crtProForCtrlStrip(v));
	this.crtCb2Dat(doeo, d.dat.hct_num.vcStep.evt.change, "hdStepChg", this.utLzr.bind(v, v.hdStepChg, doeo));

	// 其它事件添加
	this.crtCb2Dat(doeo, v.tim.evt.change, "hdTimChg", this.utLzr.bind(v, v.hdTimChg, doeo));
	this.crtCb2Dat(doeo, v.tim.evt.change, "onChg");
	this.crtCb2Dat(doeo, doeo.crtEvt("resize"), "resize");
	this.crtCb2Dat(doeo, d.crtEvt("mouseout"), "hidMoveShow");

	// 初始化
	v.setTimArea(doeo);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d;
	var v = doeo.dat.hct_tim;

	// 上一帧
	d = this.crtDoe(doeo, "hct_DayTimPlayPrev", "div");
	this.delDat(d, "hct_tim");
	// 删除事件
	this.ctrlBtn.del(d);

	// 下一帧
	d = this.crtDoe(doeo, "hct_DayTimPlayNext", "div");
	this.delDat(d, "hct_tim");
	// 删除事件
	this.ctrlBtn.del(d);

	// 播放按钮
	d = this.crtDoe(doeo, "hct_DayTimPlayBtn", "div");
	// 删除事件
	this.delCb2Dat(doeo, d.dat.hct_scd.evt.change, "hdPlay");
	this.ctrlPlay.del(d);

	// 滚动条
	d = this.crtDoe(doeo, "hct_DayTimHourBar", "div");
	this.delDat(d, "hct_tim");
	// 删除事件
	this.delCb2Dat(doeo, d.dat.hct_num.vcStep.evt.change, "hdStepChg");
	this.ctrlStrip.del(d);

	// 删除事件
	this.delCb2Dat(doeo, v.tim.evt.change, "hdTimChg", this.utLzr.bind(v, v.hdTimChg));
	this.delCb2Dat(doeo, v.tim.evt.change, "onChg");
	this.delCb2Dat(doeo, doeo.crtEvt("resize"), "resize");
	this.delCb2Dat(doeo, d.crtEvt("mouseout"), "hidMoveShow");

	// 删除数据
	this.delDat(doeo, "hct_tim");
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim;
