/*************************************************
作者：子牛连
类名：Aqi
说明：污染综合指数
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.Fom",
	"LZR.Pro.Green.Airq.Fom.EmFomTyp",
	"LZR.Pro.Green.Airq.Alarm.EmAlarmLevel"
], "LZR.Pro.Green.Airq.Fom.Aqi");
LZR.Pro.Green.Airq.Fom.Aqi = function (obj) {
	// 时间
	this.tim = null;	/*as:Date*/

	// 附加信息
	this.memo = {};	/*as:Object*/

	// 引用枚举类
	this.clsEmFomTyp/*m*/ = (LZR.Pro.Green.Airq.Fom.EmFomTyp);	/*as:fun*/

	// 最小值
	this.min/*m*/ = new LZR.Pro.Green.Airq.Fom();	/*as:LZR.Pro.Green.Airq.Fom*/

	// 最大值
	this.max/*m*/ = new LZR.Pro.Green.Airq.Fom();	/*as:LZR.Pro.Green.Airq.Fom*/

	// 预警级别
	this.emAlarmLevel/*m*/ = new LZR.Pro.Green.Airq.Alarm.EmAlarmLevel();	/*as:LZR.Pro.Green.Airq.Alarm.EmAlarmLevel*/

	// 首要污染物
	this.emMainFom/*m*/ = [];	/*as:LZR.Pro.Green.Airq.Fom.EmFomTyp*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.Aqi.prototype.className_ = "LZR.Pro.Green.Airq.Fom.Aqi";
LZR.Pro.Green.Airq.Fom.Aqi.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Fom.Aqi");

// 获取唯一首要污染物
LZR.Pro.Green.Airq.Fom.Aqi.prototype.getOneMainFom = function ()/*as:LZR.Pro.Green.Airq.Fom.EmFomTyp*/ {
	var order = ["pm25", "pm10", "o3", "so2", "no2", "co"];
	for (var i = 0; i<order.length; i++) {
		for (var j = 0; j<this.emMainFom.length; j++) {
			if (order[i] === this.emMainFom[j].getKey()) {
				return this.emMainFom[j];
			}
		}
	}
	return new this.clsEmFomTyp();
};
LZR.Pro.Green.Airq.Fom.Aqi.prototype.getOneMainFom.lzrClass_ = LZR.Pro.Green.Airq.Fom.Aqi;

// 处理主要污染物
LZR.Pro.Green.Airq.Fom.Aqi.prototype.hdMainFom = function (obj/*as:Object*/)/*as:Array*/ {
	var r = [];
	for (var i=0; i<obj.length; i++) {
		r.push( new this.clsEmFomTyp(obj[i]) );
	}
	return r;
};
LZR.Pro.Green.Airq.Fom.Aqi.prototype.hdMainFom.lzrClass_ = LZR.Pro.Green.Airq.Fom.Aqi;

// 构造器
LZR.Pro.Green.Airq.Fom.Aqi.prototype.init_ = function (obj/*as:Object*/) {
	this.emMainFom.push( new this.clsEmFomTyp() );

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.Aqi.prototype.init_.lzrClass_ = LZR.Pro.Green.Airq.Fom.Aqi;

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Fom.Aqi.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.alarmLevel) {
		this.emAlarmLevel.set(obj.alarmLevel);
	}

	if (obj.mainFom) {
		this.emMainFom = this.hdMainFom(obj.mainFom);
	}

	if (obj.hd_min) {
		this.min.vcAqi.set(obj.hd_min);
	}

	if (obj.hd_max) {
		this.max.vcAqi.set(obj.hd_max);
	}
};
LZR.Pro.Green.Airq.Fom.Aqi.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.Airq.Fom.Aqi;