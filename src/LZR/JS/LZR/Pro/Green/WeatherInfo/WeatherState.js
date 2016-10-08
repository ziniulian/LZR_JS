/*************************************************
作者：子牛连
类名：WeatherState
说明：天气状况
创建日期：01-八月-2016 18:15:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.WeatherInfo"
], "LZR.Pro.Green.WeatherInfo.WeatherState");
LZR.Pro.Green.WeatherInfo.WeatherState = function (obj) {
	// 编号
	this.id = -1;	/*as:int*/

	// 名称
	this.name = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WeatherInfo.WeatherState.prototype.className_ = "LZR.Pro.Green.WeatherInfo.WeatherState";
LZR.Pro.Green.WeatherInfo.WeatherState.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WeatherInfo.WeatherState");

// 构造器
LZR.Pro.Green.WeatherInfo.WeatherState.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.WeatherInfo.WeatherState.prototype.init_.lzrClass_ = LZR.Pro.Green.WeatherInfo.WeatherState;

// 对构造参数的特殊处理
LZR.Pro.Green.WeatherInfo.WeatherState.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.WeatherInfo.WeatherState.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WeatherInfo.WeatherState;