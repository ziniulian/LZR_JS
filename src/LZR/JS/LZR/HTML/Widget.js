/*************************************************
作者：子牛连
类名：Widget
说明：小部件
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML"
], "LZR.HTML.Widget");
LZR.HTML.Widget = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Widget.prototype.className_ = "LZR.HTML.Widget";
LZR.HTML.Widget.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Widget");

// 构造器
LZR.HTML.Widget.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Widget.prototype.init_.lzrClass_ = LZR.HTML.Widget;

// 对构造参数的特殊处理
LZR.HTML.Widget.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Widget.prototype.hdObj_.lzrClass_ = LZR.HTML.Widget;