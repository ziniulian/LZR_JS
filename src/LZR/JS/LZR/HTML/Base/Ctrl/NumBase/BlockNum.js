/*************************************************
作者：子牛连
类名：BlockNum
说明：块状数值增减控制器
创建日期：09-五月-2016 16:55:10
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.NumBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.Btn",
	"LZR.HTML.Base.Ctrl.Txt"
], "LZR.HTML.Base.Ctrl.NumBase.BlockNum");
LZR.HTML.Base.Ctrl.NumBase.BlockNum = function (obj) /*bases:LZR.HTML.Base.Ctrl.NumBase*/ {
	LZR.initSuper(this, obj);

	// 加
	this.addBtnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Btn();	/*as:LZR.HTML.Base.Ctrl.Btn*/

	// 减
	this.subBtnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Btn();	/*as:LZR.HTML.Base.Ctrl.Btn*/

	// 元素类
	this.clsDoe/*m*/ = (LZR.HTML.Base.Doe);	/*as:fun*/

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
	this.addBtnCtrl.evt.click.add(this.utLzr.bind(this, this.addOne));
	this.subBtnCtrl.evt.click.add(this.utLzr.bind(this, this.subOne));
	this.txtCtrl.evt.chg.add(this.utLzr.bind(this, this.setTxt));

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 给元素添加事件集
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.bindDoeo(doeo, "hct_BlockNumAddBtn", this.addBtnCtrl);
	this.bindDoeo(doeo, "hct_BlockNumSubBtn", this.subBtnCtrl);
	this.bindDoeo(doeo, "hct_BlockNumTxtView", this.txtCtrl);

	var a = doeo.getById("hct_BlockNumAddBtn");
	if (!a) {
		a = new this.clsDoe ({
			id: "hct_BlockNumAddBtn",
			hd_typ: "div",
			hd_css: "hct_BlockNumAddBtn",
		});
		this.doeo.add(a);
	}
	this.addBtnCtrl.add(a);

};

// 移除元素的事件集
LZR.HTML.Base.Ctrl.NumBase.BlockNum.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	
};
