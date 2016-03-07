/*************************************************
作者：子牛连
类名：InfHttpSrv
说明：HTTP服务通用接口
创建日期：16-二月-2016 15:49:27
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs"
], "LZR.NodeJs.InfHttpSrv");
LZR.NodeJs.InfHttpSrv = function (obj) {
	// 服务名
	this.name = "";	/*as:string*/
};
LZR.NodeJs.InfHttpSrv.prototype.className_ = "LZR.NodeJs.InfHttpSrv";
LZR.NodeJs.InfHttpSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.InfHttpSrv");

// 执行服务
LZR.NodeJs.InfHttpSrv.prototype.execute = function (req/*as:Object*/, rsp/*as:Object*/, url/*as:string*/) {
	
};