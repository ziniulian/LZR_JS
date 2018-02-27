/*************************************************
作者：子牛连
类名：Srv
说明：与服务相关的前端控件
创建日期：26-二月-2018 13:27:48
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML"
], "LZR.HTML.Srv");
LZR.HTML.Srv = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Srv.prototype.className_ = "LZR.HTML.Srv";
LZR.HTML.Srv.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Srv");

// 构造器
LZR.HTML.Srv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Srv.prototype.init_.lzrClass_ = LZR.HTML.Srv;

// 对构造参数的特殊处理
LZR.HTML.Srv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Srv.prototype.hdObj_.lzrClass_ = LZR.HTML.Srv;