/*************************************************
作者：子牛连
类名：WindSrv
说明：风场服务
创建日期：05-五月-2016 10:24:05
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs.ProSrv",
	"LZR.NodeJs.InfHttpSrv",
	"LZR.NodeJs.Util.Url",
	"LZR.NodeJs.ProSrv.WindSrv.Qry"
], "LZR.NodeJs.ProSrv.WindSrv");
LZR.NodeJs.ProSrv.WindSrv = function (obj) /*interfaces:LZR.NodeJs.InfHttpSrv*/ {
	LZR.NodeJs.InfHttpSrv.call(this);

	// 应答对象
	this.rsp = {};	/*as:Object*/

	// URL工具
	this.utUrl/*m*/ = LZR.getSingleton(LZR.NodeJs.Util.Url);	/*as:LZR.NodeJs.Util.Url*/

	// 查询
	this.qry/*m*/ = new LZR.NodeJs.ProSrv.WindSrv.Qry();	/*as:LZR.NodeJs.ProSrv.WindSrv.Qry*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.ProSrv.WindSrv.prototype = LZR.clone (LZR.NodeJs.InfHttpSrv.prototype, LZR.NodeJs.ProSrv.WindSrv.prototype);
LZR.NodeJs.ProSrv.WindSrv.prototype.className_ = "LZR.NodeJs.ProSrv.WindSrv";
LZR.NodeJs.ProSrv.WindSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.ProSrv.WindSrv");

// 构造器
LZR.NodeJs.ProSrv.WindSrv.prototype.init_ = function (obj/*as:Object*/) {
	this.qry.evt.msg.add(this.utLzr.bind(this, this.hdMsg));

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.NodeJs.ProSrv.WindSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.url) {
		this.qry.url = obj.url;
	}
};

// 处理查询结果
LZR.NodeJs.ProSrv.WindSrv.prototype.hdMsg = function (dat/*as:string*/) {
	this.rsp.writeHeader (200, {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "text/html; charset=utf-8"
	});
	this.rsp.write(dat, "utf-8");
	this.rsp.end();
};

// ---- 执行服务
LZR.NodeJs.ProSrv.WindSrv.prototype.execute = function (req/*as:Object*/, rsp/*as:Object*/, url/*as:string*/) {
	this.rsp = rsp;
	this.qry.getDat(this.utUrl.getParamGet (req));
};
