/*************************************************
作者：子牛连
类名：Node
说明：
创建日期：18-九月-2016 11:35:26
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.Node");
LZR.Node = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.prototype.className_ = "LZR.Node";
LZR.Node.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node");

// 构造器
LZR.Node.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.prototype.init_.lzrClass_ = LZR.Node;

// 对构造参数的特殊处理
LZR.Node.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Node.prototype.hdObj_.lzrClass_ = LZR.Node;
