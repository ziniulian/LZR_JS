/*************************************************
作者：子牛连
类名：NodeAjax
说明：nodejs 版的 ajax 工具
创建日期：25-二月-2018 8:56:26
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Db",
	"LZR.HTML.Util.Url"
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

	// URL工具
	this.utUrl/*m*/ = LZR.getSingleton(LZR.HTML.Util.Url);	/*as:LZR.HTML.Util.Url*/

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
LZR.Node.Db.NodeAjax.prototype.qry = function (sqlNam/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, args/*as:Array*/, postObj/*as:Object*/) {
	var url = this.sqls[sqlNam];
	var evt = this.evt[sqlNam];
	var err = this.err[sqlNam];
	var b = this.buf;
	var e = this.enc;
	var c = this.conv;
	var h, hs, o, rq, dat;

	// URL 数据替换
	hs = this.utUrl.parseUrl(url, args);

	// 判断是否使用 HTTPS 协议
	if (hs.protocol === "https") {
		h = this.https;
	} else {
		h = this.http;
	}

	// 数据整理
	o = {
		hostname: hs.hostname,
		port: hs.port,
		path: hs.path,
		method: postObj ? "POST" : "GET"
	};
	if (postObj) {
		dat = this.utUrl.toPostDat(postObj);
		o.headers = {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			"Content-Length": b.byteLength(dat)
		};
	}
// console.log(o);

	// 发送 HTTP 请求
	rq = h.request(o, function (r) {
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
// console.log(rr);
			evt.execute(rr, req, res, next);
		});
	});
	rq.on ("error", function (err_r) {
		err.execute(err_r, req, res, next);
	});
	if (postObj) {
// console.log(dat);
		rq.write(dat);
	}
	rq.end();
};
LZR.Node.Db.NodeAjax.prototype.qry.lzrClass_ = LZR.Node.Db.NodeAjax;
