/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：19-九月-2016 13:01:48
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node"
], "LZR.Node.Util");
LZR.Node.Util = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Util.prototype.className_ = "LZR.Node.Util";
LZR.Node.Util.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Util");

// 构造器
LZR.Node.Util.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Util.prototype.init_.lzrClass_ = LZR.Node.Util;

// 对构造参数的特殊处理
LZR.Node.Util.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Util.prototype.hdObj_.lzrClass_ = LZR.Node.Util;

// 获取客户端IP
LZR.Node.Util.prototype.getClientIp = function (req/*as:Object*/)/*as:string*/ {
	return req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};
LZR.Node.Util.prototype.getClientIp.lzrClass_ = LZR.Node.Util;
