/*************************************************
作者：子牛连
类名：SampleProxySrv
说明：简单的代理服务
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs",
	"LZR.NodeJs.Util.Url",
	"LZR.NodeJs.InfHttpSrv"
], "LZR.NodeJs.SampleProxySrv");
LZR.NodeJs.SampleProxySrv = function (obj) /*interfaces:LZR.NodeJs.InfHttpSrv*/ {
	LZR.NodeJs.InfHttpSrv.call(this);

	// 代理访问URL的参数名
	this.urlNam = "url";	/*as:string*/

	// nodejs的HTTP模块
	this.http = LZR.getSingleton(null, null, "http");	/*as:Object*/

	// Url工具
	this.utUrl/*m*/ = LZR.getSingleton(LZR.NodeJs.Util.Url);	/*as:LZR.NodeJs.Util.Url*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.SampleProxySrv.prototype = LZR.clone (LZR.NodeJs.InfHttpSrv.prototype, LZR.NodeJs.SampleProxySrv.prototype);
LZR.NodeJs.SampleProxySrv.prototype.className_ = "LZR.NodeJs.SampleProxySrv";
LZR.NodeJs.SampleProxySrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.SampleProxySrv");

// 构造器
LZR.NodeJs.SampleProxySrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.NodeJs.SampleProxySrv.prototype.init_.lzrClass_ = LZR.NodeJs.SampleProxySrv;

// 对构造参数的特殊处理
LZR.NodeJs.SampleProxySrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.NodeJs.SampleProxySrv.prototype.hdObj_.lzrClass_ = LZR.NodeJs.SampleProxySrv;

// ---- 执行服务
LZR.NodeJs.SampleProxySrv.prototype.execute = function (req/*as:Object*/, rsp/*as:Object*/, url/*as:string*/) {
	var path = this.utUrl.getParamGet(req)[this.urlNam];
	if (path) {
// console.log (path);
		// 访问远端URL
		var reqR = this.http.get(path, function (rspR) {
// console.log (rspR.headers);
			rsp.writeHead(rspR.statusCode, rspR.headers);
			rspR.pipe(rsp);
		});
		req.pipe(reqR);

		reqR.on("error", function(e) {
			rsp.writeHeader (404, {"Content-Type":"text/plain;charset=utf-8"});
			rsp.write ("404 页面不存在\n\n", "utf-8");
			rsp.write ("访问远端URL失败！\n\n", "utf-8");
			rsp.write (e.message, "utf-8");
			rsp.end();
		});
	} else {
		rsp.writeHeader (404, {"Content-Type":"text/plain;charset=utf-8"});
		rsp.write ("404 页面不存在\n\n", "utf-8");
		rsp.write ("缺少参数：" + this.urlNam, "utf-8");
		rsp.end();
	}
};
LZR.NodeJs.SampleProxySrv.prototype.execute.lzrClass_ = LZR.NodeJs.SampleProxySrv;