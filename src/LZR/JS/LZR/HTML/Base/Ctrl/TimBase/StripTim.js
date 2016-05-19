/*************************************************
作者：子牛连
类名：StripTim
说明：条状时间控制器
创建日期：16-五月-2016 16:43:40
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.NumBase.StripNum",
	"LZR.HTML.Base.Ctrl.TimBase.InfCalibration"
], "LZR.HTML.Base.Ctrl.TimBase.StripTim");
LZR.HTML.Base.Ctrl.TimBase.StripTim = function (obj) /*bases:LZR.HTML.Base.Ctrl.TimBase*/ {
	LZR.initSuper(this, obj);

	// 数值控制器
	this.numCtrl/*m*/ = new LZR.HTML.Base.Ctrl.NumBase.StripNum();	/*as:LZR.HTML.Base.Ctrl.NumBase.StripNum*/

	// 刻度
	this.scall/*m*/ = new LZR.HTML.Base.Ctrl.TimBase.InfCalibration();	/*as:LZR.HTML.Base.Ctrl.TimBase.InfCalibration*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.prototype, LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype);
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.super_ = [LZR.HTML.Base.Ctrl.TimBase];
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.StripTim";
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.StripTim");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.init_ = function (obj/*as:Object*/) {
	this.numCtrl.baseCtrl.enableMove = false;
	this.numCtrl.evt.chg.add(this.utLzr.bind(this, this.hdNumChg), "StripTim_hdNumChg");
	this.numCtrl.evt.limit.add(this.utLzr.bind(this, this.hdLimitChg), "StripTim_hdLimitChg");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 处理数值变化
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.hdNumChg = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/) {
	doeo.dat.hct_tim.vcBase.set(v);
};

// 处理时间变化
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.hdTimChg = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/) {
	doeo.dat.hct_num.set(v);
};

// 处理范围变化
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.hdLimitChg = function (doeo/*as:LZR.HTML.Base.Doe*/, min/*as:double*/, max/*as:double*/) {
	var m, n;
	// 判断最大值
	if (doeo.dat.hct_tim.dtMax) {
		m = doeo.dat.hct_tim.dtMax.valueOf();
		if (max > m) {
			n = doeo.dat.hct_num;
			if (n.get() > m) {
				n.set(m, false);
			}
			n.vcMax.set(m, false);
			n.vcMin.set(min + m - max, false);
		}
	}

	// 判断最小值
	if (doeo.dat.hct_tim.dtMin) {
		m = doeo.dat.hct_tim.dtMin.valueOf();
		if (min < m) {
			n = doeo.dat.hct_num;
			if (n.get() < m) {
				n.set(m, false);
			}
			n.vcMin.set(m, false);
			n.vcMax.set(m + max - min, false);
		}
	}
	this.scall.draw(doeo);
};

// 调整
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.resize = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.calcPosition();
	this.numCtrl.placeBtn(doeo);
	this.scall.draw(doeo);
};

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var v, n;

	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_tim", obj);
	} else {
		/*
			参数说明：
			hd_tim: new Date(),	// 当前时间
			dtMax: new Date(),	// 最大时间
			dtMin: new Date(),	// 最小时间
			// step: 3600*1000,	// 时间间隔（毫秒）
			min: 72,	// 时间轴相对当前时间的最小值（step 的倍数）
			max: 24,	// 时间轴相对当前时间的最大值（step 的倍数）
		*/
		v = this.crtDat(doeo, "hct_tim", new this.clsTim(pro));
	}

	// 添加元素
	this.numCtrl.add(doeo);

	// 数据关联
	if (!pro.step) {
		pro.step = 3600*1000;
	}
	n = doeo.dat.hct_num;
	n.vcNum.set(v.vcBase.get(), false);
	n.vcStep.set(pro.step, false);
	n.vcMin.set(v.vcBase.get() - pro.min * pro.step, false);
	n.vcMax.set(v.vcBase.get() + pro.max * pro.step, false);

	// 添加事件
	this.crtCb2Dat(doeo, doeo.dat.hct_tim.evt.change, "hdTimChg");
	this.crtCb2Dat(doeo, doeo.dat.hct_tim.evt.change, "onChg");

	this.numCtrl.placeBtn(doeo);
	this.scall.draw(doeo);
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var r;
	// 删除元素
	this.numCtrl.del(doeo);

	// 删除事件
	this.delCb2Dat(doeo, doeo.dat.hct_tim.evt.change, "hdTimChg");
	this.delCb2Dat(doeo, doeo.dat.hct_tim.evt.change, "onChg");

	// 删除数据
	this.delDat(doeo, "hct_tim");
};
