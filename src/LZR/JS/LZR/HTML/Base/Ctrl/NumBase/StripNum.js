/*************************************************
作者：子牛连
类名：StripNum
说明：条状数值增减控制器
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/normal.css",
	css_1: "/Lib/css/HTML/Base/Ctrl/NumBase/StripNum.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.NumBase",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Val.RangeNum",
	"LZR.HTML.Base.Ctrl.Mouse.MouseInfo",
	"LZR.HTML.Base.Ctrl.Mouse",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.Ctrl.NumBase.StripNum");
LZR.HTML.Base.Ctrl.NumBase.StripNum = function (obj) /*bases:LZR.HTML.Base.Ctrl.NumBase*/ {
	LZR.initSuper(this, obj);

	// 是否竖直放置滚动条
	this.vertical = false;	/*as:boolean*/

	// 底条是否可拖动
	this.enableDropBase = true;	/*as:boolean*/

	// 按钮拖动
	this.btnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Mouse();	/*as:LZR.HTML.Base.Ctrl.Mouse*/

	// 底条拖动
	this.baseCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Mouse();	/*as:LZR.HTML.Base.Ctrl.Mouse*/

	// 经过
	this.evt.move/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 极值变化
	this.evt.limit/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype = LZR.clone (LZR.HTML.Base.Ctrl.NumBase.prototype, LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype);
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.super_ = [LZR.HTML.Base.Ctrl.NumBase];
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.className_ = "LZR.HTML.Base.Ctrl.NumBase.StripNum";
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.NumBase.StripNum");

// 构造器
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.init_ = function (obj/*as:Object*/) {
	this.baseCtrl.enableMove = true;
	this.baseCtrl.evt.lk.drop.add(this.utLzr.bind(this, this.hdBaseDrop), "StripNum_hdBaseDrop");
	this.baseCtrl.evt.lk.click.add(this.utLzr.bind(this, this.hdBaseClick), "StripNum_hdBaseClick");
	this.baseCtrl.evt.move.add(this.utLzr.bind(this, this.hdMove), "StripNum_hdMove");
	this.btnCtrl.evt.lk.drop.add(this.utLzr.bind(this, this.hdBtnDrop), "StripNum_hdBtnDrop");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 位置换算数值
LZR.HTML.Base.Ctrl.NumBase.StripNum.position2Num = function (doeo/*as:LZR.HTML.Base.Doe*/, position/*as:double*/, reverse/*as:boolean*/, v/*as:LZR.Base.Val.RangeNum*/, vertical/*as:boolean*/)/*as:double*/ {
	var scale = v.vcMax.get() - v.vcMin.get();
	if (vertical) {
		scale = doeo.position.height / scale;
	} else {
		scale = doeo.position.width / scale;
	}

	if (reverse) {
		return (position - v.vcMin.get()) * scale;
	} else {
		return v.vcMin.get() + position / scale;
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.position2Num.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 放置按钮
LZR.HTML.Base.Ctrl.NumBase.StripNum.placeBtn = function (doeo/*as:LZR.HTML.Base.Doe*/, n/*as:LZR.Base.Val.RangeNum*/, d/*as:LZR.HTML.Base.Doe*/, hidBtn/*as:boolean*/, vertical/*as:boolean*/) {
	var p, v = n.get();
	if (hidBtn && (v>n.vcMax.get() || v<n.vcMin.get())) {
		d.addCss("Lc_nosee");
	} else {
		d.delCss("Lc_nosee");
		p = this.position2Num(doeo, v, true, n, vertical);
		if (vertical) {
			d.setStyle("top", p);
		} else {
			d.setStyle("left", p);
		}
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.placeBtn.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 处理按钮拖动
LZR.HTML.Base.Ctrl.NumBase.StripNum.hdBtnDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, n/*as:LZR.Base.Val.RangeNum*/, pd/*as:LZR.HTML.Base.Doe*/, v/*as:LZR.HTML.Base.Ctrl.Mouse.MouseInfo*/, vertical/*as:boolean*/) {
	var d;
	var num = n.get();

	if (vertical) {
		d = this.position2Num(pd, v.lk.ey - v.lk.sy, false, n, vertical) - n.vcMin.get();
	} else {
		d = this.position2Num(pd, v.lk.ex - v.lk.sx, false, n, vertical) - n.vcMin.get();
	}

	d = this.position2Num(pd, n.set(num + d) - num + n.vcMin.get(), true, n, vertical);
	if (vertical) {
		v.lk.sy += d;
	} else {
		v.lk.sx += d;
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.hdBtnDrop.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 位置换算数值
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.position2Num = function (doeo/*as:LZR.HTML.Base.Doe*/, position/*as:double*/, reverse/*as:boolean*/)/*as:double*/ {
	return this.constructor.position2Num(doeo, position, reverse, doeo.dat.hct_num, this.vertical);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.position2Num.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 放置按钮
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.placeBtn = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.constructor.placeBtn(doeo, doeo.dat.hct_num, doeo.getById("hct_StripNumBtn"), this.enableDropBase, this.vertical);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.placeBtn.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 处理按钮拖动
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBtnDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	this.constructor.hdBtnDrop(doeo, doeo.dat.hct_num, doeo.dat.hct_StripNumBase, doeo.dat.hct_mof, this.vertical);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBtnDrop.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 处理底图拖动
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBaseDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	if (this.enableDropBase) {
		var d;
		var v = doeo.dat.hct_mof;
		var n = doeo.dat.hct_num;
		var min = n.vcMin.get();

		if (this.vertical) {
			d = this.position2Num(doeo, v.lk.sy - v.lk.ey);
		} else {
			d = this.position2Num(doeo, v.lk.sx - v.lk.ex);
		}

		if (d < min) {
			this.calcRange(n, d, 0);
		} else if (d > min) {
			this.calcRange(n, d - min + n.vcMax.get(), 0);
		}

		d = this.position2Num(doeo, min, true);
		if (this.vertical) {
			v.lk.sy += d;
		} else {
			v.lk.sx += d;
		}

		this.placeBtn(doeo);
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBaseDrop.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 计算范围
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.calcRange = function (n/*as:Object*/, v/*as:double*/, multiple/*as:double*/) {
	var max = n.vcMax.get();
	var min = n.vcMin.get();
	var d = max - min;
	if (v>max) {
		n.vcMax.set( n.normalize((v + d*multiple), true), false );
		n.vcMin.set(n.vcMax.get() - d);
	} else if (v<min) {
		n.vcMin.set( n.normalize((v - d*multiple), true), false );
		n.vcMax.set(n.vcMin.get() + d);
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.calcRange.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 鼠标经过事件
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.onMove = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/, x/*as:double*/, y/*as:double*/) {
	this.evt.move.execute (doeo, v, x, y);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.onMove.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 极值变化事件
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.onLimit = function (doeo/*as:LZR.HTML.Base.Doe*/, min/*as:double*/, max/*as:double*/) {
	this.evt.limit.execute (doeo, min, max);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.onLimit.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 处理极值变化
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdLimitChg = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var n = doeo.dat.hct_num;
	this.onLimit(doeo, n.vcMin.get(), n.vcMax.get());
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdLimitChg.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 处理鼠标经过
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdMove = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	var v;
	if (this.vertical) {
		v = doeo.dat.hct_num.normalize(this.position2Num(doeo, y));
	} else {
		v = doeo.dat.hct_num.normalize(this.position2Num(doeo, x));
	}
	this.onMove(doeo, v, x, y);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdMove.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 处理数值变化
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdNumChg = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/) {
	if (this.enableDropBase) {
		this.calcRange(doeo.dat.hct_num, v, 0);
	}
	this.placeBtn(doeo);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdNumChg.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// 处理底图点击
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBaseClick = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	if (this.vertical) {
		doeo.dat.hct_num.set(this.position2Num(doeo, y));
	} else {
		doeo.dat.hct_num.set(this.position2Num(doeo, x));
	}
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBaseClick.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var d, v;
	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_num", obj);
	} else {
		v = this.crtDat(doeo, "hct_num", new this.clsNum(pro));
	}
	if (this.enableDropBase) {
		v.inLimit = false;
	}

	// 按钮
	d = this.crtDoe(doeo, "hct_StripNumBtn", "div");
	this.btnCtrl.add(d, {
		enableStat: 1
	});
	this.crtDat(d, "hct_num", v);
	this.crtDat(d, "hct_StripNumBase", doeo);

	// 样式修正
	switch (doeo.getStyle("position")) {
		case "absolute":
		case "relative":
		case "fixed":
			break;
		default:
			doeo.setStyle("position", "relative");
			break;
	}
	if (d.getStyle("position") !== "absolute") {
		d.setStyle("position", "absolute");
	}

	// 事件添加
	this.baseCtrl.add(doeo, {
		enableStat: 1
	});
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcMin.evt.change, "hdLimitChg");
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcMax.evt.change, "hdLimitChg");
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "hdNumChg");
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "onChg");

	this.placeBtn(doeo);
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d;

	// 按钮
	d = doeo.getById("hct_StripNumBtn");
	this.btnCtrl.del(d);
	this.delDat(d, "hct_num");
	this.delDat(d, "hct_StripNumBase");

	// 删除事件
	this.baseCtrl.del(doeo);
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcMin.evt.change, "hdLimitChg");
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcMax.evt.change, "hdLimitChg");
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "hdNumChg");
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "onChg");

	// 删除数据
	this.delDat(doeo, "hct_num");
};
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.StripNum;
