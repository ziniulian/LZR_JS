/*************************************************
作者：子牛连
类名：BaseMainSrv
说明：未使用框架的最基础主服务
创建日期：17-二月-2016 10:31:32
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs",
	"LZR.NodeJs.SampleWebFileSrv",
	"LZR.NodeJs.InfHttpSrv",
	"LZR.Base.Str",
	"LZR.NodeJs.Util.Url"
], "LZR.NodeJs.BaseMainSrv");
LZR.NodeJs.BaseMainSrv = function (obj) /*interfaces:LZR.NodeJs.InfHttpSrv*/ {
	LZR.NodeJs.InfHttpSrv.call(this);

	// 端口号
	this.port = 80;	/*as:int*/

	// IP号
	this.ip = "localhost";	/*as:string*/

	// nodejs的HTTP模块
	this.http = require("http");	/*as:Object*/

	// 子服务集合
	this.subs/*m*/ = {};	/*as:LZR.NodeJs.InfHttpSrv*/

	// 字符串工具
	this.utStr/*m*/ = new LZR.Base.Str();	/*as:LZR.Base.Str*/

	// URL工具
	this.utUrl/*m*/ = new LZR.NodeJs.Util.Url();	/*as:LZR.NodeJs.Util.Url*/

	if (obj && obj.super_) {
		this.init_();
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.BaseMainSrv.prototype = LZR.clone (LZR.NodeJs.InfHttpSrv.prototype, LZR.NodeJs.BaseMainSrv.prototype);
LZR.NodeJs.BaseMainSrv.prototype.className_ = "LZR.NodeJs.BaseMainSrv";
LZR.NodeJs.BaseMainSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.BaseMainSrv");

// 构造器
LZR.NodeJs.BaseMainSrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 配置子服务
LZR.NodeJs.BaseMainSrv.prototype.initSubs = function (config/*as:Object*/) {
	var wfs = LZR.NodeJs.SampleWebFileSrv;

	for (var s in config) {
		var o = config[s];
		switch (o.srv) {
			case "wfs":
				o.obj.utUrl = this.utUrl;
				this.subs[s] = new wfs(o.obj);
				break;
		}
	}
// console.log (this.subs);
};

// 匹配子服务
LZR.NodeJs.BaseMainSrv.prototype.matchSubs = function (uri/*as:string*/)/*as:Object*/ {
	for (var s in this.subs) {
		var srv = this.subs[s];
		if (this.utStr.startWith (uri, srv.name)) {
			return srv;
		}
	}
	return null;
};

// 启动服务
LZR.NodeJs.BaseMainSrv.prototype.start = function (config/*as:Object*/) {
	this.initSubs(config);
	this.http.createServer( LZR.bind(this, this.execute) ).listen(this.port, this.ip);
	console.log ("服务已运行：http://" + this.ip + ":" + this.port);
};

// ---------- 接口实现 --------------
LZR.NodeJs.BaseMainSrv.prototype.execute = function (req/*as:Object*/, rsp/*as:Object*/, url/*as:string*/) {
	url = this.utUrl.getUri (req);
// console.log (url);
// console.log (this.utUrl.parseUrl(req));
	var srv = this.matchSubs (url);
	if (srv) {
		srv.execute (req, rsp, url);
	} else {
		rsp.writeHeader (404, {"Content-Type":"text/plain;charset=utf-8"});
		rsp.write ("404 服务不存在\n\n\n", "utf-8");
		rsp.write ("Error：", "utf-8");
		rsp.write (url, "utf-8");
		rsp.write ("\n\n", "utf-8");
		rsp.end();
	}
};