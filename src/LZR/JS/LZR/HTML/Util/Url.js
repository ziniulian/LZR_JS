/*************************************************
作者：子牛连
类名：Url
说明：URL
创建日期：25-二月-2018 11:52:56
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Util",
	"LZR.Base.Json"
], "LZR.HTML.Util.Url");
LZR.HTML.Util.Url = function (obj) {
	// Json工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Util.Url.prototype.className_ = "LZR.HTML.Util.Url";
LZR.HTML.Util.Url.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Util.Url");

// 构造器
LZR.HTML.Util.Url.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Util.Url.prototype.init_.lzrClass_ = LZR.HTML.Util.Url;

// 对构造参数的特殊处理
LZR.HTML.Util.Url.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.HTML.Util.Url.prototype.hdObj_.lzrClass_ = LZR.HTML.Util.Url;

// 相对路径转换为绝对路径
LZR.HTML.Util.Url.prototype.toAbsURL = function (url/*as:string*/)/*as:string*/ {
	var directlink = function(url){
		var a = document.createElement ( "a" );
		a.href = url;
		return a.href;
	};
	if (directlink("") === "") {
		return directlink(url);
	} else {
		var div = document.createElement ( "div" );
		div.innerHTML = "<a href=\"" + url.replace(/"/g, "%22") + "\"/>";
		return div.firstChild.href;
	}
};
LZR.HTML.Util.Url.prototype.toAbsURL.lzrClass_ = LZR.HTML.Util.Url;

// 获取 URL 参数
LZR.HTML.Util.Url.prototype.getRequest = function (query/*as:string*/, nw/*as:boolean*/)/*as:Object*/ {
	var theRequest = {};
	var url;
	if (!query) {
		query = location.search;
	}
	if (nw || query.indexOf("?") != -1) {
		if (nw) {
			url = query.split("&");
		} else {
			url = query.substr(1).split("&");
		}
		for(var i = 0; i < url.length; i ++) {
			var str = url[i].split("=");
			theRequest[str[0]] = decodeURIComponent(str[1]);
		}
	}
	return theRequest;
};
LZR.HTML.Util.Url.prototype.getRequest.lzrClass_ = LZR.HTML.Util.Url;

// url解析
LZR.HTML.Util.Url.prototype.parseUrl = function (url/*as:string*/, args/*as:Array*/, query/*as:boolean*/)/*as:Object*/ {
	var dp = 0;		// 第一个 , 的位置
	var xp = 0;		// 协议的位置
	var ap = 0;		// 第一个 @ 的位置
	var mp = 0;		// 最后一个冒号的位置
	var gp = 0;		// 第一个 / 的位置
	var wp = 0;		// 第一个 ? 的位置
	var jp = 0;		// 第一个 # 的位置
	var sp = 0;		// 尖括号起始位置
	// http://user:pass@host.com:8080/p/a/t/h?query=string#hash
	var r = {};
	var p = "";
	var i, j;

	// 字串解析
	// BUG: 只能解析绝对路径，无法解析相对路径
	for (i = 0; i < url.length; i ++) {
		if ((url[i] === ":") && (!gp) && (!mp)) {
			if (sp) {
				p += url.substring(sp, i);
				sp = 0;
			}
			if (!xp && url[i + 1] === "/" && url [i + 2] === "/") {
				xp = p.length;
				i += 2;
				p += "://";
			} else {
				mp = p.length;
				p += ":";
			}
		} else if ((url[i] === "@") && (!gp) && (!ap)) {
			if (sp) {
				p += url.substring(sp, i);
				sp = 0;
			}
			mp = 0;
			ap = p.length;
			p += "@";
		} else if ((url[i] === "/") && (!gp)) {
			if (sp) {
				p += url.substring(sp, i);
				sp = 0;
			}
			gp = p.length;
			p += "/";
		} else if ((url[i] === ",") && (!dp) && (!xp) && (!ap) && (!mp) && (!gp)) {
			if (sp) {
				p += url.substring(sp, i);
				sp = 0;
			}
			dp = p.length;
		} else if ((url[i] === "?") && (gp) && (!wp)) {
			if (sp) {
				p += url.substring(sp, i);
				sp = 0;
			}
			wp = p.length;
			p += "?";
		} else if ((url[i] === "#") && (gp) && (!jp)) {
			if (sp) {
				p += url.substring(sp, i);
				sp = 0;
			}
			jp = p.length;
			p += "#";
		} else if (sp) {
			if (url[i] === ">") {
				// 参数替换
				j = sp + 1;
				if (i > j) {
					j = url.substring(j, i) - 0;
					if (!isNaN(j) && args[j]) {
						p += args[j];
					} else {
						p += url.substring(sp, i + 1);
					}
				} else {
					p += url.substring(sp, i + 1);
				}
				sp = 0;
			}
		} else if (url[i] === "<" && args) {
			sp = i;
		} else {
			p += url[i];
		}
	}
	if (sp) {
		p += url.substring(sp);
		sp = 0;
	}
	r.href = p;

	// 填值
	i = 0;
	if (dp) {
		r.encod = p.substring(i, dp);
		r.href = p.substring(dp);
		i = dp;
	} else {
		r.href = p;
	}
	if (xp) {
		r.protocol = p.substring(i, xp);
		i = xp + 3;
	} else {
		r.protocol = "http";
	}
	if (ap) {
		r.auth = p.substring(i, ap);
		i = ap + 1;
	}

	if (gp) {
		if (jp) {
			r.hash = p.substring(jp);
		} else {
			jp = p.length;
		}
		r.path = p.substring(gp, jp);
		if (wp) {
			r.pathname = p.substring(gp, wp);
			r.search = p.substring(wp, jp);
			if (query) {
				r.query = this.getRequest(r.search);
			}
		}
	} else {
		r.path = "/";
		gp = p.length;
	}

	if (mp) {
		r.hostname = p.substring(i, mp);
		i = mp + 1;
		r.port = p.substring(i, gp);
	} else {
		r.hostname = p.substring(i, gp);
		if (r.protocol === "http") {
			r.port = "80";
		} else if (r.protocol === "https") {
			r.port = "443";
		}
	}

	return r;
};
LZR.HTML.Util.Url.prototype.parseUrl.lzrClass_ = LZR.HTML.Util.Url;

// 转换成可传输的post数据
LZR.HTML.Util.Url.prototype.toPostDat = function (dat/*as:Object*/, useURI/*as:boolean*/)/*as:string*/ {
	var r = "";
	var tt;
	if (dat) {
		switch (LZR.getClassName(dat)) {
			case "string":
				r = dat;
				break;
			case "Object":
				for (var s in dat) {
					if ("" !== r) {
						r += "&";
					}
					r += useURI ? encodeURIComponent(s) : s;
					r += "=";
					if (dat[s] && (typeof dat[s] === "object")) {
						tt = this.utJson.toJson ( dat[s] );
						r += useURI ? encodeURIComponent(tt) : tt;
					} else {
						r += useURI ? encodeURIComponent(dat[s]) : dat[s];
					}
				}
				break;
			default:
				r = "dat=";
				tt = this.utJson.toJson ( dat );
				r += useURI ? encodeURIComponent(tt) : tt;
				break;
		}
	}
	return r;
};
LZR.HTML.Util.Url.prototype.toPostDat.lzrClass_ = LZR.HTML.Util.Url;
