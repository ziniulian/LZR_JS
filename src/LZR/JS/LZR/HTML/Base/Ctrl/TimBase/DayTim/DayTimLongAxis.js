/*************************************************
作者：子牛连
类名：DayTimLongAxis
说明：日刻度长轴时间控制器
创建日期：26-九月-2016 17:28:23
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/normal.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase.DayTim",
	"LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo"
], "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis");
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis = function (obj) /*bases:LZR.HTML.Base.Ctrl.TimBase.DayTim*/ {
	LZR.initSuper(this, obj);

	// 信息类
	this.clsInfo/*m*/ = (LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.DayTim.prototype, LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype);
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.super_ = [LZR.HTML.Base.Ctrl.TimBase.DayTim];
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis";
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.ctrlPlay.css = this.playCss;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis;

// ---- 处理经过提示事件
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.hdMoveShow = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:double*/, x/*as:double*/) {
	var d = doeo.getById("hct_DayTimHourBarMs");
	d.setStyle("left", x);
	d.getById("txt").doe.innerHTML = new Date(v).getHours();
	d.delCss("Lc_nosee");
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.hdMoveShow.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis;

// ---- 生成滚动条控制器参数
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.crtProForCtrlStrip = function (val/*as:Object*/)/*as:Object*/ {
	var min, max;
	val.calcCount();
	return {
		min: val.minDay,
		max: val.maxDay,
		num: val.tim.vcBase.get(),
		step: 3600 * 1000
	};
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis.prototype.crtProForCtrlStrip.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxis;
