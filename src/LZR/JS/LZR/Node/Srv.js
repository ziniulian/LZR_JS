/*************************************************
作者：子牛连
类名：Srv
说明：服务
创建日期：18-九月-2016 11:36:35
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node",
	"LZR.Node.Router"
], "LZR.Node.Srv");
LZR.Node.Srv = function (obj) {
	// express 框架
	this.ep = LZR.getSingleton (null, null, "express");	/*as:Object*/

	// 基础服务
	this.app = LZR.getSingleton (null, null, "http");	/*as:Object*/

	// 基础服务对象
	this.appO = null;	/*as:Object*/

	// 基础服务对象回调
	this.appR = null;	/*as:Object*/

	// 端口号
	this.port = 80;	/*as:int*/

	// IP号
	this.ip = null;	/*as:string*/

	// 服务对象
	this.so = this.ep();	/*as:Object*/

	// 路由器
	this.ro/*m*/ = new LZR.Node.Router();	/*as:LZR.Node.Router*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.prototype.className_ = "LZR.Node.Srv";
LZR.Node.Srv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv");

// 构造器
LZR.Node.Srv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.prototype.init_.lzrClass_ = LZR.Node.Srv;

// 对构造参数的特殊处理
LZR.Node.Srv.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Srv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv;

// 获取基础服务
LZR.Node.Srv.prototype.getApp = function ()/*as:Object*/ {
	if (!this.appO) {
		this.so.use('/', this.ro.ro);
		this.appO = this.app.createServer(this.so);
	}
	return this.appO;
};
LZR.Node.Srv.prototype.getApp.lzrClass_ = LZR.Node.Srv;

// 启动服务
LZR.Node.Srv.prototype.start = function ()/*as:Object*/ {
	if (!this.appR) {
		if (this.ip) {
			this.appR = this.getApp().listen(this.port, this.ip);
		} else {
			this.appR = this.getApp().listen(this.port);
		}
	}
	return this.appR;
};
LZR.Node.Srv.prototype.start.lzrClass_ = LZR.Node.Srv;

// 路由匹配
LZR.Node.Srv.prototype.use = function (nam/*as:string*/, fun/*as:Object*/) {
	this.ro.use(nam, fun);
};
LZR.Node.Srv.prototype.use.lzrClass_ = LZR.Node.Srv;
