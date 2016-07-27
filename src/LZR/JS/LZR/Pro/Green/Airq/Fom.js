/*************************************************
作者：子牛连
类名：Fom
说明：污染物
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq",
	"LZR.Pro.Green.Airq.Fom.EmFomTyp",
	"LZR.Pro.Green.Airq.Fom.EmFomLevel",
	"LZR.Base.Val.Ctrl"
], "LZR.Pro.Green.Airq.Fom");
LZR.Pro.Green.Airq.Fom = function (obj) {
	// 浓度值
	this.value = 0;	/*as:double*/

	// 均值除数
	this.divisor = 1;	/*as:int*/

	// 污染物类型，初始化属性名：typ
	this.emTyp/*m*/ = new LZR.Pro.Green.Airq.Fom.EmFomTyp();	/*as:LZR.Pro.Green.Airq.Fom.EmFomTyp*/

	// 污染级别，初始化属性名：level
	this.emLevel/*m*/ = new LZR.Pro.Green.Airq.Fom.EmFomLevel();	/*as:LZR.Pro.Green.Airq.Fom.EmFomLevel*/

	// 污染指数，初始化属性名：aqi
	this.vcAqi/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.Fom.prototype.className_ = "LZR.Pro.Green.Airq.Fom";
LZR.Pro.Green.Airq.Fom.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.Fom");

// 构造器
LZR.Pro.Green.Airq.Fom.prototype.init_ = function (obj/*as:Object*/) {
	this.vcAqi.setEventObj (this);
	this.vcAqi.evt.change.add(this.hdAqiChange, "hdAqiChange");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	} else {
		this.vcAqi.set("-");
	}
};
LZR.Pro.Green.Airq.Fom.prototype.init_.lzrClass_ = LZR.Pro.Green.Airq.Fom;

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.Fom.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.typ) {
		this.emTyp.set(obj.typ);
	}

	if (obj.aqi) {
		this.vcAqi.set(obj.aqi);
	} else {
		this.vcAqi.set("-");
	}
};
LZR.Pro.Green.Airq.Fom.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.Airq.Fom;

// 处理污染指数的变化
LZR.Pro.Green.Airq.Fom.prototype.hdAqiChange = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/)/*as:boolean*/ {
	this.emLevel.setByAqi (val);
};
LZR.Pro.Green.Airq.Fom.prototype.hdAqiChange.lzrClass_ = LZR.Pro.Green.Airq.Fom;