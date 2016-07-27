/*************************************************
作者：子牛连
类名：DivScallSt
说明：Div刻度的时间控制条
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Base/Ctrl/TimBase/DivScallSt.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.TimBase.StDivScall",
	"LZR.HTML.Base.Ctrl.TimBase.StripTim",
	"LZR.HTML.Base.Ctrl.TimBase.BlockTim",
	"LZR.HTML.Base.Ctrl.SglScd"
], "LZR.HTML.Base.Ctrl.TimBase.DivScallSt");
LZR.HTML.Base.Ctrl.TimBase.DivScallSt = function (obj) /*bases:LZR.HTML.Base.Ctrl.TimBase.StripTim*/ {
	LZR.initSuper(this, obj);

	// 单选器被选中时的样式
	this.scdCss = "";	/*as:string*/

	// 刻度配置信息
	this.config = [
			{min: 72, max: 24},	// 时
			{min: 24*60, max: 24*20},	// 日
			{min: 24*1500, max: 24*300}	// 月
		];	/*as:Array*/

	// 刻度
	this.scall/*m*/ = new LZR.HTML.Base.Ctrl.TimBase.StDivScall();	/*as:LZR.HTML.Base.Ctrl.TimBase.StDivScall*/

	// 块状时间控制器
	this.blockCtrl/*m*/ = new LZR.HTML.Base.Ctrl.TimBase.BlockTim();	/*as:LZR.HTML.Base.Ctrl.TimBase.BlockTim*/

	// 单选类
	this.clsScd/*m*/ = (LZR.HTML.Base.Ctrl.SglScd);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.StripTim.prototype, LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype);
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.super_ = [LZR.HTML.Base.Ctrl.TimBase.StripTim];
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.DivScallSt";
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.DivScallSt");

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_css) {
		this.hdCss(obj.hd_css);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DivScallSt;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var b, d, v;
	/*
		参数说明：
		hd_tim: new Date(),	// 当前时间
		dtMax: new Date(),	// 最大时间
		dtMin: new Date(),	// 最小时间
		// scallStat: 0,	// 刻度样式（0：小时，1：日，2：月）
	*/

	// 块状时间控件
	b = this.crtDoe(doeo, "hct_StDivScall_blockDoe", "div");

	// 条状时间控件
	d = this.crtDoe(doeo, "hct_StDivScall_stripDoe", "div");

	// 添加刻度样式数据
	if (!pro.scallStat) {
		pro.scallStat = 0;
	}
	this.crtDat(d, "hct_StDivScall_stat", pro.scallStat);

	// 调用父类方法
	this.utLzr.supCall (this, 0, "addEvt", d, pro, obj);

	// 数据关联
	this.crtDat(b, "hct_tim", d.dat.hct_tim);

	// 绑定块状时间控制器
	this.blockCtrl.add(b);

	// 添加刻度切换选项
	v = new this.clsScd({
		css: this.scdCss
	});
	this.crtDat(doeo, "hct_StDivScall_scdCtrl", v);
	this.crtCb2Dat(d, v.vcCur.evt.change, "statChg");

	b = this.crtDoe(doeo, "hct_StDivScall_scdDoe", "div");
	d = this.crtDoe(b, "hct_StDivScall_scdDoe_h", "div", "Lc_hct_StDivScall_scdDoe_sub");
	v.add(d);
	if (pro.scallStat === 0) {
		d.dat.hct_scd.set(true);
	}
	d = this.crtDoe(b, "hct_StDivScall_scdDoe_d", "div", "Lc_hct_StDivScall_scdDoe_sub");
	v.add(d);
	if (pro.scallStat === 1) {
		d.dat.hct_scd.set(true);
	}
	d = this.crtDoe(b, "hct_StDivScall_scdDoe_M", "div", "Lc_hct_StDivScall_scdDoe_sub");
	v.add(d);
	if (pro.scallStat === 2) {
		d.dat.hct_scd.set(true);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DivScallSt;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d, v;

	// 块状时间控件
	d = doeo.getById("hct_StDivScall_blockDoe");
	this.blockCtrl.del(d);

	// 条状时间控件
	d = doeo.getById("hct_StDivScall_stripDoe");
	this.utLzr.supCall (this, 0, "delEvt", d);	// 调用父类方法

	// 删除刻度切换内容
	v = doeo.dat.hct_StDivScall_scdCtrl;
	this.delCb2Dat(d, v.vcCur.evt.change, "statChg");
	d = doeo.getById("hct_StDivScall_scdDoe_h");
	v.del(d);
	d = doeo.getById("hct_StDivScall_scdDoe_d");
	v.del(d);
	d = doeo.getById("hct_StDivScall_scdDoe_M");
	v.del(d);
	this.delDat(doeo, "hct_StDivScall_scdCtrl");

	// 删除刻度样式数据
	this.delDat(doeo, "hct_StDivScall_stat");
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DivScallSt;

// 构造器
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.init_ = function (obj/*as:Object*/) {
	this.utLzr.supCall (this, 0, "init_", null);
	this.scall.belongCtrl = this;

	this.blockCtrl.format = "yMdh";
	this.blockCtrl.hdFormatDigit(2);

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DivScallSt;

// 切换刻度样式
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.statChg = function (doeo/*as:LZR.HTML.Base.Doe*/, cur/*as:LZR.HTML.Base.Doe*/) {
	var c;
	var n = doeo.dat.hct_num;
	var v = n.get();
	var s = n.vcStep.get();
	switch (cur.id.get()) {
		case "hct_StDivScall_scdDoe_h":
			c = this.config[0];
			doeo.dat.hct_StDivScall_stat = 0;
			break;
		case "hct_StDivScall_scdDoe_d":
			c = this.config[1];
			doeo.dat.hct_StDivScall_stat = 1;
			break;
		case "hct_StDivScall_scdDoe_M":
			c = this.config[2];
			doeo.dat.hct_StDivScall_stat = 2;
			break;
	}
	n.vcMin.set(v - c.min * s, false);
	n.vcMax.set(v + c.max * s);
	this.numCtrl.placeBtn(doeo);
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.statChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DivScallSt;

// 处理样式参数
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.hdCss = function (s/*as:Object*/) {
	this.blockCtrl.hdCss(s);
};
LZR.HTML.Base.Ctrl.TimBase.DivScallSt.prototype.hdCss.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DivScallSt;