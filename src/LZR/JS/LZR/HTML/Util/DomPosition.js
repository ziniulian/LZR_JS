/*************************************************
作者：子牛连
类名：DomPosition
说明：元素位置
创建日期：15-六月-2016 17:23:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Util"
], "LZR.HTML.Util.DomPosition");
LZR.HTML.Util.DomPosition = function (obj) {
	// 上
	this.top = 0;	/*as:double*/

	// 左
	this.left = 0;	/*as:double*/

	// 宽
	this.width = 0;	/*as:double*/

	// 高
	this.height = 0;	/*as:double*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Util.DomPosition.prototype.className_ = "LZR.HTML.Util.DomPosition";
LZR.HTML.Util.DomPosition.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Util.DomPosition");

// 构造器
LZR.HTML.Util.DomPosition.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Util.DomPosition.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
