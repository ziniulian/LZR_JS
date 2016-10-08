/*************************************************
作者：子牛连
类名：EmFomLevel
说明：污染物级别枚举
创建日期：27-七月-2016 12:30:03
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

// 无级别
LZR.Pro.Green.Airq.Fom.EmFomLevel.emnull/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 0,
	name: "",
	clr: "gray7f"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 一级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v1/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 1,
	name: "优",
	rangeMin: 0 ,
	rangeMax: 50,
	healthTips: "空气污染指数为0－50，空气质量级别为一级，空气质量状况属于优。此时，空气质量令人满意，基本无空气污染，各类人群可正常活动。",
	clr: "v1"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 二级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v2/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 2,
	name: "良",
	rangeMin: 51,
	rangeMax: 100,
	healthTips: "空气污染指数为51－100，空气质量级别为二级，空气质量状况属于良。此时空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响，建议极少数异常敏感人群应减少户外活动。",
	clr: "yellow"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 三级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v3/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 3,
	name: "轻度污染",
	rangeMin: 101,
	rangeMax: 150,
	healthTips: "空气污染指数为101－150，空气质量级别为三级，空气质量状况属于轻度污染。此时，易感人群症状有轻度加剧，健康人群出现刺激症状。建议儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。",
	clr: "v3"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 四级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v4/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 4,
	name: "中度污染",
	rangeMin: 151,
	rangeMax: 200,
	healthTips: "空气污染指数为151－200，空气质量级别为四级，空气质量状况属于中度污染。此时，进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响，建议疾病患者避免长时间、高强度的户外锻练，一般人群适量减少户外运动。",
	clr: "red"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 五级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v5/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 5,
	name: "重度污染",
	rangeMin: 201,
	rangeMax: 300,
	healthTips: "空气污染指数为201－300，空气质量级别为五级，空气质量状况属于重度污染。此时，心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状，建议儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。",
	clr: "v5"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 六级
LZR.Pro.Green.Airq.Fom.EmFomLevel.v6/*m*/ = new LZR.Pro.Green.Airq.Fom.FomLevel({
	id: 6,
	name: "严重污染",
	rangeMin: 301,
	rangeMax: 500,
	healthTips: "空气污染指数大于300，空气质量级别为六级，空气质量状况属于严重污染。此时，健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病，建议儿童、老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动。",
	clr: "v6"
});	/*as:LZR.Pro.Green.Airq.Fom.FomLevel*/

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.Airq.Fom.EmFomLevel;

// 通过指数设置对应的级别
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.setByAqi = function (aqi/*as:int*/) {
	this.set( this.getKeyByAqi(aqi) );
};
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.setByAqi.lzrClass_ = LZR.Pro.Green.Airq.Fom.EmFomLevel;

// 通过名称设置对应的级别
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.setByName = function (name/*as:string*/) {
	this.set( this.getKeyByName(name) );
};
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.setByName.lzrClass_ = LZR.Pro.Green.Airq.Fom.EmFomLevel;

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
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.getKeyByAqi.lzrClass_ = LZR.Pro.Green.Airq.Fom.EmFomLevel;

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
LZR.Pro.Green.Airq.Fom.EmFomLevel.prototype.getKeyByName.lzrClass_ = LZR.Pro.Green.Airq.Fom.EmFomLevel;
