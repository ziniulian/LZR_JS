/*************************************************
作者：子牛连
类名：EmFomTyp
说明：污染物类型枚举
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.Fom",
	"LZR.Base.Val.Enum",
	"LZR.Pro.Green.Airq.Fom.FomType"
], "LZR.Pro.Green.Airq.Fom.EmFomTyp");
LZR.Pro.Green.Airq.Fom.EmFomTyp = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype);
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype.className_ = "LZR.Pro.Green.Airq.Fom.EmFomTyp";
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Fom.EmFomTyp");

// PM2.5
LZR.Pro.Green.Airq.Fom.EmFomTyp.pm25/*m*/ = new LZR.Pro.Green.Airq.Fom.FomType({
	id: "pm25",
	name: "PM2.5",
	htm: "PM<sub>2.5</sub>",
	unit: "ug/m<sup>3</sup>"
});	/*as:LZR.Pro.Green.Airq.Fom.FomType*/

// PM10
LZR.Pro.Green.Airq.Fom.EmFomTyp.pm10/*m*/ = new LZR.Pro.Green.Airq.Fom.FomType({
	id: "pm10",
	name: "PM10",
	htm: "PM<sub>10</sub>",
	unit: "ug/m<sup>3</sup>"
});	/*as:LZR.Pro.Green.Airq.Fom.FomType*/

// 氮氧化物
LZR.Pro.Green.Airq.Fom.EmFomTyp.no2/*m*/ = new LZR.Pro.Green.Airq.Fom.FomType({
	id: "no2",
	name: "NO2",
	htm: "NO<sub>2</sub>",
	unit: "ug/m<sup>3</sup>"
});	/*as:LZR.Pro.Green.Airq.Fom.FomType*/

// 硫氧化物
LZR.Pro.Green.Airq.Fom.EmFomTyp.so2/*m*/ = new LZR.Pro.Green.Airq.Fom.FomType({
	id: "so2",
	name: "SO2",
	htm: "SO<sub>2</sub>",
	unit: "ug/m<sup>3</sup>"
});	/*as:LZR.Pro.Green.Airq.Fom.FomType*/

// 一氧化碳
LZR.Pro.Green.Airq.Fom.EmFomTyp.co/*m*/ = new LZR.Pro.Green.Airq.Fom.FomType({
	id: "co",
	name: "CO",
	htm: "CO",
	unit: "mg/m<sup>3</sup>"
});	/*as:LZR.Pro.Green.Airq.Fom.FomType*/

// 臭氧
LZR.Pro.Green.Airq.Fom.EmFomTyp.o3/*m*/ = new LZR.Pro.Green.Airq.Fom.FomType({
	id: "o3",
	name: "O3",
	htm: "O<sub>3</sub>",
	unit: "ug/m<sup>3</sup>"
});	/*as:LZR.Pro.Green.Airq.Fom.FomType*/

// 无
LZR.Pro.Green.Airq.Fom.EmFomTyp.emnull/*m*/ = new LZR.Pro.Green.Airq.Fom.FomType();	/*as:LZR.Pro.Green.Airq.Fom.FomType*/

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.Airq.Fom.EmFomTyp;

// ---- 设置值
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype.set = function (key/*as:string*/)/*as:boolean*/ {
	if (key) {
		key = key.toLocaleLowerCase();
		if (key === "pm2.5") {
			key = "pm25";
		}
	}
	return  this.utLzr.supCall (this, 0, "set", key);
};
LZR.Pro.Green.Airq.Fom.EmFomTyp.prototype.set.lzrClass_ = LZR.Pro.Green.Airq.Fom.EmFomTyp;