/*************************************************
作者：子牛连
类名：EmAlarmLevel
说明：预警级别枚举
创建日期：28-三月-2016 15:07:32
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.Alarm",
	"LZR.Base.Val.Enum",
	"LZR.Pro.Green.Airq.Alarm.AlarmLevel"
], "LZR.Pro.Green.Airq.Alarm.EmAlarmLevel");
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.prototype);
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.prototype.className_ = "LZR.Pro.Green.Airq.Alarm.EmAlarmLevel";
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Alarm.EmAlarmLevel");

// 一级预警
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.v1/*m*/ = new LZR.Pro.Green.Airq.Alarm.AlarmLevel({
	name: "一级预警"
});	/*as:LZR.Pro.Green.Airq.Alarm.AlarmLevel*/

// 二级预警
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.v2/*m*/ = new LZR.Pro.Green.Airq.Alarm.AlarmLevel({
	name: "二级预警"
});	/*as:LZR.Pro.Green.Airq.Alarm.AlarmLevel*/

// 三级预警
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.v3/*m*/ = new LZR.Pro.Green.Airq.Alarm.AlarmLevel({
	name: "三级预警"
});	/*as:LZR.Pro.Green.Airq.Alarm.AlarmLevel*/

// 无
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.emnull/*m*/ = new LZR.Pro.Green.Airq.Alarm.AlarmLevel();	/*as:LZR.Pro.Green.Airq.Alarm.AlarmLevel*/

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Alarm.EmAlarmLevel.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
