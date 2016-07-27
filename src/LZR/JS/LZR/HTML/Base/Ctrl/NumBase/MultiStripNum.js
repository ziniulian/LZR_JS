/*************************************************
作者：子牛连
类名：MultiStripNum
说明：多头条状数值控制器
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.NumBase",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Val.RangeDat",
	"LZR.HTML.Base.Ctrl.Mouse",
	"LZR.HTML.Base.Ctrl.NumBase.StripNum"
], "LZR.HTML.Base.Ctrl.NumBase.MultiStripNum");
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum = function (obj) /*bases:LZR.HTML.Base.Ctrl.NumBase*/ {
	LZR.initSuper(this, obj);

	// 是否竖直放置滚动条
	this.vertical = false;	/*as:boolean*/

	// 按钮拖动
	this.btnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Mouse();	/*as:LZR.HTML.Base.Ctrl.Mouse*/

	// 条状控制器类
	this.clsSnc/*m*/ = (LZR.HTML.Base.Ctrl.NumBase.StripNum);	/*as:fun*/

	// 数值类
	this.clsNum/*m*/ = (LZR.Base.Val.RangeDat);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype = LZR.clone (LZR.HTML.Base.Ctrl.NumBase.prototype, LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype);
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.super_ = [LZR.HTML.Base.Ctrl.NumBase];
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.className_ = "LZR.HTML.Base.Ctrl.NumBase.MultiStripNum";
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.NumBase.MultiStripNum");

// 构造器
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.init_ = function (obj/*as:Object*/) {
	this.btnCtrl.evt.lk.drop.add(this.utLzr.bind(this, this.hdBtnDrop), "MultiStripNum_hdBtnDrop");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var d, v, s;

	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_multiNum", obj);
	} else {
		v = this.crtDat(doeo, "hct_multiNum", new this.clsNum(pro));
	}

	// 样式修正
	doeo.calcPosition();
	switch (doeo.getStyle("position")) {
		case "absolute":
		case "relative":
		case "fixed":
			break;
		default:
			doeo.setStyle("position", "relative");
			break;
	}

	for (s in v.subs) {
		// 按钮
		d = this.crtDoe(doeo, "hct_MultiStripNumBtn_" + s, "div", "Lc_hct_StripNumBtn");

		// 样式修正
		if (d.getStyle("position") !== "absolute") {
			d.setStyle("position", "absolute");
		}

		// 子数据
		this.crtDat(d, "hct_num", v.subs[s]);
		this.crtDat(d, "hct_MultiStripNumBase", doeo);

		// 事件添加
		this.btnCtrl.add(d, {
			enableStat: 1
		});
		this.crtCb2Dat(d, v.subs[s].rn.vcNum.evt.before, "hdNumBef");
		this.crtCb2Dat(d, v.subs[s].rn.vcNum.evt.change, "hdNumChg");

		// 放置按钮
		this.placeBtn(d);
	}
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d, v, s;

	v = doeo.dat.hct_multiNum;

	for (s in v.subs) {
		// 按钮
		d = doeo.getById("hct_MultiStripNumBtn_" + s);

		// 删除数据
		this.delDat(d, "hct_num");
		this.delDat(d, "hct_MultiStripNumBase");

		// 删除事件
		this.btnCtrl.del(d);
		this.delCb2Dat(d, v.subs[s].rn.vcNum.evt.before, "hdNumBef");
		this.delCb2Dat(d, v.subs[s].rn.vcNum.evt.change, "hdNumChg");
	}

	// 删除数据
	this.delDat(doeo, "hct_multiNum");
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// 放置按钮
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.placeBtn = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.clsSnc.placeBtn(doeo.dat.hct_MultiStripNumBase, doeo.dat.hct_num.rn, doeo, false, this.vertical);
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.placeBtn.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// 处理数值变化
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdNumChg = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var n = doeo.dat.hct_num;
	this.placeBtn(doeo);
	this.onChg (doeo.dat.hct_MultiStripNumBase, n.parent.get(), n.id.get(), doeo);
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdNumChg.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// 处理按钮拖动
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdBtnDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	this.clsSnc.hdBtnDrop(doeo, doeo.dat.hct_num.rn, doeo.dat.hct_MultiStripNumBase, doeo.dat.hct_mof, this.vertical);
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdBtnDrop.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// 数值预处理
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdNumBef = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/, self/*as:Object*/, old/*as:double*/, tmp/*as:Object*/) {
	var m;
	var n = doeo.dat.hct_num;
	var p = n.parent.get();
	var i = parseInt(n.id.get(), 10);
	n = n.rn;

	if (i>0) {
		m = n.check(p.subs[i-1].rn.get() + p.rn);
		if (v < m) {
			tmp.tmpVal = m;
			return;
		}
	}

	if (i<(p.count - 1)) {
		m = n.check(p.subs[i+1].rn.get() - p.rn);
		if (v > m) {
			tmp.tmpVal = m;
		}
	}
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.hdNumBef.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;

// ---- 值变化时触发的事件
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.onChg = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:LZR.Base.Val.RangeDat*/, id/*as:string*/, btnDoeo/*as:LZR.HTML.Base.Doe*/) {
	this.evt.chg.execute (doeo, v, id, btnDoeo);
};
LZR.HTML.Base.Ctrl.NumBase.MultiStripNum.prototype.onChg.lzrClass_ = LZR.HTML.Base.Ctrl.NumBase.MultiStripNum;