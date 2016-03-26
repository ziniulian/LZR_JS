/*************************************************
作者：子牛连
类名：ReleaseSys
说明：公 众 发 布 系统
创建日期：25-三月-2016 15:03:25
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.Airq.App"
], "LZR.Pro.Green.Airq.App.ReleaseSys");
LZR.Pro.Green.Airq.App.ReleaseSys = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.Airq.App.ReleaseSys.prototype.className_ = "LZR.Pro.Green.Airq.App.ReleaseSys";
LZR.Pro.Green.Airq.App.ReleaseSys.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.Airq.App.ReleaseSys");

// 构造器
LZR.Pro.Green.Airq.App.ReleaseSys.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Pro.Green.Airq.App.ReleaseSys.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
