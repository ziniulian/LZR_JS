/*************************************************
作者：子牛连
类名：Scd
说明：选择器
创建日期：27-七月-2016 12:30:04
版本号：1.1
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Val.Ctrl"
], "LZR.HTML.Base.Ctrl.Scd");
LZR.HTML.Base.Ctrl.Scd = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 被选中时的样式
	this.css = "";	/*as:string*/

	// 值控制器类
	this.clsVc/*m*/ = (LZR.Base.Val.Ctrl);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Scd.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.Scd.prototype);
LZR.HTML.Base.Ctrl.Scd.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.Scd.prototype.className_ = "LZR.HTML.Base.Ctrl.Scd";
LZR.HTML.Base.Ctrl.Scd.prototype.version_ = "1.1";

LZR.load(null, "LZR.HTML.Base.Ctrl.Scd");

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.Scd.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var v;
	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_scd", obj);
	} else {
		if (pro !== true) {
			pro = false;
		}
		v = this.crtDat(doeo, "hct_scd", new this.clsVc(pro));
	}

	// 事件添加
	this.crtCb2Dat(doeo, doeo.dat.hct_scd.evt.set, "setCss");
	doeo.addEvt ("mousedown", this.utLzr.bind(this, this.hdDown, doeo), this.className_);
};
LZR.HTML.Base.Ctrl.Scd.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Scd;

// 构造器
LZR.HTML.Base.Ctrl.Scd.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.Scd.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.Scd;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Scd.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.Scd.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.Scd;

// 处理按下事件
LZR.HTML.Base.Ctrl.Scd.prototype.hdDown = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	if (this.utEvt.parseMouseKey(evt) === "lk") {	// 判断是左键被按下
		var b = doeo.dat.hct_scd.get();
		doeo.dat.hct_scd.set (!b);
	}
};
LZR.HTML.Base.Ctrl.Scd.prototype.hdDown.lzrClass_ = LZR.HTML.Base.Ctrl.Scd;

// 设置css样式
LZR.HTML.Base.Ctrl.Scd.prototype.setCss = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:boolean*/) {
	if (val) {
		doeo.addCss(this.css);
	} else {
		doeo.delCss(this.css);
	}
};
LZR.HTML.Base.Ctrl.Scd.prototype.setCss.lzrClass_ = LZR.HTML.Base.Ctrl.Scd;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.Scd.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.delCb2Dat(doeo, doeo.dat.hct_scd.evt.set, "setCss");
	doeo.delEvt ("mousedown", this.className_);

	// 删除数据
	this.delDat(doeo, "hct_scd");
};
LZR.HTML.Base.Ctrl.Scd.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Scd;