/*************************************************
作者：子牛连
类名：StripNum
说明：条状数值增减控制器
创建日期：13-五月-2016 16:10:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.NumBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.Mouse"
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
	this.btnCtrl.evt.lk.drop.add(this.utLzr.bind(this, this.hdBtnDrop), "StripNum_hdBtnDrop");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 位置换算数值
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.position2Num = function (doeo/*as:LZR.HTML.Base.Doe*/, position/*as:double*/, reverse/*as:boolean*/)/*as:double*/ {
	var v = doeo.dat.hct_num;
	var scale = v.vcMax.get() - v.vcMin.get();
	if (this.vertical) {
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

// 放置按钮
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.placeBtn = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var n = doeo.dat.hct_num;
	var v = n.get();
	var d = doeo.getById("hct_StripNumBtn");
	if (this.enableDropBase && (v>n.vcMax.get() || v<n.vcMin.get())) {
		d.addCss("Lc_nosee");
	} else {
		d.delCss("Lc_nosee");
		n = this.position2Num(doeo, v, true);
		if (this.vertical) {
			d.setStyle("top", n);
		} else {
			d.setStyle("left", n);
		}
	}
};

// 处理底图点击
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBaseClick = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	if (this.vertical) {
		this.doeo.dat.hct_num.set(this.position2Num(doeo, y));
	} else {
		this.doeo.dat.hct_num.set(this.position2Num(doeo, x));
	}
};

// 处理底图拖动
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBaseDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
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
		this.calcRange(n, d - min + max, 0);
	}

	d = this.position2Num(doeo, min, true);
	if (this.vertical) {
		v.lk.sy += d;
	} else {
		v.lk.sx += d;
	}
};

// 处理按钮拖动
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdBtnDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	var d;
	var v = doeo.dat.hct_mof;
	var n = doeo.dat.hct_num;
	var min = n.vcMin.get();
	var num = n.get();

	if (this.vertical) {
		d = this.position2Num(doeo, v.lk.ey - v.lk.sy) - min;
	} else {
		d = this.position2Num(doeo, v.lk.ex - v.lk.sx) - min;
	}

	d = this.position2Num(doeo, n.set(num + d) - num + min, true);
	if (this.vertical) {
		v.lk.sy += d;
	} else {
		v.lk.sx += d;
	}
};

// 处理数值变化
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.hdNumChg = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/) {
	if (this.enableDropBase) {
		this.calcRange(doeo.dat.hct_num, v, 0.2);
	}
	this.placeBtn(doeo);
};

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

	// 样式修正
	switch (doeo.getStyle("position")) {
		case "absolute":
		case "relative":
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
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "hdNumChg");
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "onChg");
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.NumBase.StripNum.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d;

	// 按钮
	d = doeo.getById("hct_StripNumBtn");
	this.btnCtrl.del(d);
	this.delDat(d, "hct_num");

	// 删除事件
	this.baseCtrl.del(doeo);
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "hdNumChg");
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.change, "onChg");

	// 删除数据
	this.delDat(doeo, "hct_num");
};
