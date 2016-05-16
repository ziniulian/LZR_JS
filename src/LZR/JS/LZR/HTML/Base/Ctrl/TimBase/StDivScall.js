/*************************************************
作者：子牛连
类名：StDivScall
说明：Div时间刻度
创建日期：16-五月-2016 16:52:23
版本号：1.0
*************************************************/

LZR.loadAnnex({
	css_0: "/Lib/css/HTML/Base/Ctrl/TimBase/StDivScall.css"
});

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.TimBase.InfCalibration"
], "LZR.HTML.Base.Ctrl.TimBase.StDivScall");
LZR.HTML.Base.Ctrl.TimBase.StDivScall = function (obj) /*interfaces:LZR.HTML.Base.Ctrl.TimBase.InfCalibration*/ {
	LZR.HTML.Base.Ctrl.TimBase.InfCalibration.call(this);

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	// 元素类
	this.clsDoe/*m*/ = (LZR.HTML.Base.Doe);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.InfCalibration.prototype, LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype);
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.StDivScall";
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.StDivScall");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 划刻度
LZR.HTML.Base.Ctrl.TimBase.StDivScall.prototype.draw = function (doeo/*as:LZR.HTML.Base.Doe*/, ctrl/*as:LZR.HTML.Base.Ctrl.NumBase.StripNum*/) {
	var n = doeo.dat.hct_num;
	var dt = n.vcMin.get();
	var step = n.vcStep.get();
	var d = Math.floor( (n.vcMax.get() - dt) / step );
	var w = (doeo.position.width / d);
	var old = new Date(dt);
	var i, j, sd, out, bd, up;

	// 清空容器
	doeo.innerHTML = "";

	// 放容器
	i = 0;
	j = 0;
	// out = new this.clsDoe({
	// 	id: "StDivScall_Out_" + i,
	// 	hd_typ: "div",
	// 	hd_css: "Lc_hct_StDivScall_Out",
	// 	chd_: {
	// 		up: {
	// 			hd_typ: "div",
	// 			hd_css: "Lc_hct_StDivScall_Up"
	// 		},
	// 		big: {
	// 			hd_typ: "div",
	// 			hd_css: "Lc_hct_StDivScall_Big"
	// 		}
	// 	}
	// });
	// up = 
	// doeo.add(sd);

	for (i = 0; i<d; i++) {
		sd = new this.clsDoe({
			id: "StDivScall_Small_" + i,
			hd_typ: "div",
			hd_css: "Lc_hct_StDivScall_Small"
		});
		doeo.add(sd);
		sd.setStyle("width", w);
		sd.setStyle("left", i * w);
	}
};
