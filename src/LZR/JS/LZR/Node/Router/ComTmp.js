/*************************************************
作者：子牛连
类名：ComTmp
说明：通用模板路由
创建日期：20-八月-2018 16:32:25
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Router",
	"LZR.Node.Srv.DomainSrv",
	"LZR.Node.Srv.Result"
], "LZR.Node.Router.ComTmp");
LZR.Node.Router.ComTmp = function (obj) {
	// 需要获取域名的ID集合
	this.dmIds = "";	/*as:string*/

	// 模板用工具包
	this.tools = null;	/*as:Object*/

	// 路由器
	this.ro/*m*/ = null;	/*as:LZR.Node.Router*/

	// 域名服务
	this.dms/*m*/ = new LZR.Node.Srv.DomainSrv();	/*as:LZR.Node.Srv.DomainSrv*/

	// 结果类
	this.clsR/*m*/ = (LZR.Node.Srv.Result);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Router.ComTmp.prototype.className_ = "LZR.Node.Router.ComTmp";
LZR.Node.Router.ComTmp.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Router.ComTmp");

// 构造器
LZR.Node.Router.ComTmp.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Router.ComTmp.prototype.init_.lzrClass_ = LZR.Node.Router.ComTmp;

// 对构造参数的特殊处理
LZR.Node.Router.ComTmp.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Router.ComTmp.prototype.hdObj_.lzrClass_ = LZR.Node.Router.ComTmp;

// 初始化模板
LZR.Node.Router.ComTmp.prototype.initTmp = function (nam/*as:string*/, dir/*as:string*/, tools/*as:Object*/) {
	if (!nam) {
		nam = "/";
	}
	if (!dir) {
		dir = "tmp";
	}
	if (tools) {
		this.tools = tools;
	}

	// 创建doT模板
	this.ro.crtTmp (dir);

	// 模板里用到的静态文件夹
	this.ro.setStaticDir(nam + "tmp2web/", this.ro.path + dir + "/tmp2web");
	this.ro.use (nam + "tmp2web/", function (req, res) {
		// 静态文件夹里没有的文件，直接报错，不再向下路由。
		res.redirect("/err");
	});
	this.ro.all (nam + "*/tmp2web/*", function (req, res) {
		// console.log (req.path);
		// console.log (req.url);
		// console.log (req.baseUrl);
		// console.log (req.originalUrl);
		res.redirect(req.baseUrl + nam + "tmp2web/" + req.params[1]);
	});

	// 模板调用
	this.ro.use (nam + ":dotNam", LZR.bind(this, this.sendTmp));
};
LZR.Node.Router.ComTmp.prototype.initTmp.lzrClass_ = LZR.Node.Router.ComTmp;

// 模板调用
LZR.Node.Router.ComTmp.prototype.sendTmp = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, dotNam/*as:string*/) {
	var n, o = LZR.fillPro(req, "qpobj.tmpo");
	if (!dotNam) {
		dotNam = req.params.dotNam;
	}
	o.url = {
		base: req.baseUrl,
		dot: dotNam
	};
	n = req.baseUrl.indexOf("/" + dotNam);
	if (n > 0) {
		o.url.rout = req.baseUrl.substr(0, n + 1);
	} else {
		o.url.rout = req.baseUrl + "/";
		o.url.base = o.url.rout + dotNam;
	}
	o.dms = this.dms.ds;
	if (this.tools) {
		o = LZR.fillPro(o, "tls");
		LZR.megPro(o, this.tools);
	}
	var t = this.ro.getTmp(dotNam, req.qpobj);
	if (t) {
		res.send(t);
	} else {
		next();
	}
};
LZR.Node.Router.ComTmp.prototype.sendTmp.lzrClass_ = LZR.Node.Router.ComTmp;

// 初始化域名服务
LZR.Node.Router.ComTmp.prototype.initDms = function (ids/*as:string*/, srvNam/*as:string*/) {
	if (ids) {
		this.dmIds = ids;
	}
	if (!srvNam) {
		srvNam = "/srvFlushDms/";
	}

	this.dms.initAjx();

	// 刷新域名信息
	this.ro.get (srvNam, LZR.bind(this, function (req, res) {
		this.dms.get(this.dmIds);
		res.json(this.clsR.get(this.dms.ds));
	}));

	this.dms.get(this.dmIds);
};
LZR.Node.Router.ComTmp.prototype.initDms.lzrClass_ = LZR.Node.Router.ComTmp;
