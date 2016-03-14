/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：11-三月-2016 13:57:26
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML"
], "LZR.HTML.Util");
LZR.HTML.Util = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Util.prototype.className_ = "LZR.HTML.Util";
LZR.HTML.Util.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Util");

// 构造器
LZR.HTML.Util.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Util.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
