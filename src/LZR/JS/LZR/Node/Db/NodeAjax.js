/*************************************************
作者：子牛连
类名：NodeAjax
说明：nodejs 版的 ajax 工具
创建日期：27-五月-2017 14:20:57
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Db",
	"LZR.Base.Str"
], "LZR.Node.Db.NodeAjax");
LZR.Node.Db.NodeAjax = function (obj) /*bases:LZR.Node.Db*/ {
	LZR.initSuper(this, obj);

	// HTTP协议
	this.http = LZR.getSingleton(null, null, "http");	/*as:Object*/

	// HTTPS协议
	this.https = LZR.getSingleton(null, null, "https");	/*as:Object*/

	// 数据缓存
	this.buf = global.Buffer || LZR.getSingleton(null, null, "buffer").Buffer;	/*as:Object*/

	// 字符转换器
	this.conv = LZR.getSingleton(null, null, "iconv-lite");	/*as:Object*/

	// 字符编码
	this.enc = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Db.NodeAjax.prototype = LZR.clone (LZR.Node.Db.prototype, LZR.Node.Db.NodeAjax.prototype);
LZR.Node.Db.NodeAjax.prototype.super_ = [LZR.Node.Db];
LZR.Node.Db.NodeAjax.prototype.className_ = "LZR.Node.Db.NodeAjax";
LZR.Node.Db.NodeAjax.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Db.NodeAjax");

// 构造器
LZR.Node.Db.NodeAjax.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Db.NodeAjax.prototype.init_.lzrClass_ = LZR.Node.Db.NodeAjax;

// 执行查询
LZR.Node.Db.NodeAjax.prototype.qry = function (sqlNam/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, args/*as:___*/) {
	var url = this.sqls[sqlNam];
	var evt = this.evt[sqlNam];
	var err = this.err[sqlNam];
	var b = this.buf;
	var e = this.enc;
	var c = this.conv;
	var h, hs;

	// URL 数据替换
	for (var i = 0; i < args.length; i++) {
		url = url.replace(new RegExp("<" + i + ">", "g"), args[i]);
	}

	// 判断是否使用 HTTPS 协议
	var hs = url.substr(0, 5).toLowerCase();
	if (hs === "https") {
		h = this.https;
	} else if (hs === "http:") {
		h = this.http;
	} else {
		var i = url.indexOf(",");
		hs = url.substr(i + 1, 5);
		if (hs === "https") {
			h = this.https;
			e = url.substr(0, i);
		} else if (hs === "http:") {
			h = this.http;
			e = url.substr(0, i);
		} else {
			h = this.http;
		}
	}

	// 发送 HTTP 请求
	h.get(url, function (r) {
		var d = [];
		var size = 0;
		r.on("data", function (data) {
			d.push(data);
			size += data.length;
		});
		r.on("end", function () {
			var buff = b.concat(d, size);
			var rr;
			if (e) {
				rr = c.decode(buff, e);
			} else {
				rr = buff.toString();
			}
			evt.execute(rr, req, res, next);
		});
	}).on ("error", function (err_r) {
		err.execute(err_r, req, res, next);
	})
};
LZR.Node.Db.NodeAjax.prototype.qry.lzrClass_ = LZR.Node.Db.NodeAjax;
