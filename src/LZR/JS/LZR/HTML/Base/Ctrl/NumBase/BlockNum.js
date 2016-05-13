/*************************************************
作者：子牛连
类名：BlockNum
说明：块状数值增减控制器
创建日期：10-五月-2016 13:27:57
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Base/Ctrl/NumBase/BlockNum.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.NumBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.Btn",
	"LZR.HTML.Base.Ctrl.Txt"
], "LZR.HTML.Base.Ctrl.NumBase.BlockNum");
LZR.HTML.Base.Ctrl.NumBase.BlockNum = function (obj) /*bases:LZR.HTML.Base.Ctrl.NumBase*/ {
	LZR.initSuper(this, obj);

	// 格式化位数
	this.formatDigit = 0;	/*as:int*/

	// 加
	this.addBtnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Btn();	/*as:LZR.HTML.Base.Ctrl.Btn*/

	// 减
	this.subBtnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Btn();	/*as:LZR.HTML.Base.Ctrl.Btn*/

	// 输入框
	this.txtCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Txt();	/*as:LZR.HTML.Base.Ctrl.Txt*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype = LZR.clone (LZR.HTML.Base.Ctrl.NumBase.prototype, LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype);
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.super_ = [LZR.HTML.Base.Ctrl.NumBase];
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.className_ = "LZR.HTML.Base.Ctrl.NumBase.BlockNum";
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.NumBase.BlockNum");

// 构造器
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.init_ = function (obj/*as:Object*/) {
	this.addBtnCtrl.dbTim = 0;
	this.subBtnCtrl.dbTim = 0;
	this.addBtnCtrl.longTim = 0;
	this.subBtnCtrl.longTim = 0;
	this.addBtnCtrl.evt.click.add(this.utLzr.bind(this, this.addOne), "BlockNum_addOne");
	this.subBtnCtrl.evt.click.add(this.utLzr.bind(this, this.subOne), "BlockNum_subOne");
	this.txtCtrl.evt.chg.add(this.utLzr.bind(this, this.hdTxtSet), "BlockNum_hdTxtSet");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_css) {
		this.hdCss(obj.hd_css);
	}
};

//  处理样式参数
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.hdCss = function (s/*as:Object*/) {
	this.addBtnCtrl.css = s;
	this.subBtnCtrl.css = s;
};

// 增加一个步距
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.addOne = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.dat.hct_num.add(1);
};

// 减少一个步距
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.subOne = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.dat.hct_num.add(-1);
};

// 处理文本框输入设置
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.hdTxtSet = function (doeo/*as:LZR.HTML.Base.Doe*/, txt/*as:string*/) {
	var v = parseFloat(txt);
	if (isNaN(v)) {
		v = 0;
	}
	doeo.dat.hct_num.set(v);
};

// 处理数值的变化
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.hdNumSet = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/) {
	var d = doeo.getById("hct_BlockNumTxtView");
	// BUG ： 带文本输入控制器的 hct_txt 改为值控制器后，此处代码需更改。
	d.dat.hct_txt = this.formatTxt(v);
	d.doe.innerHTML = d.dat.hct_txt;
};

// 格式化输入框内容
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.formatTxt = function (v/*as:double*/)/*as:double*/ {
	if (this.formatDigit) {
		return this.utStr.format(v, this.formatDigit, "0");
	} else {
		return v;
	}
};

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var d, v;
	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_num", obj);
	} else {
		v = this.crtDat(doeo, "hct_num", new this.clsNum(pro));
	}

	// 加按钮
	d = this.crtDoe(doeo, "hct_BlockNumAddBtn", "div");
	this.addBtnCtrl.add(d);
	this.crtDat(d, "hct_num", v);

	// 文本框
	d = this.crtDoe(doeo, "hct_BlockNumTxtView", "div");
	this.crtDat(d, "hct_txt", this.formatTxt(doeo.dat.hct_num.get()));
	this.txtCtrl.add(d);
	this.crtDat(d, "hct_num", v);

	// 减按钮
	d = this.crtDoe(doeo, "hct_BlockNumSubBtn", "div");
	this.subBtnCtrl.add(d);
	this.crtDat(d, "hct_num", v);

	// 事件添加（为保证 onChg 事件在 hdNumSet 之后触发，就必须使用 set 事件）
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.set, "hdNumSet");
	this.crtCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.set, "onChg");
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d;

	// 加按钮
	d = doeo.getById("hct_BlockNumAddBtn");
	this.addBtnCtrl.del(d);
	this.delDat(d, "hct_num");

	// 文本框
	d = doeo.getById("hct_BlockNumTxtView");
	this.txtCtrl.del(d);
	this.delDat(d, "hct_num");

	// 减按钮
	d = doeo.getById("hct_BlockNumSubBtn");
	this.subBtnCtrl.del(d);
	this.delDat(d, "hct_num");

	// 删除事件
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.set, "hdNumSet");
	this.delCb2Dat(doeo, doeo.dat.hct_num.vcNum.evt.set, "onChg");

	// 删除数据
	this.delDat(doeo, "hct_num");
};
