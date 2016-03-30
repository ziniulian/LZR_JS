/*************************************************
作者：子牛连
类名：EmFomLevel
说明：污染物级别枚举
创建日期：30-三月-2016 10:12:17
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.Fom",
	"LZR.Pro.Green.Airq.Fom.FomLevel",
	"LZR.Base.Val.Enum"
], "LZR.Pro.Green.Airq.Fom.EmFomLevel");
LZR.Pro.Green.Airq.Fom.EmFomLevel = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype);
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.className_ = "LZR.Pro.Green.Airq.Fom.EmFomLevel";
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Fom.EmFomLevel");

// 四级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v4/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 4,
	name: "中度污染",
	rangeMin: 151,
	rangeMax: 200,
	clr: "red"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 五级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v5/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 5,
	name: "重度污染",
	rangeMin: 201,
	rangeMax: 300,
	clr: "v5"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 三级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v3/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 3,
	name: "轻度污染",
	rangeMin: 101,
	rangeMax: 150,
	clr: "v3"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 二级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v2/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 2,
	name: "良",
	rangeMin: 51,
	rangeMax: 100,
	clr: "yellow"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 无级别
LZR.Pro.Green.Airq.Fom.EmFomLevel.emnull/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 0,
	name: "",
	clr: "gray7f"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 六级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v6/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 6,
	name: "严重污染",
	rangeMin: 301,
	rangeMax: 500,
	clr: "v6"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 一级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v1/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 1,
	name: "优",
	rangeMin: 0 ,
	rangeMax: 50,
	clr: "v1"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 通过指数设置对应的级别
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.setByAqi = function (aqi/*as:int*/) {
	this.set( this.getKeyByAqi(aqi) );
};

// 通过名称设置对应的级别
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.setByName = function (name/*as:string*/) {
	this.set( this.getKeyByName(name) );
};

// 通过指数获取枚举名
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.getKeyByAqi = function (aqi/*as:int*/)/*as:string*/ {
	if (!isNaN(aqi)) {
		for (var s in this.constructor) {
			switch (s) {
				case "emnull":
					break;
				default:
					if (aqi >= this.constructor[s].rangeMin && aqi <= this.constructor[s].rangeMax) {
						return s;
					}
					break;
			}
		}
	}
	return "emnull";
};

// 通过名称获取枚举名
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.getKeyByName = function (name/*as:string*/)/*as:string*/ {
	switch (name[0]) {
		case "优":
			return "v1";
		case "良":
			return "v2";
		case "轻":
			return "v3";
		case "中":
			return "v4";
		case "重":
			return "v5";
		case "严":
			if (name[1] === "重") {
				return "v6";
			}
			break;
	}
	return "emnull";
};
