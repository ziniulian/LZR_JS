/*************************************************
作者：子牛连
类名：EmWeatherState
说明：天气状况枚举
创建日期：01-八月-2016 18:15:18
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.WeatherInfo",
	"LZR.Base.Val.Enum",
	"LZR.Pro.Green.WeatherInfo.WeatherState"
], "LZR.Pro.Green.WeatherInfo.EmWeatherState");
LZR.Pro.Green.WeatherInfo.EmWeatherState = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype);
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype.className_ = "LZR.Pro.Green.WeatherInfo.EmWeatherState";
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WeatherInfo.EmWeatherState");

// 空
LZR.Pro.Green.WeatherInfo.EmWeatherState.emnull/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: "emnull",
	name: ""
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 晴
LZR.Pro.Green.WeatherInfo.EmWeatherState.w0/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 0,
	name: "晴"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 多云
LZR.Pro.Green.WeatherInfo.EmWeatherState.w1/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 1,
	name: "多云"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 阴
LZR.Pro.Green.WeatherInfo.EmWeatherState.w2/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 2,
	name: "阴"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 中雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w8/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 8,
	name: "中雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 大雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w9/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 9,
	name: "大雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 暴雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w10/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 10,
	name: "暴雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 大暴雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w11/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 11,
	name: "大暴雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 特大暴雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w12/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 12,
	name: "特大暴雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 阵雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w3/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 3,
	name: "阵雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 雷阵雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w4/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 4,
	name: "雷阵雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 雷阵雨并伴有冰雹
LZR.Pro.Green.WeatherInfo.EmWeatherState.w5/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 5,
	name: "雷阵雨并伴有冰雹"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 雨加雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w6/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 6,
	name: "雨加雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 小雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w7/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 7,
	name: "小雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 阵雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w13/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 13,
	name: "阵雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 中雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w15/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 15,
	name: "中雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 大雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w16/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 16,
	name: "大雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 暴雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w17/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 17,
	name: "暴雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 雾
LZR.Pro.Green.WeatherInfo.EmWeatherState.w18/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 18,
	name: "雾"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 暴雨-大暴雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w24/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 24,
	name: "暴雨-大暴雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 大暴雨-特大暴雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w25/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 25,
	name: "大暴雨-特大暴雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 小雪-中雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w26/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 26,
	name: "小雪-中雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 中雪-大雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w27/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 27,
	name: "中雪-大雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 大雪-暴雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w28/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 28,
	name: "大雪-暴雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 冻雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w19/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 19,
	name: "冻雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 沙尘暴
LZR.Pro.Green.WeatherInfo.EmWeatherState.w20/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 20,
	name: "沙尘暴"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 小雨-中雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w21/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 21,
	name: "小雨-中雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 中雨-大雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w22/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 22,
	name: "中雨-大雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 大雨-暴雨
LZR.Pro.Green.WeatherInfo.EmWeatherState.w23/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 23,
	name: "大雨-暴雨"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 浮尘
LZR.Pro.Green.WeatherInfo.EmWeatherState.w29/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 29,
	name: "浮尘"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 扬沙
LZR.Pro.Green.WeatherInfo.EmWeatherState.w30/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 30,
	name: "扬沙"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 强沙尘暴
LZR.Pro.Green.WeatherInfo.EmWeatherState.w31/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 31,
	name: "强沙尘暴"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 小雪
LZR.Pro.Green.WeatherInfo.EmWeatherState.w14/*m*/ = new LZR.Pro.Green.WeatherInfo.WeatherState({
	id: 14,
	name: "小雪"
});	/*as:LZR.Pro.Green.WeatherInfo.WeatherState*/

// 构造器
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype.init_.lzrClass_ = LZR.Pro.Green.WeatherInfo.EmWeatherState;

// 对构造参数的特殊处理
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.WeatherInfo.EmWeatherState.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WeatherInfo.EmWeatherState;