/*************************************************
作者：子牛连
类名：DomainSrv
说明：域名服务
创建日期：20-一月-2018 13:29:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv",
	"LZR.HTML",
	"LZR.Node.Db.NodeAjax",
	"LZR.Base.Json"
], "LZR.Node.Srv.DomainSrv");
LZR.Node.Srv.DomainSrv = function (obj) {
	// 域名集合
	this.ds = {};	/*as:Object*/

	// 网页类
	this.clsHtml/*m*/ = (LZR.HTML);	/*as:fun*/

	// Ajax工具
	this.ajx/*m*/ = new LZR.Node.Db.NodeAjax();	/*as:LZR.Node.Db.NodeAjax*/

	// Json转换工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

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
	if (obj.hd_ids) {	// 域名主键集
		this.initAjx();
		if (obj.hd_fun) {	// 新的回调
			this.ajx.evt.get.add(obj.hd_fun);
		}
		this.get(obj.hd_ids);
	}
};
LZR.Node.Srv.DomainSrv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.DomainSrv;

// 初始化Ajax
LZR.Node.Srv.DomainSrv.prototype.initAjx = function () {
	this.ds.main = this.clsHtml.domain;
	this.ajx.crtEvt({
		get: this.clsHtml.domain + "Domain/srvGet/"
	});
	this.ajx.evt.get.add(LZR.bind(this, this.cbGet));
};
LZR.Node.Srv.DomainSrv.prototype.initAjx.lzrClass_ = LZR.Node.Srv.DomainSrv;

// 获取域名
LZR.Node.Srv.DomainSrv.prototype.get = function (ids/*as:string*/) {
	if (ids) {
		this.ajx.qry("get", null, null, null, null, {ids:ids});
	}
};
LZR.Node.Srv.DomainSrv.prototype.get.lzrClass_ = LZR.Node.Srv.DomainSrv;

// 获取域名的回调
LZR.Node.Srv.DomainSrv.prototype.cbGet = function (rds/*as:string*/) {
	if (rds) {
		var o = this.utJson.toObj(rds);
		if (o.ok) {
			for (var s in o.dat) {
				this.ds[s] = o.dat[s];
			}
		}
	}
};
LZR.Node.Srv.DomainSrv.prototype.cbGet.lzrClass_ = LZR.Node.Srv.DomainSrv;
