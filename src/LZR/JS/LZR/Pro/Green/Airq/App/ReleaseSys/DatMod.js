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
	this.initFom();

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 初始化近三天污染数据
LZR.Pro.Green.Airq.App.ReleaseSys.DatMod.prototype.initFom = function () {
	this.aqis["24"] = new this.clsAqi();
	this.aqis["48"] = new this.clsAqi();
	this.aqis["72"] = new this.clsAqi();
};
