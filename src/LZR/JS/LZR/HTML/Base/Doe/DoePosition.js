/*************************************************
作者：子牛连
类名：DoePosition
说明：元素位置
创建日期：12-五月-2016 15:07:17
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Doe"
], "LZR.HTML.Base.Doe.DoePosition");
LZR.HTML.Base.Doe.DoePosition = function (obj) {
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
LZR.HTML.Base.Doe.DoePosition.prototype.className_ = "LZR.HTML.Base.Doe.DoePosition";
LZR.HTML.Base.Doe.DoePosition.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Doe.DoePosition");

// 构造器
LZR.HTML.Base.Doe.DoePosition.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Doe.DoePosition.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
