/*************************************************
作者：子牛连
类名：NodeJs
说明：
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.NodeJs");
LZR.NodeJs = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.prototype.className_ = "LZR.NodeJs";
LZR.NodeJs.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs");

// 构造器
LZR.NodeJs.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.NodeJs.prototype.init_.lzrClass_ = LZR.NodeJs;

// 对构造参数的特殊处理
LZR.NodeJs.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.NodeJs.prototype.hdObj_.lzrClass_ = LZR.NodeJs;