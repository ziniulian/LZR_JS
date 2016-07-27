/*************************************************
作者：子牛连
类名：BaseMainSrv
说明：未使用框架的最基础主服务
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs",
	"LZR.Base.Str",
	"LZR.NodeJs.Util.Url",
	"LZR.Util",
	"LZR.NodeJs.InfHttpSrv"
], "LZR.NodeJs.BaseMainSrv");
LZR.NodeJs.BaseMainSrv = function (obj) /*interfaces:LZR.NodeJs.InfHttpSrv*/ {
	LZR.NodeJs.InfHttpSrv.call(this);

	// 端口号
	this.port = 80;	/*as:int*/

	// IP号
	this.ip = "localhost";	/*as:string*/

	// nodejs的HTTP模块
	this.http = LZR.getSingleton(null, null, "http");	/*as:Object*/

	// 服务
	this.srv = null;	/*as:Object*/

	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	// URL工具
	this.utUrl/*m*/ = LZR.getSingleton(LZR.NodeJs.Util.Url);	/*as:LZR.NodeJs.Util.Url*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	// 子服务集合
	this.subs/*m*/ = {};	/*as:LZR.NodeJs.InfHttpSrv*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
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
	this.srv = this.http.createServer( this.utLzr.bind(this, this.execute) );
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.NodeJs.BaseMainSrv.prototype.init_.lzrClass_ = LZR.NodeJs.BaseMainSrv;

// 对构造参数的特殊处理
LZR.NodeJs.BaseMainSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.NodeJs.BaseMainSrv.prototype.hdObj_.lzrClass_ = LZR.NodeJs.BaseMainSrv;

// 配置子服务
LZR.NodeJs.BaseMainSrv.prototype.initSubs = function (config/*as:Object*/) {
	if (!config) return;
	/*
		config 参数使用特殊字段 cls_ ，例如：
		{
			// 基础文件服务
			web: {
				cls_: LZR.NodeJs.SampleWebFileSrv,		// 用于对象创建的特殊字段
				name: "/web/",
				ajaxAllow: "*"
			},

			// LZR库文件访问服务
			myLib: {
				cls_: LZR.NodeJs.SampleWebFileSrv,
				name: "/myLib/",
				path: "/",
				ajaxAllow: "*",
				dir: LZR.curPath
			},

			// LOGO图片
			logo: {
				cls_: LZR.NodeJs.SampleWebFileSrv,
				name: "/favicon.ico",
				path: "/Logo.png"
			},

			// 主页跳转
			home: {
				cls_: LZR.NodeJs.SampleWebFileSrv,
				name: "/",
				path: "/web/index.html",
				ajaxAllow: "*"
			}
		}
	*/
	var s, o;
	for (s in config) {
		o = config[s];
		switch (o.cls_.prototype.className_) {
			default:
				this.subs[s] = new o.cls_ (o);
				break;
		}
	}
};
LZR.NodeJs.BaseMainSrv.prototype.initSubs.lzrClass_ = LZR.NodeJs.BaseMainSrv;

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
LZR.NodeJs.BaseMainSrv.prototype.matchSubs.lzrClass_ = LZR.NodeJs.BaseMainSrv;

// 启动服务
LZR.NodeJs.BaseMainSrv.prototype.start = function (config/*as:Object*/) {
	this.initSubs(config);
	this.srv.listen(this.port, this.ip);
	console.log ("服务已运行：http://" + this.ip + ":" + this.port);
};
LZR.NodeJs.BaseMainSrv.prototype.start.lzrClass_ = LZR.NodeJs.BaseMainSrv;

// 停止服务
LZR.NodeJs.BaseMainSrv.prototype.stop = function () {
	this.srv.close();
};
LZR.NodeJs.BaseMainSrv.prototype.stop.lzrClass_ = LZR.NodeJs.BaseMainSrv;

// ---- 执行服务
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
LZR.NodeJs.BaseMainSrv.prototype.execute.lzrClass_ = LZR.NodeJs.BaseMainSrv;