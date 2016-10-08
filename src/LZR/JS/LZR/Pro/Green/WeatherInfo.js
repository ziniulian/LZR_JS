/*************************************************
作者：子牛连
类名：WeatherInfo
说明：天气
创建日期：01-八月-2016 18:15:45
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green",
	"LZR.Pro.Green.WeatherInfo.EmWeatherState"
], "LZR.Pro.Green.WeatherInfo");
LZR.Pro.Green.WeatherInfo = function (obj) {
	// 天气状况
	this.emState/*m*/ = new LZR.Pro.Green.WeatherInfo.EmWeatherState();	/*as:LZR.Pro.Green.WeatherInfo.EmWeatherState*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WeatherInfo.prototype.className_ = "LZR.Pro.Green.WeatherInfo";
LZR.Pro.Green.WeatherInfo.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WeatherInfo");

// 构造器
LZR.Pro.Green.WeatherInfo.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.WeatherInfo.prototype.init_.lzrClass_ = LZR.Pro.Green.WeatherInfo;

// 对构造参数的特殊处理
LZR.Pro.Green.WeatherInfo.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.state) {
		this.emState.set(obj.state);
	}
};
LZR.Pro.Green.WeatherInfo.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WeatherInfo;
