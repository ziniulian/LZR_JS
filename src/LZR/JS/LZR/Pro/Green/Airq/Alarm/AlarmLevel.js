/*************************************************
作者：子牛连
类名：AlarmLevel
说明：预警级别
创建日期：25-三月-2016 14:50:36
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.Alarm"
], "LZR.Pro.Green.Airq.Alarm.AlarmLevel");
LZR.Pro.Green.Airq.Alarm.AlarmLevel = function (obj) {
	// 编号
	this.id = 0;	/*as:int*/

	// 名字
	this.name = "";	/*as:string*/

	// 样式
	this.css = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Alarm.AlarmLevel.prototype.className_ = "LZR.Pro.Green.Airq.Alarm.AlarmLevel";
LZR.Pro.Green.Airq.Alarm.AlarmLevel.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Alarm.AlarmLevel");

// 构造器
LZR.Pro.Green.Airq.Alarm.AlarmLevel.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Alarm.AlarmLevel.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
