/*************************************************
作者：子牛连
类名：DatMod
说明：数据模型
创建日期：26-三月-2016 16:20:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.App.ReleaseSys",
	"LZR.Pro.Gis.Area",
	"LZR.Pro.Green.Airq.Fom.Aqi"
], "LZR.Pro.Green.Airq.App.ReleaseSys.DatMod");
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod = function (obj) /*bases:LZR.Pro.Gis.Area*/ {
	LZR.initSuper(this, obj);

	// 播报
	this.broadcast = "";	/*as:string*/

	// 指数集合
	this.aqis/*m*/ = {};	/*as:LZR.Pro.Green.Airq.Fom.Aqi*/

	// 指数类
	this.clsAqi/*m*/ = (LZR.Pro.Green.Airq.Fom.Aqi);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype = LZR.clone (LZR.Pro.Gis.Area.prototype, LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype);
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype.super_ = [LZR.Pro.Gis.Area];
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype.className_ = "LZR.Pro.Green.Airq.App.ReleaseSys.DatMod";
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.App.ReleaseSys.DatMod");

// 构造器
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype.init_ = function (obj/*as:Object*/) {
	this.hdAqis({
		"24": undefined,
		"48": undefined,
		"72": undefined
	});

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_aqis) {
		this.hdAqis (obj.hd_aqis);
	}

	// 调用父类的参数处理（子数据的递归创建）
	this.utLzr.supCall (this, 0, "hdObj_", obj);
};

// 处理污染指数
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype.hdAqis = function (obj/*as:Object*/) {
	for (var s in obj) {
		this.aqis[s] = new this.clsAqi(obj[s]);
	}
};
