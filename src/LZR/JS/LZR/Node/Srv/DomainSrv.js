/*************************************************
作者：子牛连
类名：DomainSrv
说明：域名服务
创建日期：20-十一月-2017 15:50:30
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv",
	"LZR.HTML"
], "LZR.Node.Srv.DomainSrv");
LZR.Node.Srv.DomainSrv = function (obj) {
	// 网页类
	this.clsHtml/*m*/ = (LZR.HTML);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.DomainSrv.prototype.className_ = "LZR.Node.Srv.DomainSrv";
LZR.Node.Srv.DomainSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv.DomainSrv");

// 构造器
LZR.Node.Srv.DomainSrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.DomainSrv.prototype.init_.lzrClass_ = LZR.Node.Srv.DomainSrv;

// 对构造参数的特殊处理
LZR.Node.Srv.DomainSrv.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Srv.DomainSrv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.DomainSrv;

// 获取域名
LZR.Node.Srv.DomainSrv.prototype.get = function (key/*as:string*/)/*as:string*/ {
	if (key) {
		switch (key) {
			case "io_home":
				return "http://www.ziniulian.tk";
			case "io_gu":
				return "http://www.ziniulian.tk/gu.html";
			case "gu":
				return "http://srv-lzrgu.193b.starter-ca-central-1.openshiftapps.com/Gu";
			default:
				return key;
		}
	} else {
		return this.clsHtml.domain;
	}
};
LZR.Node.Srv.DomainSrv.prototype.get.lzrClass_ = LZR.Node.Srv.DomainSrv;
