/*************************************************
作者：子牛连
类名：Thumbnails
说明：缩略图控制器
创建日期：12-八月-2016 15:30:17
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Base/Ctrl/Thumbnails/Thumbnails.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.Mouse",
	"LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.Ctrl.Thumbnails");
LZR.HTML.Base.Ctrl.Thumbnails = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 底条拖动
	this.baseCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Mouse();	/*as:LZR.HTML.Base.Ctrl.Mouse*/

	// 缩图信息类
	this.clsTub/*m*/ = (LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo);	/*as:fun*/

	// 放图片
	this.evt.draw/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 被选中
	this.evt.scd/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.Thumbnails.prototype);
LZR.HTML.Base.Ctrl.Thumbnails.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.Thumbnails.prototype.className_ = "LZR.HTML.Base.Ctrl.Thumbnails";
LZR.HTML.Base.Ctrl.Thumbnails.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Thumbnails");

// 构造器
LZR.HTML.Base.Ctrl.Thumbnails.prototype.init_ = function (obj/*as:Object*/) {
	this.onDraw_Self = this.utLzr.bind(this, this.onDraw);
	this.onScd_Self = this.utLzr.bind(this, this.onScd);
	this.baseCtrl.enableWheel = true;
	this.baseCtrl.evt.up.add(this.utLzr.bind(this, this.hdBaseUp), "Thumbnails_hdBaseUp");
	this.baseCtrl.evt.lk.drop.add(this.utLzr.bind(this, this.hdBaseDrop), "Thumbnails_hdBaseDrop");
	this.baseCtrl.evt.mid.wheel.add(this.utLzr.bind(this, this.hdBaseWheel), "Thumbnails_hdBaseWheel");
	this.baseCtrl.evt.lk.click.add(this.utLzr.bind(this, this.hdBaseClick), "Thumbnails_hdBaseClick");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 放图片事件
LZR.HTML.Base.Ctrl.Thumbnails.prototype.onDraw = function (doeo/*as:LZR.HTML.Base.Doe*/, imgDat/*as:Object*/, imgDoeo/*as:LZR.HTML.Base.Doe*/, index/*as:int*/) {
	this.evt.draw.execute (doeo, imgDat, imgDoeo, index);
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.onDraw.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 被选中事件
LZR.HTML.Base.Ctrl.Thumbnails.prototype.onScd = function (doeo/*as:LZR.HTML.Base.Doe*/, imgDat/*as:Object*/, imgDoeo/*as:LZR.HTML.Base.Doe*/, index/*as:int*/, old/*as:int*/) {
	this.evt.scd.execute (doeo, imgDat, imgDoeo, index, old);
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.onScd.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 处理底图拖动
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	var d;
	var v = doeo.dat.hct_mof;
	var t = doeo.dat.hct_tub;
	if (t.vertical) {
		d = v.lk.ey - v.lk.sy;
		v.lk.sy = v.lk.ey;
	} else {
		d = v.lk.ex - v.lk.sx;
		v.lk.sx = v.lk.ex;
	}
// console.log (t.position);
	d += t.position.get();
	doeo.getById("hct_ThumbnailsSlider").setStyle(t.getLayoutDir(), t.position.set(d) + "px");
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseDrop.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 处理底图拖动后抬起
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseUp = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/, key/*as:Object*/) {
	if (key.dbStat === 0) {
		var t = doeo.dat.hct_tub;
		t.scrllAnimat = false;
		t.area.vcMin.set(t.position.get() / -t.size + Math.floor(t.area.vcMin.get()) - t.catchNum);
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseUp.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 处理底图点击
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseClick = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/) {
	var t = doeo.dat.hct_tub;
	t.area.set(Math.floor(t.position2Num(doeo, t.vertical?y:x)));
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseClick.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 处理底图滚动
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseWheel = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:int*/) {
	var t = doeo.dat.hct_tub;
	t.area.vcMin.set(t.area.vcMin.get() - v * t.showNum);
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.hdBaseWheel.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// 重置
LZR.HTML.Base.Ctrl.Thumbnails.prototype.resize = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var t = doeo.dat.hct_tub;
	t.resize(doeo);
	t.hdMinChg(doeo, this.onDraw_Self);
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.resize.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.Thumbnails.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var d, v, dr;
	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_tub", obj);
	} else {
		v = this.crtDat(doeo, "hct_tub", new this.clsTub(pro));
	}

	// 模版
	d = doeo.getById("hct_ThumbnailsTemplate");
	if (d) {
		v.modDoe = d;
		d.parent.set();
	}

	// 滑块
	d = this.crtDoe(doeo, "hct_ThumbnailsSlider", "div", v.vertical?"Lc_hct_ThumbnailsSliderV":undefined);
	this.crtDat(d, "hct_tub", v);

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
	if (doeo.getStyle("overflow") !== "hidden") {
		doeo.setStyle("overflow", "hidden");
	}
	if (d.getStyle("position") !== "absolute") {
		d.setStyle("position", "absolute");
	}

	// 事件添加
	this.baseCtrl.add(doeo, {
		enableStat: 1
	});
	this.crtCb2Dat(doeo, doeo.dat.hct_tub.area.vcMin.evt.change, "hdMinChg", this.utLzr.bind(v, v.hdMinChg, doeo, this.onDraw_Self));
	this.crtCb2Dat(doeo, doeo.dat.hct_tub.area.vcNum.evt.change, "hdScdChg", this.utLzr.bind(v, v.hdScdChg, doeo, this.onScd_Self));

	// 初始化
	this.resize(doeo);
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.Thumbnails.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d;

	// 删除滑块
	d = doeo.getById("hct_ThumbnailsSlider");
	this.delDat(d, "hct_tub");

	// 删除事件
	this.baseCtrl.del(doeo);
	this.delCb2Dat(doeo, doeo.dat.hct_tub.area.vcMin.evt.change, "hdMinChg");
	this.delCb2Dat(doeo, doeo.dat.hct_tub.area.vcNum.evt.change, "hdScdChg");

	// 删除数据
	this.delDat(doeo, "hct_tub");
};
LZR.HTML.Base.Ctrl.Thumbnails.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails;
