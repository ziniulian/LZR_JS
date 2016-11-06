/*************************************************
作者：子牛连
类名：InfSrv
说明：服务接口
创建日期：09-十月-2016 17:31:42
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node"
], "LZR.Node.InfSrv");
LZR.Node.InfSrv = function (obj) {
	// 自身回调
	this.exe = LZR.getSingleton(LZR.Util).bind (this, this.srvMain);	/*as:fun*/
};
LZR.Node.InfSrv.prototype.className_ = "LZR.Node.InfSrv";
LZR.Node.InfSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.InfSrv");

// 服务主函数
LZR.Node.InfSrv.prototype.srvMain = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	
};
LZR.Node.InfSrv.prototype.srvMain.lzrClass_ = LZR.Node.InfSrv;
